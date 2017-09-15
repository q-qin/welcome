var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/*
事务demo
insert 主表
成功之后 insert 表链表
*/
router.post('/add', function(req, res) {
	var subCols = [1,2,3];	// 子表要插入列数据
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
			if (err) {
				res.send({
					code: -1,
					data: '',
					msg: '请求异常，请稍后重试！'
				})
				return false;
			}
			var insMain = "INSERT INTO 主表"
			connection.query(insMain, function(err, rows) {
				if (err) {
					console.log(err);
					connection.rollback(function() {
						res.send({
							code: -1,
							data: '',
							msg: '请求异常，请稍后重试！'
						})
					})
				}
				var insertId = rows.insertId; //获取自动生成的id
				console.log(insertId);
				for (var i = 0; i < subIds.length; i++) {
					var instag = "INSERT INTO 子表 (xx,主表id)VALUES ('" + subCols[i] + "','" + insertId + "');";
					connection.query(instag, function(err, rows) {
						if (err) {
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
				connection.commit(function(err) {
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
							msg: '操作成功！'
						})
					})
				})
			})
		})
		connection.release();
	})
})

module.exports = router;