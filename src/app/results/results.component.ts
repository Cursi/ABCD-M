import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';

import { ModalComponent } from '../modal/modal.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit
{
  constructor(private data: DataService, public dialog: MatDialog) { }

  chart = [];
  bigSkillsLabels = [];
  bigSkillsData = [0, 0, 0, 0, 0];

  isTestFinished: boolean = false;

  LoadResults()
  {
    this.data.results.forEach((item, index) =>
    {
      this.bigSkillsLabels.push(item.category);

      item.types.forEach((subitem) =>
      {
        this.bigSkillsData[index] += subitem.score;
      });
    });
  }

  GetBigSkillLevel(skillValue)
  {
    if(skillValue < 88) return "Foarte scazut";
    if(skillValue >= 88 && skillValue < 103) return "Scazut";
    if(skillValue >= 103 && skillValue < 119) return "Mediu";
    if(skillValue >= 119 && skillValue < 133) return "Ridicat";
    if(skillValue >= 133) return "Foarte ridicat";
  }

  BigSkillClick(event)
  {
    var activePoints = this.chart.getElementsAtEvent(event);
    if(activePoints[0]) this.dialog.open(ModalComponent, {data: activePoints[0]._index});
  }

  ngOnInit()
  {
    const self = this;
    if(this.data.results != null)
    {
      this.isTestFinished = true;
      this.LoadResults();

      var data =
      {
        labels: this.bigSkillsLabels,
        borderColor : "#ffffff",
        datasets:
        [
          {
            data: this.bigSkillsData,
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
              return self.GetBigSkillLevel(tooltipItem[0].yLabel);
            }
          }
        }
      };

      this.chart = new Chart("canvas",
      {
        type: 'bar',
        data: data,
        options: options
      });
    }
  }
