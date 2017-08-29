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

// 分类列表
router.post('/list',function(req,res){
	var strSql = 'select a.id,a.typename,a.chanel,a.updateuser, a.updatetime,a.memo,group_concat(b.tagname) tags from tbl_type a LEFT JOIN tbl_tag b on b.typeid = a.id where 1=1 ';
	if(req.body.typename !=''){
		strSql += " and a.typename like '%"+req.body.typename+"%' ";
	}
	strSql += ' group by a.id';
	strSql += ' order by a.updatetime desc ';
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

// 全部分类
router.post('/all',function(req,res){
	var strSql = 'select a.id,a.typename from tbl_type a ;';
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

// 分类获取标签
router.post('/type2tags',function(req,res){
	var strSql = 'select distinct tagname from tbl_tag where 1=1 ';
	if(!!req.body.typeid){
		strSql += ' AND typeid='+req.body.typeid;
	}
	if(!!req.body.topicname){
		var kwArr = req.body.topicname.split('');
		strSql += ' AND (';
		kwArr.forEach(function(n,i){
			if(i==0){
				strSql += ' tagname like "%'+n + '%" ';
			}else{
				strSql += ' OR tagname like "%'+n + '%" ';
			}
		})
		strSql += ' )';
	}
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

// 分类新增
router.post('/add',function(req,res){
	var typename = req.body.typename,
		updateuser = req.body.updateuser,
		chanel = '0',
		memo='',
		tag = req.body.tag;
	var tags = tag.split('|');

	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		}
		//开始事务
		connection.beginTransaction(function(err) {
			if (err){
				console.log(err);
				res.send({
					code: -1,
					data: '',
					msg: '请求异常，请稍后重试！'
				})
			}
			var instype = "INSERT INTO tbl_type (typename,chanel,updateuser,updatetime,memo)VALUES('"+typename+"','"+chanel+"','"+updateuser+"',now(),'"+memo+"');"
	    	connection.query(instype, function(err,rows){
	    		if(err){
	    			console.log(err);
	    			connection.rollback(function() {
						res.send({
							code: -1,
							data: '',
							msg: '请求异常，请稍后重试！'
						})
	    			})
	    		}
	    		var insertId = rows.insertId;	//获取自动生成的id
	    		console.log(insertId);
	    		for(var i=0; i<tags.length;i++){
	    			var instag = "INSERT INTO tbl_tag (tagname,typeid)VALUES ('"+tags[i]+"','"+insertId+"');";
	    			connection.query(instag,function(err,rows){
	    				if(err){
	    					connection.rollback(function() {
	    						res.send({
									code: -1,
									data: '',
									msg: '请求异常，请稍后重试！'
								})
	    					})
	    				}
	    			})
	    		}
	    		connection.commit(function(err){
	    			if (err) {
	    				connection.rollback(function() {
    						res.send({
								code: -1,
								data: '',
								msg: '请求异常，请稍后重试！'
							})
    					})
	    			}
	    			connection.rollback(function() {
						res.send({
							code: 0,
							data: '',
							msg: '添加成功！'
						})
					})
	    		})
	    	})
		})
		connection.release();
	})
})

// 频道栏上下线
router.post('/chanelset',function(req,res){
	var strSql = " UPDATE tbl_type SET chanel ="+req.body.status +' WHERE id = ' + req.body.id;
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

// 分类删除
router.post('/del',function(req,res){
	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		}else{
			//开始事务
			connection.beginTransaction(function(err) {
				if (err){
					console.log(err);
					res.send({
						code: -1,
						data: '',
						msg: '请求异常，请稍后重试！'
					})
				}
				var delType = " DELETE FROM tbl_type WHERE id in (" + req.body.ids+")";
		    	connection.query(delType, function(err,rows){
		    		if(err){
		    			console.log(err);
		    			connection.rollback(function() {
							res.send({
								code: -1,
								data: '',
								msg: '请求异常，请稍后重试！'
							})
		    			})
		    		}
		    		var delTag = " DELETE FROM tbl_tag WHERE typeid in("+req.body.ids +")";
					//查询
					connection.query(delTag, function(err, rows, fields){
						if (err){
							console.log(err.message);
							res.send({
								code: -1,
								data: '',
								msg: '请求异常，请稍后重试！'
							})
						}
					})
					connection.commit(function(err){
		    			if (err) {
		    				connection.rollback(function() {
	    						res.send({
									code: -1,
									data: '',
									msg: '请求异常，请稍后重试！'
								})
	    					})
		    			}
		    			connection.rollback(function() {
							res.send({
								code: 0,
								data: '',
								msg: '添加成功！'
							})
						})
		    		})
		    	})
		    })
			connection.release();
		}
	})
})

// 分类修改
router.post('/edit',function(req,res){
	var id=req.body.id,
		typename = req.body.typename,
		tag = req.body.tag;
	var tags = tag.split('|');

	pool.getConnection(function(err, connection) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
		}
		//开始事务
		connection.beginTransaction(function(err) {
			if (err){
				console.log(err);
				res.send({
					code: -1,
					data: '',
					msg: '请求异常，请稍后重试！'
				})
			}
			var updtype = "UPDATE tbl_type SET typename='"+typename+"',updatetime=now() WHERE id="+id;
	    	connection.query(updtype, function(err,rows){
	    		if(err){
	    			console.log(err);
	    			connection.rollback(function() {
						res.send({
							code: -1,
							data: '',
							msg: '请求异常，请稍后重试！'
						})
	    			})
	    		}
	    		var clntag = ' DELETE FROM tbl_tag WHERE typeid ='+id;
	    		connection.query(clntag,function(err,rows){
    				if(err){
    					connection.rollback(function() {
    						res.send({
								code: -1,
								data: '',
								msg: '请求异常，请稍后重试！'
							})
    					})
    				}
    				for(var i=0; i<tags.length;i++){
	    				var instag = "INSERT INTO tbl_tag (tagname,typeid)VALUES ('"+tags[i]+"','"+id+"');";
		    			connection.query(instag,function(err,rows){
		    				if(err){
		    					connection.rollback(function() {
		    						res.send({
										code: -1,
										data: '',
										msg: '请求异常，请稍后重试！'
									})
		    					})
		    				}
		    			})
		    		}
		    		connection.commit(function(err){
		    			if (err) {
		    				connection.rollback(function() {
	    						res.send({
									code: -1,
									data: '',
									msg: '请求异常，请稍后重试！'
								})
	    					})
		    			}
		    			connection.rollback(function() {
							res.send({
								code: 0,
								data: '',
								msg: '编辑成功！'
							})
						})
		    		})
    			})
	    	})
		})
		connection.release();
	})
})

module.exports = router;