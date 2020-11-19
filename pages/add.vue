<template>
	<div class="wrapper" @click.self="currentTeam=null">
		<div class="team-selector">
			<h4>Nombre d'équipes</h4>
			<el-radio-group v-model="nbTeams" size="medium" @change="formatTeams()">
				<el-radio-button label="0">Solo</el-radio-button>
				<el-radio-button label="2">2</el-radio-button>
				<el-radio-button label="3">3</el-radio-button>
				<el-radio-button label="4">4</el-radio-button>
			</el-radio-group>
		</div>
		<div class="teams">
				<div @click="[currentTeam=currentTeam==teamIndex ? null : teamIndex]" :class="[{active:currentTeam==teamIndex}, 'team box padded']" v-for="(team,teamIndex) in teams" :key="teamIndex">

						<h4>{{'Équipe '+team.name}}</h4>
						<BuzzerSoundSelect :teamIndex="teamIndex" :selectedSound="team.buzzerSound"/>
						<div class="player-tag box" v-for="(player,index) in playersInTeam(teamIndex)" :id="player.id" :key="index">
						<div :class="[player.color, 'color active']">{{player.buzzer}}</div>
						<div>{{player.name.toUpperCase()}}</div>
						<el-tooltip class="item" effect="dark" content="Suprrimer le joueur" placement="top">
							<div @click="removePlayer(player.id, player.name)" class="el-icon-close delete right hand"></div>
						</el-tooltip>
					</div>
				</div>
			</div>
			<v-btn><nuxt-link to="/game">Jouer</nuxt-link></v-btn>

		<AddPlayerForm :isVisible.sync="showAddPlayerForm" :buzzer="buzzer" :currentTeam.sync="currentTeam" @closeForm="showAddPlayerForm=false"/>
		
		<div class="consigne center">
			<h4>Cliquez sur un buzzer pour ajouter un nouveau joueur</h4>
		</div>
	</div>
</template>

<script>
		
import 'element-ui/lib/theme-chalk/index.css';
import BuzzerSoundSelect from '../components/BuzzerSoundSelect.vue';
import AddPlayerForm from '../components/AddPlayerForm.vue';

	export default {
  components: { BuzzerSoundSelect, AddPlayerForm },

		data(){
			return{
				showAddPlayerForm: false,
				buzzer:undefined,
				nbTeams:null,	
				currentTeam:null
			}
		},
		computed:{
			players() {
      			return this.$store.state.players;
			},
			teams() {
      			return this.$store.state.teams;
			}
		},
		mounted() {
			this.nbTeams=this.teams.length;
			var that=this;
			window.addEventListener('keydown',(e)=> {
				if(e.keyCode>=49 && e.keyCode<=56){
					let buzzerPressed=toBuzzerNumber(e.keyCode);
					if (this.players.filter(e => e.buzzer == buzzerPressed).length == 0) {
						this.buzzer=buzzerPressed;
						this.showAddPlayerForm=true;	
						console.log(this.showAddPlayerForm);
					}	
				}	
			});
	},methods: {
		isFormVisible(state){
			this.showAddPlayerForm=state;
			console.log(this.showAddPlayerForm);
		},
		formatTeams(){
			this.$store.commit('setTeams',this.nbTeams);
		},
		
		removePlayer(id,name){
			this.$store.commit('removePlayer',id);
			notify(this, name+' a été retiré','error');
			this.showAddPlayerForm = false;
		},
		playersInTeam(team){
				return this.players.filter(obj => {
					return obj.team == team
				});
			},
    }
	}
</script>

<style>
.teams{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap:10px;
}
.consigne{
	padding:50px;

}
.center{
	text-align:center;
}
.delete{
	font-size: 1.5em;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  h4{
	  margin-bottom:20px;
  }
  .team{
	  border: #ddd 2px solid;

	  color:#ccc;
  }
 

  .wrapper{
	  padding:50px;
	background-color: white;
	}
.color{
	text-align:center;
	color:white;
	padding-top:5px;
	width:40px;
	height:40px;
	border-radius:50%;
	border-style:solid;
	display: inline-block;
	margin-right: 10px;
	cursor: pointer;
	box-shadow: 2px 5px grey;
}

.color:not(:hover, .active){
	transition: all 0.2s;
	background-color: white;
	transform: scale(0.7);
}
.color:hover{
	border:2px black solid; 
}
.player-tag{
	padding:10px;
	color:black;
	background-color: white;
	width:100%;
    display: table;
	margin-bottom:10px;
}
.player-tag div{
   display: inline-table;
    vertical-align: middle;
}

.team:hover{
		  border-color: #409EFF;
}
 .team.active{
	 color:white;
	background-color: #409EFF;
  animation-name: active-team;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
  }

@keyframes active-team {
  0% {
    background-color: #0975e1;
  }
  50% {
    background-color: #409EFF;
  }
  100% {
    background-color: #0975e1;
  }
}
</style>