import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit
{
  constructor() { }

  allQuestions = require('src/assets/questions.json');
  results = require('src/assets/resultsModel.json');
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

    questionCards.forEach((item, index) =>
    {
      const checkedInput = document.querySelector('input[name="' + index + '"]:checked');
      const checkedRadio = document.getElementById(checkedInput.id.substring(0, checkedInput.id.length - 6));

      let answerValue = parseInt(checkedRadio.getAttribute("value"));
      let questionType = this.loadedQuestions[index].type;

      for(var i in this.results)
      {
        let resultPreffix = this.results[i].category.substring(0, questionType.length - 1);
        let questionTypePreffix = questionType.substring(0, questionType.length - 1);

        if(resultPreffix == questionTypePreffix)
        {
          this.results[i].types[questionType[questionType.length - 1] -1].score += answerValue;
          break;
        }
      }
    });
  }

  ngOnInit()
  {
    this.SetScrollFactor();
    this.LoadQuestions();

    setTimeout(() => this.ComputeResults(), 200);
    // console.log(this.results);
  }
}
