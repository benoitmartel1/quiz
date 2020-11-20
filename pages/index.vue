<template>
  <div class="container">
    <div>
      <v-btn><nuxt-link to="/manage">Jouer</nuxt-link></v-btn>
      <v-btn @click="showLogin=!showLogin"><nuxt-link to="/">Préparer</nuxt-link></v-btn>
	  <el-dialog :visible.sync="showLogin">
		<el-form label-width="100px" :model="user">
				<el-form-item label="Nom">
					<el-input v-model="user.email" type="email"></el-input>
				</el-form-item>
				<el-form-item label="Password" >
					<el-input v-model="user.password" type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="db_registerUser">Submit</el-button>
					<el-button >Reset</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
  </div>
</template>

<script>
		var faunadb = require('faunadb');
		var q = faunadb.query;
		var db = new faunadb.Client({ secret: process.env.FAUNA_GUEST_SECRET });
		
export default {
	data(){
		return {
			showLogin:false,
			user:{
				email:'',
				password:''
			}
		}
	},
	methods:{
		db_registerUser(){
			db.query(
				q.Login(
  					q.Match(q.Index("users_by_email"), this.user.email),
  					{ password: this.user.password }
				)
			).then((res)=>{
					this.$store.commit('setUserToken',res.secret);
					db.query(
						q.Paginate(q.Match(q.Index("name_by_email"), this.user.email))
					).then(res=>{
						this.$store.commit('setUserName',res.data[0]);
						this.showLogin=false;
						notify(this, 'Bienvenue '+res.data[0], 'success')	
					})
				}).catch(err=>notify(this, 'Login invalide', 'error'));	
		}
	}

};
</script>

<style></style>
