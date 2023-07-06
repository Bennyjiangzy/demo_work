<template>

<button @click="exchangeData">Exchange</button>
<form @submit="submitForm">
<div class="container">
    <div id="div1" class="column">
    <select v-model="selectedOptiontext" @change="handleOptionChange">
        <option disabled value="">Please select one</option>
        <option v-for="(item, index) in options" :key="index" :value="index">{{ item }}</option>
        <option value="auto">Auto Detect</option>
    </select>
    <br>
    <textarea 
      type="text" 
      v-model="inputText" 
      rows="20"
      cols="40"
      @input="handleInput"
      class="no-resize"
      style="margin-top: 10px;"
      ></textarea>
      <p v-if="autodetectsource">{{ "AutoDetect: " + autodetectsource + " " + autodetectrate + "%"}}</p>
    </div>


    <div id="div2" class="column">
    <select v-model="selectedOptiontotranslate" @change="handleOptionChange">
        <option disabled value="">Please select one</option>
        <option v-for="(item, index) in options" :key="index" :value="index">{{ item }}</option>
    </select>
    <br>
    <textarea 
      type="text" 
      v-model="translatedtext" 
      rows="20"
      cols="40"
      class="no-resize"
      style="margin-top: 10px;"
      disabled></textarea>
      </div>
</div>
</form>

</template>
  

  <script>
  import axios from 'axios';
  import settings from '@/assets/appsetting.json'

  export default {
    data() {
    return {
      selectedOptiontext: 'auto',
      selectedOptiontotranslate: 'en',
      options: settings.translateoptions,
      inputText: '',
      translatedtext: 'Hello',
      timeoutId: null,
      autodetectsource: null,
      autodetectrate: null
    };
    },
    methods: {
        ///<summary>
        /// default submitForm
        ///</summary>
        submitForm() {
        },
        
        ///<summary>
        /// Action when translate language option value has changed and will call translate call
        ///</summary>
        ///<return> </return>
        handleOptionChange()
        {
            this.handleInput();
        },

        ///<summary>
        /// Action when exchange lang button has clicked and will call translate call
        ///</summary>
        exchangeData()
        {
            if (this.selectedOptiontext != "auto"){
                var temp = this.selectedOptiontext;
                this.selectedOptiontext = this.selectedOptiontotranslate;
                this.selectedOptiontotranslate = temp;
                this.handleInput();
            }
         
        },
        ///<summary>
        /// call the translate api
        ///</summary>
        ///<return>
        /// return the translated text if not give some error msg
        ///</return>
        async handleInput() {
            try {
                clearTimeout(this.timeoutId);
                const formData = {
                    text: this.inputText,
                    source: this.selectedOptiontext,
                    target: this.selectedOptiontotranslate
                };
                
                if (formData.text != ""){
                    this.translatedtext = "loading...."
                    /// use a setimeout to wait the user finish typing then send the call
                    this.timeoutId = setTimeout(async () => {
                      try {
                            const response = await this.fetchData(formData);
                            this.translatedtext = response.data.translatedText;
                            
                            if (this.selectedOptiontext == 'auto')
                            {
                              console.log(this.selectedOptiontext)
                              let detectsource = response.data.detectedLanguage.language;
                              console.log(detectsource)
                              this.autodetectsource = this.options[detectsource]
                              this.autodetectrate = response.data.detectedLanguage.confidence
                              console.log(this.autodetectsource)
                              console.log(this.autodetectrate)
                            }
                            else
                            {
                              this.autodetectsource = null
                              this.autodetectrate = null
                            }
                            
                          } catch (error) {
                            if (error.response && error.response.status === 500) {
                              console.log("Server error occurred:", error.response.data);
                              this.translatedtext = "Type a space in textbox to try again, sometimes the translate API server is slow";
                            } else {
                              console.log("An error occurred:", error);
                              this.translatedtext = "Type a space in textbox to try again, sometimes the translate API server is slow";
                            }
                          }
                    },2000);
                }
            } catch (error) {
                console.error(error);
            }
        
            
        },
        ///<summary>
        /// the actual call for translate call
        ///</summary>
        ///<return> translated text response</return>
        fetchData(formData) {
            return axios.post(`${settings.backendbaseurl}${settings.translateapiurl}`, formData,{headers:{'Content-Type': 'application/json'}});
        }
        
    },
    ///<summary>
    /// listen the value from joke component after recive the joke fill the translated
    /// text and call the translate api
    ///</summary>
    watch: {
      receivedValue(newValue) {
        this.inputText=newValue
        this.selectedOptiontext='auto'
        this.handleInput();
        console.log('Received value:', newValue);
        },
      },
    name: 'SimpleTranslate',
    props: {
      msg: String,
      receivedValue: {
        type: String,
        default: '',
    },
    }
  }
  </script>

  <style scoped>
.no-resize {
  resize: none;
}

.container {
  display: flex;
}

.column {
  flex: 1;
}

#div1 {
  margin-right: -10px;
  padding-right: 5px;
}
#div2 {
  margin-left: -10px;
  padding-left: 5px;
}
  </style>
  