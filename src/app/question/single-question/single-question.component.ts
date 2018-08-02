import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Question, Answer } from '../../shared/models/campaign.model';
import { DeviceService } from '../device.service';
import { BaseComponent } from '../../utils/base/base.component';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styles: [
    `.answer-item{
      width:15%;
      margin:0 0 40px 0;
      text-align: center;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
  }
  .answer-item img {
      width: 72%;
      height: auto;
  }
  .answer-text {
    display:block;
    margin-top:0.4em;
    font-size: 20px;
    line-height:1;
  }
  `
  ]
})
export class SingleQuestionComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() question: Question;
  @Input() mode: string;
  @ViewChild('animate') animate;
  selectAnswer = -1;
  currentPage = 1;
  animated = '';
  constructor(
    private deviceService: DeviceService,
  ) { super() }

  ngOnInit() {
  }

  onSelect(a: Answer, i: number) {
    if (this.question.result && this.selectAnswer === i) {
      this.selectAnswer = -1;
      this.question.result = null;
    } else {
      this.selectAnswer = i;
      this.question.result = <Answer[]>[a];
    }
  }

  onAnswer() {
    if (this.mode) {
      this.deviceService.answerPreview(this.question);
    } else {
      this.deviceService.answer(this.question);
    }
    this.selectAnswer = -1;
  }


  ngOnChanges(): void {
    console.log('changed on single');
      this.animated = 'animated bounceInLeft'
      setTimeout(() => {
        this.animated = ''
      }, 1000);
    // if (this.animated) {
    //   this.animated = ''
    //   this.animated = 'animated bounceInLeft'
    // } else {
    //   this.animated = 'animated bounceInLeft'
    // }
  }

  disabled() {
    return !this.question.result && this.question.manded;
  }
}
