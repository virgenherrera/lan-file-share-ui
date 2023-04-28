import { Component, OnInit } from '@angular/core';
import { FolderInfo } from '../../../api/models/folder-info.model';
import { SharedFolderService } from '../../../api/services/shared-folder.service';
import { Path } from '../../models/path.model';
import { PathService } from '../../services/path.service';

@Component({
  selector: 'app-shared-folder',
  templateUrl: './shared-folder.component.html',
  styleUrls: ['./shared-folder.component.scss'],
})
export class SharedFolderComponent implements OnInit {
  folderInfo: FolderInfo;
  path: Path;

  constructor(
    private pathService: PathService,
    private sharedFolderService: SharedFolderService,
  ) {}

  ngOnInit(): void {
    this.pathSubscribe();
    this.folderInfoSubscribe();
  }

  goToChild(value: string) {
    this.pathService.goToChild(value);
  }

  goToParent() {
    this.pathService.goToParent();
  }

  private pathSubscribe() {
    this.pathService.pathSubject.subscribe({
      next: (path) => {
        this.path = path;
        this.getFolderInfo(path.path);
      },
    });
  }

  private folderInfoSubscribe() {
    this.sharedFolderService.folderInfoSubject.subscribe(
      (folderInfo) => (this.folderInfo = folderInfo),
    );
  }

  private getFolderInfo(path: string) {
    this.sharedFolderService.getFolderInfo(path).subscribe();
  }
}
