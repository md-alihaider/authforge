import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";
export const signup = async (req, res) => {
  //recieve payload
  const { email, password, name } = req.body;

  try {
    //validation
    if (!email || !password || !name) {
      throw new Error("All fieds are required");
    }

    //check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //hash password
    const hashPassword = await bcryptjs.hash(password, 10);
    //create verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    //create user
    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24hours
    });

    //save user
    await user.save();

    //creating token
    generateTokenAndSetCookie(res, user._id);

    //send verification email
    await sendVerificationEmail(user.email, verificationToken);

    //send response
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  //recieve payload verification code
  const { code } = req.body;
  try {

    //check if code is valid
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }, //check if token is not expired
    });

    //if code is not valid
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Verification Code",
      });
    }

    //update user
    user.isVarified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //send welcome email
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifying email", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const login = async (req, res) => {
  res.send("login routes");
};

export const logout = async (req, res) => {
  res.send("logout routes");
};
