import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '@models/hero.interface';
import { HeroService } from '@services/hero.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export default class DetailComponent implements OnInit {
  heroId = input<number>(0, { alias: 'id' }); // @Input({ alias: 'id}' }) productId!: number;
  hero!: Signal<Hero | undefined>;

  private readonly heroService = inject(HeroService);

  ngOnInit(): void {
    console.log("detail: ", this.heroId())
    this.hero = this.heroService.getHeroById(this.heroId());
  }

  onDelete(hero: Hero | undefined) {
    console.log("ondelete")
    if(hero){
      this.heroService.deleteHero(hero.id)
    }
  }
}
