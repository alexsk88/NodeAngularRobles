import { Component, OnInit } from '@angular/core';
import { Topic } from '../../../models/topic';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit 
{

  page_title: String
  topics: Topic[]
  totalPages
  page
  next_page
  prev_page

  constructor(private _routerActi: ActivatedRoute,
    private _router: Router,
    private _topicSV: TopicService) 
  { 
    this.page_title = 'Temas'
  }

  ngOnInit() 
  {
    this.getTopics(1);
  }

  getTopics(page)
  {
    this._topicSV.getTopics().subscribe(
      res =>
      {

        if(res.topics)
        {
          this.topics = res.topics;
          console.log(res);
          

          // Hacer la navegacion de Paginacion


        }
        else
        {
          this._router.navigate(['/home'])
        }

      },err=>console.log("Erro al paginas",err)
      
    )
  }

}
