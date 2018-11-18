import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit
{
  constructor(private data: DataService) { }

  isTestFinished: boolean = false;

  ngOnInit()
  {
    console.log(this.data.results);
    if(this.data.results != null) isTestFinished = true;
  }
}
