var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'db_photo',
	connectionLimit: 400
});

router.post('/update',function(){
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		}
		// 获取最新一期统计时间
		var lasttimeSql = ' select sttime from tbl_statistics order by id desc limit 1 ;'

	})
});

module.exports = router;