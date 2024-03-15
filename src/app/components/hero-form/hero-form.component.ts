import { Component, WritableSignal, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '@models/hero.interface';
import { HeroService } from '@services/hero.service';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export default class HeroFormComponent {
  heroes = input.required<WritableSignal<Hero[]>>();
  private heroService = inject(HeroService);

  constructor(private router: Router) { }

  onAddHero(name: string) {
    name = name.trim();
    if (!name) return;

    this.heroService.addHero({
      id: Math.floor(Math.random() * 90 + 10),
      name,
    } as Hero);
    this.router.navigate(['/']);
  }


  onEnter($event: KeyboardEvent, button: HTMLButtonElement) {
    if ($event.key === 'Enter') button.click();
  }
}
