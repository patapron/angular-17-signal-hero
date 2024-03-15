import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroService } from '@services/hero.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export default class HeroesComponent {
  private readonly heroService = inject(HeroService);
  heroes = this.heroService.heroes;
}
