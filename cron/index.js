const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const CronJob = require('cron').CronJob;

let bot;
let username;

// 尝试获取本地登录数据，免扫码
try {
    bot = new Wechat(require('./sync-data.json'));
} catch (e) {
    bot = new Wechat();
}

if (bot.PROP.uin) {
    bot.restart();
} else {
    bot.start();
}

// 生成二维码
bot.on('uuid', uuid => {
    qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
        small: true
    });
    console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid);
});

// 登录成功
bot.on('login', () => {
    console.log('登录成功');
    fs.writeFileSync('./sync-data.json', JSON.stringify(bot.botData));
});

// 登出成功
bot.on('logout', () => {
    console.log('登出成功');
    fs.unlinkSync('./sync-data.json');
});

bot.on('contacts-updated', contacts => {
    if (!username) {
        // console.log('联系人数量: ', Object.keys(bot.contacts).length);
        if (bot.Contact.getSearchUser('、').length) {
            username = bot.Contact.getSearchUser('、')[0].UserName;
            console.log('获取目标用户成功: ', username);
        }
    }
});

/*
* 星期1-5 08:00-08:10 每60s发一次微信，喊起床
*/
new CronJob('*/60 00-10 08 * * 1-5', function () {
    if (username) {
        bot.sendMsg('早安....', username)
            .catch(err => {
                bot.emit('send error', err);
            });
    }
}, null, true, 'Asia/Shanghai');

/*
* 星期1-5 11:15/30 问一句
*/
new CronJob('00 15,30 11 * * 1-5', function () {
    if (username) {
        bot.sendMsg('午安....', username)
            .catch(err => {
                bot.emit('send error', err);
            });
    }
}, null, true, 'Asia/Shanghai');
/*
* 每天 at 23:00:00
*/
new CronJob('00 00 23 * * *', function () {
    if (username) {
        bot.sendMsg('晚安....', username)
            .catch(err => {
                bot.emit('send error', err);
            });
    }
}, null, true, 'Asia/Shanghai');