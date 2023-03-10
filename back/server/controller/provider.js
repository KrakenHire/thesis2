const modelinit= require('../../database/index');
const Provider= modelinit.models.providers


module.exports={
  getAllProviders:async (req, res) => {
    try {
    //   console.log(modelinit);
      // console.log(Provider)
      const providers = await Provider.findAll();
      res.json(providers);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  postPro : async (req, res) => {
    console.log(req.body);
    try {
      const provider = await Provider.create(req.body);
      res.json(provider);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getProviderById:async (req, res) => {
    try {
    //   console.log(modelinit);
      // console.log(Provider)
      const provider = await Provider.findByPk(req.params.idproviders);
      res.json(provider);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

}
