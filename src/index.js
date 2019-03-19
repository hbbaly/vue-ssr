// const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./app.js')
server.get('*', (req,res) => {
  const context = {
    url: req.url,
    title: 'hbb'
  }
  const app = createApp(context)
  renderer.renderToString(app, (err, html) => {
    if(err){
      res.status(500).end('Internal server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8081)