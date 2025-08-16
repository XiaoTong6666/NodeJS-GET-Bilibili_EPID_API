const http = require('http');
const cheerio = require('cheerio');
const url = require('url');
const port = 8080;
async function huoqu(epid) {
    const yuanshi = await fetch(`https://www.bilibili.com/bangumi/play/ep${epid}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
      },
    });
    const neirong = await yuanshi.text();
    const $ = cheerio.load(neirong);
    const yuanjson =$('script#__NEXT_DATA__').html();
    // const jsondata = JSON.parse(yuanjson);
    // const guolvjson = jsondata.props.pageProps.dehydratedState.queries[0].state.data.result.play_view_business_info.episode_info;
    // const gl = JSON.stringify(guolvjson);
    // return gl;
    return yuanjson;
}
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/')) {
    const dizhi = url.parse(req.url, true);
    const epid = dizhi.pathname.substr(1);
huoqu(epid).then((yuanjson) => {
  const shuchu = yuanjson !== null ? yuanjson : '{}';
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(shuchu);
  res.end();
});
  }
}).listen(port, () => {
	console.log('监听端口：'+port);
	console.log(`使用例子：curl "http://[::1]:${port}/341209"`)
	});
