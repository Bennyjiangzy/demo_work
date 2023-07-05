<template>

    <div id="app">
    
        <button @click="getData">click me</button>
        <div v-if="responseData">
            <img :src="responseData.message" alt="doggy" style="margin-top: 10px;"/>
        </div>
    
    </div>
    
    
    </template>
      
    
      <script>
      import axios from 'axios';
      import settings from '@/assets/appsetting.json'
    
      export default {
        data() {
            return {
            responseData: null,
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
            axios.get(settings.dogapiurl.getimg)
            .then((response) => {
                this.responseData = response.data
            })
            .catch((error) => {
    
            console.error(error);
            });
            },
        },
        name: 'DogPic',
        props: {
          msg: String
        }
      }
      </script>
    
      <style scoped>
    
      </style>
      