const usermgt = require('../../../models/usermgt'),
verifytoken = require('../../../config/verifytoken'),
commonutils = require('../../../config/common')
class UserMgtController {
  
  commonUtils = new commonutils();
  
  constructor(router) {
	  router.post('/addUser', verifytoken, this.addUser.bind(this));
    router.put('/updateUser', verifytoken, this.updateUser.bind(this));
    router.get('/listUser', verifytoken, this.listUser.bind(this));   
  }

  addUser(req,res){
    console.log(req.body)
   var reqUserData = new usermgt(req.body);
   reqUserData.password = reqUser.generateHash('user1234');
   reqUserData.createdDate = commonUtils.getCurrnetDate();
   reqUserData.updatedDate = reqUserData.createdDate;
   reqUserData.role = 'user';
   console.log("data --------------------------------"+ reqUserData);
   reqUserData.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({value : 'user added succesfull'});
      }
    });
  }   
  updateUser(req,res){
    console.log(req.body)
    var umgt = new usermgt(req.body);
    umgt.updatedDate = commonUtils.getCurrnetDate();

    project.findByIdAndUpdate(req.body.id,JSON.stringify(umgt),function (err, data) {
            if (err) {
                 res.send(err);
             } else {
                 res.send({
                     data: "Project has been updated..!!"
                 });
             }
         });
 }

  listUser(req, res) {
      usermgt.find({}, function (err, data) {
          if (err) {
              res.send(err);
          } else {
              res.send(data);
          }
      });
  }
 }
module.exports = UserMgtController;