import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = environment.API;
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.url}/post?sort=createdAt desc`);
  }

  updatePosts(id, update) {
    return this.http.put(`${this.url}/post/${id}`, update);
  }

  createPost(post) {
    return this.http.post(`${this.url}/post/createPost`, post);
  }

  deletePost(id) {
    return this.http.delete(`${this.url}/post/${id}`);
  }
}
