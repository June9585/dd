const express=require('express');
const app=express();

//引入路由
const studentRouter=require('./routes/user');

// 设置 req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置允许跨域 cors
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  })

  //调用路由
app.use(studentRouter);

app.listen(5555,()=>{
    console.log('server...')
});
