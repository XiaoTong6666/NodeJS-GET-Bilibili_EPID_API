# 通过bilibili番剧的ep号（我管他叫epid）获取对应番剧/该番的JSON数据（包括弹幕id也就是cid）
这是一个基于nodejs的后端api，用于bilibili的番剧epid获取对应cid，请求格式是/${epid}，默认端口是103，如果使用的是all，那么获取的是整个番的数据。    
示例：b站链接https://www.bilibili.com/bangumi/play/ep341209 （这是小潼最喜欢的伊蕾娜所在的番）    
那么get请求http://[::1]:103/341209 就会返回对应JSON数据了
