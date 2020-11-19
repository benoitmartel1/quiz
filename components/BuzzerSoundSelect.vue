<template>
<div>
<div class="el-icon-alarm-clock"></div>
  <el-select  @change="assignSoundBuzzer($event, teamIndex)" v-model="value" placeholder="Son du buzzer">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>

</template>

<script>
 export default {
	props:{'teamIndex':Number,'selectedSound':String},
    data() {
      return {
        options: [{
          value: 'eternue',
          label: 'Atchoum'
        }, {
          value: 'vache3',
          label: 'Meuh'
        }],
        value: ''
      }
	},
	methods:{
		assignSoundBuzzer(event){
			let payload={
				buzzerSound:event,
				team:this.teamIndex
			};
			this.$store.commit('setTeamBuzzer',payload);
		}
	},created(){
		this.value=this.selectedSound;
	}
  }
</script>
<style>
.el-select{
	margin-bottom:20px;
}
</style>