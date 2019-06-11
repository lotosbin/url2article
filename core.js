const R = require('ramda');

async function transfer_if_need(page) {
    var link = await page.$('#js_access_msg')
    if (link) {
        console.debug(`need transfer`)
        await page.click('#js_access_msg')
        await transfer_if_need(page)
    } else {
        console.debug(`no need transfer`)
    }
}
const getArticle = async (page) => {
    var _content = e => e && e.getProperty ? e.getProperty('content') : ""
    var url = await page.url();
    var data = {
        url: url,
        title: (await page.title()) || "",
        description: _content((await page.$('meta[name="description"]')))
    }
    if (url.startsWith('https://mp.weixin.qq.com') || url.startsWith('http://mp.weixin.qq.com')) {
        data.title = (await page.$eval('#activity-name', e => e.innerText)) || data.title;
    }
    console.debug(data)
    return data;
}
export async function url2article(browser, url) {
    const page = await browser.newPage();
    try {
        await page.goto(url);
        await transfer_if_need(page);
        return await getArticle(page)
    } catch (e) {
        console.error(e)
        return { error: e.message }
    } finally {
        await page.close();
    }
}