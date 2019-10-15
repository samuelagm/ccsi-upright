import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { FileSystemFileEntry, FileSystemEntryMetadata, FileSystemEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postForm: FormGroup;
  public files: UploadFile[] = [];
  public imageBase64: string = null;
  public ccsiUserId = '5ba2088fa8d27d0014960921';
  public isOnline = true;

  constructor(private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    private postService: PostService,
    private connectionService: ConnectionService
  ) {

  }



  onSubmit() {
    const title = this.postForm.controls['title'].value;
    const content = this.postForm.controls['content'].value;
    const links = this.postForm.controls['links'].value;

    if (this.postForm.valid) {
      const post = {
        title: title,
        body: content,
        author: this.ccsiUserId,
        links: links.split(','),
        long: 7.4348875,
        lat: 9.0694323,
        hasImg: true,
        img: this.imageBase64,
        anonymous: false,
        isVideo: false,
        from_twitter: true
      };
      this.postService.createPost(post).subscribe(data => {
        console.log(data);
        alert('Post Created, Succes!');
        this.postForm.reset();
      });
    } else {
      alert('All fields are required');
    }

  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Only process image files.
          if (!file.type.match('image.*')) {
            return;
          }

          const fileSizeInMb = file.size / (1024 * 1024);

          if (fileSizeInMb > 0.8) {
            alert('Image size greater than 800 Kb');
            return;
          }

          const reader = new FileReader();
          reader.onload = () => {
            console.log(reader.result);
            this.imageBase64 = reader.result;
          };

          reader.readAsDataURL(file);

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    //console.log(event);
  }
  public fileLeave(event) {
    //console.log(event);
  }

  ngOnInit() {
    this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    });

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      links: ['', Validators.required],
    });
  }

}
