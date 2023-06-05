const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password:  { type: String, required: true},
  email: { type: String, unique: true, required: true},
  isPremiumUser: { type: Boolean, require: false}  
});


module.exports = mongoose.model("users", userSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   password:  { type: String, required: true},
//   email: { type: String, unique: true, required: true},
//   isPremiumUser: { type: Boolean, require: true}
//   //roles: { type: [String], required: true }
// });


// module.exports = mongoose.model("user", userSchema);

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   password:  { type: String, required: true},
//   email: { type: String, unique: true, required: true},
//   isPremiumUser: { type: Boolean, require: true},
//   roles: { type: [String], required: true }
// });


// module.exports = mongoose.model("users", userSchema);