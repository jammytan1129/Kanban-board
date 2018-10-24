const path = require('path');
const RegisterUseCase = require('../usecase/registerUseCase');
const GatewayFactory = require('../gateway/gatewayFactory');

module.exports = {
  async login(req, res) {
    res.send(req.user);
  },
  async register(req, res) {
    let registerUseCase = new RegisterUseCase(GatewayFactory.createUserGateway());
    let userStructure = {
        email: req.body.username,
        password: req.body.password
    }

    try {
        let user = await registerUseCase.registerUser(userStructure);
        res.send(user);
    } catch (err) {
        res.send(err.message);
    }
  },
  async logout(req, res) {
    if (req.user)
        req.logout();
    res.send('logout');
  },
  async index(req, res) {
    res.send(JSON.stringify(req.user));
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