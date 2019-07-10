import { Component, OnInit , DoCheck} from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  identity: String;
  token: String;

  constructor(private _userSV: UsuarioService,
              private _router: Router)
  {
  }
  
  ngDoCheck()
  {
    this.identity = this._userSV.getIdentity();
    this.token = this._userSV.getToken();
  }

  ngOnInit() 
  {
    this.identity = this._userSV.getIdentity();
    this.token = this._userSV.getToken();
  }

  logout()
  {
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/home']);
  }

}
