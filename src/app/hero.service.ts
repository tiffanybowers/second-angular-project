import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import  { Hero } from './heroes/hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',

})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');     // TODO: send the message _after_ fetching the heroes
    return of(HEROES); // <-- returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  }
}
