import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email:'',
    password:''
  }

  constructor(private _auth :AuthService,private _route:Router ) { }

  ngOnInit(): void {
  }

  loginUser(){ 
      this._auth.loginUser(this.loginUserData).subscribe(
        res=>{
          console.log(res)
          localStorage.setItem('token',res.token)
          this._route.navigate(['/special'])
         },
        error => console.log(error),
      )
  }
}
