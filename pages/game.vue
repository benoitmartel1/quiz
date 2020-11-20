<template>
	<div>
		<div class="board">
			<div class="team" v-for="(team, teamIndex) in teams" :key="teamIndex">
				<div class="score-container">
					<transition name="score-spin" mode="out-in">
						<div class="score" :key="score(teamIndex)">{{score(teamIndex)}}</div>
					</transition>
				</div>

				<div
					v-for="(player,index) in playersInTeam(teamIndex)" 
					:class="[{ 'active' : activeBuzzer == player.buzzer}, 'player-container '+player.color]" 
					:key="index">
									<transition>
					<div class="player">{{player.name.toUpperCase()}}
					</div>
							</transition>
				</div>
		
			</div>
			</div>

		<div v-show="isBlur" class="blur-warning">CLICK HERE!</div>
		<nuxt-link to="/manage"><div class="el-icon-edit icon" to="/add"></div></nuxt-link>
	</div>

</template>

<script>
	export default {
		data(){
			return {
				activePlayer:undefined,
				lastPlayer:undefined,
				changeScoreAnimation:false,
				isBlur:false
			}
		},
		computed:{
			teams() {
      			return this.$store.state.teams;
			},
			players() {
      			return this.$store.state.players;
			},
			activeTeam(){
				return (this.activePlayer)?this.activePlayer.team:undefined;
			},
			activeBuzzer(){
				return (this.activePlayer)?this.activePlayer.buzzer:undefined;
			}
		},
		methods:{
			onKeyUp(e){
				if(e.keyCode>=49 && e.keyCode<=56){
					this.buzzerPressed(toBuzzerNumber(e.keyCode));
				}
				if(e.keyCode==82){//R
					this.activePlayer=undefined;
				}			
				if(e.keyCode==83){//S
					this.goodAnswer();
				}	
				if(e.keyCode==8){//Backspace
					this.removeScore();
				}		
			},
			score(team) {
				let score=0;
      			this.players.filter(obj => {
					if(obj.team === team){
						score+=obj.score;
					}
				});
				return score;
			},
			playersInTeam(team){
				return this.players.filter(obj => {
					return obj.team == team
				});
			},
			//Buzzer is pressed
			buzzerPressed(buzzerId){
				var player = this.players.filter(obj => {
					return obj.buzzer == buzzerId
				})[0];
				if (player){
					if(this.teams[player.team].buzzerSound){
						playSound(this.teams[player.team].buzzerSound);
					}
					this.activePlayer=player;
				};

			},
			//Good answer, add score to last buzzer	
			goodAnswer(){
				if(this.activePlayer){
					playSound('reponse');
					this.$store.commit('changeScore', {buzzer:this.activePlayer.buzzer, add:true});
					this.lastPlayer=this.activePlayer;
					this.changeScoreAnimation=true;
					//this.changeScoreAnimation=false;
					this.activePlayer=undefined;
				}
			},
			removeScore(){
				this.$store.commit('changeScore',{buzzer:this.lastPlayer.buzzer, add:false});	
			}
		},  
		destroyed () {
				window.removeEventListener('keydown', this.onKeyUp);

		},
		//ON LEAVING PAGE' REMOVE LISTENERS!!!!!!!!!!!!
		mounted() {
			var that=this;
			window.addEventListener('keydown', this.onKeyUp);
			window.addEventListener('blur', ()=>{that.isBlur=true;});
			window.addEventListener('focus', ()=>{that.isBlur=false;});
    },
	}
</script>

<style>
.board{
	display: flex;
	justify-content: space-between;

}
.board .team{
	text-align: center;
}
.board .score-container{
	background-color: white;
	border: 4px solid red;
	border-radius:50%;
	width:130px;
	height:130px;
	text-align: center;
	display: table-cell;
	overflow: hidden;
	vertical-align:middle;
	overflow: hidden;

}
.board .score{
	font-size:280%;
}

.score-spin-enter, .score-spin-leave-to{
	transform: translateY(150%);
}
.score-spin-enter-active{
	transition: all 400ms cubic-bezier(.47,1.64,.41,.8);
}
.board .player-container{
	border-radius: 0% 20px 20px 0;
	color: white;
	width:150px;

	margin:5px;
}
.board .player{
	color: white;
	width:120px;
	height:80px;
	padding:20px;
	margin:5px;
}

.board .player.active{
	transition: all 0.2s;
	width: 400px;
	height:300px;
	font-size:300%;
}
.blur-warning{
	position: absolute;
	top:0;
	width:100vw;
	height:100vh;
	color:white;
	background-color: rgba(0,0,0,0.8);
}
</style>