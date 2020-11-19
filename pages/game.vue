<template>

	<div>
		<div class="scoreboard">
					<div class="team" v-for="(team, teamIndex) in teams" :key="teamIndex">
			<div class="score">{{score(teamIndex)}}</div>
			<div v-show="current == player.buzzer" class="player" :class="[{ 'active' : current == player.buzzer}, player.color]" v-for="(player,index) in playersInTeam(teamIndex)" :key="index">{{index+1+' '+player.name}}</div>
		</div>
			</div>

		<div v-show="isBlur" class="blur-warning">CLICK HERE!</div>
		<nuxt-link to="/add"><div class="el-icon-edit icon" to="/add"></div></nuxt-link>
	</div>

</template>

<script>
	export default {
		data(){
			return {
				current:0,
				lastBuzzerIncremented:0,
				isBlur:false
			}
		},
		computed:{
			teams() {
      			return this.$store.state.teams;
			},
			players() {
      			return this.$store.state.players;
			}
		},
		methods:{
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
				playSound(this.teams[player.team].buzzerSound);
				this.current=buzzerId;
			},
			//Good answer, add score to last buzzer	
			goodAnswer(){
				playSound('reponse');
				this.$store.commit('changeScore',{buzzer:this.current, add:true});
				this.lastBuzzerIncremented=this.current;
				this.current=0;
			},
			removeScore(){
				this.$store.commit('changeScore',{buzzer:this.lastBuzzerIncremented, add:false});	
			}
		},
		mounted() {
			var that=this;
			window.addEventListener('keydown',(e)=> {
				if(e.keyCode>=49 && e.keyCode<=56){
					that.buzzerPressed(toBuzzerNumber(e.keyCode));
				}
				if(e.keyCode==82){//R
					that.current=0;
				}			
				if(e.keyCode==83){//S
					that.goodAnswer();
				}	
				if(e.keyCode==8){//Backspace
					that.removeScore();
				}		
			});
			window.addEventListener('blur', ()=>{that.isBlur=true;});
			window.addEventListener('focus', ()=>{that.isBlur=false;});
    },
	}
</script>

<style>
.scoreboard .team{
   display: inline-block;
    *display: inline; /* For IE7 */
    zoom: 1; /* Trigger hasLayout */
    width: 33%;
    text-align: center;
	background-color: pink;
	text-align: center;
}
.score{
	padding:50px;
	font-size:300%;
	position:absolute;
	top:0;
	background-color: white;
	border: 4px solid red;
	border-radius:50%;
	width:200px;
	height:200px;
}
.score.right{
	right:0;
}
.score.left{
	left:0;
}
.player{
	position:absolute;
	left:50%;
	color: white;
	width:120px;
	height:80px;
	padding:20px;
	margin:5px;
}

.player.active{
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