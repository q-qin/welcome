var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var formidable = require('formidable'),
	fs = require('fs'),
	gm = require('gm'),
	domain = 'http://115.159.63.110:3000',
	AVATAR_UPLOAD_FOLDER = '/images/';

// 图片上传
router.post('/photo', function(req, res) {
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
		var ysPath = form.uploadDir + avatarName;	// 原始保存地址
		var thbPath = form.uploadDir + tnbavatarName;	// 缩略图保存地址
		//显示地址；
		var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName; // url(http://xxx.png)
		var tnbUrl = domain + AVATAR_UPLOAD_FOLDER + tnbavatarName;	// url(http://xxx.png)

		fs.renameSync(files.fulAvatar.path, ysPath); //重命名
		// 缩略图

		var bytes = files.fulAvatar._writeStream.bytesWritten;
		var kb = (bytes / 1024).toFixed(2);
		var mb = (bytes / 1024 / 1024).toFixed(2);
		// *** 图片压缩(最大860*533) ***
		gm(ysPath)
			.size(function(err, size) {
				if (!err) {
					var _width = size.width, _height = size.height;
					if (_width > 860 || _height > 533) {
						console.log('resize')
						gm(ysPath).resize(860, 533).write(thbPath, function(err) {
							if (err) {
								res.send({
									code: -1,
									data: '',
									msg: '缩略图生成失败！'
								});
								return false;
							}
							// 加水印
							addWater(_width,_height);
						})
					} else {
						console.log('no resize')
						gm(ysPath).write(thbPath, function(err) {
							if (err) {
								res.send({
									code: -1,
									data: '',
									msg: '缩略图生成失败！'
								});
								return false;
							}
							// 加水印
							addWater(_width,_height);
						})
					}
				}
			})

		function addWater(_width,_height) {
			console.log('addWater');
			gm(thbPath)
				.size(function(err, size) {
					if (!err) {
						var left = size.width / 2 - 85;
						var top = size.height / 2 - 30;
						gm(thbPath)
							.draw('image Over ' + left + ', ' + top + ' 170, 60 "/data/node/shuiyin.png"')
							// .font('/usr/share/fonts/msyh.ttf',30)
							// .drawText(50, 100, "来自 极易商图")
							.write(thbPath, function(err) {
								if (err) {
									res.send({
										code: -1,
										data: '',
										msg: '加水印失败！'
									});
									return false;
								}
								res.send({
									code: 0,
									data: {
										original: showUrl,
										thumbnail: tnbUrl,
										size: mb >= 1 ? (mb + 'MB') : (kb + 'KB'),
										width: _width,
										height: _height
									},
									msg: '操作成功'
								});
							})
					}
				})
		}
	})
})

module.exports = router;