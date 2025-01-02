import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  get(url: string, options?: any) {
    return axios.get(url, options);
  }

  post(url: string, data: any, options?: any) {
    return axios.post(url, data, options);
  }

  put(url: string, data: any, options?: any) {
    return axios.put(url, data, options);
  }

  delete(url: string, options?: any) {
    return axios.delete(url, options);
  }
}