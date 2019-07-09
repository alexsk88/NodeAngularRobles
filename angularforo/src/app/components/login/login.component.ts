import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  parametros = {
    email: '',
    password: ''
  }

  constructor()
  {

  }

  ngOnInit() 
  {

  }

  login(form: NgForm)
  {
    console.log(this.parametros.email);
    console.log(this.parametros.password);
    
  }

}
