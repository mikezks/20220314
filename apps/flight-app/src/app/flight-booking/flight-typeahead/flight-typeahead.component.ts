import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, share, Subscription, take, tap, timer } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number> = timer(0, 1_000).pipe(
    tap(value => console.log('Producer', value)),
    share()
  );
  subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.subscription.add(
      this.timer$.pipe(
        take(3)
      ).subscribe(value => console.log('TS subscribe 1', value))
    );
    this.subscription.add(
      this.timer$.subscribe(
        value => console.log('TS subscribe 2', value)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
