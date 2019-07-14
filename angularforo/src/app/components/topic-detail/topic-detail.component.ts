import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Topic } from '../../../models/topic';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit 
{

  topic: Topic
  loading = true
  noexist = false
  constructor(
    private _topicSV: TopicService,
    private _activerouter: ActivatedRoute
  )
  {

  }

  ngOnInit()
  {
    this._activerouter.params.subscribe(
      params => 
      {
        let id = params['id'];
        this.getTopics(id);
      }
    )
  }

  getTopics(id)
  {
    this._topicSV.getTopicsByID(id).subscribe(
      res=>
      {
        if(res.status == 'success')
        {
          this.topic = res.topic
          this.loading = false
          console.log(this.topic);
          
        }
        else
        {
          console.log("No esxite topics");
          this.loading = false
        }
        
        
      },err => 
      {
        this.noexist =  true;
        console.log("Erro al sacar ", err.error)
        this.loading = false
      }
      
    )
  }
}
