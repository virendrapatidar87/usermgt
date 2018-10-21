import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {UsersvcService} from '../usersvc.service';
import { User } from '../user';


//imp
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  user: FormGroup;
  editId;
  btnSubmit = "Submit";
  //userPic;
  constructor(private usvc:UsersvcService,private fb: FormBuilder,private cd: ChangeDetectorRef,private route: ActivatedRoute, private router: Router) {

    
   }
 
  
  ngOnInit() {
    this.route.params.subscribe(params => { this.editId = params['id']});
    console.log(this.editId + "   hjkasdhjkgjhsa");
     
    if(this.editId){
      this.usvc.getDataById(this.editId.trim()).subscribe(returndata => this.assignValue(returndata));
    }
    this.user = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3),
        Validators.maxLength(20)]],
     
        email: ['', [Validators.required,Validators.email]],
        gender:[''],
        dateofbirth: [''],
        id: [''],
        userPic: ['']
    });
    
  
  }
  assignValue(data): void {
    
    this.user.setValue({
      'fullName' : data.fullName,
      'email': data.email,
      'gender': data.gender,
      'id': data._id,
      'dateofbirth': 'sadsa',
      'userPic' : ''
    })
    this.btnSubmit = "Update";
    }
  get fullName() { return this.user.get('fullName'); }
   get email() { return this.user.get('email'); }

    onSubmit() {
     console.log(this.user);
    
     if(!this.user.valid)
         return;
     // Code to save the data
     // userService.Save(this.register.value);
     console.log("=======================================User Register====================================="+this.user.value);
     //user.mode = this.valbutton;
     var result;
     var u:User = this.user.value;
    
     if(this.btnSubmit == "Submit"){
      u.RegisteredVia = "Admin Panel";
      console.log(JSON.stringify(u));
     this.usvc.saveData(u).subscribe(data => { result = data;
      // localStorage.removeItem('currentUser');
     this.router.navigate(['/manageuser']);
    }
       , error =>  error);
    }else{

    this.usvc.updateData(u).subscribe(data => { result = data;
      // localStorage.removeItem('currentUser');
     this.router.navigate(['/manageuser']);
    }
       , error =>  error);
  }
    console.log(this.user.value);
      
    }
    Cancel()
    {

      this.user.reset();
      this.router.navigate(['/manageuser']);
    }
  
    onFileChange(event) {
      const reader = new FileReader();
   console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
    
        reader.onload = () => {
          this.user.patchValue({
            file: reader.result
         });
        
          // need to run CD since file load runs outside of zone
         this.cd.markForCheck();
        };
      }
    }
}
