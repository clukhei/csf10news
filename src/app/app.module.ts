import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { ApiFormComponent } from './components/api-form.component';
import { CountryListComponent } from './components/country-list.component';
import { ResultsComponent } from './components/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home.component';

const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'results', component: ResultsComponent},
  {path: '**', redirectTo:'/', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    ApiFormComponent,
    CountryListComponent,
    ResultsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
