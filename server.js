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
	console.log("URL: ["+url+"]");
	res.statusCode = 200;

	try {
		phantomas(url, { 'timeout': 30 }, (err, data, pres) => {
			if (err) {
				console.log(err);
				res.status(500).end("Error: " + err.message + "\n");
				return;
			}

			var output = "";
			var metrics = pres.getMetrics();

			for (metric in metrics) 
				if (pres.getMetric(metric))
					output += ("probe_"+snake(metric)+"_metric" + " " + pres.getMetric(metric) + "\n");
			output += "probe_success 1\n";

			res.status(200).send(output);
		});
	} catch (e) {
		res.status(500).end("Error: " + err);
	}
});

app.listen(9149, () => {
    console.log("Server started.");
});
