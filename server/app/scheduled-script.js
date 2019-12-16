const Abbonement = require(`./models/abbonement.model.js`);

require("dotenv").config();

module.exports = checkAbbonement = async () => {
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
