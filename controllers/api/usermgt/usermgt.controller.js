const usermgt = require('../../../models/usermgt'),
verifytoken = require('../../../config/verifytoken'),
commonutils = require('../../../config/common'),
commonUtils = new commonutils();
class UserMgtController {
  constructor(router) {
	router.post('/', verifytoken, this.addUser.bind(this));
    router.put('/', verifytoken, this.updateUser.bind(this));
    router.get('/', verifytoken, this.listUser.bind(this));  
    router.get('/:id', verifytoken, this.getById.bind(this)); 
    router.delete('/:id',verifytoken, this.delete.bind(this));
    router.post('/login', this.login.bind(this));
  }

  addUser(req,res){
    console.log(req.body)
   var reqUserData = new usermgt(req.body);
   reqUserData.password = reqUserData.generateHash('user1234');
   

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
    //var umgt = new usermgt(req.body);
  var umgt = JSON.parse(JSON.stringify(req.body));
    var updatedDate = commonUtils.getCurrnetDate();
   // {updatedDate : updatedDate ,email : req.body.email, fullName : req.body.fullName, gender : req.body.gender}
    usermgt.findByIdAndUpdate(req.body.id,umgt
      ,function (err, data) {
            if (err) {
                 res.send(err);
             } else {
                 res.send({
                     data: "User has been updated..!!"
                 });
             }
         });
 }

  listUser(req, res) {
      usermgt.find({role : { $ne: 'admin' }}, function (err, data) {
          if (err) {
              res.send(err);
          } else {
              res.send(data);
          }
      });
  }

  login(req,res){
    //var reqUser = new user(req.body);
    usermgt.findOne({email : req.body.username}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
    	  console.log("data --------------------------------"+ data);
        var newUser = new usermgt(data);
        console.log("data --------------------------------"+ newUser);
        if(newUser.role == 'admin'){
        var passwordIsValid = newUser.comparPass(req.body.password, newUser.password);
        if(passwordIsValid){
        var newUser = new usermgt(data);
         var genToken = newUser.genrateToken(newUser);
          res.status(200).send({auth : true , token : genToken, user : {role : newUser.role, name : newUser.fullName, email : newUser.email}});
        }else{
          return res.status(401).send({ auth: false, token: null });
        }
      }else{
        res.status(403).send('not authorized user');
      }
      }
    });
  }

  delete(req, res) {
    console.log(req.role+"--------------------------");
    if(req.role == 'admin'){
    usermgt.findByIdAndRemove(req.params.id,function (err, data) {
           if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "user has been deleted..!!"
                });
            }
        });
    }else{
        res.status(403).send('not authorized user');
    }
  }

getById(req, res, next) {

  usermgt.findById(req.params.id, function (err, data) {
      if (err) {
          res.send(err);
      } else {
          if(data){
          res.send(data);
          }else{
              res.status(404).send('Requested data not found!');
          }
      }
  });
}
 }
module.exports = UserMgtController;