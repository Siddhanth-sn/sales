import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient) { }

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  
  }
  
  canAccess(){
    if (!this.isAuthenticated()){
      // redirects to login page
      this.router.navigate(['/login']);

    }
  }
  
  canAuthenticate(){
    if (this.isAuthenticated()){
      // redirect to dashboard page
      this.router.navigate(['/dashboard']);

    }    
  }
// =================================================================
// ==============================================================
  register(name:string,email:string,password:string){
    //send data to resigter api(firebase)
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBL3wDM99q5zB51B5NsqFNj_IIFLXCF-NQ',
        {displayName:name,email,password}
    );
  
  }

  storeToken(token:string){
    sessionStorage.setItem('token',token);

  }

  login(email:string,password:string){
//send data to login api 
   return this.http
   .post<{idToken:string}>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBL3wDM99q5zB51B5NsqFNj_IIFLXCF-NQ',
    {email:email,password:password}
   );
  }
  removetoken(){
    sessionStorage.removeItem('token');
  }


  
}
