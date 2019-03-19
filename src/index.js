const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
server.get('*', (req,res) => {
  const app = new Vue({
    data:{
      url:req.url
    },
    template:`<div>访问的 URL 是： {{ url }}</div>`
  })
  const context = {
    title: 'hbb',
    meta: `
    <meta name="keywords" content="苹果iPhone维修,华为手机维修,小米手机维修,手机上门维修,ipad维修,MacBook Air维修,iMac维修,智能设备维修预约">
    `
  }
  renderer.renderToString(app,context, (err, html) => {
    if(err){
      res.status(500).end('Internal server Error')
      return
    }
    res.end(`<!DOCTYPE html>
    <html lang="en">
      <head><title>Hello</title></head>
      <body>${html}</body>
    </html>`)
  })
})
server.listen(8081)