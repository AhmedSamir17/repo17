<template>
 <div>
  <div class = "historicalRates">
    <h3>Latest Rates page</h3>
    <p> <span style="font-weight: bold"> Enter the base currency : </span>
      <input style = "width: 300px" type = "text" v-model = "baseCurrency"
             placeholder="Required Currency Abbreviation (ex : USD)"/>
    </p>
    <button @click = "verify"> Submit </button>
  </div>
  <hr>
  <div class = "historicalRates">
    <h3> Rates </h3>
    <p v-for = "header in headerData"> {{header}} </p>
    <hr>
    <p v-for = "rate in rates"> {{rate}} </p>
  </div>
 </div>

</template>


<script>
  export default {
    data(){
      return {
        baseCurrency : ''
      }
    },
    computed : {
      rates(){
        return this.$store.getters.getDataRates;
      },
      headerData(){
        return this.$store.getters.getHeaderData;
      }
    },
    methods : {
      verify(){
        this.baseCurrency = this.baseCurrency.toUpperCase();
        var found = false;
        var abbreviations = this.$store.getters.getCurrencyAbbreviations;
        for (let key in abbreviations){
          if (this.baseCurrency == abbreviations[key]){
            found = true;
            break;
          }
        }
        if (found){
          this.$store.dispatch("latestRates" , this.baseCurrency)
        }
        else {
          alert("No such currency abbreviation found !");
        }
      }
    }
  }
</script>


<style scoped>
  .historicalRates {
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
