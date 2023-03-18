const modelinit= require('../../database/index');
const User= modelinit.models.users


module.exports={

  post : async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getUserById: async (req, res) => {
    try {
      console.log("ppppppppppppppppppp",req.params.iduser);
      const user = await User.findByPk(req.params.iduser,{
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

//  updateProfile :async (req, res) => {

//     try{
      
//     console.log("ooooooooooooooooo",req.params.iduser)
//       const updatee=await User.update(req.params.iduser,{
//         attributes:['username','FirstName','LastName','age']
//       })
//       res.json(updatee)
//     }
//     catch(err){
//       console.log(err)
//     }
//   }
updateProfile: async (req, res) => {
  console.log(req.url, "update requesttttttttttttttttttttt", req.body);
  try {
    const [numOfUpdatedRows] = await User.update( 
      {
        username: req.body.username,
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        age:req.body.age
      },
      {
        returning: true, // Add this option to enable returning the updated record(s)
        where: { iduser: req.params.iduser },
      }
    );
    // If no rows were updated, return an appropriate response
    if (numOfUpdatedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = await User.findByPk(req.params.iduser); // fetch the updated record
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
}
