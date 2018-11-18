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

    questionCards.forEach((item) =>
    {
      let questionType = Array.from(item.getElementsByClassName("mat-card-title"))[0].getAttribute("alt");
      // let radioValue =
      // console.log(document.querySelector('input[name="' + i + '"]:checked'););
      console.log(item.getElementsByClassName("mat-radio-button").querySelector(""));
    })

    // console.log(input.parentElement.parentElement.parentElement.getAttribute("value")); // :), material radios are pure garbage
    //
    // for(var i=0; i<149; i++)
    // {
    //   let currentInput = document.querySelector('input[name="' + i + '"]:checked');
    //   let currentValue = currentInput.parentElement.parentElement.parentElement.getAttribute("value");
    // }
  }

  ngOnInit()
  {
    this.SetScrollFactor();
    this.LoadQuestions();

    setTimeout(() => this.ComputeResults(), 200);
    // console.log(this.results);
  }
}
