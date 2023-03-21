import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = {name:"",email:"",password:""};
  submit=false;
  errorMessage="";
  loading=false;

  constructor(private auth:AuthService){}

  ngOnInit(): void {  
  }
  onSubmit(){
    

    this.loading=true;
    this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        //store token from response data
        this.auth.storeToken(data.idToken);
        console.log("registered idtoken is"+ data.idToken );
        
      },
      error:data=>{
        if(data.error.error.message=="INVALID_EMAIL") {
          this.errorMessage = "invalid email";

        }
        else if (data.error.error.message=="EMAIL_EXIST"){
          this.errorMessage = "Email already exists";
        }
        else{
          
          this.errorMessage = "Unknown error occured";          
        }

      }
    }).add(()=>{
      this.loading=false;
      console.log("register successful");
      
    })
  }

}
