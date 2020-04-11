const User = require('../mongoModel/user');

module.exports = class RegisterUseCase {
    setUserGateway(userGateway) {
        this._userGateway = userGateway;
    }

    async findUserByEmail(email) {
        const user = await this._userGateway.findUserByEmail(email);
        return user;
    }

    async findUserById(id) {
        const user = await this._userGateway.findUserById(id);
        return user;
    }

    async saveUser(userInfo) {
        const user = await this._userGateway.saveUser(userInfo);
        return user;
    }

    static async findUserByIdList(userIdList) {
        let users = await User.find({ _id: { $in: userIdList}});
        
        return users;
    }

    async registerUser(inputData) {
        console.log(inputData);

        let isUserExist = await this.findUserByEmail(inputData.email);
        if (isUserExist) 
            throw Error('Email Can Not Duplicate');

        return await this.saveUser(inputData);
    }

    static async findUserByEmail(email) {
        try {
            let user = await User.findOne({ email: email });
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

    static async saveUser(inputData) {
        let newUser = new User(inputData);
        try {
            return await newUser.save();
        } catch (err) {
            throw Error(err.message);
        }
    }

    static async registerUser(inputData) {
        let isUserExist = await this.findUserByEmail(inputData.email);
        if (isUserExist) 
            throw Error('Email Can Not Duplicate');

        return await this.saveUser(inputData);
    }
};