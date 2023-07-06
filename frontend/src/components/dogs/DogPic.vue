<template>
    <div v-if="saved">
            <p>Image saved!</p>
    </div>
    <div id="app">

        <button @click="addData" class="button-spacing">Like</button>
        <button @click="getData" class="button-spacing">click me</button>
        <a href="/dogshow" class="button-spacing" type="button">Gallery</a>
        <div v-if="responseData">
            <img :src="responseData.message" alt="doggy" style="margin-top: 10px;" class="dog-image"/>
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
            saved: false
            };
        },
        ///<summary>
        /// auto call the dogimg api as the liftcycle of web pages
        ///</summary>
        mounted() {
            this.getData();
        },
        methods: {
            ///<summary>
            /// call the dogimg api for a random dog pages
            ///</summary>
            ///<return> 
            /// return the img src address
            ///</return>
            getData() {
                this.saved = false;
                axios.get(`${settings.backendbaseurl}${settings.dogapiurl.getimg}`)
                .then((response) => {
                    this.responseData = response.data
                })
                .catch((error) => {
        
                console.error(error);
                });
            },
            ///<summary>
            /// call the save dogimg api for save current img src and id
            ///</summary>
            addData()
            {
                this.saved = true;
                const databody = {
                    imglink: this.responseData
                }
                axios.post(`${settings.backendbaseurl}${settings.dogapiurl.saveimg}`, databody,{headers:{'Content-Type': 'application/json'}})
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

    .dog-image {
        width: 920px; 
        height: 740px; 
        font-size: 14px;
    }
      </style>
      