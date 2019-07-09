import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{

  user: User;

  constructor()
  {
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      'ROLE_USER',
    );
  }

  ngOnInit()
  {

  }

  register(form)
  {
    console.log(this.user);
  }

}
