import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MomentModule } from 'angular2-moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<any> = [];
  filters: Array<String> = ['Recemt', 'Featured'];
  selected: String;
  constructor(private postService: PostService) {
    this.selected = this.filters[0];
  }

  ngOnInit() {
    this.loadPosts();
  }

  deletePost(id) {
    console.log("bing!")
    if (confirm('You\'re about to delete a post, continue ?')) {
      this.postService.deletePost(id).subscribe(data => {
        alert('Post deleted');
        console.log(this.posts);
        this.posts = this.posts.filter((el) => el.id !== id);

      });
    }
  }

  loadPosts() {
    this.postService.getPosts().subscribe((data: any) => {
      this.posts = data;
      console.log(data);
    });
  }

  filterPosts() {
    console.log(this.selected);
  }

  featurePost(element: HTMLInputElement, id: string): void {
    if (element.checked) {
      this.postService.updatePosts(id, { featured: true }).subscribe((data: any) => {
        this.loadPosts();
      });
    } else {
      this.postService.updatePosts(id, { featured: false }).subscribe((data: any) => {
        this.loadPosts();
      });
    }
  }

}
