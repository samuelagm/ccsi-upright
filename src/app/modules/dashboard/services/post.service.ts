import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = environment.API;
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.url}/post/postsAndStats`).pipe(map(data => JSON.parse(JSON.stringify(data))));
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

  getActiveUser() {
    let user =  sessionStorage.getItem("activeUser");
    return user !== undefined && user !== null ? JSON.parse(user) : {id: environment.production ? "5dd50ced5af84e0019c04291" : "5dac58ed841c86567860486d"}
  }
}
