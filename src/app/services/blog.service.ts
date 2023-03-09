import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { blogModel } from '../blog/blog.model';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogdata: blogModel[] = [];

  constructor(private api: ApiService,
    private dialog: MatDialog,
    private http: HttpClient) { }

  getAllBlogs() {
    this.api.getBlog().subscribe({
      next: (res: any) => {
        this.blogdata = res;
        // this.blogdata = new MatTableDataSource(res);
        console.log(this.blogdata);
      },
      error: (e) => {
        console.log(e);
      },
    });
    return this.blogdata;
  }

  updateBlog(event: any) {
    let element = event.target || event.srcElement || event.currentTarget;

    let elementId = Number(element.id);

    console.log(elementId);

    let selected = this.blogdata.filter((opt) => opt.id === elementId);

    this.dialog
      .open(DialogComponent, {
        width: '80%',
        height: '90%',
        data: selected,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllBlogs();
        }
      });
  }

  deleteBlog(event: any) {
    let element = event.target || event.srcElement || event.currentTarget;

    let elementId = Number(element.id);
    console.log(elementId);
    // let selected = this.blogdata.filter(opt => opt.id === elementId);
    // console.log(selected);
    // let id= selected[0].id;
    // console.log(id);
    this.api.deleteBlog(elementId).subscribe({
      next: (res) => {
        this.getAllBlogs();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
