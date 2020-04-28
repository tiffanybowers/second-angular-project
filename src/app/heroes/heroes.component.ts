import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  //imported hero interface, initializing hero interface properties
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }

  //defining a component property to expose the HEROES array for binding
  selectedHero: Hero;
  heroes: Hero[];

  //added private heroService parameter to constructor
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  //method assigns the clicked hero from the template to the component's selectedHero
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
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
  */

  
}
