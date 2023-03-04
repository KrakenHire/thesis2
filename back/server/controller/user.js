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
  }

}
