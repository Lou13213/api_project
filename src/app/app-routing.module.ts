import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BodyComponent } from './body/body.component';
import { FlightComponent } from './flight/flightarrival.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AproposComponent } from './apropos/apropos.component';
import { FlightdepartureComponent } from './flightdeparture/flightdeparture.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'body', component: BodyComponent },
  { path: 'home', component: HomeComponent },
  { path: 'flight', component: FlightComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'apropos', component: AproposComponent},
  { path: 'flightdeparture', component: FlightdepartureComponent},
  { path: 'footer', component: FooterComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
