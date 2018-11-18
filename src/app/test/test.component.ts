import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../data.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit
{
  constructor(public router: Router, public data: DataService, public snackBar: MatSnackBar) { }

  allQuestions = require('src/assets/questions.json');
  loadedQuestions = [];

  numberOfQuestionsToBeLoaded : const = 15;
  minimumDesktopWidth : const = 900;

  upperIndex: number = -1;
  scrollFactor = -4;
  areQuestionsNotLoaded: boolean = true;

  SetScrollFactor()
  {
    if(window.innerWidth > this.minimumDesktopWidth) this.scrollFactor = -4;
    else this.scrollFactor = -2;
  }

  LoadQuestions()
  {
    if(this.upperIndex != this.allQuestions.length - 1)
    {
      if(this.scrollFactor < 0) this.scrollFactor += 1;
      this.upperIndex += this.numberOfQuestionsToBeLoaded;
      this.loadedQuestions = this.allQuestions.slice(0, this.upperIndex + 1);
    }
    else this.areQuestionsNotLoaded = false;
  }

  ComputeResults()
  {
    let questionCards = Array.from(document.getElementsByClassName("questionCard"));
    let areQuestionsAnswered = true;

    questionCards.forEach((item, index) =>
    {
      const checkedInput = document.querySelector('input[name="' + index + '"]:checked');
      if(checkedInput == null) areQuestionsAnswered = false;
    });

    if(areQuestionsAnswered)
    {
      this.data.results = require('src/assets/resultsModel.json');

      questionCards.forEach((item, index) =>
      {
        const checkedInput = document.querySelector('input[name="' + index + '"]:checked');
        const checkedRadio = document.getElementById(checkedInput.id.substring(0, checkedInput.id.length - 6));

        let answerValue = parseInt(checkedRadio.getAttribute("value"));
        let questionType = this.loadedQuestions[index].type;

        for(var i in this.data.results)
        {
          let resultPreffix = this.data.results[i].category.substring(0, questionType.length - 1);
          let questionTypePreffix = questionType.substring(0, questionType.length - 1);

          if(resultPreffix == questionTypePreffix)
          {
            this.data.results[i].types[questionType[questionType.length - 1] -1].score += ++answerValue;
            break;
          }
        }
      });

      this.router.navigate(['/results']);
    }
    else
    {
      this.snackBar.open('Nu ai raspuns la toate intrebarile!', null, { duration: 2000 });
    }
  }

  ngOnInit()
  {
    this.SetScrollFactor();
    this.LoadQuestions();
  }
}
