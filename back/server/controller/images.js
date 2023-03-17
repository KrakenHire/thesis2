const modelinit= require('../../database/index');
const Images= modelinit.models.images
const fs = require('fs');


module.exports={

    postImg: async (req, res) => {
      try {
        const images = req.files.map(file => ({ data: file.filename, providers_idproviders: req.params.providers_idproviders }));
        const results = await Images.bulkCreate(images);
        console.log(req.files,'heeeeeey');
        res.json(results);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
    },
    // postImg: async (req, res) => {
    //   const { providers_idproviders } = req.body; 
    //   const imagePath = fs.readFileSync(req.file.path);
    
    //   try {
  
    //     await User.update({ data: imagePath }, { where: { providers_idproviders} });
    //     res.status(200).json({ message: 'Image uploaded successfully' });
    //   } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // },
      getImagebyId: async (req, res) => {
        try {
          console.log(req.params);
          const images = await Images.findAll({
            where: { providers_idproviders: req.params.providers_idproviders},
          });
          res.json(images);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Server error' });
        }
      },

      removeImage : async (req, res) => {
        const { imageId } = req.params;
      
        try {
          // Find the image with the specified ID
          const image = await Images.findByPk(imageId);
      
          if (!image) {
            res.status(404).send('Image not found');
            return;
          }
      
          // Delete the image
          await image.destroy();
      
          res.send('Image deleted');
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      }

    
    }
    

