const modelinit= require('../../database/index');

const Provider= modelinit.models.providers
const User= modelinit.models.users
const Booking= modelinit.models.booking


module.exports={
    getRecentBookings : async (req, res) => {
        try {
          const recentBookings = await Booking.findAll({
            order: [['start_date', 'DESC']],
            include: [
              { model: User, attributes: ['username'] },
              { model: Provider, attributes: ['username'] }
            ]
          });
          res.json(recentBookings);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      },
      createBooking : async (req, res) => {
        try {
          const { start_date, status, users_iduser, providers_idproviders, adresse, workingHours, price } = req.body;
          const newBooking = await Booking.create({
            start_date,
            status,
            users_iduser,
            providers_idproviders,
            adresse,
            workingHours,
            price
          });
          res.json(newBooking);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      },
    };
