import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { ApiFormComponent } from './components/api-form.component';
import { CountryListComponent } from './components/country-list.component';
import { ResultsComponent } from './components/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { NewsDatabase } from './components/news.database'

const ROUTES: Routes = [
  {path: '', component: CountryListComponent},
  {path: 'results/:name/:code', component: ResultsComponent},
  {path: 'api', component: ApiFormComponent},
  {path: '**', redirectTo:'/', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    ApiFormComponent,
    CountryListComponent,
    ResultsComponent,
 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
    
    
  ],
  providers: [NewsDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
