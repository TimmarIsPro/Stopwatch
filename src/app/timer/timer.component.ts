import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {TimerService} from '../timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  constructor(private timerService: TimerService) { }

  start = 0;
  ticks = 0;

  minutesDisplay = 0;
  hoursDisplay = 0;
  secondsDisplay = 0;
  millisecondsDisplay = 0;

  lapMinutesDisplay = 0;
  lapHoursDisplay = 0;
  lapSecondsDisplay = 0;
  lapMillisecondsDisplay = 0;

  sub: Subscription;

  private playPauseStopUnsubscribe: any;



  ngOnInit() {
    this.playPauseStopUnsubscribe = this.timerService.playPauseStop$.subscribe((res: any) => this.playPauseStop(res));
  }

  ngOnDestroy() {

    this.playPauseStopUnsubscribe.unsubscribe();
  }

  private playPauseStop(res: any) {
    if (res.play) {
      this.startTimer();
    } else if (res.pause) {
      this.pauseTimer();
    } else if (res.stop) {
      this.stopTimer();
    } else if (res.lap) {
      this.lapTimer();
    }
  }

  private startTimer() {

    const timer = Observable.timer(1, 1);
    this.sub = timer.subscribe(
      t => {
        this.ticks = this.start + t;

        this.millisecondsDisplay = this.getMilliseconds(this.ticks);
        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
      }
    );
  }
  private pauseTimer() {
    this.start = ++this.ticks;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  private stopTimer () {
    this.start = 0;
    this.ticks = 0;
    this.minutesDisplay = 0;
    this.hoursDisplay = 0;
    this.secondsDisplay = 0;
    this.millisecondsDisplay = 0;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  private lapTimer() {
    this.lapMillisecondsDisplay = (this.ticks % 1000);
    this.lapSecondsDisplay = (Math.floor(this.ticks / 1000) % 60);
    this.lapMinutesDisplay = (Math.floor(this.ticks / 1000 / 60) % 60);
    this.lapHoursDisplay = (Math.floor(this.ticks / 1000 / 60 / 60 ) % 60);
  }
  private getMilliseconds(ticks: number) {
    return this.pad(ticks % 1000);
  }
  private getSeconds(ticks: number) {
    // return this.pad(ticks % 60);
    return this.pad(Math.floor(ticks / 1000) % 60);
  }
  private getMinutes(ticks: number) {
    return this.pad(Math.floor(ticks / 1000 / 60) % 60);
  }
  private getHours(ticks: number) {
    return this.pad(Math.floor(ticks / 1000 / 60 / 60 ) % 60);
  }
  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }


}
