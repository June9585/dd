const express = require('express');
//密码加盐
const bcryptjs = require('bcryptjs');
const router = express.Router();
// 学生地址的样式入口
const Userstudens = require('../model/user');



//  GET  /studens  渲染首页
router.get('/studens', (req, res) => {
    console.log('首页')
    res.send('首页')

})
//  GET /students/new   渲染添加学生页面  
//管理首页添加学生完成
router.get('/students/new', (req, res) => {
    Userstudens.findOne({
        username: req.body.username,      
    }).then(data => {
        if (data) {
            res.send({
                code: -1,
                msg: '用户名存在'
            })
        } else {
            //加密 加盐
            let hashPassword = bcryptjs.hashSync(req.body.password, 10);
            req.body.password = hashPassword;
            let user = new Userstudens(req.body);
            user.save()
                .then(data => {
                    res.send({
                        code: 0,
                        msg: '注册成功'
                    })
                })
                .catch(error => {
                    console.log(error.message);
                    res.send({
                        code: -1,
                        msg: '网路异常，请稍后重试'
                    })
                })
        }

    })
    console.log('添加学生页面 ')
    res.send('添加学生页面 ')
})


//  POST/studens/new     name、age、gender、hobbies   处理添加学生请求 
// 学生注册 完成
router.post('/students/new', (req, res) => {
    Userstudens.findOne({
        username: req.body.username,
        gender: req.body.gender
    }).then(data => {
        if (data) {
            res.send({
                code: -1,
                msg: '用户名存在'
            })
        } else {
            //加密 加盐
            let hashPassword = bcryptjs.hashSync(req.body.password, 10);
            req.body.password = hashPassword;
            let user = new Userstudens(req.body);
            user.save()
                .then(data => {
                    res.send({
                        code: 0,
                        msg: '注册成功'
                    })
                })
                .catch(error => {
                    console.log(error.message);
                    res.send({
                        code: -1,
                        msg: '网路异常，请稍后重试'
                    })
                })
        }

    })
})


//  GET /students/edit  id   渲染编辑页面   
router.get('/students/edit', (req, res) => {
    res.send('/students/edit')
})
//  POST/studens/edit    id、name、age、gender、hobbies  处理编辑请求     
router.post('/studens/edit', (req, res) => {

})


//登陆界面
router.post('/', (req, res) => {
    let username=req.body.username;
    let password=req.body.password
    Userstudens.findOne({
        username,
    })
    .then(data=>{
        console.log(data)
        if(data){
            let isOk=bcryptjs.compareSync(password,data.password);
            if(isOk){
                res.send({
                    code:0,
                    msg:'ok'
                })
            }else{
                //密码错误
                res.send({
                    code:-1,
                    msg:'密码错误'
                })
            }
        }else{
            res.send({
                code:-1,
                msg:'账号或密码错误'
            })
        }
    })
    .catch(data=>{
        res.send({
            code:-1,
            msg:'网络异常...'
        })
    })


})



//  DELTE    /students/delete  id   处理删除请求    
router.delete('/students/delete', (req, res) => {
    res.send('/students/delete')
})


module.exports = router;