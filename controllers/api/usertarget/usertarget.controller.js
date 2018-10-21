const usertarget = require('../../../models/usertarget');

class UserTargetController {

	constructor(router) {
	/*   router.post('/addUser', this.addUser.bind(this));
    router.put('/updateUser', this.updateUser.bind(this));
    */
    router.get('/', this.listTarget.bind(this));  
    router.get('/user/:uid', this.getByUserId.bind(this));    
  }

 /*  addUser(req,res){
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
 */
  listTarget(req, res) {
    usertarget.find({}, function (err, data) {
          if (err) {
              res.send(err);
          } else {
              res.send(data);
          }
      });
  }
  getByUserId(req, res) {
      
    usertarget.find({'userId' : req.params.uid}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
}
  
 }
module.exports = UserTargetController;