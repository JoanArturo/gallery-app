import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image.model';
import { ImageFormData } from '../models/image-form-data.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiURL}/images`);
  }

  getOneImage(id: number): Observable<Image> {
    return this.http.get<Image>(`${this.apiURL}/images/${id}`);
  }

  saveImage(data: ImageFormData): Observable<Image> {
    return this.http.post<Image>(`${this.apiURL}/images`, data);
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/images/${id}`);
  }
}
