const User = require('../mongoModel/user');

module.exports = class RegisterUseCase {

    static async findUserByEmail(email) {
        try {
            let user = await User.findOne({ email });
            return user;
        } catch(err) {
            throw Error(err.message);
        }
    }

    static async findUserById(id) {
        try {
            let user = await User.findOne({ _id: id });
            return user;
        } catch(err) {
            throw Error(err.message);
        }
    }

    static async registerUser(inputData) {
        let isUserExist = await this.findUserByEmail(inputData.email);
        if (isUserExist) 
            throw Error('Email Can Not Duplicate');

        let newUser = new User({
            email: inputData.email,
            password: inputData.password
        });

        try {
            return await newUser.save();
        } catch (err) {
            throw Error(err.message);
        }
    }
};