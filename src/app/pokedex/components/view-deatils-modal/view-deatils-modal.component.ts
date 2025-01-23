import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonResponse } from '../../interfaces/pokemon-response';
import { catchError, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-deatils-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-deatils-modal.component.html',
  styleUrl: './view-deatils-modal.component.css'
})
export default class ViewDeatilsModalComponent  implements OnInit{

  private activatedRoute = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  public readonly colorfulPokemons = [
    { "type": "normal", "color": "#A8A77A" },
    { "type": "fire", "color": "#EE8130" },
    { "type": "water", "color": "#6390F0" },
    { "type": "electric", "color": "#F7D02C" },
    { "type": "grass", "color": "#7AC74C" },
    { "type": "ice", "color": "#96D9D6" },
    { "type": "fighting", "color": "#C22E28" },
    { "type": "poison", "color": "#A33EA1" },
    { "type": "ground", "color": "#E2BF65" },
    { "type": "flying", "color": "#A98FF3" },
    { "type": "psychic", "color": "#F95587" },
    { "type": "bug", "color": "#A6B91A" },
    { "type": "rock", "color": "#B6A136" },
    { "type": "ghost", "color": "#735797" },
    { "type": "dragon", "color": "#6F35FC" },
    { "type": "dark", "color": "#705746" },
    { "type": "steel", "color": "#B7B7CE" },
    { "type": "fairy", "color": "#D685AD" },
    { "type": "unknown", "color": "#68A090" },
    { "type": "shadow", "color": "#705898" }
  ]

  color: WritableSignal<string | null > = signal<string | null>(null);
  pokemon :  WritableSignal<PokemonResponse | null > = signal<PokemonResponse | null>(null);


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.pokemonService.getPokemonById(Number(id))
          .pipe(
            catchError((error) => {
              this.closeModal();
              return of(null);
            }),
          )
        )
      )
      .subscribe((data) => {
        if (!data) return this.closeModal();
        this.pokemon.set(data);
        if (data.types) {

          this.color.set(this.colorfulPokemons.find((color) => color.type === data.types[0].type.name)?.color || '#B7B7CE');
        }
        return;
      });
  }

  closeModal(): void {
    this.router.navigate([{ outlets: { details: null } }], { relativeTo: this.activatedRoute.parent });
  }

}
