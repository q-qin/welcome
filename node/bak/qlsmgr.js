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
	database: 'qlsdb',
	connectionLimit: 400
});


// 小姐列表
app.post('/ladieslist',function(req,res){
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
app.post('/ladiesdetail',function(req,res){
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
app.post('/ladiesadd',function(req,res){
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
app.post('/ladiesedit',function(req,res){
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
app.post('/ladiesdel',function(req,res){
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

// 登录
app.post('/applogin', function(req, res) {
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
							msg: '用户名密码不匹配'
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

// app列表数据
app.post('/appladies',function(req,res){
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

// app详情数据
app.post('/appdetail',function(req,res){
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
app.post('/appbuy',function(req,res){
	var strSql = 'CALL p_buy( '+req.body.userid+','+req.body.ladyid+',@res)';
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
					var results = rows[0];
					res.send({
						code: results[0].returnCode,
						data: '',
						msg: ''
					});
				}
			})
			connection.release();
		}
	})
})

// 获取余额信息
app.post('/appbalance',function(req,res){
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
					console.log(err.message);
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
app.post('/apporder',function(req,res){
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

app.listen(4001);
console.log('Listening on mgrAPI :4001...');