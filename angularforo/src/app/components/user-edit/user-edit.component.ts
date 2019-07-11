import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UsuarioService } from '../../services/usuario.service';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit 
{

  urlapi = global.url;
  user: User;
  token: String;
  identity: any;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gig, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: this.urlapi + 'upload-avatar',
      headers: {
      "Authorization" : this._userSV.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube Tu Imagen para el POST',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(private _userSV: UsuarioService) 
  { 
    this.identity = _userSV.getIdentity();
    this.token = _userSV.getToken();
    this.user = new User(
      this.identity.id,
      this.identity.name,
      this.identity.surname,
      this.identity.email,
      '',
      this.identity.image,
      'ROLE_USER',
    );

    console.log(this.identity.image);
    
  }

  ngOnInit()
  {

  }

  updateUser(form)
  {    
    this._userSV.updateuser(this.user , this.token).subscribe(
      res=>
      {
        console.log(res);
        localStorage.removeItem('identity');
        localStorage.setItem('identity',JSON.stringify(res.UserUpdated));
      },err=>console.log(err)

    );
  } 

  UploadImg(imagen: any)
  {
    let img = JSON.parse(imagen.response);
    this.user.image = img.user.image
  }

}
