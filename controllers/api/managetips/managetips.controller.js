const tips = require('../../../models/tips'),
verifytoken = require('../../../config/verifytoken'),
commonutils = require('../../../config/common');
class ManageTipsController {

	constructor(router) {
	  router.post('/', verifytoken,this.addTip.bind(this));
    router.put('/',verifytoken, this.updateTip.bind(this));
    
    router.get('/',verifytoken, this.listTips.bind(this));  
    router.get('/:id',verifytoken, this.getById.bind(this));   
     router.get('/user/:uid',verifytoken, this.getByUserId.bind(this));  
      router.delete('/:id',verifytoken, this.delete.bind(this));  
  }

  addTip(req,res){
    console.log(req.body)
   var reqtipData = new tips(req.body);
  
   reqtipData.createdDate = commonUtils.getCurrnetDate();
   
  
   console.log("data --------------------------------"+ reqtipData);
   reqtipData.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({value : 'tip added succesfull'});
      }
    });
  }   
  updateTip(req,res){
    console.log(req.body)
    var reqtipData = JSON.parse(JSON.stringify(req.body));
    reqtipData.updatedDate = commonUtils.getCurrnetDate();

    tips.findByIdAndUpdate(req.body.id,reqtipData,function (err, data) {
            if (err) {
                 res.send(err);
             } else {
                 console.log(JSON.stringify(data) );
                 res.send({
                     data: "tip has been updated..!!"
                 });
             }
         });
 }

  listTips(req, res) {
      console.log("data -----------log che---------------------");
    tips.find({}, function (err, data) {
          if (err) {
              res.send(err);
          } else {
              res.send(data);
          }
      });
  }
  getById(req, res, next) {

  tips.findById(req.params.id, function (err, data) {
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
  getByUserId(req, res) {
      
    usertarget.find({'userId' : req.params.uid}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
}
   delete(req, res) {
    console.log(req.role+"--------------------------");
    if(req.role == 'admin'){
    tips.findByIdAndRemove(req.params.id,function (err, data) {
           if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "tip has been deleted..!!"
                });
            }
        });
    }else{
        res.status(403).send('not authorized user');
    }
  }
 }
module.exports = ManageTipsController;