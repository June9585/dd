const db = require('../config/db');
const schema = db.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    //班级
    type: Number,
    required: true
  },
  sex: {
    type: Number,
    default: 1
  },
  age: {
    type: Number,
    default: 18
  },
  hobbies:{
    type: String,
    default: '我是xxx班的好学生'
  }
})
module.exports = db.model('user', schema);
