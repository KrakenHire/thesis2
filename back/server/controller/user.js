const modelinit= require('../../database/index');
const User= modelinit.models.users

const fs = require('fs');




module.exports={
  post : async (req, res) => {
    try {
      const user = await User.create(req.body);
      console.log(user,"boddddddddddddddddddy");

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // post : async (req, res) => {
  //   try {
  //     const { username, firstName, lastName, age } = req.body;
  
  //     let image = null;
  
  //     if (req.file) {
  //       // If a file was uploaded, read it from disk and set it as the user's image
  //       image = fs.readFileSync(req.file.path);
  //     }
  
  //     const user = await User.create({
  //       username,
  //       FirstName: firstName,
  //       LastName: lastName,

  //       age,
  //       image
  //     });
  
  //     res.status(201).json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Server Error');
  //   }
  // },
  getUserById: async (req, res) => {
    try {
      console.log("ppppppppppppppppppp",req.params.iduser);
      const user = await User.findByPk(req.params.iduser);
      console.log(user,"yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees");
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getImagebyId:  async (req, res) => {
    const { iduser } = req.params;
  
    try {
      const user = await User.findOne({ where: { iduser } });
  
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
  postImg: async (req, res) => {
    const { iduser } = req.body; 
    const imagePath = fs.readFileSync(req.file.path);
  
    try {

      await User.update({ image: imagePath }, { where: { iduser } });
      res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
