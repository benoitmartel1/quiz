<template>
	<el-dialog :title="'Buzzer '+buzzer" :visible="isVisible">
		<el-form :model="form" >
			<el-form-item label="Nom" :label-width="formLabelWidth" >
				<el-input v-model="form.name" autocomplete="off" v-focus></el-input>
			</el-form-item>
			<el-form-item label="Couleur" :label-width="formLabelWidth">
				<div @click="assignColor(color)" :class="colorClass(color)" v-for="(color, index) in buzzerColors" :key="index"></div>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="closeForm">Annuler</el-button>
			<el-button  @click.native.prevent="addPlayer" type="primary">Ajouter</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		props:{
			'buzzer':Number,
			'currentTeam':Number,
			'isVisible':Boolean,

		},
		data(){
			return {
				buzzerColors:['red','blue','green','yellow'],
				form: {
					name: '',
					color:undefined
				},
				formLabelWidth: '120px'
			}
		},methods:{
			closeForm(){
				this.$emit('closeForm',false);
			},
			assignColor(color){
				this.form.color=color;
			},
			colorClass(color){
				let myClass="color "+color;
				myClass+=color===this.form.color?' active':'';
				return myClass;
			},
			addPlayer(){
				let validated=true;
				let clearForm=false;
				if(this.form.name.length==0){
					validated=false;
					notify(this, 'Le nom est obligatoire.','error');
				};
				if(this.buzzer==0){
					validated=false;
					clearForm=true;
					notify(this, 'Aucun buzzer n\'a été assigné.','error');
				};
				if(this.form.color==undefined){
					validated=false;
					notify(this, 'Vous devez assigner la couleur du buzzer.','error');
				};
				if(this.currentTeam==undefined){
					validated=false;
					clearForm=true;
					notify(this, 'Problème avec l\'équipe.','error');

				};
				if (validated){
					let payload=this.form;
					payload['team']=this.currentTeam;
					payload['buzzer']=this.buzzer;
					let name=this.$store.commit('addPlayer', payload);

					clearForm=true;
				}
				if (clearForm){
					this.closeForm();
					this.form={name: undefined, color: undefined};
				}
		},
		},directives: {
		focus: {
			// directive definition
			inserted: function (el) {
			el.focus()
			}
		}
		}
	}
</script>

<style>

</style>