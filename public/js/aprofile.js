//client side geo location
$.get("https://ipinfo.io", function (response) {
   $("#details").html(JSON.stringify(response, null, 4));
}, "jsonp");

