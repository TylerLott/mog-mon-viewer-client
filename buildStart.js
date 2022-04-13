const http = require("http")
const koa = require("koa")
const serve = require("koa-static")

const httpPort = 80

const app = new koa()

app.use(
  serve("./build", {
    maxage: 365 * 24 * 60 * 60,
  })
)

http
  .createServer(app.callback())
  .listen(httpPort, () => console.log(`server is listening on ${httpPort}`))
