const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    var json = await url2article(browser, 'https://mp.weixin.qq.com/s?__biz=MzA5Nzc4OTA1Mw==&mid=2659597444&idx=1&sn=391fc6e108488f78e45a8421ea311fdd&scene=0#wechat_redirect)');
    console.log(json)
    await browser.close();
})();