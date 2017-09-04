<template>
  <div class = "home">
    <h3> Welcome In Currency Converter App</h3>
    <hr><br>
    <p><span style="font-weight: bold"> Important Note #1 : </span> The rates are updated daily around 4PM CET</p>
    <p><span style="font-weight: bold"> Important Note #2 :
    </span> The default currency against which rates are displayed , is Euro </p>
    <br>
    <router-link to="/latestRates"> Get the latest foreign exchange rates</router-link><br><br>
    <router-link to="/historicalRates"> Get historical rates</router-link><br><br>
    <router-link to="/conversion"> Two currencies conversion</router-link>

  </div>
</template>



<style scoped>
  .home {
    box-shadow: 1px 1px 2px 1px #ccc;
    margin: 20px;
    padding: 20px;
    display: inline-block;
    width: 650px;
    vertical-align: top;
  }
</style>
