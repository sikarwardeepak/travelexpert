import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private apiService: ApiService) { }

  getLocations() {
    return this.apiService.get('/api/locations');
  }
  
}