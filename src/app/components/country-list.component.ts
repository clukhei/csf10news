import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Countries } from './models';
import { NewsDatabase } from './news.database'

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  apiExist = false
 
  constructor(private newsDB: NewsDatabase, private router: Router, private http: HttpClient) {

    this.newsDB.getApi()
    .then(res=> {
      if (res.length < 0) {
        this.router.navigate(['/api'])
      }
    })
    .catch(res=> console.log(res))
   }
 

  countries: Countries[]



  ngOnInit(): void {
    
    this.newsDB.getCountriesCount()
      .then(res => {
        if (res > 0) {
          this.newsDB.getCountriesList()
            .then(res => this.countries = res)
        } else this.fetchFlagsApi()
      })
      .catch(e => console.log(e))


  }

  async fetchFlagsApi() {
    const possibleOptions = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'
    const query = possibleOptions.split(' ').join(';')
    const flagsUrl = 'https://restcountries.eu/rest/v2/alpha'
    let params = new HttpParams()
    params = params.set('codes', query)

    this.http.get<any>(flagsUrl, { params: params }).toPromise()
      .then(res => {
        console.log(res)
        this.countries = res.map(v => {
          const name = v.name
          const flag = v.flag
          const code = v.alpha2Code
          return { name, flag, code } as Countries
        })
        return this.countries
      }).then(res => {
        res.forEach(c => {
          this.newsDB.saveCountriesList(c)
        })

      })
      .catch(e => console.log(e))

  }

  goSetApi() {
    this.router.navigate(['/api'])
  }

}
