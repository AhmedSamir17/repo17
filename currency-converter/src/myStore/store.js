import Vuex from 'vuex'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(VueResource);


export const store = new Vuex.Store({
  state : {
    currenciesAbbreviations : ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF",
      "IDR", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD",
      "THB", "TRY", "ZAR", "EUR", "USD" ],

    currencies : ["Australian dollar" , "Bulgarian lev" , "Brazilian real" , 	"Canadian dollar" , "Swiss franc",
    "Chinese yuan renminbi" , "Czech koruna" , "Danish krone" , "Pound sterling" , "Hong Kong dollar",
      "Croatian kuna", "Hungarian forint" , "Indonesian rupiah" , "Indian rupee" , "Japanese yen" , "South Korean won",
      "Mexican peso" , "Malaysian ringgit" , "Norwegian krone" , "New Zealand dollar" , "Philippine peso" ,
      "Polish zloty" , "Romanian leu" , "Russian rouble" , "Swedish krona" , "Singapore dollar" , "Thai baht" ,
      "Turkish lira" , "South African rand" , "European union currency" , "US dollar"],
    dataRates : [],
    headerData : [],
    conversionResponse : {}
  },

  getters : {
    getCurrencyAbbreviations(state){
      return state.currenciesAbbreviations;
    },
    getCurrencies(state){
      return state.currencies;
    },
    getDataRates(state){
      return state.dataRates;
    },
    getHeaderData(state){
      return state.headerData;
    },
    getLatestDate(state){
      return state.headerData[0];
    },
    getConversionResponse(state){
      return state.conversionResponse;
    }

  },

  mutations:{
    makeConversion(state , obj){
      Vue.http.get('latest' , {params : obj }).then(response => {

 //       alert("Rates are got successfully !");
        console.log(response.body);
        state.conversionResponse = response.body;

      }, error => {
        alert("Failed !");
      });
    },

    getHistoricalRates(state , obj){

//      console.log("required date : " + obj.date);
      Vue.http.get('latest' , {params : obj }).then(response => {

//        alert("Rates are got successfully !");
        console.log(response.body);

        state.headerData.push("latest date : " + response.body.date);
        state.headerData.push("Base currency : " + response.body.base);

        var rates=response.body.rates;
        var values = [] , abbreviations = [];
        for (var rate in rates){
          abbreviations.push(rate);
          values.push(rates[rate]);
        }


        for (let key in abbreviations){
          var index = state.currenciesAbbreviations.indexOf(abbreviations[key]);
          if (index != -1)
            state.dataRates.push(state.currencies[index] + " : " + values[key]);
        }

      }, error => {
        alert("Failed !");
      });
    },
    getLatestRates(state , baseCurrency){
      state.headerData = []; state.dataRates = [];
      Vue.http.get('latest' , {params : {base: baseCurrency} }).then(response => {

      //  alert("Rates are got successfully !");
           console.log(response.body);
        state.headerData.push("Latest update : " + response.body.date);
        state.headerData.push("Base currency : " + response.body.base);

        var rates=response.body.rates;
        var values = [] , abbreviations = [];
        for (var rate in rates){
            abbreviations.push(rate);
            values.push(rates[rate]);
        }


        for (let key in abbreviations){
          var index = state.currenciesAbbreviations.indexOf(abbreviations[key]);
          if (index > -1)
            state.dataRates.push(state.currencies[index] + " : " + values[key]);
        }

      }, error => {
          alert("Failed !");
      });
    }
  },

  actions: {
    latestRates(context , baseCurrency){
      context.commit('getLatestRates' , baseCurrency);
    },
    historicalRates(context , obj){
      context.commit('getHistoricalRates' , obj);
    },
    conversion(context , obj){
      context.commit('makeConversion' , obj);
    }
  }
});
