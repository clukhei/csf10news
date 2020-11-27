import Dexie from 'dexie'
import { Injectable } from '@angular/core'
import { Countries } from './models'


@Injectable()
export class NewsDatabase extends Dexie{
    apiKey: Dexie.Table
    countries : Dexie.Table<Countries, string>
    constructor(){
        super('newsdb')
        this.version(1).stores({
            api: 'api',
            countries: 'code'
            
        })
        this.apiKey = this.table('api')
        this.countries = this.table('countries')
    }
    
    getApi(): Promise<any[]> {
      return this.apiKey.toArray()
    }
    async saveApi(api:string) : Promise<any> {
        const _api = {api: api.trim()}
        return this.apiKey.put(_api)
    }
    async deleteApi(api: string): Promise<any>{
      return await this.apiKey.where('api').equals(api).delete()
    }
    async saveCountriesList(obj: Countries): Promise<any> {
        return this.countries.put(obj)
    }
    getCountriesCount(): Promise<number> {
        return this.countries.count()
    }

    getCountriesList (): Promise<Countries[]> {
        return this.countries.toArray()
    }
}