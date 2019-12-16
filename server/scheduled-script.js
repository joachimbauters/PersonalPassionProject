const Abbonement = require("./app/models/abbonement.model.js");
const mongoose = require("mongoose");

require("dotenv").config();

//const socket = require("socket.io-client")(process.env.SOCKET_URL);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("db connected"))
  .catch(e => {
    console.log("Error, exiting", e);
    process.exit();
  });

const checkAbbonement = async () => {
  try {
    const abbonementen = Abbonement.find(
      { active: true },
      "_id naam startTime endTime"
    );
    const abbonementenArray = await abbonementen.exec();
    const now = new Date().toISOString();
    abbonementenArray.map(async abbonement => {
      try {
        const d1 = Date.parse(now);
        const d2 = Date.parse(abbonement.endTime);
        if (d2 < d1) {
          console.log("abbonement verlengd");
          const startTimeNow = new Date().toISOString();
          const endTime = new Date(startTimeNow);
          endTime.setMonth(endTime.getMonth() + 1);

          await Abbonement.findByIdAndUpdate(
            {
              _id: abbonement._id
            },
            {
              startTime: startTimeNow,
              endTime: endTime
            },
            {
              new: true
            }
          );

          // socket.emit(`notification`, {
          //   notification: `${abbonement.naam} is hernieuwd voor een maand`
          // });

          //socket.disconnect();
          mongoose.connection.close();
        } else {
          return null;
        }
      } catch (err) {
        throw err;
      }
    });
  } catch (err) {
    throw err;
  }
};

checkAbbonement();
