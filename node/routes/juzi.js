var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var conf = require('../conf');
var log4js = require('log4js');
log4js.configure(conf.logconf);
const logger = log4js.getLogger('managerJuzi');

var pool = mysql.createPool(conf.dbconfJuzi);

// 登录
router.post('/login', function(req, res) {
	var strSql = 'select * from tbl_users ';
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
							msg: '用户或密码错误！'
						})
					} else {
						res.send({
							code: 0,
							data: {
								id:rows[0].username,
								username: rows[0].mobile,
							},
							msg: '登陆成功'
						});
					}
				}
			})
			connection.release();
		}
	})
});

// 资讯列表
router.post('/newslist',function(req ,res){
	var strSql = 'select * from mgr_news where delflg=0  order by sort desc ';
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		}else{
			//查询
			connection.query(strSql, function(err, rows, fields){
				if (err){
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				}else{
					res.send({
						code: 0,
						data: rows,
						msg: '数据获取成功！'
					});
				}
			})
			connection.release();
		}
	})
})

// 资讯详情
router.post('/newsdetail',function(req ,res){
	var strSql = "SELECT * FROM mgr_news WHERE id="+req.body.id;
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		}else{
			//查询
			connection.query(strSql, function(err, rows, fields){
				if (err){
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				}else{
					res.send({
						code: 0,
						data: rows,
						msg: '数据获取成功！'
					});
				}
			})
			connection.release();
		}
	})
})

module.exports = router;