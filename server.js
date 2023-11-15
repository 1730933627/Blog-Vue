const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())

//没有dist要使用命令 npm run build
app.use(express.static(__dirname+'/dist'))


app.listen(5555, (err) => {
    if(!err) console.log("服务器启动了");
})