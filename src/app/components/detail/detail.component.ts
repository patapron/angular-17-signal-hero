import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Hero } from '@models/hero.interface';
import { HeroService } from '@services/hero.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export default class DetailComponent implements OnInit {
  heroId = input<number>(0, { alias: 'id' }); // @Input({ alias: 'id}' }) productId!: number;
  hero!: Signal<Hero | undefined>;

  private readonly heroService = inject(HeroService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.hero = this.heroService.getHeroById(this.heroId());
  }

  onDelete(hero: Hero | undefined) {
    if (hero) {
      this.heroService.deleteHero(hero.id);
      this.router.navigate(['/works']);
    }
  }

  onEdit(hero: Hero | undefined) {
    this.router.navigate(['/edit/'+ hero!.id]);
  }
}
