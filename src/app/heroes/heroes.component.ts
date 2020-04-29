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

  /*
  ORIGINAL
  getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
  }

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
