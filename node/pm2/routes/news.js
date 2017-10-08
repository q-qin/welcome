'use strict'

import express from 'express'
import News from '../controller/news/news'

const router = express.Router()

router.get('/count', News.getNewsCount)
router.get('/list', News.getNewsList)
router.post('/detail', News.getNewsDetail)
router.post('/add', News.addNews)
router.post('/edit', News.editNews)

export default router