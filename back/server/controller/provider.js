const modelinit= require('../../database/index');
const Provider= modelinit.models.providers
const fs = require('fs');


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
  },
  getProviderByIdConfirmed:async (req, res) => {
    try {
      const provider = await Provider.findByPk(req.params.idproviders);
      if (!provider) {
        res.status(404).send('Provider not found');
      } else {
        const { id, name, email, confirmed } = provider;
        res.json({ id, name, email, confirmed });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  postImg: async (req, res) => {
    console.log(req.file);
    const { idproviders  } = req.body; 
    const imagePath = fs.readFileSync(req.file.path);
  
    try {

      await User.update({ image: imagePath }, { where: { idproviders } });
      res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getImagebyId:  async (req, res) => {
    const { idproviders  } = req.params;
  
    try {
      const user = await User.findOne({ where: { idproviders} });
  
      if (user) {
        const imagePath = user.image;
        res.sendFile(imagePath, { root: __dirname });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

}
