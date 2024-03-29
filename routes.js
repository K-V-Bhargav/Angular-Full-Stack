var express = require('express');
const router = express.Router();
var userController = require('../src/user/usercontroller');

router.route('/getData').get(userController.getData);
router.route('/createData').post(userController.createData);
router.route('/updateData/:id').put(userController.updateData);
router.route('/deleteData/:id').delete(userController.deleteData);


module.exports = router;