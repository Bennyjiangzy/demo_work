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
        submitForm() {
        },
        handleOptionChange()
        {
            this.handleInput();
        },
        exchangeData()
        {
            if (this.selectedOptiontext != "auto"){
                var temp = this.selectedOptiontext;
                this.selectedOptiontext = this.selectedOptiontotranslate;
                this.selectedOptiontotranslate = temp;
                this.handleInput();
            }
         
        },

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
                              this.translatedtext = "Try again, sometimes the translate API server is slow";
                            } else {
                              console.log("An error occurred:", error);
                              this.translatedtext = "Try again, sometimes the translate API server is slow";
                            }
                          }
                    },2000);
                }
            } catch (error) {
                console.error(error);
            }
        
            
        },
        fetchData(formData) {
            return axios.post(settings.translateapiurl, formData,{headers:{'Content-Type': 'application/json'}});
        },
        computed: {
            debouncedInput() {
                return this.inputText.trim();
            }
        },
        watch: {
            debouncedInput(newValue) {
            if (newValue !== '') {
                this.fetchData();
            } else {
                this.searchResults = [];
            }
            }
        },
    },
    name: 'SimpleTranslate',
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
  