import Dexie from 'dexie'
import { Injectable } from '@angular/core'
import { Articles, Countries } from './models'


@Injectable()
export class NewsDatabase extends Dexie {
    apiKey: Dexie.Table
    countries: Dexie.Table<Countries, string>
    articles: Dexie.Table<Articles, number>
    savedArticles: Dexie.Table<Articles, number>
    constructor() {
        super('newsdb')
        this.version(1).stores({
            api: 'api',
            countries: 'code',
            articles: '++id,expiry, country',
            savedArticles: '++id, country'
        })
        this.apiKey = this.table('api')
        this.countries = this.table('countries')
        this.articles = this.table('articles')
        this.savedArticles = this.table('savedArticles')
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
        return this.articles.where('expiry').below(now).delete()
    }

    getCachedArticles(country: string): Promise<Articles[]> {


        return this.articles.where('country').equals(country).toArray()
    }

    addToSave(art: Articles): Promise<any>{
        return this.savedArticles.put(art)
    }

    getSavedArticles(country:string): Promise<Articles[]> {
        return this.savedArticles.where('country').equals(country).toArray()
    }
}