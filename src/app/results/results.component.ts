import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit
{
  constructor(private data: DataService) {}

  ngOnInit()
  {
    console.log(this.data.results);
  }

}
