import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class CounterComponent implements OnInit, OnDestroy {

  constructor() { }
  timerLimit: number;
  countDown: number;
  statusList = [];
  startCtr = 0;
  pauseCtr = 0;
  paused: any;
  isStarted: boolean;
  timerId: any;

  ngOnInit(): void {
    this.paused = [];
    this.timerLimit = 0;
    this.countDown = 0;
    this.isStarted = false;
  }

  reset() {
    this.paused = [];
    this.isStarted = false;
    this.countDown = 0;
    this.timerLimit = 0;
    this.startCtr = 0;
    this.pauseCtr = 0;
    this.statusList = [];
    clearInterval(this.timerId);
  }

  ngOnDestroy() {
    if (this.countDown === 0) {
      clearInterval(this.timerId);
    }
  }

  start(flag) {
    if (this.timerLimit !== 0) {
      this.startCtr++;
      this.statusList.push(('Started at ' + this.getDateFormat(new Date().toString())));
      this.isStarted = flag;
      this.timerId = setInterval(() => {
        if (this.countDown === 0) {
          clearInterval(this.timerId);
          return;
        } else {
          this.countDown = this.countDown - 1;
        }
      }, 1000);
    }
  }

  modelChanged(ev) {
    this.countDown = +ev;
  }

  pause(flag) {
    this.isStarted = flag;
    this.pauseCtr++;
    this.statusList.push(('Paused at ' + this.getDateFormat(new Date().toString())));
    clearInterval(this.timerId);
    if (this.countDown !== 0) {
      this.paused.push('Paused at ' + this.countDown);
    }
  }

  getDateFormat(date) {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}-${+(dateObj.getMonth()) + 1}-${dateObj.getFullYear()}
    ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()} ${+(dateObj.getHours()) <= 12 ? 'AM' : 'PM'}`;
  }
}
