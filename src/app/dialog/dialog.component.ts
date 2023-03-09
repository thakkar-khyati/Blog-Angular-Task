import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  blogForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editBlog: any
  ) {}

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      blogContent: ['', Validators.required],
    });

    if (this.editBlog) {
      this.actionBtn = 'Update';
      console.log(this.editBlog);
      this.blogForm.controls['name'].setValue(this.editBlog.name);
      this.blogForm.controls['email'].setValue(this.editBlog.email);
      this.blogForm.controls['title'].setValue(this.editBlog.title);
      this.blogForm.controls['blogContent'].setValue(
        this.editBlog.blogContent
      );
    }
  }

  addBlog() {
    if (!this.editBlog) {
      if (this.blogForm.valid) {
        this.api.postBlog(this.blogForm.value).subscribe({
          next: (res) => {
            console.log('blog added.');
            this.blogForm.reset();
            this.dialogRef.close('save');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
    else{
      this.updateBlog();
    }
  }

  updateBlog(){
    this.api.putBlog(this.blogForm.value, this.editBlog[0].id).subscribe({
      next:(res)=>{
        console.log("updated successfully.");
        this.blogForm.reset();
        this.dialogRef.close('update');
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }
}