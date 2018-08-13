        addrs = localStorage.etherAddrs ? localStorage.etherAddrs : "0x8d12a197cb00d4747a1fe03395095ce2a5cc6819";

baseUrl = "https://widgets.cryptocompare.com/";
var scripts = document.getElementsByTagName("script");
var embedder = scripts[ scripts.length - 1 ];
(function (){
var appName = encodeURIComponent(window.location.hostname);
if(appName==""){appName="local";}
var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
var theUrl = baseUrl+'serve/v1/coin/chart?fsym=ETH&tsym=USD';
s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
})();


var refreshAdd = function(addr, wallet){
  axios.get('https://api.ethplorer.io/getAddressInfo/' + addr + '?apiKey=freekey')
  .then(function (response) {
    console.log(response);
    wallet.info = response.data;
    response.data.tokens.forEach((t)=>{
      wallet.$set(wallet.price, t.tokenInfo.symbol, t.tokenInfo.price.rate);
    });
    getAddrHist(addr, wallet);
    getAddrTrans(addr, wallet);
    wallet.fetchAll++;
  })
  .catch(function (error) {
    console.log(error);
  });
}
// getTokenPriceHistoryGrouped price history
// https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=BTC,USD,EUR&ts=1452680400 get price at specific time
var getAddrHist = function(addr, wallet){
  axios.get('https://api.ethplorer.io/getAddressHistory/' + addr + '?apiKey=freekey')
  .then(function (response) {
    //console.log(response);
    response.data.operations.forEach((h)=>{
      wallet.history.push([
        h.timestamp,
        h.tokenInfo.name,
        h.value / Math.pow(10, h.tokenInfo.decimals),
        h.from.toLocaleLowerCase() != addr.toLocaleLowerCase() ? "from: " + h.from : "to: " + h.to
      ]);
    });
    wallet.fetchAll++;
  })
  .catch(function (error) {
    console.log(error);
  });
}

var getAddrTrans = function(addr, wallet){
  axios.get('https://api.ethplorer.io/getAddressTransactions/' + addr + '?apiKey=freekey')
  .then(function (response) {
    //console.log(response);
    response.data.forEach((h)=>{
      if(h.success){
        wallet.history.push([
          h.timestamp,
          "Ethereum",
          h.value,
          h.from.toLocaleLowerCase() != addr.toLocaleLowerCase() ? "from: " + h.from : "to: " + h.to
        ]);
      }
    });
    wallet.fetchAll++;
  })
  .catch(function (error) {
    console.log(error);
  });
}

var ethData = function(objData){
  axios.get('https://www.coincap.io/page/ETH')
  .then(function (response) {
    //console.log(response);
    objData.ETH = response.data;
    objData.$set(objData.price, "ETH", response.data.price_usd);
  })
  .catch(function (error) {
    console.log(error);
  });
}

var app = new Vue({
  el:"#app",
  data:{
    text: "hello world",
    address: addrs,
    info: {},
    history: [],
    ETH: {},
    fetchAll: 0,
    price: {}
  },
  watch:{
    fetchAll(){
      if(this.fetchAll==3){
        this.history.sort(function(a, b){return b[0]-a[0]});
        //console.log("sorted");
      }
    }
  },
  computed:{
    usmoney(){
      var count = 0;
      count += this.price["ETH"] * this.info.ETH.balance
      this.info.tokens.forEach((t)=>{
        if(this.price[t.tokenInfo.symbol]){
          count += t.balance/Math.pow(10,t.tokenInfo.decimals) * this.price[t.tokenInfo.symbol];
        }
      });
      return count;
    }
  },
  mounted(){
    ethData(this);
    var socket = io.connect('https://coincap.io');

    socket.on('trades', (tradeMsg)=> {
      if(!this.price[tradeMsg.message.coin]){
        this.$set(this.price, tradeMsg.message.coin, 0);
      }
      this.price[tradeMsg.message.coin] = tradeMsg.message.msg.price;
      //console.log(tradeMsg.message.coin, this.price[tradeMsg.message.coin]);
    });
  },
  methods:{
    getAddressInfo(){
      localStorage.etherAddrs = this.address;
      this.info={};
      this.history=[];
      refreshAdd(this.address, this);
    },
    getDate(seconds){
      var d = new Date(seconds*1000);
      //d.setSeconds(seconds);
      return d.toISOString().substring(0,19);
    }
  }
})