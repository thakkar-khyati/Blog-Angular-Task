import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { blogModel } from "../blog.model";
import { ApiService } from "src/app/services/api.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Dialog } from "@angular/cdk/dialog";
import { DialogComponent } from "src/app/dialog/dialog.component";

@Component({
  selector: "app-blog-dialog",
  templateUrl: "./blog-dialog.component.html",
  styleUrls: ["./blog-dialog.component.css"],
})
export class BlogDialogComponent implements OnInit {
  blogId!: { id: number };
  selected!: blogModel;
  isLoggedIn = localStorage.getItem("isLoggedIn");

  constructor(private route: ActivatedRoute, private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.blogId = {
      id: this.route.snapshot.params["id"],
    };
    this.blogId.id = Number(this.blogId.id);
    this.getBlogData();
  }

  getBlogData() {
    return this.api.getBlogDialog(this.blogId.id).subscribe({
      next: (res:any) => {
        this.selected = res;
        console.log(this.selected);
      },
      error:(e)=>{
        console.log(e);
      }
    });
  }

  updateBlog(event: any) {

    this.dialog
      .open(DialogComponent, {
        width: '80%',
        height: '90%',
        data: this.selected,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getBlogData();
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
        this.getBlogData();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

}
