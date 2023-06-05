const User = require('../models/user');

//module.exports = {};

module.exports.createUser = async (userObj) => {
    const user = new User({ email: userObj.email, password: userObj.password, roles: ['user']});
    await User.create(user);    
    //TODO: need a confirmation?
}

module.exports.retrieveUserByEmail = async (email) => {
    var result = await User.findOne({ email: email });
    return result;
}

module.exports.updateUserPassword = async (userId, hashedPassword) => {    
    return  await User.updateOne({ _id: userId }, { password: hashedPassword });
}

