import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { SharedFolderRoute } from '../enums/endpoint.enum';
import { FolderInfo } from '../models/folder-info.model';

@Injectable({
  providedIn: 'root',
})
export class SharedFolderService {
  private endpoint = `/api/v1${SharedFolderRoute.sharedFolder}`;
  readonly folderInfoSubject = new BehaviorSubject<FolderInfo>(null);

  constructor(private http: HttpClient) {}

  getFolderInfo(path = ''): Observable<FolderInfo> {
    this.folderInfoSubject.next(null);
    const options: any = {};

    if (path) options.params = { path };

    return this.http.get(this.endpoint, options).pipe(
      map((res: any) => new FolderInfo(res)),
      tap((info) => this.folderInfoSubject.next(info)),
      map(() => this.folderInfoSubject.value),
    );
  }
}
