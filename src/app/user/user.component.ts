import { Component, OnInit } from '@angular/core';
import { userModal } from "./user.model";
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userData:userModal[] =[];
  isLoggedIn = localStorage.getItem("isLoggedIn");

  constructor(private http: HttpClient, private api: ApiService, private dialog: MatDialog, private router: Router){

  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    return this.api.getUser().subscribe({
      next: (res: any) => {
        this.userData = res;
        // this.blogdata = new MatTableDataSource(res);
        console.log(this.userData);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateUser(event: any){
    let element = event.target || event.srcElement || event.currentTarget;

    let elementId = Number(element.id);

    let selected = this.userData.filter((opt) => opt.id === elementId);

    this.dialog
      .open(UserDialogComponent, {
        width: '80%',
        height: '90%',
        data: selected,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllUser();
        }
      });
  }

  deleteUser(event:any){
    let element = event.target || event.srcElement || event.currentTarget;

    let elementId = Number(element.id);
    console.log(elementId);
    this.api.deleteUser(elementId).subscribe({
      next: (res) => {
        this.getAllUser();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  openDialog() {
    this.dialog
      .open(UserDialogComponent, {
        width: '80%',
        height: '90%',
      }).afterClosed()
      .subscribe({
        next:(val)=>{
          if(val === 'save'){
            this.api.getBlog().subscribe({
              next:(res:any)=>{
                this.userData = res;
                this.router.navigate(['user']);
              },error:(e)=>{
                console.log(e);
              }
            })
          }
        }})
      
      
  }

}
