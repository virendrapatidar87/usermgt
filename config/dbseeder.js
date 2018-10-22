// Module dependencies
const   mongoose = require('mongoose'),
        mgtuser = require('../models/usermgt'),
        pages = require('../models/Pages'),
        comman = require('../config/common'),
        commanObject = new comman();
        
        
class DBSeeder {
    
    seedpages(id)
{
    
  /*   obj.findOne({ email:'adm123@test.com'},function(err,data) {
        if (err) {
            //  res.send(err)";
            console.log("error "+err);  
            } else { */
                

               

            }
    
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
       
        var l = admUser.length,i = 0,k=0;
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
         
          mgtSaveUser.save(function(err,data){
              console.log("asjkhdsjkadjkhsajhk"+data);
             // this.seedpages(JSON.parse(data)._id);

             if(data.email == "adm123@test.com"){
var uid=data._id;
              var admin;
    var admPages =
        [
            {"name":"About","Title":"About Us","Discription":"About Description","status":"true","createdBy":uid,"createdDate":"17102018"},
            {"name":"Contact","Title":"Contact Us","Discription":"Contact Description","status":"true","createdBy":uid,"createdDate":"17102018"},
            {"name":"Terms","Title":"Terms & Condition","Discription":"Terms & Condition Description","status":"true","createdBy":uid,"createdDate":"17102018"},
            {"name":"Privacy","Title":"Privacy Policy","Discription":"Privacy Policy Description","status":"true","createdBy":uid,"createdDate":"17102018"},
        ];
      /*   for (k = 0; k <admPages.length; k++) {
        pages.findOneAndRemove({ name:admPages[k].name}, function(err,data) {
            if (err) {
            //  res.send(err)";
            console.log("error "+err);  
            } else {
             console.log("delete record for pages"+data)
             
            }
          }); 
        } */
pages.find({},function(err,data){
if(err){

}else{
    console.log(data.length+ " ******************** ")
    if(data.length > 0){
console.log("pages allready exist");
// for (k = 0; k <admPages.length; k++) {
//     pages.findOneAndRemove({ "name":admPages[k].name}, function(err,data) {
//         if (err) {
//         //  res.send(err)";
//         console.log("error "+err);  
//         } else {
//          console.log("delete record for pages"+data)
//          var mgtSavePage = new pages (data);
             
//              mgtSavePage.createdDate = commanObject.getCurrnetDate();
//              console.log(JSON.stringify(mgtSavePage));
//              mgtSavePage.save();
//         }
//       });
//     }
    }else{
        for (k = 0; k <admPages.length; k++) {
            
            var mgtSavePage = new pages (JSON.parse(JSON.stringify(admPages[k])));
            
             mgtSavePage.createdDate = commanObject.getCurrnetDate();
             console.log(JSON.stringify(mgtSavePage));
             mgtSavePage.save();

        }
    }
}
});

}  
    });
          //console.log(data)
          
    }
   
       
       
    
   
}


   /*  });
} */
}


module.exports = new DBSeeder();




