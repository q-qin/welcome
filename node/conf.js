const dbconfJuzi = {
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'juzidb',
	connectionLimit: 400
}

const dbconfWcjs = {
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'qlsdb',
	connectionLimit: 400
}

const fileconf = {
	file_Url: 'http://115.159.63.110:3000',
}

const logconf = {
	appenders: {
		applog: {
			type: 'dateFile',
			filename: './logs/app.log',
			pattern: '.yyyy-MM-dd',
			alwaysIncludePattern:true,
		}
	},
	categories: {
		default: {
			appenders: ['applog'],
			level: 'all'
		}
	},
	replaceConsole:true,
}

module.exports = {
	dbconfJuzi,
	dbconfWcjs,
	fileconf,
	logconf
};