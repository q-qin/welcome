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
	var strSql = 'select * from mgr_users ';
	var strWhere = "where username='" + req.body.username + "' and password='" + req.body.password + "'";
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		} else {
			//查询
			connection.query(strSql + strWhere, function(err, rows, fields) {
				if (err) {
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				} else {
					if (rows.length == 0) {
						res.send({
							code: -1,
							data: '',
							msg: '用户名或密码错误！'
						})
					} else {
						res.send({
							code: 0,
							data: {
								id: rows[0].id,
								username: rows[0].username,
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
router.post('/newslist', function(req, res) {
	var strSql = 'select * from mgr_news where 1=1 ';
	if (req.body.type != 0) {
		strSql += " and type='" + req.body.type + "' ";
	}
	if (!!req.body.starttime && !!req.body.endtime) {
		strSql += " and updatetime between '" + req.body.starttime + "' and '" + req.body.endtime + "' ";
	}
	if (!!req.body.search) {
		strSql += " and content like '%" + req.body.search + "%' ";
	}
	strSql += ' order by sort desc ';
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		} else {
			//查询
			connection.query(strSql, function(err, rows, fields) {
				if (err) {
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				} else {
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

// 资讯详情
router.post('/newsdetail', function(req, res) {
	var strSql = "SELECT * FROM mgr_news WHERE id=" + req.body.id;
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		} else {
			//查询
			connection.query(strSql, function(err, rows, fields) {
				if (err) {
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				} else {
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

// 资讯新增
router.post('/newsadd', function(req, res) {
	var strSql = ' INSERT INTO mgr_news (title,subtitle,type,sort,content,createuser,createtime,updateuser,updatetime,delflg) VALUES(';
	strSql += "'" + req.body.title + "',";
	strSql += "'" + req.body.subtitle + "',";
	strSql += "'" + req.body.type + "',";
	strSql += "'" + req.body.sort + "',";
	strSql += "'" + req.body.content + "',";
	strSql += "'" + req.body.createuser + "',";
	strSql += "'" + req.body.createtime + "',";
	strSql += "'" + req.body.updateuser + "',";
	strSql += "'" + req.body.updatetime + "',";
	strSql += "'1')";
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		} else {
			//查询
			connection.query(strSql, function(err, rows, fields) {
				if (err) {
					console.log(err.message);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				} else {
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

// 资讯修改
router.post('/newsedit', function(req, res) {
	var strSql = " UPDATE mgr_news SET ";
	strSql += "title='" + req.body.title + "', ";
	strSql += "subtitle='" + req.body.subtitle + "',";
	strSql += "type='" + req.body.type + "',";
	strSql += "sort='" + req.body.sort + "',";
	strSql += "content='" + req.body.content + "',";
	strSql += "updateuser='" + req.body.updateuser + "',";
	strSql += "updatetime='" + req.body.updatetime + "' ";
	strSql += "WHERE id=" + req.body.id;
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		} else {
			//查询
			connection.query(strSql, function(err, rows, fields) {
				if (err) {
					console.log(err.message);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				} else {
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

// 资讯下线
router.post('/newsoff', function(req, res) {
	var strSql = " UPDATE mgr_news SET delflg = '1' WHERE id =" + req.body.id;
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		} else {
			//查询
			connection.query(strSql, function(err, rows, fields) {
				if (err) {
					console.log(err.message);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				} else {
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

// 资讯上线
router.post('/newson', function(req, res) {
	var strSql = " UPDATE mgr_news SET delflg = '0' WHERE id =" + req.body.id;
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		} else {
			//查询
			connection.query(strSql, function(err, rows, fields) {
				if (err) {
					console.log(err.message);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				} else {
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

// 资讯删除
router.post('/newsdel', function(req, res) {
	var strSql = " DELETE FROM mgr_news WHERE id =" + req.body.id;
	console.log(strSql);
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		} else {
			//查询
			connection.query(strSql, function(err, rows, fields) {
				if (err) {
					console.log(err.message);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				} else {
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