import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

	private heroesUrl = 'api/heroes';  // URL to web api

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

  	constructor(
		private messageService: MessageService, 
		private http: HttpClient
	) { }


    /** GET heroes from the server */
	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl)
		.pipe(
			tap(_ => this.log('fetched heroes')),
			catchError(this.handleError<Hero[]>('getHeroes', []))
		);
	}

	/** GET hero by id. Return `undefined` when id not found */
	getHeroNo404<Data>(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/?id=${id}`;
		return this.http.get<Hero[]>(url)
		  .pipe(
			map(heroes => heroes[0]), // returns a {0|1} element array
			tap(h => {
			  const outcome = h ? `fetched` : `did not find`;
			  this.log(`${outcome} hero id=${id}`);
			}),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		  );
	}

	/** GET hero by id. Will 404 if id not found */
	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
		  tap(_ => this.log(`fetched hero id=${id}`)),
		  catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	  }

	/* GET heroes whose name contains search term */
	searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
		  // if not search term, return empty hero array.
		  return of([]);
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
		  tap(x => x.length ?
			 this.log(`found heroes matching "${term}"`) :
			 this.log(`no heroes matching "${term}"`)),
		  catchError(this.handleError<Hero[]>('searchHeroes', []))
		);
	}
	

	 //////// Save methods //////////

	/** POST: add a new hero to the server */
	addHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
		tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
		catchError(this.handleError<Hero>('addHero'))
		);
	}

	/** DELETE: delete the hero from the server */
	deleteHero(hero: Hero | number): Observable<Hero> {
		const id = typeof hero === 'number' ? hero : hero.id;
		const url = `${this.heroesUrl}/${id}`;

		return this.http.delete<Hero>(url, this.httpOptions).pipe(
		tap(_ => this.log(`deleted hero id=${id}`)),
		catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	/** PUT: update the hero on the server */
	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
		tap(_ => this.log(`updated hero id=${hero.id}`)),
		catchError(this.handleError<any>('updateHero'))
		);
	}

	/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead

		// TODO: better job of transforming error for user consumption
		this.log(`${operation} failed: ${error.message}`);

		// Let the app keep running by returning an empty result.
		return of(result as T);
		};
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	}
}

/*
	NOTES:
	HttpClient methods return one value
	All HttpClient methods return an RxJS Observable of something.
	HTTP is a request/response protocol. You make a request, it 
	returns a single response.

	In general, an observable can return multiple values over time. 
	An observable from HttpClient always emits a single value and then completes, 
	never to emit again.

	This particular HttpClient.get() call returns an Observable<Hero[]>; 
	that is, "an observable of hero arrays". 
	In practice, it will only return a single hero array. HttpClient.get() returns response data

	HttpClient.get() returns the body of the response as an untyped JSON object by 
	default. Applying the optional type specifier, <Hero[]> , adds TypeScript 
	capabilities, which reduce errors during compile time.
	The server's data API determines the shape of the JSON data. 
	The Tour of Heroes data API returns the hero data as an array.

	addHero() differs from updateHero() in two ways:

    It calls HttpClient.post() instead of put().
	It expects the server to generate an id for the new hero, which it returns 
	in the Observable<Hero> to the caller.


	SIDENOTE:
	Other APIs may bury the data that you want within an object. You might have to dig that data out by processing 
	the Observable result with the RxJS map() operator.
*/
