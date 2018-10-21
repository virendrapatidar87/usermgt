import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../pages.service';
import { PageModel } from '../pageModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {
  pageId;
  objPage:PageModel=new PageModel();
  showPreview=false;
  editorConfig={
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "300px",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontName", "fontSize", "color"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "image", "video"]
    ]
};
  constructor(private route: ActivatedRoute, private router: Router, private pgsvc:PagesService ) { 
    

    this.route.params.subscribe(params => { 
      this.objPage.PageID = params['id'];
  
  
  
  this.setPageTitle();
  console.log(this.objPage.Title);
  console.log(this.objPage.name);
  const pr = this.pgsvc.getDataByName(this.objPage.name.trim()).pipe(take(1));
  pr.subscribe(x=>this.objPage=x);
});
   

  }
  ngOnInit()
  {
    
    
   
  }
 save()
 {
 
console.log(this.objPage.Discription);
console.log(this.objPage.Title);
this.pgsvc.updateData(this.objPage).subscribe(data => {  data;
  // localStorage.removeItem('currentUser');
 this.router.navigate(['/dashboard']);
}
   , error =>  error);
//this.router.navigate(['/dashboard']);

 }
 preview()
 {
 this.showPreview=true;
 }
 back()
 {
 this.showPreview=false;
 }
 cancel()
 {
  this.objPage=null;
  this.router.navigate(['/dashboard']);
 }
 
private setPageTitle()
{
switch(this.objPage.PageID.toString())
{
case "1":
this.objPage.Title='About Us';
this.objPage.name='About';
break;
case "2":
this.objPage.Title='Contact Us';
this.objPage.name="Contact";
break;
case "3":
this.objPage.Title= 'Terms & Condition';
this.objPage.name="Terms";
break;
case "4":
this.objPage.Title='Privacy Policy';
this.objPage.name="Privacy";
break;
}

}
}
