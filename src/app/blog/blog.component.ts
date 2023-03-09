import { Component, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { blogModel } from './blog.model';
import { HtmlTagDefinition } from '@angular/compiler';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit  {
  blogdata: blogModel[] = [];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private http: HttpClient,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    // this.blogdata = this.blogService.getAllBlogs();
    this.getAllBlogs();
  }

  getAllBlogs() {
    return this.api.getBlog().subscribe({
      next: (res: any) => {
        this.blogdata = res;
        // this.blogdata = new MatTableDataSource(res);
        console.log(this.blogdata);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // updateBlog(event: any) {
  //   let element = event.target || event.srcElement || event.currentTarget;

  //   let elementId = Number(element.id);

  //   console.log(elementId);

  //   let selected = this.blogdata.filter((opt) => opt.id === elementId);

  //   this.dialog
  //     .open(DialogComponent, {
  //       width: '80%',
  //       height: '90%',
  //       data: selected,
  //     })
  //     .afterClosed()
  //     .subscribe((value) => {
  //       if (value === 'update') {
  //         this.getAllBlogs();
  //       }
  //     });
  // }

  // deleteBlog(event: any) {
  //   let element = event.target || event.srcElement || event.currentTarget;

  //   let elementId = Number(element.id);
  //   console.log(elementId);
  //   // let selected = this.blogdata.filter(opt => opt.id === elementId);
  //   // console.log(selected);
  //   // let id= selected[0].id;
  //   // console.log(id);
  //   this.api.deleteBlog(elementId).subscribe({
  //     next: (res) => {
  //       this.getAllBlogs();
  //     },
  //     error: (e) => {
  //       console.log(e);
  //     },
  //   });
  // }
}
