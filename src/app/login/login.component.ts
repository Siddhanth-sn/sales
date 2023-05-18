import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = {email:"", password:""};
  submit = false;
  loading = false;
errorMessage = "";
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
       
  }

   onSubmit(){
    this.loading = true;
    //call login api service
      this.auth.login(this.formdata.email, this.formdata.password) 
      .subscribe({
        next:data=>{
          this.auth.storeToken(data.idToken);
          this.auth.canAuthenticate();
        },
        error:data=>{
          if(data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL"){
            this.errorMessage = "invalid credentials!";
          }else{
            this.errorMessage = "unknown error occured ";
          }
        }
      }).add(()=>{
        this.loading = false;
        console.log( 'success!' );
        
      })
   }


}
