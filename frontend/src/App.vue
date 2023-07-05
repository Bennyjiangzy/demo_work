<script>
// import HelloWorld from './components/HelloWorld.vue'
import SimpleTranslate from './components/SimpleTranslate.vue'
import DogPic from './components/DogPic.vue';

export default {
  name: 'App',
  components: {
    SimpleTranslate,
    DogPic
  }
}
</script>

<template>
  <SimpleTranslate/>

  <DogPic/>

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
