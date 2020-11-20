<template>
	<div>
		<TopNav/>
		<div class="center-frame">
			<nuxt />
		</div>
	</div>
</template>
<script>
import 'element-ui/lib/theme-chalk/index.css';
import TopNav from '@/components/TopNav.vue';

export default {
	components: {
		TopNav
	},
};
</script>
<style>
.side{
	min-height:100vh;
	background-color:linen;
}
</style>
