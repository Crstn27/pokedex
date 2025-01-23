import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './interfaces/pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export default class PokedexComponent implements OnInit{

  private pokemonService = inject(PokemonService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  pokemons:  WritableSignal<Pokemon[]>= signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.pokemonService.getRandomPokemons().subscribe((data) => {
      this.pokemons.set(data);
    });

    // Verificar si el outlet secundario está abierto al cargar la página
    const outlet = this.activatedRoute.snapshot.children.find(child => child.outlet === 'details');
    if (outlet) {
      this.router.navigate([{ outlets: { details: null } }]);
    }
  }

  showDetails(pokemonId: number): void {
    this.router.navigate(['pokemons', { outlets: { details: ['pokemon', pokemonId] } }], { queryParamsHandling: 'preserve' });
  }
}
