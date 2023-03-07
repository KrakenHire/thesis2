const express = require('express');
const router = express.Router();

const user= require ("../controller/user")


router.post('/',user.post);

router.get('/:iduser',user.getUserById);




module.exports = router;
