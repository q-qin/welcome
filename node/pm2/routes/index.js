'use strict';

import admin from './admin'
import user from './user'
import common from './common'
import statis from './statis'

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/admin', admin);
	app.use('/user', user);
	app.use('/common', common);
	app.use('/statis', statis);
}