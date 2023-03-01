const express = require('express');
const router = express.Router();

const provider= require("../controller/provider");

router.get('/',provider.getAllProviders);
router.post('/',provider.postPro);
router.get('/:idproviders',provider.getProviderById);



module.exports = router;
