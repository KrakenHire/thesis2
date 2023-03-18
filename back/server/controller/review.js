const modelinit= require('../../database/index');

const Review = modelinit.models.reviews

module.exports={
    getReviews: async (req, res) => {
        try {
          const Reviews = await Review.findAll({
            attributes: ['idreview', 'content', 'users_iduser', 'providers_idproviders', 'created_at']
          });
          res.status(200).json(Reviews);
        } catch (err) {
          console.log(err);
          res.status(500).send("Error getting Reviews");
        }
      },
      createReview : async (req, res) => {
        try {
          const { idreview, content, users_iduser, providers_idproviders, createdAt } = req.body;
          const newReview = await Review.create({
            idreview,
            content,
            users_iduser,
            providers_idproviders,
            createdAt
          });
          res.json(newReview);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      }
    };
