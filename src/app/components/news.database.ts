import Dexie from 'dexie'
import { Injectable } from '@angular/core'
import { Articles, Countries } from './models'


@Injectable()
export class NewsDatabase extends Dexie {
    apiKey: Dexie.Table
    countries: Dexie.Table<Countries, string>
    articles: Dexie.Table<Articles, string>
   // savedArticles: Dexie.Table<Articles, number>
    constructor() {
        super('newsdb')
        this.version(1).stores({
            api: 'api',
            countries: 'code',
            articles: 'id,expiry, country, saved, [expiry+saved]',
           
        })
        this.apiKey = this.table('api')
        this.countries = this.table('countries')
        this.articles = this.table('articles')
      //  this.savedArticles = this.table('savedArticles')
    }



    getApi(): Promise<any[]> {
        return this.apiKey.toArray()
    }
    async saveApi(api: string): Promise<any> {
        const _api = { api: api.trim() }
        return this.apiKey.put(_api)
    }
    async deleteApi(api: string): Promise<any> {
        return await this.apiKey.where('api').equals(api).delete()
    }
    async saveCountriesList(obj: Countries): Promise<any> {
        return this.countries.put(obj)
    }
    getCountriesCount(): Promise<number> {
        return this.countries.count()
    }

    getCountriesList(): Promise<Countries[]> {
        return this.countries.toArray()
    }

    cachedArticles(arr: Articles): Promise<any> {
        return this.articles.put(arr)
    }
    clearInvalidCached(now: number): Promise<any> {
        //return this.articles.where(['expiry', 'saved']).between([now-5, 'false'], [-Infinity,'false'], true, true).delete()
        return this.articles.where('expiry').below(now).and(f=> f.saved == 'false').delete()
    }

    getCachedArticles(country: string): Promise<Articles[]> {
        return this.articles.where('country').equals(country).toArray()
    }

    saveArticle(id: string): Promise<any> {
        return this.articles.where('id').equals(id).modify(art=> {
            art.saved = 'true'
        })
    }

    countSavedArticlesPerCountry(country: string): Promise<number> {
        return this.articles.where('country').equals(country).and(a=> a.saved =='true').count()
    }

    getSavedArticles(country): Promise<Articles[]> {
        return this.articles.where('saved').equals('true').and(a => a.country == country).toArray()
    }
    // addToSave(art: Articles): Promise<any>{
    //     return this.savedArticles.put(art)
    // }

    // getSavedArticles(country:string): Promise<Articles[]> {
    //     return this.savedArticles.where('country').equals(country).toArray()
    // }
}