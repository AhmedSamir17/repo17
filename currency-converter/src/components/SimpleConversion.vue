<template>
  <div>
    <div class = "conversion">
      <h3>Latest Rates page</h3>
      <p> <span style="font-weight: bold"> Enter the base currency : </span>
        <input style = "width: 300px" type = "text" v-model = "baseCurrency"
               placeholder="Required Currency Abbreviation (ex : USD)"/>
      </p>

      <p> <span style="font-weight: bold"> Enter the other currency : </span>
       <input style = "width: 300px" type = "text" v-model = "otherCurrency"
              placeholder="Required Currency Abbreviation (ex : EUR)"/>
      </p>
      <button @click = "verify"> Submit </button>
    </div>
     <hr>

    <div class = "conversion">
      <h3> Response </h3>
      <p> {{conversionResponse}} </p>
    </div>


  </div>


</template>

<script>
  export default {
    data(){
      return {
        baseCurrency : '' ,
        otherCurrency : ''
      }
    },
    computed : {
      conversionResponse(){
        return this.$store.getters.getConversionResponse;
      }
    },
    methods:{
      verify(){
        this.baseCurrency = this.baseCurrency.toUpperCase();
        this.otherCurrency = this.otherCurrency.toUpperCase();
        var found1 = false , found2 = false;
        var abbreviations = this.$store.getters.getCurrencyAbbreviations;
        for (let key in abbreviations){
          if (this.baseCurrency == abbreviations[key]){
            found1 = true;
            break;
          }
        }
        for (let key in abbreviations){
          if (this.otherCurrency == abbreviations[key]){
            found2 = true;
            break;
          }
        }
        if (found1&& found2){
          var obj = {base : this.baseCurrency , symbols : this.otherCurrency};
          this.$store.dispatch("conversion" , obj);
        }
        else {
          alert("No such currency abbreviation found !");
        }
      }
    }
  }
</script>

<style scoped>
  .conversion {
    box-shadow: 1px 1px 2px 1px #ccc;
    margin: 20px;
    padding: 20px;
    display: inline-block;
    width: 650px;
    vertical-align: top;
  }

  button {
    background-color: lightgreen;
    border: none;
    box-shadow: 1px 1px 1px black;
    font-size: inherit;
    text-align: center;
    cursor: pointer;
    margin : 3px;

  }
  button:hover {
    background-color: green;
  }
  span {
    padding:5px;
  }
</style>
