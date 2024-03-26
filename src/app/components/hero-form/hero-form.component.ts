import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  input,
} from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from '@models/hero.interface';
import { HeroService } from '@services/hero.service';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export default class HeroFormComponent implements OnInit {
  heroId = input<number>(0, { alias: 'id' });
  heroes = input.required<WritableSignal<Hero[]>>();
  hero!: Signal<Hero | undefined>;
  title: string = 'Add a new Hero';
  heroName = new FormControl('');

  private heroService = inject(HeroService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.heroId()) {
      this.hero = this.heroService.getHeroById(this.heroId());
      this.title = ' Edit Hero';
      this.heroName.setValue = this.hero().name;
    }
  }

  onAddHero() {
    const name = this.heroName.value.trim();
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
