import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  baseAPI = environment.API_URL;
  http = inject(HttpClient)

  put<T>(_: { url: string, data: any, params?: any, headers?: any }) {
    return this.http.put<T>(this.baseAPI + _.url, _.data, { responseType: 'json', params: _.params, headers: _.headers })
  }

  get<T>(_: { url: string, params?: any, headers?: any }) {
    let x = this.http.get<T>(this.baseAPI + _.url, { params: _.params, headers: _.headers })
    return x;
  }

  post<T>(_: { url: string, params?: any, data?: any, headers?: any }) {
    return this.http.post<T>(this.baseAPI + _.url, _.data, { responseType: 'json', params: _.params, headers: _.headers })
  }

  delete(_: { url: string, params?: any, headers?: any }) {
    return this.http.delete(this.baseAPI + _.url, { params: _.params, headers: _.headers })
  }
}
