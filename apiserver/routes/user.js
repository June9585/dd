const express = require('express');
//密码加盐
const bcryptjs = require('bcryptjs');
const router = express.Router();
// 学生地址的样式入口
const Userstudens = require('../model/user');

const auth = require('../midderware/auth');
const jwt = require('jsonwebtoken')



//登陆界面
router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password
    Userstudens.findOne({
        username,
    })
        .then(data => {
            console.log(data)
            if (data) {
                let isOk = bcryptjs.compareSync(password, data.password);
                if (isOk) {
                    let token = jwt.sign({
                        userId: data._id,
                        username: data.username
                    }, 'XSF')
                    res.send({
                        code: 0,
                        msg: 'ok',
                        data: {
                            token: token
                        }
                    });
                } else {
                    //密码错误
                    res.send({
                        code: -1,
                        msg: '账号或密码错误'
                    })
                }
            } else {
                res.send({
                    code: -2,
                    msg: '账号或密码错误'
                })
            }
        })
        .catch(data => {
            res.send({
                code: -1,
                msg: '网络异常...'
            })
        })


})

//  POST/studens/new     name、age、gender、hobbies   处理添加学生请求 
// 学生注册 完成 ok
router.post('/student/new', (req, res) => {
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

//  GET /students/new   渲染添加学生页面  
//  有问题  
router.get('/student/new', auth, (req, res) => {
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
})


//  GET  /studens  渲染首页 ok
router.get('/student',(req,res) => {
    let pageNum = parseInt(req.query.pageNum) || 1;
    let pageSize = parseInt(req.query.pageSize) || 5;
    let studentName = req.query.studentName ;
    studentName = new RegExp(studentName);
    Userstudens.find({}).count().then( (nums) => {
        console.log(nums)
        Userstudens.find({}).skip((pageNum -1) * pageSize)
        .limit(pageSize).then(data => {
            console.log(data)
            res.send({
                code:200,
                msg:'ok',
                data:{
                    list:data,
                    totalPage:Math.ceil(nums / pageSize)
                }
            })
        })
    })
})



//  GET /students/edit  id   渲染编辑页面   编辑单个学生的入口  空
router.post('/student/edit/:id', auth, (req, res) => {
    let id = req.params.id;
    studentModel.deleteOne({
        _id: id
    }).then((data) => {
        console.log(data)
        let student = new studentModel({
            studentName: data.studentName,
            grade: data.grade,
            age: data.age
        });
        student.save().then((a) => {
            res.send({
                code: 200,
                msg: 'ok'
            });
        }).catch((err) => {
            res.send({
                code: -1,
                msg: '加入失败'
            })
        })
    })

})



//  POST/studens/edit    id、name、age、gender、hobbies  处理编辑请求      空
router.post('/studen/edit', (req, res) => {

})


//删除数据  数据
router.delete('/student/:id', auth, (req, res) => {
    let id = req.params.id;
    studentModel.deleteOne({
        _id: id
    }).then((data) => {
        if (data.deletedCount > 0) {
            res.send({
                code: 200,
                msg: 'ok'
            })
        } else {
            res.send({
                code: -1,
                msg: '删除失败'
            })
        }
    })
})


module.exports = router;