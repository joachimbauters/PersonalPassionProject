const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model.js");
const Abbonement = require("./models/abbonement.model.js");

const tokenCookie = {
  maxAge: 1800000,
  sameSite: true
};
const signatureCookie = {
  maxAge: 86400000,
  httpOnly: true,
  sameSite: true
};

const fillAbbonementen = abbonementIds => {
  return Abbonement.find({ _id: { $in: abbonementIds } })
    .then(abbonementen => {
      return abbonementen.map(abbonement => {
        return {
          ...abbonement._doc,
          _id: abbonement.id,
          startTime: new Date(abbonement._doc.startTime).toISOString(),
          endTime: new Date(abbonement._doc.endTime).toISOString(),
          user: fillUser.bind(this, abbonement.user)
        };
      });
    })
    .catch(err => {
      throw err;
    });
};

const fillUser = userId => {
  return User.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        _id: user.id,
        createdAbbonementen: fillAbbonementen.bind(
          this,
          user._doc.createdAbbonementen
        )
      };
    })
    .catch(err => {
      throw err;
    });
};

const NEW_ABBONEMENT = "NEW_ABBONEMENT";

module.exports = {
  Subscription: {
    newAbbonement: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_ABBONEMENT)
    }
  },
  Query: {
    users: () => {
      return User.find()
        .then(users => {
          return users.map(user => {
            return {
              ...user._doc,
              _id: user.id,
              createdAbbonementen: fillAbbonementen.bind(
                this,
                user._doc.createdAbbonementen
              )
            };
          });
        })
        .catch(err => {
          throw err;
        });
    },
    user: async (_, __, ctx) => {
      if (!ctx.request.isAuth) {
        throw new Error("Niet ingelogd");
      }
      try {
        const id = ctx.request.userId;
        const user = await User.findById(id);
        return {
          ...user._doc,
          _id: user.id,
          createdAbbonementen: await fillAbbonementen(
            user._doc.createdAbbonementen
          )
        };
      } catch (err) {
        throw err;
      }
    },
    abbonementByAsteroid: async (_, { asteroidId }) => {
      try {
        const abbonement = await Abbonement.findOne({
          asteroidId: asteroidId
        });
        if (!abbonement) {
          return null;
        }
        return {
          ...abbonement._doc,
          _id: abbonement.id,
          startTime: new Date(abbonement._doc.startTime).toISOString(),
          endTime: new Date(abbonement._doc.endTime).toISOString(),
          user: await fillUser(abbonement._doc.user)
        };
      } catch (err) {
        throw err;
      }
    },
    abbonementen: () => {
      return Abbonement.find()
        .then(abbonementen => {
          return abbonementen.map(abbonement => {
            return {
              ...abbonement._doc,
              _id: abbonement.id,
              startTime: new Date(abbonement._doc.startTime).toISOString(),
              endTime: new Date(abbonement._doc.endTime).toISOString(),
              user: fillUser(abbonement._doc.user)
            };
          });
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    login: async (_, { email, wachtwoord }, ctx) => {
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
          expiresIn: "24h"
        }
      );

      const parts = token.split(".");
      const signature = parts.splice(2);

      ctx.response.cookie("token", parts.join("."), tokenCookie);
      ctx.response.cookie("signature", signature, signatureCookie);

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
    createAbbonement: async (_, { abbonementInput }, { request, pubsub }) => {
      if (!request.isAuth) {
        throw new Error("Niet ingelogd");
      }

      const abbonement = new Abbonement({
        asteroidId: abbonementInput.asteroidId,
        price: +abbonementInput.price,
        naam: abbonementInput.naam,
        startTime: new Date(abbonementInput.startTime),
        endTime: new Date(abbonementInput.endTime),
        active: abbonementInput.active,
        user: request.userId
      });

      let createdAbbonement;
      return abbonement
        .save()
        .then(result => {
          createdAbbonement = {
            ...result._doc,
            _id: result.id,
            startTime: new Date(abbonement._doc.startTime).toISOString(),
            endTime: new Date(abbonement._doc.endTime).toISOString(),
            user: fillUser.bind(this, result._doc.user)
          };
          return User.findById(request.userId);
        })
        .then(user => {
          if (!user) {
            throw new Error("Gebruiker niet gevonden.");
          }
          user.createdAbbonementen.push(abbonement);
          return user.save();
        })
        .then(() => {
          pubsub.publish(NEW_ABBONEMENT, {
            newAbbonement: createdAbbonement
          });
          return createdAbbonement;
        })
        .catch(err => {
          throw err;
        });
    },
    updateUser: async (_, { naam, image, email, wachtwoord }, ctx) => {
      if (!ctx.request.isAuth) {
        throw new Error("Niet ingelogd");
      }
      try {
        const _id = ctx.request.userId;
        const hashedPassword = await bcrypt.hash(wachtwoord, 12);

        const user = await User.findByIdAndUpdate(
          _id,
          { naam, image, email, wachtwoord: hashedPassword },
          {
            new: true
          }
        );
        if (!user) {
          throw new Error("Gebruiker niet gevonden.");
        }

        return user;
      } catch (err) {
        throw err;
      }
    },
    cancelAbbonement: async (_, { abbonementId }, ctx) => {
      if (!ctx.request.isAuth) {
        throw new Error("Niet ingelogd");
      }
      try {
        const abbonement = await Abbonement.findByIdAndDelete({
          _id: abbonementId
        });
        if (!abbonement) {
          throw new Error("abbonement niet gevonden");
        }
        return abbonement;
      } catch (err) {
        throw err;
      }
    }
  }
};
