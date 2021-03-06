import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = []

  constructor(private _eventservice : EventService) { }

  ngOnInit(): void {
      this._eventservice.getEvents().subscribe(
        res => this.events = res,
        err => console.log(err) 
      )
  
  }

}
