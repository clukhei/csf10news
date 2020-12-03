import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

const SERVER = '/api/news'

@Injectable()
export class NewsService {
    constructor(private http: HttpClient) {}

    async fetchNewsApi(key: string, code: string):Promise<any> {
        const params = (new HttpParams()).set('country', code)
        const headers = (new HttpHeaders()).set('X-Api-Key', key)
        const resp = await this.http.get<any>(SERVER, {params, headers}).toPromise()

        return resp
    }
}