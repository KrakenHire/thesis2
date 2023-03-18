const modelinit= require('../../database/index');
const Provider= modelinit.models.providers
const User= modelinit.models.users

module.exports = {
createAdmin : async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const admin = await Admin.create({ email, password, username });
    res.status(201).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create admin' });
  }
},

updateAdmin : async (req, res) => {
  const adminID = req.params.idadmin;
  const { email, password, username } = req.body;

  try {
    const admin = await Admin.findByPk(adminID);
    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
    } else {
      admin.email = email;
      admin.password = password;
      admin.username = username;
      await admin.save();
      res.status(200).json(admin);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update admin' });
  }
},

updateProfile: async (req, res) => {
  try {
    const  updatedUser = await User.update(
      {
        username: req.body.username,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        age: req.body.age
      },
      {
        where: { iduser: req.params.iduser },
        attributes: ['id', 'username', 'FirstName', 'LastName', 'age']
      }
    );
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
  }
},

deleteAdmin : async (req, res) => {
  const adminID = req.params.idadmin;

  try {
    const admin= await Admin.findByPk(adminID);
    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
    } else {
      await admin.destroy();
      res.status(200).json({ message: 'Admin deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete admin' });
  }
},

getAllProviders : async (req, res, next) => {
  try {
    const providers = await Provider.findAll();
    res.status(200).json(providers);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting providers");
  }
},

getAllUsers : async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting users");
  }
},

deleteUser : async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.iduser);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
},

banUser : async (req, res, next) => {
  const { iduser } = req.params;
  
  try {
    const user = await User.findOne({ where: { iduser } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBanned = true;
    await user.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
},

deleteProvider : async (req, res, next) => {
  try {
    const provider = await Provider.findByPk(req.params.idproviders);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    await provider.destroy();

    return res.json({ message: 'Provider deleted successfully' });
  } catch (err) {
    next(err);
  }
},
confirmProviders: async (req, res) => {
  const id = req.params.idproviders;

  Provider.update({ confirmed: true }, { where: { idproviders: id } })
    .then(num => {
      console.log("num:", num);
      if (num == 1) {
        res.send({ message: "Provider was confirmed successfully." });
      } else {
        res.send({ message: `Cannot confirm Provider with id=${id}. Maybe Provider was not found or confirmed already!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error confirming Provider with id=" + id });
    });
  }
};