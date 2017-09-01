var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//设置跨域访问
app.all('*', function(req, res, next) {
	var host = req.header('host');
	console.log(host);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	if (req.method == 'OPTIONS') {
		// 让options请求快速返回
		res.send(200);
	} else {
		next();
	}
});

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'juzidb',
	connectionLimit: 400
});

app.post('/login', function(req, res) {
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
							msg: '暂无用户'
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

app.post('/newslist',function(req ,res){
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

app.post('/newsdetail',function(req ,res){
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

app.listen(3000);
console.log('Listening on Api:3000...');