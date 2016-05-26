var express = require('express');
var app = express();
var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

app.get('*', function(req, res) {
	var date = req.url.substr(1);
	if(date == ""){
		res.end("<h1>Time microservice</h1><p>You can send a unix timestamp or a natural data. Example: </p><code>/1450137600<br>/December%2015,%202015</code><br><p>That will return: </p><code>{<br>\"unix\": 1450137600,<br>\"natural\": \"December 15, 2015\"<br>}</code>");
		return;
	}
	
	date = decodeURI(date).toString();
	if(!date.match("[a-zA-Z]+"))
		date = new Date(parseInt(date) * 1000);
	else
		date = new Date(date);
	
	var ret = {"unix" : null, "natural": null};
	if(!isNaN(date)){
		ret["unix"] = date.getTime() / 1000;
		ret["natural"] = months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
	}
	
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(ret));
});

app.listen(process.env.PORT, process.env.IP);