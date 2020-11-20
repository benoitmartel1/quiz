<template>
	<div>
		<div class="top-nav">
			<div class="center-frame">
				<nuxt-link class="cursor no-decoration" to="/"><div class="logo left">QUIZ !</div></nuxt-link>		
				<div class="login-button right cursor">
					<div class="el-icon-user-solid"></div>
					{{userName}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		computed: {
			userName() {
				return (this.$store.state.user.name=='')?'Login':this.$store.state.user.name;
			}
		}
	}
</script>

<style>
	.top-nav{
		color: white;
		background-color: #43056d;
		height:60px;
		padding:20px 0; 
		margin-bottom:40px;
	}
	.login-button{
		/* color:white; */
	}

</style>