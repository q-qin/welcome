var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var conf = require('../conf');
var log4js = require('log4js');
log4js.configure(conf.logconf);
const logger = log4js.getLogger('managerJuzi');

var pool = mysql.createPool(conf.dbconfWcjs);

// 小姐列表
router.post('/ladieslist',function(req,res){
	var strSql = 'select * from tbl_ladies where 1=1 ';
	if(!!req.body.search){
		strSql += " and name like '%"+req.body.search+"%' ";
	}
	strSql += ' order by createtime desc ';
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
});

// 小姐详情
router.post('/ladiesdetail',function(req,res){
	var strSql = "SELECT * FROM tbl_ladies WHERE id="+req.body.id;
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

// 小姐新增
router.post('/ladiesadd',function(req,res){
	var strSql = ' INSERT INTO tbl_ladies (name,type,logo,area,profile,photo,contact,description,createtime) VALUES(';
	strSql += "'"+ req.body.name +"',";
	strSql += "'"+ req.body.type +"',";
	strSql += "'"+ req.body.logo +"',";
	strSql += "'"+ req.body.area +"',";
	strSql += "'"+ req.body.profile +"',";
	strSql += "'"+ req.body.photo +"',";
	strSql += "'"+ req.body.contact +"',";
	strSql += "'"+ req.body.description +"',";
	strSql += "'"+ req.body.createtime +"' )";
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
					console.log(err.message);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				}else{
					res.send({
						code: 0,
						data: '',
						msg: '操作成功'
					});
				}
			})
			connection.release();
		}
	})
})

// 小姐修改
router.post('/ladiesedit',function(req,res){
	var strSql = " UPDATE tbl_ladies SET ";
	strSql += "name='"+req.body.name+"', ";
	strSql += "logo='"+req.body.logo+"',";
	strSql += "type='"+req.body.type+"',";
	strSql += "area='"+req.body.area+"',";
	strSql += "profile='"+req.body.profile+"',";
	strSql += "photo='"+req.body.photo+"',";
	strSql += "contact='"+req.body.contact+"',";
	strSql += "description='"+req.body.description+"',";
	strSql += "createtime='"+req.body.createtime+"' ";
	strSql += "WHERE id="+req.body.id;
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
					console.log(err.message);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				}else{
					res.send({
						code: 0,
						data: '',
						msg: '操作成功'
					});
				}
			})
			connection.release();
		}
	})
})


// 小姐删除
router.post('/ladiesdel',function(req,res){
	var strSql = " DELETE FROM tbl_ladies WHERE id ="+req.body.id;
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
					console.log(err.message);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				}else{
					res.send({
						code: 0,
						data: '',
						msg: '操作成功'
					});
				}
			})
			connection.release();
		}
	})
})


module.exports = router;