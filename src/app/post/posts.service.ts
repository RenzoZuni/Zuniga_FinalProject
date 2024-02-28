import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new BehaviorSubject<Post[]>([]);
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<{ message: string; posts: Post[] }>(this.apiUrl).subscribe(data => {
      this.posts = data.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPosts() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: '', title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}