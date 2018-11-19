import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit
{
  constructor(private data: DataService, public dialogRef: MatDialogRef<TestComponent>, @Inject(MAT_DIALOG_DATA) public index: any) { }

  subChart = [];
  skillsLabels = [];
  skillsData = [0, 0, 0, 0, 0];

  LoadResults()
  {
    this.data.results[this.index].types.forEach((item, index) =>
    {
      this.skillsLabels.push(item.name);
      this.skillsData[index] = item.score;
    });
  }

  GetSkillLevel(skillValue)
  {
    if(skillValue < 14) return "Foarte scazut";
    if(skillValue >= 14 && skillValue < 19) return "Scazut";
    if(skillValue >= 19 && skillValue < 23) return "Mediu";
    if(skillValue >= 23 && skillValue < 27) return "Ridicat";
    if(skillValue >= 27) return "Foarte ridicat";
  }

  ngOnInit()
  {
    const self = this;
    this.LoadResults();

    var data =
    {
      labels: this.skillsLabels,
      borderColor : "#ffffff",
      datasets:
      [
        {
          data: this.skillsData,
          borderWidth : "2",
          hoverBorderColor : "rgba(0,0,0, 0.7)",
          backgroundColor:
          [
            "#A11D73",
            "#389AFC",
            "#AE71D1",
            "#68E379",
            "#D1303B"
          ],
          hoverBackgroundColor:
          [
            "#A11D73",
            "#389AFC",
            "#AE71D1",
            "#68E379",
            "#D1303B"
          ]
      }]
    };

    var options =
    {
      maintainAspectRatio: false,
      legend:
      {
        display: false,
      },
      scales:
      {
        xAxes:
        [
          {
            ticks:
            {
              autoSkip: false,
              fontSize: 13
            }
          }
        ],
        yAxes:
        [
          {
            ticks:
            {
                beginAtZero: true
            }
          }
        ]
      },
      tooltips:
      {
        enabled: true,
        mode: 'single',
        callbacks:
        {
          title: function(tooltipItem)
          {
            return self.GetSkillLevel(tooltipItem[0].yLabel);
          }
        }
      }
    };

    this.subChart = new Chart("subCanvas",
    {
      type: 'bar',
      data: data,
      options: options
    });
  }
}
