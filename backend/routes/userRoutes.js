var express = require('express');
const User = require('../modal/userModel');
const { createUserController, loginHandleController, getUserListController } = require('../controller/userController');
const { validateTokenMiddleware } = require('../middleware/AuthMiddleware');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Testing with nodemon and express');
});

router.get('/john', function(req, res, next) {
  res.send('This is johns profile');
});

router.post("/create", createUserController);
router.post("/login", loginHandleController);
router.get("/list", validateTokenMiddleware, getUserListController);


module.exports = router;
