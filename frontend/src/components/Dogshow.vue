<script>
import DogPicshow from './dogs/DogPicshow.vue';

export default {
  name: 'dog-show',
  components: {
    DogPicshow
  }
}
</script>

<template>
  <DogPicshow/>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

