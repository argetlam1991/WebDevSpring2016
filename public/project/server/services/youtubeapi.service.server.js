/**
 * Created by guhan on 4/26/16.
 */
var https = require("https");

module.exports = function(app, key) {

    app.post('/api/project/youtubeapi/search', search);

    function search(req, res) {
        console.log(req.body);
        var query = "";
        for(var i = 0; i < req.body.length; i++) {
            if (query != "") {
                query += "+";
            }
            query += req.body[i];
        }
        var options = {
            host: 'www.googleapis.com',
            port: 443,
            path: '/youtube/v3/search?part=snippet&q=' + query + '&type=video&key=' + key,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        }

        var prot = https;

        var request = prot.request(options, function(result) {
            var output = '';
            console.log(options.host + ':' + result.statusCode);
            result.setEncoding('utf8');

            result.on('data', function (chunk) {
                output += chunk;
            });

            result.on('end', function() {
                var obj = JSON.parse(output);
                res.json(obj.items);
            });
        })

        request.on('error', function(err) {
            //res.send('error: ' + err.message);
        });

        request.end();
    }

}