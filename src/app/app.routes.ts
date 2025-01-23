import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    loadComponent: ()=> import('./pokedex/pokedex.component'), // Componente padre
    children: [
      {
        path: 'pokemon/:id',
        title:' View Details',
        loadComponent: ()=> import('./pokedex/components/view-deatils-modal/view-deatils-modal.component'), // Componente modal
        outlet: 'details', // Nombre del outlet secundario
      },

    ],
  },
  {
    path:'**',
    redirectTo:'/pokemons',
    pathMatch:'full'
  },
];
