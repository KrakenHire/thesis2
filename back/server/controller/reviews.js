const modelinit= require('../../database/index');
const Reviews= modelinit.models.reviews
const Users= modelinit.models.users

module.exports={

    postreview : async (req, res) => {
    console.log(req.body);
    try {
      const reviews = await Reviews.create(req.body);
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getAllReviews:async (req, res) => {
    try {
    //   console.log(modelinit);
      // console.log(Provider)
      const reviews = await Reviews.findAll();
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getReviwsById: async (req, res) => {
    try {
      console.log(req.params);
      const review = await Reviews.findAll({
        where: { providers_idproviders: req.params.providers_idproviders},
      });
      res.json(review);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getReviewsById: async (req, res) => {
    try {
      const reviews = await Reviews.findAll({
        where: { providers_idproviders: req.params.providers_idproviders },
        include: {
          model: Users,
          attributes: ['username']
        }
      });
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  

}