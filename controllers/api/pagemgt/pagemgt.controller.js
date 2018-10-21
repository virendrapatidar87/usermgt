const Pages = require('../../../models/Pages'),
verifytoken = require('../../../config/verifytoken');





//commonUtils = new commonutils();
class PageMgtController
 {
  constructor(router) {
	
    router.put('/', verifytoken, this.updatePage.bind(this));
    router.get('/:name', verifytoken, this.getByPageName.bind(this)); 
   
  }

   updatePage(req,res){
    console.log(req.body)
    //var umgt = new usermgt(req.body);
  var pmgt = JSON.parse(JSON.stringify(req.body));
    
   // {updatedDate : updatedDate ,email : req.body.email, fullName : req.body.fullName, gender : req.body.gender}
   Pages.findByIdAndUpdate(req.body.id,pmgt
      ,function (err, data) {
            if (err) {
                 res.send(err);
             } else {
                 res.send({
                     data: "Page has been updated..!!"
                 });
             }
         });
 }

  
 getByPageName(req, res, next) {

    Pages.findOne({"name":req.params.name}, function (err, data) {
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
module.exports = PageMgtController;