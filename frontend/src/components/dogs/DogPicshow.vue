<template>

    <div id="app" >
        <router-link to="/" class="button-spacing">Back Home</router-link>
        <h1>Your Dogs Imags Gallery</h1>
        <div class="row image-container">
        <div v-for="(image, index) in images" :key="index" class="d-flex flex-column align-items-center">
            <img :src="image.message" :id="index" alt="Image"  class="gallery-image"/>
            <button @click="deleteImage(index)" class="btn btn-outline-danger">Delete</button>
        </div>
        </div>
    
    </div>
    
    
</template>
      
    
      <script>
      import axios from 'axios';
      import settings from '@/assets/appsetting.json'
    
      export default {
        data() {
            return {
                images: [],
            };
        },
        methods: {
              ///<summary>
              /// call the delete dogimg api to delete the img
              ///</summary>
              deleteImage(id) {
                  const bodydata =
                  {
                      imgid: id
                  }
                  axios.post(`${settings.backendbaseurl}${settings.dogapiurl.deleteimg}`, bodydata,{headers:{'Content-Type': 'application/json'}})
                  .then((response) => {
                      console.log(response.data)
                      this.images = response.data
                  })
                  .catch((error) => {
          
                  console.error(error);
                  });
                  }
          },
        ///<summary>
        /// call the current dogimg list api and refresh the dog imgs in real-time
        ///</summary>
        created() {
            axios.get(`${settings.backendbaseurl}${settings.dogapiurl.allimg}`)
            .then((response) => {
                console.log(response.data)
                this.images = response.data
            })
            .catch((error) => {
    
            console.error(error);
            });
        },
        name: 'DogPic',
        props: {
          msg: String
        }
      }
      </script>
    
      <style scoped>
    
    .gallery-image {
  width: 200px; 
  height: 200px; 
  object-fit: cover; 
  margin: 10px; 
}

.image-container {
  display: flex; 
  justify-content: center; 
  flex-wrap: wrap; 
}

.delete-button {
  margin-left: 10px;
}

.small-button {
  width: 80px; 
  height: 30px; 
  font-size: 14px;
}
      </style>
      