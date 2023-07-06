<script>
// import HelloWorld from './components/HelloWorld.vue'
import SimpleTranslate from './translate/SimpleTranslate.vue'
import DogPic from './dogs/DogPic.vue';
import Joke from './joke/Joke.vue';


export default {
  data(){
    return {
      valueFromjoke: '',
    }
  },
  methods: {
    handleValueFromjoke(value) {
      this.valueFromjoke = value;
    }
  },
  name: 'hello-test',
  components: {
    SimpleTranslate,
    DogPic,
    Joke
  }
}
</script>

<template>
  <h1>Happy Joke Translate Dog API demo</h1>
  <Joke @send-value="handleValueFromjoke"/>
  <br>
  <br>
  <SimpleTranslate :received-value="valueFromjoke"/>

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

