import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'countdown',
  template: '<h1>Time left: {{seconds}}</h1> <button (click) = "seconds = seconds * seconds/31"> Square </button>',
  styleUrls: ['./countdown.component.css']
})

export class CountdownComponent implements OnInit {

  @Input()  seconds: number = 25;
  intervalId: any;
 
  ngOnInit() {
  }
  constructor() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  }
  private tick(): void {
    if (--this.seconds < 1) {
  //  clearInterval(this.intervalId);
    this.seconds = 10 * this.seconds* this.seconds;
  }
  }

}
