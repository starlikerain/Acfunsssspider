const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

(async () => {
    const res = await axios.get("http://www.acfun.cn/a/ac4126053");
    let html = res.data;
    const $ = cheerio.load(html);
    let articalContent = $(".article-content");

    const doms = $(articalContent).find("p,p>img,div,div>img");
    const content = [];
    doms.map((i, e) => {
        const text = $(e).text();
        if (text) {
            content.push(text);
        } else if (e.name == "img") {
            const src = $(e).attr("src");
            content.push(src);
        }
    });
    console.log(content);
    fs.writeFileSync("./message.txt", content, "utf-8");
})()
    .then(() => {
        process.exit(0);
    })
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
