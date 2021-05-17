import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _registerUrl = "http://localhost:3000/api/register"
  public _loginUrl ="http://localhost:3000/api/login"
  constructor(public _http:HttpClient,public _router:Router) { }

  registerUser(user: { email: string; password: string; }){
    return this._http.post<any>(this._registerUrl,user)
  }

  loginUser(user: { email: string; password: string; }){
    return this._http.post<any>(this._loginUrl,user )
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

getToken(){
   return localStorage.getItem('token')  
}
logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }
}
