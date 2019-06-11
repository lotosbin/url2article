const puppeteer = require('puppeteer');
const Koa = require('koa');
const app = new Koa();
const { url2article } = require("./core");

(async () => {
    const browser = await puppeteer.launch({
    });
    app.use(async ctx => {
        var url = ctx.request.query.url;
        console.debug(`url=${url}`);
        if (url) {
            var json = await url2article(browser, url);
            ctx.body = json;
        } else {
            ctx.body = { error: 'url is empty' }
        }
    });

    app.listen(3000);

    process.on('exit', async () => {
        await browser.close()
    })
})();
