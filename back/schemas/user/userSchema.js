const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true , unique: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    telephone: {type: Number, required: true},
    DofB: {type: Date, required: true},
    image: String,
    gender: {type: String, required: true},
    address: {
        country: String,
        city: String,
        address_line1: String,
        address_line2: String,
        postal_code: Number,
    },
    wishlist: [{type:'ObjectId',ref:'products'}]
},{timestamps: true});
userSchema.plugin(uniqueValidator);
userSchema.pre('save', async function (next) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
    next();
  });
User = mongoose.model('users',userSchema)
module.exports  = User

