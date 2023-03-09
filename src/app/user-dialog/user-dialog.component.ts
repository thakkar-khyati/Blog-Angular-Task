import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { userModal } from "../user/user.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.css"],
})
export class UserDialogComponent implements OnInit {
  actionBtn: string = "Add";
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
      password: ["", Validators.required],
    });

    if(this.editUser){
      this.actionBtn = 'Update';
      this.userForm.controls['name'].setValue(this.editUser[0].name);
      this.userForm.controls['email'].setValue(this.editUser[0].email);
      this.userForm.controls['mNumber'].setValue(this.editUser[0].mNumber);
      this.userForm.controls['password'].setValue(this.editUser[0].password);
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
    this.api.putUser(this.userForm.value,this.editUser[0].id).subscribe({
      next:(res)=>{
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }
}

