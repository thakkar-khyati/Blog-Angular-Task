import { Component, Inject, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

import { ApiService } from '../services/api.service';
import { blogModel } from '../blog/blog.model';

import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit {
  actionBtn:string ='';
  blogdata: blogModel[] = [];
  isLoggedIn = localStorage.getItem("isLoggedIn");

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) {}
    ngOnInit(): void {
      this.btnChange();
    }

    btnChange(){
      if(this.isLoggedIn === "true"){
        this.actionBtn = 'LogOut';
      }
      else{
        this.actionBtn = "login";
      }
    }

    logOut(){
      localStorage.removeItem("isLoggedIn");
      location.reload();
      // this.router.navigate(['/blog']);
      this.actionBtn = "login";
    }
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '80%',
        height: '90%',
      })
      .afterClosed()
      .subscribe({
        next:(val)=>{
          if(val === 'save'){
            this.api.getBlog().subscribe({
              next:(res:any)=>{
                this.blogdata = res;
                this.router.navigate(['blog']);
              },error:(e)=>{
                console.log(e);
              }
            })
          }
        }
      })
  }

}
