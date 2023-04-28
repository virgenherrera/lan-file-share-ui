import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, reduce, switchMap } from 'rxjs';
import { UploadRoute } from '../enums/endpoint.enum';
import { MimeTypesResponse } from '../models/mime-types.model';

@Injectable({
  providedIn: 'root',
})
export class MimeTypesService {
  private endpoint = `/api/v1${UploadRoute.mimeTypes}`;

  constructor(private http: HttpClient) {}

  getAllowedTypes() {
    return this.http.get<MimeTypesResponse>(this.endpoint).pipe(
      switchMap((res) => from(Object.values(res).flat())),
      reduce((acc, curr) => (!acc ? curr : `${acc}, ${curr}`)),
    );
  }
}
