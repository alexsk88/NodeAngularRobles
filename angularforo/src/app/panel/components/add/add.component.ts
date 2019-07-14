import { Component, OnInit } from '@angular/core';
import { Topic } from '../../../../models/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit
{
  topic:Topic;
  identity: any;
  token:String;
  status: String;

  constructor(
    private _router: Router,
    private _Activerouter: ActivatedRoute,
    private _userSV: UsuarioService
  )
  {
    this.identity = _userSV.getIdentity();
    this.token = _userSV.getToken();
    this.topic = new Topic('','','','','','',this.identity._id,null);
  }

  ngOnInit()
  {

  }

  newTopics(form: any)
  {
    console.log(this.topic);
  }

}
