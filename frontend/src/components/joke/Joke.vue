<template>

    <form  @submit="submitForm">
    <div class="container">    
        
        <table>
        <tbody>
        <tr>
            <td>Select category / categories:</td>
            <td>
                <select v-model="selectedOptiontocategory" required>
                <option disabled value="">Please select one</option>
                <option v-for="(item, index) in categoriesptions" :key="index" :value="index">{{ item }}</option>
                 </select>
            </td>
        </tr>
        <tr>
            <td>Select Language:</td>
            <td>
                <select v-model="selectedOptiontojoke" required>
                <option disabled value="">Please select one</option>
                <option v-for="(item, index) in langoptions" :key="index" :value="index">{{ item }}</option>
                 </select>
            </td>
        </tr>

        <tr>
            <td>Select flags to blacklist:</td>
            <td>
                <select v-model="selectedOptiontoflags">
                <option value="default">No blackflag</option>
                <option v-for="(item, index) in flagsoptions" :key="index" :value="index">{{ item }}</option>
                 </select>
            </td>
        </tr>
        <tr>
            <td>
                <input type="button" value="Translate" @click="sendValueToComponent2" style="margin-left: 5px;">
            </td>
            <td>
                <button type="submit" style="margin-right: 5px;">Submit</button>
            </td>
            
            
        </tr>
        
        </tbody>
        
        </table>
        
        <textarea 
          type="text" 
          v-model="translatedtext" 
          rows="20"
          cols="40"
          class="no-resize"
          style="margin-top: 10px;
                 margin-left: 5px;"
          disabled></textarea>
        
        
    </div>
    
    </form>
    
    </template>
      
    
      <script>
      import axios from 'axios';
      import settings from '@/assets/appsetting.json'
    
      export default {
        data() {
        return {
            selectedOptiontojoke:"en",
            selectedOptiontocategory:"0",
            selectedOptiontoflags:"default",
            langoptions:settings.jokelangoptions,
            categoriesptions:settings.jokecategories,
            flagsoptions:settings.jokeflags,
            translatedtext:"Select option and click submit to get the joke"
        };
        },
        methods: {
            ///<summary>
            /// send the joke text to translate component to translate
            ///</summary>
            sendValueToComponent2() {
                this.$emit('send-value', this.translatedtext);
            },


            ///<summary>
            /// call the jokeapi to get a joke based on user options
            ///</summary>
            ///<return> 
            /// return the joke text reponse from backend api
            ///</return>
            submitForm(event) {
                event.preventDefault(); 
                
                this.translatedtext = "loading....."
                const requestBody = {
                    categories: [this.categoriesptions[this.selectedOptiontocategory]],
                    blacklistFlags: this.selectedOptiontoflags == "default"? [] : [this.flagsoptions[this.selectedOptiontoflags]],
                    lang:this.selectedOptiontojoke
                };


                axios.post(`${settings.backendbaseurl}${settings.jokeapi}`, requestBody,{headers:{'Content-Type': 'application/json'}})
                    .then(response => {
                        if(response.data.type == "single")
                        {
                            this.translatedtext = response.data.joke
                        }else if(response.data.type == "twopart")
                        {
                            let joke = response.data.setup + "\n\n" +response.data.delivery
                            this.translatedtext = joke
                        } else
                        {
                            this.translatedtext = "Try again"
                        }
                        
            
                    })
                    .catch(error => {
                    console.error('Failed to submit form:', error);
                    });
            },
            
        },
        name: 'Joke-show',
        props: {
          msg: String
        }
      }
      </script>
    
      <style scoped>
        .no-resize {
        resize: none;
        }
        .container {
        display: flex;
        justify-content: center;
        margin: 10px
        }

        .container div {
        flex: 1;
        }

        table{
            table-layout: fixed;
        }

        td {
            text-align: left;
            padding-left: 10px;
            padding-right: 10px;
        }
      </style>
      