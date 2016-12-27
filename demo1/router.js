var koa = require('koa')
var app = koa()


// 最原始的写法

app.use(function *(){
  if(this.path === '/'){
    // 主页  
  }
})

app.use(function *(){
  if(this.path === '/detail'){
    // 详情页
  }
})

// 注入koa-router中间件

var router = require('koa-router');

app.use(router(app))

// 简单路由写法

app.get('/',function *(next){
  // to do ...
})

app.get('/detail/:id',function *(next){
  // to do...
  var id = this.params.id;
})

// 最常用的除了get之外还有post、put、patch、delete等

// param()方法，用于路由参数的处理

app.param('id',function *(id,next){
  this.id = Number(id)
  if( typeof this.id != 'number') return this.status = 404;
  yield next; // 执行下一个中间件
}).get('/detail/:id',function *(next){
  var id = this.id;
  this.body = id;
})
