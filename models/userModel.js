let functions = require('../helpers/functions');
//config = require('.././server/config');

let userModel = {
	
	
	getUserByEmail:function(email){
		var sql = `SELECT A.*
		FROM user_master A 
		WHERE A.email = '`+email+`'`;
		return functions.selectQuery(sql);
	},
	getUserDetailsForLogin:function(email){
		var sql = `SELECT A.*
		FROM user_master A 
		WHERE  A.email = '`+email+`' AND A.deleted_at IS NULL`;
	
		return functions.selectQuery(sql);
	},
	
	getUserInfo:function(user_id){
		var sql = `SELECT A.*
		FROM user_master A 
		WHERE A.user_id = '`+user_id;
		return functions.selectQuery(sql);
	},
	



}

module.exports = userModel;

