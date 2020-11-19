<template>
	<div>
	<el-col :span=2 class="side"></el-col>
	<el-col :span=20 >
    <nuxt />

	</el-col>
    <el-col :span=2 class="side"></el-col>
	</div>
</template>
<script>
</script>
<style>
.side{
	min-height:100vh;
	background-color:linen;
}
</style>
