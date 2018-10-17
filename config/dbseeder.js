// Module dependencies
const   mongoose = require('mongoose'),
        mgtuser = require('../models/usermgt');
        
        
class DBSeeder {
    
    
    
    seed() {

        console.log('Seeding data....');

        mgtuser.findOneAndRemove( { role:'admin'}, function(err,data) {
            if (err) {
            //  res.send(err)";
            console.log("error "+err);  
            } else {
             console.log("delete record "+data)
            }
          });
        var admUser =
        [
            {"fullName":"adm123","email":"adm123@test.com","gender":"m","RegisteredVia":"seeder","password":"$2a$08$XKx1aRGYp7ujemde4i0aYu8s1psfh5YUpMdI7GcPCG9pF9HxzOoLa","updatedDate":"17102018","role":"admin"},
            {"fullName":"adm456","email":"adm456@test.com","gender":"m","RegisteredVia":"seeder","password":"$2a$08$DPYLuMvyRcum/j16g0kOPu/sTQZf1Ja8AK6BgjQpDjRlgVvSstYSm","updatedDate":"17102018","role":"admin"}  
        ];
       
        var l = admUser.length,i = 0;
    for(i = 0; i < l; i++){
        mgtuser.findOneAndRemove( { role:'admin'}, function(err,data) {
            if (err) {
            //  res.send(err)";
            console.log("error "+err);  
            } else {
             console.log("delete record "+data)
            }
          }); 
    }

    for (i = 0; i < l; i++) {
        
        var mgtSaveUser = new mgtuser ( JSON.parse(JSON.stringify(admUser[i])));
         
          mgtSaveUser.save();
    }
}
}

module.exports = new DBSeeder();




