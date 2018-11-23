const path = require('path');
const RegisterUseCase = require('../usecase/registerUseCase');
const UserUseCase = require('../usecase/userUseCase');

const User = require('../mongoModel/user');
const Board = require('../mongoModel/board');

module.exports = {
  async login(req, res) {
    let isAuthenticed = false;
    if (req.user)
      isAuthenticed = true;
    
    res.send(isAuthenticed);
  }, 
  async testUserLogin(req, res) {
    res.send(req.user);
  },
  async getUserInfo(req, res) {
    res.send(req.user);
  },
  async saveUserInfo(req, res) {
    try {
      await UserUseCase.saveUserInfo(req.body);
      res.send({success: true, message: "save success"});
    } catch(err) {
      res.send({success: false, message: "save failed"});
    }
    
  },
  async register(req, res) {
    try {
      let user = await RegisterUseCase.registerUser(req.body);
      res.send(user);
    } catch(err) {
      res.send(err.message);
    }
  },
  async logout(req, res) {
    if (req.user)
        req.logout();
    res.send('logout');
  },
  async findUserBoards(req, res) {
    let user = await User.findOne({_id: req.body.id});
    res.send(user.board_list);
  },
  async createNewBoard(req, res) {
    let user = await User.findOne({_id: req.body.id});
    let board = new Board({
      name: req.body.name,
      members: [
        {
          userFk: user._id,
          name: user.name,
          email: user.email,
        }
      ]
    });
    board = await board.save();
    
    user.board_list.push(board);
    await user.save();
    res.send(user);
  },
  renderLoginPage(req, res) {
    let pagePath = path.join(__dirname, '../views/pages/layouts/login');
    res.render(pagePath);
  },
  renderRegisterPage(req, res) {
    let pagePath = path.join(__dirname, '../views/pages/layouts/register');
    res.render(pagePath);
  },
  renderUserProfilePage(req, res) {
    let pagePath = path.join(__dirname, '../views/pages/layouts/profile');
    res.render(pagePath);
  }
}