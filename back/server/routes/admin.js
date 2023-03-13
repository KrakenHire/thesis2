const express = require('express');
const router = express.Router();

const provider= require("../controller/admin");
const user= require("../controller/admin");

// router.post('/', createAdmin);
// // router.get('/:idadmin', getAdmin);
// router.put('/:idadmin', updateAdmin);
// router.delete('/:idadmin', deleteAdmin);

router.get('/providers', provider.getAllProviders);
router.get('/users', user.getAllUsers);
router.delete('/users/:iduser', user.deleteUser);
router.post('/users/ban/:iduser', user.banUser);
router.delete('/providers/:idproviders', user.deleteProvider);

module.exports = router;