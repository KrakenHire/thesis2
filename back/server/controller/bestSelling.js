const modelinit= require('../../database/index');
const sequelize = require("sequelize")

const Provider= modelinit.models.providers
const Booking= modelinit.models.booking

module.exports={
getTopSellingProviders : async (req, res) => {
  try {
    const providers = await Provider.findAll({
      attributes: [
        'idproviders', 'username',
        [sequelize.literal('(SELECT COUNT(*) FROM booking WHERE booking.providers_idproviders = providers.idproviders)'), 'booking_count']
      ],
      order: [[sequelize.literal('booking_count'), 'DESC']]
    });

    return res.json(providers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
};