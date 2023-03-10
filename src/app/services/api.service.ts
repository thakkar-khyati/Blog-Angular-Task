import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postBlog(blog:any){
    return this.http.post("http://localhost:3000/blogList/",blog);
  }
  
  getBlog(){
    return this.http.get("http://localhost:3000/blogList/");
  }

  getBlogDialog(id:number){
    return this.http.get("http://localhost:3000/blogList/"+id);
  }

  putBlog(blog:any, id:number){
    return this.http.put<any>("http://localhost:3000/blogList/"+id, blog);
  }

  deleteBlog(id:number){
    return this.http.delete<any>("http://localhost:3000/blogList/"+id);
  }

  postUser(user:any){
    return this.http.post("http://localhost:3000/signupUsers/",user);
  }
  
  getUser(){
    return this.http.get("http://localhost:3000/signupUsers/");
  }

  getUserDetail(id:number){
    return this.http.get<any>("http://localhost:3000/signupUsers/"+id);
  }

  putUser(user:any, id:number){
    return this.http.put<any>("http://localhost:3000/signupUsers/"+id, user);
  }

  deleteUser(id:number){
    return this.http.delete<any>("http://localhost:3000/signupUsers/"+id);
  }

}
