import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  EnvironmentInjector,
  Injectable,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
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
      .pipe(
        tap((hero: Hero[]) => {
          console.log('hero', hero), this.heroes.set(hero);
        })
      )
      .subscribe();
  }

  public getHeroById(id: number) {
    console.log('servicio: ');
    return runInInjectionContext(this._injector, () =>
      toSignal<Hero>(this._http.get<Hero>(`${this._endpoint}/${id}`))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this._http
      .get<Hero[]>(`${this._endpoint}/?name=${term}`)
      .pipe(catchError(this.handleError<Hero[]>('searchHeroes', [])));
  }

  addHero(hero: Hero) {
    this._http
      .post<Hero>(this._endpoint, hero, this._httpOptions)
      .pipe(
        tap((hero) => {
          this.getHeroes();
        })
      )
      .subscribe();
  }

  deleteHero(id: number) {
    this._http
      .delete<Hero>(`${this._endpoint}/${id}`, this._httpOptions)
      .pipe(
        tap((hero) => {
          this.getHeroes();
        })
      )
      .subscribe();
  }

  updateHero(hero: Hero): Observable<any> {
    return this._http
      .put(this._endpoint, hero, this._httpOptions)
      .pipe(catchError(this.handleError<any>('updateHero')));
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
