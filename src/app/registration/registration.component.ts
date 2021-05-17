import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerUserData = {
    email:"",
    password:""
  }
  constructor( private _auth:AuthService,private _router : Router) { }

  ngOnInit(): void {
  }

  registerUser(){
     this._auth.registerUser(this.registerUserData)
     .subscribe(
       res=>{
        console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/special'])
       },
       error =>console.log(error)
     )
  }
}
