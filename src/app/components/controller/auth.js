const users = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('./../../../configs/jwt');


const register = async (req, res) => {
  try {
    const candidate = req.body;
    const isUserExist = await users.findOne({ email: candidate.email });
    if (isUserExist) {
      return res.status(409).json({ message: 'User with this email address already exists!' });
    }
    const salt = bcrypt.genSaltSync(10);
    candidate.password = bcrypt.hashSync(candidate.password, salt);

    await users.create(candidate);

    return res.status(201).json(true)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
};

const login = async (req, res) => {
  try {
    const loginData = req.body;
    const user = await users.findOne({ email: loginData.email }, { __v: false })
    if (!user) {
      return res.status(404).json({ message: 'User with this e-mail address does not exist!' });
    }
    const isPasswordsMatch = bcrypt.compareSync(loginData.password, user.password);
    if (!isPasswordsMatch) {
      return res.status(409).json({ message: 'The entered password is not correct!' })
    } else {
      let token = jwt.sign(
        { email: user.email, _id: user._id },
        jwtConfig.key,
        jwtConfig.config
      );
      token = `Bearer ${token}`;
      const { email, _id, nickName } = user;
      const result = { token, email, _id, nickName };
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
};

module.exports = {
  login,
  register
}