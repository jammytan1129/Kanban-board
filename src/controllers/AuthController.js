const path = require('path');
const RegisterUseCase = require('../usecase/registerUseCase');
const GatewayFactory = require('../gateway/gatewayFactory');

const User = require('../mongoModel/user');
const Board = require('../mongoModel/board');

module.exports = {
  async login(req, res) {
    res.send(req.user);
  },
  async register(req, res) {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    let record = await newUser.save();
    res.send(record);

    // let registerUseCase = new RegisterUseCase(GatewayFactory.createUserGateway());
    // let userStructure = {
    //     email: req.body.username,
    //     password: req.body.password
    // }

    // try {
    //     let user = await registerUseCase.registerUser(userStructure);
    //     res.send(user);
    // } catch (err) {
    //     res.send(err.message);
    // }
  },
  async logout(req, res) {
    if (req.user)
        req.logout();
    res.send('logout');
  },
  async index(req, res) {
    res.send(JSON.stringify(req.user));
  },
  async findUserBoards(req, res) {
    let user = await User.findOne({_id: req.body.id});
    console.log(user);
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
    let pagePath = path.join(__dirname, '../views/pages/login');
    res.render(pagePath);
  },
  renderRegisterPage(req, res) {
    let pagePath = path.join(__dirname, '../views/pages/register');
    res.render(pagePath);
  }
}