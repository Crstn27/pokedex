import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { PokemonResponse } from '../interfaces/pokemon-response';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly API_URL = 'https://pokeapi.co/api/v2';

  private http = inject(HttpClient);

  // Obtiene 30 Pokémon aleatorios
  getRandomPokemons(): Observable<Pokemon[]> {
    const randomIds = Array.from({ length: 30 }, () => Math.floor(Math.random() * 900) + 1);
    const requests = randomIds.map((id) => this.getPokemonById(id));
    return forkJoin(requests).pipe(
      map((pokemons: PokemonResponse[]) =>
        pokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          abilities: pokemon.abilities.map((a: any) => a.ability.name),
          types: pokemon.types.map((t: any) => t.type.name),
          image: pokemon.sprites.front_default,
        }))
      )
    );
  }
  // Obtiene un Pokémon por su id
  getPokemonById(id: number): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.API_URL}/pokemon/${id}`);
  }

}
