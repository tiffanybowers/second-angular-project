import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //home link redirects to dashboard onload of page
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, //parameterized route to the AppRoutingModule.routes array that matches the path pattern to the hero detail view.
  { path: 'heroes', component: HeroesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot().
  exports: [RouterModule] //exports the RouterModule so it will be available throughout the app.
})
export class AppRoutingModule { }

/*
NOTES:
  forRoot() : is a method that you configure the router at the apps's root level. The forRoot() method supplies
  the service providers and directives needed for routing, and performs
  the initial navigation based on the current browser URL.

  The (:) colon in the detail path indicates that :id is a placeholder for specific hero id.

*/
