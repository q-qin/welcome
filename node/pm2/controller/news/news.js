'use strict';

import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable'
import NewsModel from '../../models/news/news'

class News extends BaseComponent{
	constructor(){
		super()
	}
	async addNews(req,res,next){
		// const admin_id = req.params.admin_id;
		// if (!admin_id || !Number(admin_id)) {
		// 	console.log('用户ID格式不正确')
		// 	res.send({
		// 		status: -1,
		// 		message: '用户ID无效',
		// 	})
		// 	return 
		// }
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			//const {title, sub_title, type,description,sort,admin_id} = fields;
			try{
				if (!fields.admin_id) {
					throw new Error('用户ID无效');
				}
			}catch(err){
				console.log('用户ID格式不正确', err.message);
				res.send({
					status: -1,
					message: err.message
				})
				return
			}
			const newNews = {
				title: fields.title,
				sub_title: fields.sub_title,
				type: fields.type,
				description: fields.description,
				sort: fields.sort,
				update_user:admin_id,
				update_time:Date.now,
			}
			try{
				await NewsModel.create(newNews);
				res.send({
					status: 0,
					success: '添加资讯成功',
				});
			}catch(err){
				console.log('保存资讯到数据库失败', err);
				res.send({
					status: -1,
					message: '添加资讯失败'
				})
			}
		})
	}

	async editNews(req,res,next){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const {newsid,title, sub_title, type,description,sort,admin_id} = fields;
			
			try{
				var newData = {
					title:title,
					sub_title:sub_title,
					type:type,
					description:description,
					sort:sort,
					update_user:admin_id,
					update_time: Date.now
				}
				await NewsModel.findOneAndUpdate({id:newsid}, {$set: newData})
				res.send({
					status: 0,
					success: '资讯修改成功',
				})
			}catch(err){
				console.log(err.message, err);
				res.send({
					status: -1,
					message: '资讯修改失败',
				})
			}
		})
	}

	async getNews(req, res, next){
		const {limit = 0, offset = 0} = req.query;
		try{
			if(!Number(limit)){
				throw new Error('limit参数错误')
			}else if(typeof Number(offset) !== 'number'){
				throw new Error('offset参数错误')
			}
			const news = await NewsModel.find();
			//const news = await NewsModel.find({}).sort({id: -1}).limit(Number(limit)).skip(Number(offset));
			console.log('news:'+news)
			res.send({
				status: 0,
				news,
			});
		}catch(err){
			console.log(err.message, err);
			res.send({
				status: -1,
				message: err.message
			})
			return 
		}
	}

	async getNewsCount(req, res, next){
		try{
			const count = await NewsModel.find({}).count();
			res.send({
				status: 0,
				count,
			})
		}catch(err){
			console.log('获取资讯数量失败', err);
			res.send({
				status: -1,
				message: '获取资讯数量失败'
			})
		}
	}
}

export default new News()