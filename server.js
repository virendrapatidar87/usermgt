const express = require('express'),
	  bodyParser = require('body-parser'),
	  db = require("./database/database"),
	  dbseed = require("./config/dbseeder"),
	  router = require('./routes/router'),
	   path = require('path'),
	   debug = require('debug')('mean-app:server'),
	   port = '4300',
	   http = require('http'),
	  app = express();
	  

app.set('port', port);
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
db.connectDB();
dbseed.seed();
app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});
console.log(path.join(__dirname, 'dist')+"-------------------")
app.use(express.static(path.join(__dirname, 'dist/usermgt')));


//app.use('/usermgt', express.static(path.join(__dirname, 'dist')));
//app.use('/sample', sample); 
//var bodyParser = require('body-parser');

router.load(app, './controllers');
app.use("/*", function(req, resp) {
  resp.sendFile(path.join(__dirname, 'dist/usermgt/index.html'));
});
	 var server = http.createServer(app); 
	server.listen(port, function () {  
	    
	 console.log('Example app listening on port!'+port)  
	});
server.on('listening', onListening);
function onListening() {
  var addr = server.address();
  debug('Listening on ' + port);
}