const modelinit= require('../../database/index');
const Images= modelinit.models.images
const fs = require('fs');


module.exports={

    postImg: async (req, res) => {
        const { providerId } = req.params;
        const images = fs.readFileSync(req.files.path)
      
        try {
          // Create new images for the specified provider
          const createdImages = await Promise.all(images.map(async image => {
            const { buffer } = image;
            return await Images.create({
              data: buffer,
              providers_idproviders: providerId,
            });
          }));
      
          res.json(createdImages);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      },
      getImagebyId: async (req, res) => {
        const { providerId } = req.params;
      
        try {
          // Find all images for the specified provider
          const images = await Images.findAll({
            where: { providers_idproviders: providerId },
          });
      
          res.json(images);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      },
      removeImage : async (req, res) => {
        const { imageId } = req.params;
      
        try {
          // Find the image with the specified ID
          const image = await Image.findByPk(imageId);
      
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
    

