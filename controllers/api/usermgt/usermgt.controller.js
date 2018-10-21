const usermgt = require('../../../models/usermgt'),
verifytoken = require('../../../config/verifytoken'),
commonutils = require('../../../config/common'),
multer  =   require('multer'),
fs= require('fs'),
usertarget = require('../../../models/usertarget');

/*storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
}),*/
//upload = multer({ storage : storage}).single('file');


commonUtils = new commonutils();
class UserMgtController {
  constructor(router) {
	router.post('/', verifytoken, this.addUser.bind(this));
    router.put('/', verifytoken, this.updateUser.bind(this));
    router.get('/', verifytoken, this.listUser.bind(this));  
    router.get('/avatar/:id',  this.getImg.bind(this));  
    router.get('/:id', verifytoken, this.getById.bind(this)); 
    router.delete('/:id',verifytoken, this.delete.bind(this));
    router.post('/login', this.login.bind(this));
   // this.addTarget.bind(this)
  }

  addUser(req,res){
    console.log(req.body)
   var reqUserData = new usermgt(req.body);
   reqUserData.password = reqUserData.generateHash('user1234');
   

   reqUserData.createdDate = commonUtils.getCurrnetDate();
   reqUserData.updatedDate = reqUserData.createdDate;
   reqUserData.role = 'user';
   console.log("data --------------------------------"+ reqUserData);
  //var fileData =   req.body.file.split(";base64,").pop();

  var imageBuffer;
    if(req.body.file){
      imageBuffer=  this.decodeBase64Image(req.body.file);
  }
  
  reqUserData.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        
         if(req.body.file){
           var filename=data._id+"_avtar.jpg";
          
          fs.writeFile('uploads/'+filename, imageBuffer.data, function(err) {});
          
        }
        
        
        
         var usertargetObj = new usertarget();
         usertargetObj.target= commonUtils.getRandomInt() ;
         console.log(usertargetObj.target +"****************************************");
        var ac=((parseInt(usertargetObj.target)*70)/100);
        console.log(ac +"****************************************");
         usertargetObj.achiveTarget =ac;
         usertargetObj.userId=data._id;
         usertargetObj.createdDate=commonUtils.getCurrnetDate();
         usertargetObj.targetAchivedDate =commonUtils.getCurrnetDate();
        
         usertargetObj.save(function(err, data) {
            if (err) {
            //  res.send(err);
          console.log(err+" target");  
          } else {
               console.log('Target Added '+data);
              //res.status(200).send({value : 'user added succesfull'});
            }
          });
          
        


        res.status(200).send({value : 'user added succesfull'});
      }
    });

    
  }  
   decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
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
            
            console.log(data.length+"djkkhkjhfkjhdj");
           for(let i=0;i<data.length;i++  ){
           // console.log(JSON.stringify(data[i])); 
            var imgName =   "uploads/"+data[i]._id+"_avtar.jpg";
            var bitmap;
            if(fs.existsSync(imgName)){
            bitmap = fs.readFileSync(imgName);
            }else{
              bitmap = fs.readFileSync("uploads/icon.jpg");
            }
            var base64str = 'data:image/jpg;base64,'+new Buffer(bitmap).toString('base64');
            //console.log(base64str);
            var convertedJSON = JSON.parse(JSON.stringify(data[i]));
            convertedJSON.file = base64str;
            data[i] = convertedJSON;
           // var d = JSON.parse(data[i]);
            //d.file =base64str;
//data[i] = JSON.stringify(d);
            }
           
            res.send(data);
          }
      });
  }
 getImg(id) {
  var imgName =   "uploads/"+id+"_avtar.jpg";
  var base64str = 'data:image/jpg;base64,'+this.base64_encode(imgName);
 // res.send( 'data:image/jpg;base64,'+base64str);
  }
   base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
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

