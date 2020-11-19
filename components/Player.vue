<template>
  <div class="player">
    {{ player.name.toUpperCase() }}
  </div>
</template>

<script>
export default {
  props: ["player"]
};
</script>
<style>
.player {
  font-weight: bold;
  width: 200px;
  height: 100px;
  border-radius: 10px;
  background-color: red;
  color: white;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 2em;
  text-align: center;
}
</style>
