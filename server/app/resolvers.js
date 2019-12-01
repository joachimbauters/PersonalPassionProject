const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model.js");

module.exports = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id)
  },
  Mutation: {
    login: async (_, { email, wachtwoord }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("Gebruiker bestaat niet!");
      }
      const isEqual = await bcrypt.compare(wachtwoord, user.wachtwoord);
      if (!isEqual) {
        throw new Error("Wachtwoord is niet correct");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRET,
        {
          expiresIn: "1h"
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    },
    createUser: async (_, { userInput }) => {
      try {
        const existingUser = await User.findOne({
          email: userInput.email
        });

        if (existingUser) {
          throw new Error("Gebruiker bestaat al.");
        }

        const hashedPassword = await bcrypt.hash(userInput.wachtwoord, 12);

        const user = new User({
          naam: userInput.naam,
          image: null,
          email: userInput.email,
          wachtwoord: hashedPassword
        });

        const result = await user.save();

        return { ...result._doc, wachtwoord: null, _id: result.id };
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (_, { _id, naam, image, email, wachtwoord }) => {
      try {
        const hashedPassword = await bcrypt.hash(wachtwoord, 12);

        const user = await User.findByIdAndUpdate(
          _id,
          { naam, image, email, wachtwoord: hashedPassword },
          {
            new: true
          }
        );
        console.log(user);

        if (!user) {
          throw new Error("Gebruiker niet gevonden.");
        }

        return user;
      } catch (err) {
        throw err;
      }
    }
  }
};
