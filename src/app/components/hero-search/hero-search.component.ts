import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Hero } from '@models/hero.interface';
import { HeroService } from '@services/hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
})
export class HeroSearchComponent {
  private heroService = inject(HeroService);
  private searchTerm = signal<string>('');

  heroes = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    ),
    { initialValue: [] as Hero[] }
  );

  search(term: string) {
    this.searchTerm.set(term);
  }
}
