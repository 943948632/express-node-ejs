var express = require('express');
var router = express.Router();
var db = require("../sqldb/index")
var User = db.User;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//向user表中插入数据
router.post('/add/user', function(req, res, next) {
    console.log("+++++++++++++++++++++++");
    var saveUser = {
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight
    };

    return db.sequelize.transaction(function(t) {
        console.log("+++++++++++++++++++");
        return User.create(saveUser, {
            transaction: t
        }).then(function(result) {
            res.send(result);
        }).catch(function(err) {
            console.log("发生错误：" + err);
        });
    })
});
//查询数据表中的数据（以id字段来查询）
router.get('/get/user/:userid', function(req, res, next) {
    console.log("db" + db.User);
    return db.sequelize.transaction(function(t) {
        return User.findOne({
            id: req.params.userid
        }, {
            transaction: t
        }).then(function(result) {
            res.send(result);
        }).catch(function(err) {
            console.log("发生错误：" + err);
        });
    });
});
//更新数据
router.post('/update/user/age', function(req, res, next) {
    return db.sequelize.transaction(function(t) {
        return User.findById(req.body.userid, {
            transaction: t
        }).then(function(user) {
            return user.update({
                age: req.body.age
            }, {
                transaction: t
            }).then(function(result) {
                res.send(result);
            }).catch(function(err) {
                console.log("发生错误：" + err);
            });
        })
    })
});
module.exports = router;