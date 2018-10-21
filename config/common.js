const dateformat = require('dateformat');

class CommonUtils {

	constructor(router) {
	  //this.getCurrnetDate();
  }

  getCurrnetDate(){

    var now = new Date();
    
  return dateformat(now, "ddmmyyyy"); //, hh:MM:ss TT
  }

  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(1000));
  }
  
}
module.exports = CommonUtils;