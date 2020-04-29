import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  //defining a component property to expose the HEROES array for binding
  heroes: Hero[];

  //added private heroService parameter to constructor
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  //function retrieves the heroes from the service - OBSERVABLE
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  /*
  ORIGINAL
  getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
  }

  If you neglect to subscribe(), the service will not send the delete request 
  to the server. As a rule, an Observable does nothing until something subscribes.
  Confirm this for yourself by temporarily removing the subscribe(), 
  clicking "Dashboard", then clicking "Heroes". You'll see the full list of heroes 
  again.

  KEY POINTS FOR THE DELETE METHOD:
    * deleteHero() calls HttpClient.delete().
    * The URL is the heroes resource URL plus the id of the hero to delete.
    * You don't send data as you did with put() and post().
    * You still send the httpOptions.



  PREVIOUS EXAMPLES:

  //imported hero interface, initializing hero interface properties
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }
    //method assigns the clicked hero from the template to the component's selectedHero
    // onSelect(hero: Hero): void {
    //   this.selectedHero = hero;
    //   this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
    // }
  */

  
}
