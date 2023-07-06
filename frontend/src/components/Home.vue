<script>
// import HelloWorld from './components/HelloWorld.vue'
import SimpleTranslate from './translate/SimpleTranslate.vue'
import DogPic from './dogs/DogPic.vue';

export default {
  name: 'hello-test',
  components: {
    SimpleTranslate,
    DogPic
  }
}
</script>

<template>
  <h1>Your translate</h1>
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

