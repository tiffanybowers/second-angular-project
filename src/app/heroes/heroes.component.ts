import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from '../mock-heroes';

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
  heroes = HEROES;
  selectedHero: Hero;

  constructor() { }

  ngOnInit() {
  }

    //method assigns the clicked hero from the template to the component's selectedHero
    onSelect(hero: Hero): void {
      this.selectedHero = hero;
    }
}
