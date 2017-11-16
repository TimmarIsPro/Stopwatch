import { Component, OnInit, OnDestroy } from '@angular/core';
import {TimerService} from '../timer.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit, OnDestroy {

  private playPauseStopUnsubscribe: any;
  private play: boolean;

  constructor(private timerService: TimerService) { }



  ngOnInit() {
    this.playPauseStopUnsubscribe = this.timerService.playPauseStop$.subscribe((res: any) => this.setPlay(res));
  }
  ngOnDestroy() {
    this.playPauseStopUnsubscribe.unsubscribe();
  }

  private setPlay(res: any) {
    (res.play) ? this.play = true : this.play = false;
  }
  playTimer() {
    this.timerService.playTimer();

  }
  pauseTimer() {
    this.timerService.pauseTimer();
  }
  stopTimer() {
    this.timerService.stopTimer();
  }
  lapTimer() {
    this.timerService.lapTimer();
  }


}
