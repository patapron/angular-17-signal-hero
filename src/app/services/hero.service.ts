import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Hero } from '@models/hero.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';



@Injectable({ providedIn: 'root' })
export class HeroService {
  public heroes = signal<Hero[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endpoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  private readonly _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor() {
    this.getHeroes();
  }

  public getHeroes(): void {
    this._http
      .get<Hero[]>(this._endpoint)
      .pipe(tap((hero: Hero[]) => {
        console.log("hero", hero),
        this.heroes.set(hero)}))
      .subscribe();
  }

  public getHeroById(id: number) {
    console.log("servicio: ")
    return runInInjectionContext(this._injector, () =>
      toSignal<Hero>(
        this._http.get<Hero>(`${this._endpoint}/${id}`)
      )
    );
  }

  // getHeroes(): Observable<Hero[]> {
  //   return this._http.get<Hero[]>(this._endpoint).pipe(
  //     catchError(this.handleError<Hero[]>('getHeroes', []))
  //   );
  // }

  // getHeroNo404(id: number): Observable<Hero> {
  //   const url = `${this._endpoint}/?id=${id}`;
  //   return this._http.get<Hero[]>(url).pipe(
  //     map((heroes) => heroes[0]), // returns a {0|1} element array
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  // getHero(id: number): Observable<Hero> {
  //   const url = `${this._endpoint}/${id}`;
  //   return this._http.get<Hero>(url).pipe(
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._http.get<Hero[]>(`${this._endpoint}/?name=${term}`).pipe(
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(this._endpoint, hero, this._httpOptions).pipe(
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this._endpoint}/${id}`;

    return this._http.delete<Hero>(url, this._httpOptions).pipe(
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this._http.put(this._endpoint, hero, this._httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
