import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroService } from '@services/hero.service';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [RouterLink, HeroSearchComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export default class HeroesComponent {
  private readonly heroService = inject(HeroService);
  heroes = this.heroService.heroes;
}
