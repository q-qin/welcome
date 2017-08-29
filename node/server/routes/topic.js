var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var formidable = require('formidable'),
	fs = require('fs'),
	gm = require('gm'),
	domain = 'http://192.168.1.169:3000',
	AVATAR_UPLOAD_FOLDER = '/images/topic/';


var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'db_photo',
	connectionLimit: 400
});

// 专题列表
router.post('/list', function(req, res) {
	var strSql = 'select * from tbl_topic ;';
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

// 封面上传
router.post('/uploader', function(req, res) {
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8'; //设置编辑
	form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER; //设置上传目录
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

	form.parse(req, function(err, fields, files) {
		if (err) {
			res.send({
				code: -1,
				data: '',
				msg: '请求异常，请稍后重试！'
			});
			return;
		}
		console.log(files);
		var extName = ''; //后缀名
		switch (files.fulAvatar.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
		}

		if (extName.length == 0) {
			res.send({
				code: -1,
				data: '',
				msg: '只支持png和jpg格式图片！'
			});
			return;
		}
		var rd = Math.random();
		var avatarName = rd + '.' + extName;
		var tnbavatarName = rd + '_tnb.' + extName;
		//图片写入地址；
		var newPath = form.uploadDir + avatarName;
		var ysPath = form.uploadDir + avatarName;
		var thbPath = form.uploadDir + tnbavatarName;
		//显示地址；
		var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
		var tnbUrl = domain + AVATAR_UPLOAD_FOLDER + tnbavatarName;
		console.log("newPath", newPath);
		fs.renameSync(files.fulAvatar.path, newPath); //重命名
		// 缩略图
		console.log('YS:' + ysPath + ',MB:' + thbPath);
		var bytes = files.fulAvatar._writeStream.bytesWritten;
		var kb = (bytes/1024).toFixed(2);
		var mb = (bytes/1024/1024).toFixed(2);
		gm(ysPath)
			.resize(300,200)
			.noProfile()
			.write(thbPath, function(err) {
				if (!err) {
					res.send({
						code: 0,
						data: {
							// code:rd,
							original: showUrl,
							thumbnail: tnbUrl,
							size:mb>=1?(mb+'MB'):(kb+'KB')
						},
						msg: ''
					});
				}else{
					res.send({
						code: -1,
						data: {},
						msg: '图片上传失败，请稍后重试！'
					});
				}
			});
	})
})

// 专题新增
router.post('/add', function(req, res) {
	var strSql = "INSERT tbl_topic (topicname,original,	thumbnail,tag,starttime,endtime,updateuser,updatetime,memo) VALUE("
	strSql += "'"+req.body.topicname+"',";
	strSql += "'"+req.body.original+"',";
	strSql += "'"+req.body.thumbnail+"',";
	strSql += "'"+req.body.tag+"',";
	strSql += "'"+req.body.starttime+"',";
	strSql += "'"+req.body.endtime+"',";
	strSql += "'"+req.body.updateuser+"',";
	strSql += "now(),";
	strSql += "'')";
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

// 专题详情
router.post('/detail', function(req, res) {
	var strSql = 'select * from tbl_topic where id='+req.body.id;
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

// 专题编辑
router.post('/edit',function(req,res){
	var strSql = "UPDATE tbl_topic set ";
	strSql += " topicname = '"+req.body.topicname+"',";
	strSql += " original = '"+req.body.original + "',";
	strSql += " thumbnail = '"+req.body.thumbnail + "',";
	strSql += " tag = '"+req.body.tag + "',";
	strSql += " starttime = '"+req.body.starttime + "',";
	strSql += " endtime = '"+req.body.endtime + "',";
	strSql += " updateuser = "+req.body.updateuser + ",";
	strSql += " updatetime = now() ";
	strSql += " where id="+req.body.id;
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

// 专题删除
router.post('/del', function(req, res) {
	var strSql = " DELETE FROM tbl_topic WHERE id in (" + req.body.ids + ")";
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