import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsDatabase } from './news.database'
import { Articles } from './models'
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private newsDB: NewsDatabase, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  code: string = ''
  country: string = ''
  api: string = ''
  articles: Articles[] = []
  test
  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code']
    this.country = this.activatedRoute.snapshot.params['name']
    // get savedArticles 
    // this.newsDB.getSavedArticles(this.country).then(res => {
    //   res.forEach(art => this.articles.push(art))
    // })
    //clear any expired articles
    this.newsDB.clearInvalidCached(new Date().getTime())
      .then(() => {
        return this.newsDB.countSavedArticlesPerCountry(this.country)
      })

      .then((saveArticleCount) => {
        this.newsDB.getCachedArticles(this.country)
          .then(res => {
          //if cachedArticles includes saved and unexpired , res.length > articleCount
            if (res.length > saveArticleCount) {
            //push the retrieved cachedArt into articles array
           
            this.articles = res
           
            } else {
              this.newsDB.getApi()
                .then(res => {
                  this.api = res[0].api
                  return this.api
                })
                .then(key => {
                  return this.fetchNewsApi(key)
                })
                .then(res => {
                  //save into db
                  res.forEach(art => {
                    this.newsDB.cachedArticles(art)
                  })

                })
                .then(()=> {
                  return this.newsDB.getSavedArticles(this.country)
                })
                .then(savedArticles => {
                //push savedArticles into this.articles array 
                 savedArticles.forEach(a=> this.articles.push(a))
                })

            }
          }).catch(e => console.log(e))

      })


  }


  fetchNewsApi(key) {
    const newsUrl = 'https://newsapi.org/v2/top-headlines'
    let params = new HttpParams()
    params = params.set('country', this.code)
    let headers = new HttpHeaders()
    headers = headers.set('X-Api-Key', key)
    return this.http.get<any>(newsUrl, { params: params, headers: headers })
      .toPromise()
      .then(res => {
        this.articles = res.articles.map(a => {
          const id = uuidv4().toString().substring(0, 8)
          const country = this.country
          const sourceName = a.source.name
          const author = a.author
          const title = a.title
          const description = a.description
          const url = a.url
          const urlToImage = a.urlToImage
          const publishedAt = a.publishedAt
          const content = a.content
          const expiry = new Date().getTime() + 300000
          const saved = false.toString()
          return { id, country, sourceName, author, title, description, url, urlToImage, publishedAt, content, expiry, saved } as Articles
        })
        return this.articles
      })
     
     
  }

  openLink(i: number) {
    window.open(this.articles[i].url)
  }

  saveArticle(i: number) {
    console.log('saved')
    this.newsDB.saveArticle(this.articles[i].id)
    alert('Saved!')
  }
}
