import { Component, OnInit } from '@angular/core';
import { EventbriteService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[] = [];

  constructor(private eventbriteService: EventbriteService) { }

  ngOnInit(): void {
    this.eventbriteService.getEvents().subscribe({
      next: (response) => {
        this.events = response.events;
        console.log(this.events);
      },
      error: (err) => console.error('Error fetching events: ', err)
    });
  }
}