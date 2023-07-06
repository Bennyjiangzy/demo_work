<template>

    <div id="app">

        <button @click="addData" class="button-spacing">Like</button>
        <button @click="getData" class="button-spacing">click me</button>
        <router-link to="/dogshow" class="button-spacing">Gallery</router-link>
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
            addData()
            {
                const databody = {
                    imglink: this.responseData
                }
                axios.post(settings.dogapiurl.saveimg, databody,{headers:{'Content-Type': 'application/json'}})
                .then((response) => {
                    console.log(response.status)
                })
                .catch((error) => {
        
                console.error(error);
                });
            }
        },
        name: 'DogPic',
        props: {
          msg: String
        }
      }
      </script>
    
      <style scoped>
    .button-spacing {
    margin-right: 10px; 
    }
      </style>
      