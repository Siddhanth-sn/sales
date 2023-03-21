import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    if (this.isAuthenticated()){
      // redirects to login page
      this.router.navigate(['/login']);

    }
  }
// =================================================================
// ==============================================================
  register(name:string,email:string,password:string){
    //send data to resigter api(firebase)
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
        {displayName:name,email,password}
    );
  
  }

  storeToken(token:string){
    sessionStorage.setItem('token',token);

  }
}
