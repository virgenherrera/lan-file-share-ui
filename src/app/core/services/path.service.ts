import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Path } from '../models/path.model';

@Injectable({
  providedIn: 'root',
})
export class PathService {
  readonly pathSubject = new BehaviorSubject(new Path());

  goToParent() {
    const currentPath = this.pathSubject.value;

    if (!currentPath.parent) {
      throw new Error('already on <Home>');
    }

    const { parent: parentPath } = currentPath;
    const nextValue = new Path(parentPath.path, parentPath.parent);

    this.pathSubject.next(nextValue);
  }

  goToChild(folderName: string) {
    const parentPath = this.pathSubject.value;
    const nextPath = new Path(folderName, parentPath);

    this.pathSubject.next(nextPath);
  }
}
