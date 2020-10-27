var fs = require('fs');
var parseString = require('xml2js').parseString;

var config = {
	
	jwt_secret : 'nodeapi',

	base_url   : 'http://10.10.10.39:4545/',

	//base_url   : 'http://newagesme.com:4020/',

	encrypt_algorithm: 'aes-256-cbc',

	encrypt_pass: 'nodeapi',


	getConfig: function(callback){
		fs.readFile('config.xml', function(err, data) {			
			parseString(data, function (err, result) {
				callback(result.preferences);
			});
		});
	},

	email_header: `<!DOCTYPE html>
					<html>
					<head>
					<meta http-equiv="content-type" content="text/html; charset=UTF-8">
					</head>
					<body>`,

	email_footer: `</body>
				   </html>`
	
}

module.exports = config;