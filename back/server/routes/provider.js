const express = require('express');
const router = express.Router();

const provider= require("../controller/provider");

router.get('/',provider.getAllProviders);
router.post('/',provider.postPro);
router.get('/:idproviders',provider.getProviderById);
router.put('/:idproviders',provider.updateProfilePro);


module.exports = router;
