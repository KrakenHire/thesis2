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
  },

  updateProfilePro: async (req, res) => {
    try {
      const  [updatedProvider] = await Provider.update(
        {
          service: req.body.service,
          username: req.body.username,
          age: req.body.age,
          experience: req.body.experience,
          adresse:req.body.adresse,
          price:req.body.price,
          aboutMe:req.body.aboutMe
         
        },
        {
          returning: true,
          where: { idproviders: req.params.idproviders },
          
        }
      );
      if(updatedProvider===0){
        return res.status(404).json({error:"provider not found"});
      }
      const updatedPro = await Provider.findByPk(req.params.idproviders); // fetch the updated record
      res.json(updatedPro);
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }}