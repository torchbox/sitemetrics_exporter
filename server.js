var	express = require("express"),
	snake = require('to-snake-case'),
	phantomas = require('phantomas');

var app = express();

app.get('/', (req, res) => {
	res.setHeader("Content-Type", "text/plain;charset=UTF-8");

	if (!('url' in req.query)) {
		res.statusCode = 400;
		res.end("Missing url parameter.\n");
		return;
	}
		
	var url = req.query['url'];
	res.statusCode = 200;

	phantomas(url, { 'timeout': 30 }, (err, data, pres) => {
		var output = "";
		var metrics = pres.getMetrics();

		for (metric in metrics) 
			output += ("metric_"+snake(metric) + " " + pres.getMetric(metric) + "\n");

		res.status(200).send(output);
	});
});

app.listen(9149, () => {
    console.log("Server started.");
});
