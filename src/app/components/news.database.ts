import Dexie from 'dexie'
import { Injectable } from '@angular/core'
import { Countries } from './models'

export const normalizeString= (q: string) => q.trim()
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

    async saveApi(api:string) : Promise<any> {
        return this.apiKey.put(api.trim())
    }
    async saveCountriesList(obj: Countries): Promise<any> {
        return this.countries.add(obj)
    }
}