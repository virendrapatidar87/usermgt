const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      config = require('../config/config');

// define the schema for our user model
const userMgtSchema = mongoose.Schema({      
    
    
    fullName: { type: String   },
    isActive: { type: Boolean   },
    gender: { type: String   },
    email: { type: String   },
    dob:{ type: String   },
    updatedDate:{ type: String   },
    RegisteredVia:{ type: String   },
    astLoginDate:{ type: String   },
    LastLoginDevice:{ type: String   },
    password:{ type: String},
    role:{ type: String}
   },{ versionKey: false });
   
   userMgtSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    
    userMgtSchema.methods.genrateToken = function(emailId,userId,role){
        var token = jwt.sign({ id: userId, email : emailId, userrole : role  }, config.secret, {
            expiresIn: 82000 // expires in 24 hours
          });
    return token;
    };
    
    userMgtSchema.methods.comparPass = function(password,dbpass){
        console.log('current pass '+password + 'db pass' + dbpass);
        var passwordIsValid = bcrypt.compareSync(password,dbpass );
    return passwordIsValid;
    };
    // checking if password is valid
    userMgtSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };
   
module.exports = mongoose.model('usermgt', userMgtSchema,'usermgt');
