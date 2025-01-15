const http = require('http');
const cheerio = require('cheerio');
const url = require('url');
const port = 8080;
async function gyuan(ip) {
    const hyuan = await fetch(`https://www.bilibili.com/bangumi/play/ep${ip}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36", 
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
    });

    const htm = await hyuan.text();
    const $ = cheerio.load(htm);

    const yuan =$('script#__NEXT_DATA__').html();

    return yuan;
}
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/')) {
    const u = url.parse(req.url, true);
    const ip = u.pathname.substr(1);
gyuan(ip).then((yuan) => {
  const hyuan = yuan !== null ? yuan : '{}'; 
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(hyuan);
  res.end();
});
  } 
}).listen(port, () => {
	console.log('监听端口：'+port);
	console.log(`使用例子：curl "http://[::1]:${port}/341209"`)
	});
