import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { PostService } from "../../services/post.service";
import { ChartService } from "../../services/chart.service";
import { environment } from "src/environments/environment";

interface Media {
  video: number;
  audio: number;
  image: number;
}
interface FileData {
  type: string;
  name: string;
  url: string;
}
interface Source {
  twitter: number;
  app: number;
}
interface Anonimity {
  anon: number;
  notAnon: number;
}
interface PostDataType {
  posts: any[];
  published: number;
  flagged: number;
  pending: number;
  media: Media;
  source: Source;
  anonimity: Anonimity;
}

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  postData: PostDataType;
  postCreate: boolean;
  postForm: FormGroup;
  public file: FileData = { type: "image", url: "", name: "" };
  public ccsiUserId;
  public isOnline = true;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    private postService: PostService,
    private chartService: ChartService
  ) {
    this.loading = true;
    this.ccsiUserId = environment.production ? "5ba2088fa8d27d0014960921" : "5dac58ed841c86567860486d";
  }

  closeModal() {
    this.postCreate = false;
    this.file = { type: "image", url: "", name: "" };
    this.postForm.reset()
  }

  onSubmit() {
    const title = this.postForm.controls["title"].value;
    const content = this.postForm.controls["content"].value;
    const links = this.postForm.controls["links"].value;

    if (this.postForm.valid) {
      this.loading = true;
      const post = {
        title: title,
        body: content,
        author: this.ccsiUserId,
        links: links.split(","),
        long: 7.4348875,
        lat: 9.0694323,
        img: this.file.url,
        anonymous: false,
        isVideo: this.file.type === 'video' ? true : this.file.type === "audio" ? "audio" : false,
        from_twitter: true,
      };
      this.postService.createPost(post).subscribe(data => {
        this.loading = false;
        this.postForm.reset();
        alert("Post was sucessfully created");
        this.postData.posts.unshift(data);
        this.postData.anonimity.notAnon = this.postData.anonimity.notAnon + 1;
        this.postData.pending = this.postData.pending + 1;
        this.postData.source.twitter = this.postData.source.twitter + 1;
        this.postData.media[this.file.type] = this.postData.media[this.file.type] + 1;
        this.postData.source.twitter = this.postData.source.twitter + 1;
        this.makePostCharts();
        this.closeModal();
      }, err => {
        this.loading = false;
        console.dir(err);
        alert("Post could not be created due to an unexpected error");
      });
    } else {
      alert("All fields are required");
    }
  }

  public handleFile(files: FileList) {
    if (files.length) {
      const file = files[0];
      const fileSizeInMb = file.size / (1024 * 1024);
      console.log(file.type)
      if (!/^(image|audio|video)/.test(file.type)) {
        alert("File is not a media file");
        return;
      }

      if (fileSizeInMb > 2) {
        alert("File size greater than 2 MB");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file = {
          url: reader.result as string,
          name: file.name,
          type: file.type.includes("image") ? "image" : file.type.includes("audio") ? "audio" : "video"
        };
      };
    }
  }
  updatePost(post, key) {
    this.loading = true;
    if (key === 'del') {
      this.postService.deletePost(post.id)
        .subscribe(res => {
          this.postData.posts.splice(this.postData.posts.indexOf(post), 1)
          this.loading = false;
          alert("Post was sucessfully deleted");
        }, err => {
          this.loading = false;
          alert("A network error occured and post could not be updated");
        })
    } else {
      const updateData = {}
      switch (key) {
        case 'pub':
          Object.assign(updateData, { 'approved': true });
          break;
        case 'flag':
          Object.assign(updateData, { 'approved': !true, 'flagged': !false })
          break;
        case 'unflag':
          Object.assign(updateData, { 'approved': true, 'flagged': false })
          break;
        default:
          this.loading = false;
          return {}
      }
      const updatedPost = Object.assign(post, updateData);
      this.postService.updatePosts(post.id, updatedPost)
        .subscribe(res => {
          this.postData.posts[this.postData.posts.indexOf(post)] = updatedPost;
          this.loading = false;
          this.postData.published = key === 'pub' ? this.postData.published + 1 : key === 'unflag' ? this.postData.published + 1 : this.postData.published - 1;
          this.postData.flagged = key === 'flag' ? this.postData.flagged + 1 : key === 'unflag' ? this.postData.flagged - 1 : this.postData.flagged;
          this.postData.pending = key === 'pub' ? this.postData.pending - 1 : this.postData.pending;
          this.makePostCharts();
          alert("Post was sucessfully updated");
        }, err => {
          this.loading = false;
          alert("A network error occured and post could not be updated");
        })
    }
  }

  toggleCreateState() {
    this.postCreate = !this.postCreate;
    if (this.postCreate) {
      setTimeout(() => {
        const elem = document.querySelector(".drop-area");
        elem
          .addEventListener('click', (e) => {
            var fileInput = document.createElement("input") as HTMLInputElement;
            fileInput.type = "file";
            fileInput.accept = "image/*"
            fileInput.multiple = false;
            fileInput.click();
            fileInput.addEventListener("input", (e) => {
              // e.preventDefault();
              // e.stopPropagation();
              this.handleFile(fileInput.files);
            })
          });
      }, 500)
    }
  }

  filterPosts(key: string, posts: Array<any>): Array<any> {
    switch (key) {
      case 'pub':
        return posts.filter(it => it.approved);
      // break;
      case 'pend':
        return posts.filter(it => !it.approved && !it.flagged);
      // break;
      case 'flag':
        return posts.filter(it => it.flagged);
      // break;
      default:
        return []
    }
  }

  makePostCharts() {
    this.chartService.aggChart(
      [
        {
          values: [
            this.postData.published,
            this.postData.pending,
            this.postData.flagged
          ]
        }
      ],
      ["Published", "Pending", "Flagged"],
      document.querySelector("#chart1"),
      "Posts by Publish State",
      true
    );
    this.chartService.aggChart(
      [{ values: Object.values(this.postData.anonimity) }],
      Object.keys(this.postData.anonimity),
      document.querySelector("#chart2"),
      "Posts By Anonimity",
      true
    );
    this.chartService.aggChart(
      [{ values: Object.values(this.postData.media) }],
      Object.keys(this.postData.media),
      document.querySelector("#chart3"),
      "Posts By Media Type",
      true
    );
    this.chartService.aggChart(
      [{ values: Object.values(this.postData.source) }],
      Object.keys(this.postData.source),
      document.querySelector("#chart4"),
      "Posts By Source",
      true
    );
  }

  loadPosts() {
    this.loading = true;
    this.postService.getPosts().subscribe(
      (data: any) => {
        this.loading = false;
        this.postData = data;
        if (this.postData.posts.length) {
          this.makePostCharts();
        }
      },
      err => {
        this.loading = false;
        alert("A network error occured and post data couldnt't be retrired");
      }
    );
  }

  ngOnInit() {
    window.addEventListener("online", e => (this.isOnline = true));
    window.addEventListener("offline", e => (this.isOnline = false));

    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      links: ["", Validators.required]
    });

    this.loadPosts();
  }
}
