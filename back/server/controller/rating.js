const modelinit= require('../../database/index');
const Rating= modelinit.models.rating


module.exports={

  postRate : async (req, res) => {
    console.log(req.body);
    try {
      const rating = await Rating.create(req.body);
      res.json(rating);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getratingById: async (req, res) => {
    try {
      console.log(req.params);
      const rate = await Rating.findAll({
        where: { providers_idproviders: req.params.providers_idproviders},
      });
      res.json(rate);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getRating : async (req, res) => {
    try {
      const ratings = await Rating.findAll();
      res.status(200).json(ratings);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting ratings");
    }
  }
  

}
