import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { userModal } from "../user/user.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.css"],
})
export class UserDialogComponent implements OnInit {
  actionBtn: string = "Add";
  roles = ['admin','Admin','user','User'];
  roleIsForbidden!:boolean
  public userForm!: FormGroup;
  

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private formBuider: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuider.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mNumber: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      role:["",[Validators.required]],
      address:["",Validators.required],
      city:["",Validators.required],
      country:["",Validators.required],
      password: ["", [Validators.required,Validators.minLength(5)]]
      
    });

    if(this.editUser){
      this.actionBtn = 'Update';
      this.userForm.controls['name'].setValue(this.editUser.name);
      this.userForm.controls['email'].setValue(this.editUser.email);
      this.userForm.controls['mNumber'].setValue(this.editUser.mNumber);
      this.userForm.controls['role'].setValue(this.editUser.role);
      this.userForm.controls['address'].setValue(this.editUser.address);
      this.userForm.controls['city'].setValue(this.editUser.city);
      this.userForm.controls['country'].setValue(this.editUser.country);
      this.userForm.controls['password'].setValue(this.editUser.password);
    }
    
  }

  addUser(){
    if(!this.editUser){
      if(this.userForm.valid){
        this.api.postUser(this.userForm.value).subscribe({
          next:(res)=>{
            console.log("user added");
            this.userForm.reset();
            this.dialogRef.close('save');
            location.reload();
          },
          error:(e)=>{
            console.log(e);
          }
        })
      }
    }
    else{
      this.updateUser();
    }
  }

  updateUser(){
    this.api.putUser(this.userForm.value,this.editUser.id).subscribe({
      next:(res)=>{
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }

  // roleValidator(control:FormControl):{[s:string]:boolean}{
  //   if(!this.roles.indexOf(control.value)){
  //     return {'roleforbidden': true}
  //   }
  //   return null;
    
  // }
}

