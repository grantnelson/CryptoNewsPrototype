$.get("https://api.coinmarketcap.com/v1/ticker/", function(data, status) {
  for (var i = 0; i < data.length - 1; i++) {
    if (data[i].id == "litecoin") {
      $("#price").html(data[i].price_usd);
      $("#change").html(data[i]. percent_change_24h);
    }
     if (data[i].id == "bitcoin") {
      $("#bprice").html(data[i].price_usd);
      $("#bchange").html(data[i]. percent_change_24h);
    }
     if (data[i].id == "ethereum") {
      $("#eprice").html(data[i].price_usd);
      $("#echange").html(data[i]. percent_change_24h);
    } 
      if (data[i].id == "eos") {
      $("#eosprice").html(data[i].price_usd);
      $("#eoschange").html(data[i]. percent_change_24h);
    }  
    
    
  }
});


$(function(){
	$('#address').val(getQueryStringParam('wallet'));
	$('button').click(function(){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=balance&tag=latest&address="+$('#address').val(),
			dataType: "json",
			success: function(res1) {
				var eth = res1.result/1000000000000000000;
				$('#eth').text(eth+' ETH');
				$.ajax({
					url:"https://coinmarketcap-nexuist.rhcloud.com/api/eth/price",
					dataType: "json",
					success: function(res2) {
						setCurrency(eth,res2);
						$('select').change(function(){ setCurrency(eth,res2); });
					}
				});
			}
		});
	});
});
function setCurrency(eth,res){
	var sel = $('select option:selected').val();
	$('#out').text((eth*res[sel]).toFixed(2)+' '+sel.toUpperCase());
}

function getQueryStringParam(param) {
	// from codepen.io/adrianparr/pen/XJEbQW
	var url = window.location.toString();
	url.match(/\?(.+)$/);
	var params = RegExp.$1;
	params = params.split("&");
	var queryStringList = {};
	for(var i = 0; i < params.length; i++) {
		var tmp = params[i].split("=");
		queryStringList[tmp[0]] = unescape(tmp[1]);
	}
	return queryStringList[param];
}

