<template>
  <div>
    <div class = "historicalRates">
      <h3>Historical Rates page</h3>
      <p> <span style="font-weight: bold"> Enter the base currency : </span>
        <input style = "width: 300px" type = "text" v-model = "baseCurrency"
               placeholder="Required Currency Abbreviation (ex : usd)"/>
      </p>
      <span></span>
      <p> <span style="font-weight: bold"> Enter a full date between (1999/01/01) and ({{today}})  : </span>
        <input  type = "text" v-model = "date" placeholder="yy/mm/dd (ex : 2002/05/09)"/>
      </p>

      <button @click = "checkData"> Submit </button>
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
        baseCurrency : '',
        today : '',
        date : ''
      }
    },

    created: function(){
      const today = new Date();
      var dd = today.getDate() ;
      var mm = today.getMonth()+1; //January is 0!
      var yy = today.getFullYear();

      if(dd<10) {
        dd = '0'+dd
      }

      if(mm<10) {
        mm = '0'+mm
      }
      this.today = yy + '/' + mm + '/' + dd;
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

      checkData(){
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
         // check the date
        //  console.log("date : " + this.date);
          var obj = {base : this.baseCurrency , date : this.date};
          this.$store.dispatch("historicalRates" , obj);
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
