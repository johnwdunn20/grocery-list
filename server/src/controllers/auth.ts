import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import models from "../models/models";

const SALT_WORK_FACTOR = 10;

// helper function to create a jwt
function createToken(id: string) {
  // jwt sign takes in:
  // payload - obj: use primary key value
  // secret key: string stored in .env
  // options - includes:
  // algorithm (defaults to HS256)
  // expiresIn (seconds?)
  // callback
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}

// helper function to hash passwords
function hashPassword(password: string) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
      if (err) {
        reject({
          log: `Error hashing password`,
          status: 500,
          message: { err: `Error in signup` },
        });
      } else {
        resolve(hash);
      }
    });
  });
}

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      // check if email and password are present
      if (!email || !password) {
        return next({
          log: `Missing email or password`,
          status: 400,
          message: { err: `Missing email or password` },
        });
      }
      // check if user exists
      const user = await models.User.findOne({
        email: email.toLowerCase(),
      }).exec();
      if (!user) {
        // invoke bcrypt.compare on something random to prevent timing attacks
        const result = await bcrypt.compare("random", "random");
        return next({
          log: `Email/password combo does not exist`,
          status: 400,
          message: { err: `Email does not exist` },
        });
      }

      // check if password matches
      const match = await bcrypt.compare(password, user.password);
      // if it doesn't, return error
      if (!match) {
        return next({
          log: `Email/password combo does not exist`,
          status: 400,
          message: { err: `Incorrect Password` },
        });
      }

      // create token
      const token = createToken(user.id);
      // insert into session
      const session = await models.Session.create({
        user: user.id,
        token: token,
      });
      // set cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        // Need to specify sameSite: "none" for cross-site cookies since my frontend is on a different domain than my backend
        sameSite: "none",
      });
      // send back user id
      res.locals.id = user.id;

      // create a session in the database
      // const session = await models.Session.create({
      //   user: user.id,
      //   token: token,
      //   expiration: new Date(Date.now() + parseInt(process.env.JWT_EXPIRATION) * 1000)
      // });

      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in authController.login. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // delete session from database
      console.log("req.cookies.jwt", req.cookies.jwt);
      await models.Session.deleteOne({ token: req.cookies.jwt });

      // delete cookie (effectively sets expiration date to now so it immediately expires)
      res.clearCookie("jwt");

      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in authController.logout. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  signup: async (req: Request, res: Response, next: NextFunction) => {
    console.log("Signing up route");
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return next({
          log: `Missing name, email, or password`,
          status: 400,
          message: { err: `Missing name, email, or password` },
        });
      }
      // check if user exists
      const user = await models.User.findOne({
        email: email.toLowerCase(),
      }).exec();
      if (user) {
        return next({
          log: `User already exists`,
          status: 400,
          message: { err: `User already exists` },
        });
      }
      // hash password
      const hashedPassword = await hashPassword(password);
      // create user
      const newUser = await models.User.create({
        name: name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      // create token
      const token = createToken(newUser.id);

      // insert into session
      console.log("newUser.id", newUser.id);
      const session = await models.Session.create({
        user: newUser.id,
        token: token,
      });

      // set cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      // send back user id?
      res.locals.id = newUser.id;
      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in authController.signup. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get token from cookie
      const token = req.cookies.jwt;
      // check if token exists
      if (!token) {
        return next({
          log: `No token on JWT`,
          status: 400,
          message: { err: `No token` },
        });
      }
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // check if user exists
      const user = await models.User.findById(decoded.id).exec();
      if (!user) {
        return next({
          log: `User does not exist`,
          status: 400,
          message: { err: `User does not exist` },
        });
      }
      // check if session exists
      const session = await models.Session.findOne({
        user: user.id,
        token: token,
      }).exec();
      // if session doesn't exist, create a new one
      if (!session) {
        const newSession = await models.Session.create({
          user: user.id,
          token: token,
        });
      }

      // set userId on res.locals
      res.locals.id = user.id;
      res.locals.name = user.name;
      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in authController.isLoggedIn. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },
};

export default authController;
