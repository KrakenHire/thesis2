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
//   getUserById: async (req, res) => {
//     try {
//       console.log("ppppppppppppppppppp",req.params.iduser);
//       const user = await User.findByPk(req.params.iduser, {
//         attributes: ['username']
//       });
//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   }
  

}
