let FCM = require('fcm-push');
let serverKey = 'AAAAcWhjbNc:APA91bGOWLGhLgM9h8zkSj54vBXWCv7berTf_ONJzGyhiqr9c76-VMy-p6Wy9K96QHwCwabVoe-q9KsqPQMnCCCJ-NzkcQEphR1CGCp8ZA882YFJMVz4Z45KIVVjFLCrkMHRXkzVcGcw';

let pushs = {

	
	sendPushMessage(arraydata,tokn,req) {
		//console.log(arraydata);
		let count = 0;
		if(arraydata.count != undefined && arraydata.count != ''){
			count = arraydata.count;
		}
		var fcm = new FCM(serverKey);
		var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
			to: tokn,
			notification: {
				title: 'Prospect+',
				body: arraydata.message,
				badge: count,
			},
			data: {  //you can send only notification or only data(or include both)
				type: arraydata.type,
				message: arraydata.message,
				content: arraydata.data,
			}
		};
		fcm.send(message, function (err, response) {
			if (err) {
				console.log("Something has gone wrong!", err);
			} else {
				console.log("Successfully sent with response: ", response);
			}
		});
		
	}

}

module.exports = pushs;
