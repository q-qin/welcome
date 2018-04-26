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
        if (bot.Contact.getSearchUser('、ོ').length) {
            username = bot.Contact.getSearchUser('、ོ')[0].UserName;
            console.log('获取目标用户成功: ', username);
        }
    }
});

/*
* 每1s发一次微信
*/
new CronJob('* * * * * *', function () {
    if (username) {
        bot.sendMsg('每秒发一次，哟吼....', username)
            .catch(err => {
                bot.emit('send error', err);
            });
    }
}, null, true, 'Asia/Shanghai');

/*
* 星期1-5 08:00-08:10 每60s发一次微信，喊你起床
*/
new CronJob('*/60 00-10 08 * * 1-5', function () {
    if (username) {
        bot.sendMsg('世界上最好看的仙女，起床了没有，记得化一个美美的妆再出门哦....', username)
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
        bot.sendMsg('中午好，小考拉，午饭有没有乖乖吃啊？如果没有的话，我等下再问一遍....', username)
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
        bot.sendMsg('美丽的仙女，要时时刻刻保养自己的美貌，好好睡个美容觉，醒来又是美美哒....', username)
            .catch(err => {
                bot.emit('send error', err);
            });
    }
}, null, true, 'Asia/Shanghai');