var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var conf = require('../conf');
var log4js = require('log4js');
log4js.configure(conf.logconf);
const logger = log4js.getLogger('managerJuzi');

var pool = mysql.createPool(conf.dbconfWcjs);

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
							msg: '用户名或密码不正确！'
						})
					} else {
						res.send({
							code: 0,
							data: {
								id:rows[0].ID,
								username: rows[0].username,
								balance: rows[0].balance,
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

// 列表数据
router.post('/ladies',function(req,res){
	var strSql = 'select ID,name,logo,type,area,createtime from tbl_ladies where 1=1 ';
	console.log(strSql,req.body.tab);
	if(req.body.tab == 'all'){}
	if(req.body.tab == 'good'){
		strSql += " and type = '1' ";
	}
	if(req.body.tab == 'share'){
		strSql += " and type = '2' ";
	}
	if(req.body.tab == 'bad'){
		strSql += " and type = '3' ";
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
})

// 详情数据
router.post('/detail',function(req,res){
	var strSql = `select a.ID,a.name,a.type,a.logo,a.area,
		(case when b.id is null then '***' else a.profile end)  profile,
		(case when b.id is null then '***' else a.photo end)  photo,
		(case when b.id is null then '***' else a.contact end)  contact,
		(case when b.id is null then '***' else a.description end)  description,
		a.createtime
		from tbl_ladies a 
		left join tbl_users b on  b.id =` + req.body.userid;
	strSql += ` and a.ID = ( select c.ladyID from tbl_orders c where c.userID = b.ID and c.ladyID = `+req.body.ladyid+`)
		where a.ID = ` + req.body.ladyid
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

// 购买
router.post('/buy',function(req,res){
	if(!req.body.userid){
		res.send({
			code:-2,
			data:'',
			msg:'无效用户，请重新登录！'
		})
		return false;
	}
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log('err[wcjs/buy] - getConnection');
			return false;
		}
		connection.beginTransaction(function(err) {
			if(err){
				console.log('err[wcjs/buy] - beginTransaction');
				return false;
			}
			var selSql = ' select id,balance from tbl_users where id='+req.body.userid;
			connection.query(selSql, function(err, rows) {
				if(err){
					console.log('err[wcjs/buy] - sel tbl_users');
					return false;
				}
				if(rows.length ==0){
					res.send({
						code:-2,
						data:'',
						msg:'无效用户，请重新登录！'
					})
					return false;
				}
				var user = rows[0];
				if(user.balance ==0){
					res.send({
						code:-1,
						data:'',
						msg:'余额不足，请充值！'
					})
					return false;
				}
				var updSql = ' update tbl_users set balance = balance - 1 where id='+user.id;
				connection.query(updSql, function(err, rows) {
					if(err){
						connection.rollback(function() {
							console.log('err[wcjs/buy] - update tbl_users');
						})
						return false;
					}
					var insSql = ' insert into tbl_orders (userID,ladyID) values ( '+user.id+','+req.body.ladyid+') ;' ;
					connection.query(insSql, function(err, rows) {
						if(err){
							connection.rollback(function() {
								console.log('err[wcjs/buy] - insert tbl_orders');
							})
							return false;
						}
						connection.commit(function(err) {
							if (err) {
								connection.rollback(function() {
									console.log('err[wcjs/buy] - commit');
								})
								return false;
							}
							res.send({
								code: 0,
								data: '',
								msg: '购买成功！'
							})
						})
					})
				})
			})
		})
		connection.release();
	})
})

// 获取余额信息
router.post('/balance',function(req,res){
	var strSql = 'select balance from tbl_users where id = '+ req.body.userid;
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
						msg: ''
					});
				}
			})
			connection.release();
		}
	})
})

// 已购信息
router.post('/orders',function(req,res){
	var strSql = 'select a.id,a.name,a.area,a.createtime from tbl_ladies a'
		strSql += ' left join tbl_users b on b.id = '+req.body.userid+' where a.id in ( select ladyID from tbl_orders where userid = '+req.body.userid+')'
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
						});
					return false;
				}else{
					res.send({
						code: 0,
						data: rows,
						msg: ''
					});
				}
			})
			connection.release();
		}
	})
})

module.exports = router;