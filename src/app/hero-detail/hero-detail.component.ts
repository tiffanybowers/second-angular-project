import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;

  //injected services into constructor, saving its values in private fields.
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}

/*
  NOTES:
  The ActivatedRoute holds information about the route to this instance of the 
  HeroDetailComponent. This component is interested in the route's parameters 
  extracted from the URL. The "id" parameter is the id of the hero to display.

  The HeroService gets hero data from the remote server and this component 
  will use it to get the hero-to-display.

  The location is an Angular service for interacting with the browser.

  The route.snapshot is a static image of the route information shortly 
  after the component was created.

  The paramMap is a dictionary of route parameter values extracted from the URL. 
  The "id" key returns the id of the hero to fetch.

  Route parameters are always strings. The JavaScript (+) operator converts the 
  string to a number, which is what a hero id should be.

  The browser refreshes and the app crashes with a compiler error. 
  HeroService doesn't have a getHero() method. Add it now.

  SIDENOTE: Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.

  
*/
