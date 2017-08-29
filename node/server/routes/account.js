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

// 登录
router.post('/login', function(req, res, next) {
	var strSql = 'select * from tbl_user ';
	var strWhere = "where username='" + req.body.username + "' and password='" + req.body.password + "'";
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		}else{
			//查询
			connection.query(strSql + strWhere, function(err, rows, fields){
				if (err){
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				}else{
					if (rows.length == 0) {
						res.send({
							code: -1,
							data: '',
							msg: '用户名密码错误！'
						})
					} else {
						res.send({
							code: 0,
							data: {
								id:rows[0].id,
								username: rows[0].username,
								role: rows[0].role,
								job: rows[0].job,
							},
							msg: '登陆成功'
						});
					}
				}
			})
			connection.release();
		}
	})
})


module.exports = router;