<script>
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
    ///<summary>recive the joke value from joke component</summary>
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
  <!-- listen translate joke value from joke component -->
  <Joke @send-value="handleValueFromjoke"/>
  <br>
  <br>
  <!-- parse the translate joke value to translate component and execute the translation call -->
  <SimpleTranslate :received-value="valueFromjoke"/>

  <DogPic/>

</template>

<style>
#app {

}
</style>

