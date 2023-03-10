import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

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
    private router: Router,
    // private route: Route,
    @Inject(MAT_DIALOG_DATA) public editBlog: any
  ) {}

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      blogContent: ['', Validators.required],
      summery:['', Validators.required]
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
      this.blogForm.controls['summery'].setValue(this.editBlog.summery);
    }
  }

  addBlog() {
    if (!this.editBlog) {
      if (this.blogForm.valid) {
        console.log(this.blogForm);
        this.api.postBlog(this.blogForm.value).subscribe({
          next: (res) => {
            console.log('blog added.');
            this.router.navigate(['blog']);
            location.reload();
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
    this.api.putBlog(this.blogForm.value, this.editBlog.id).subscribe({
      next:(res)=>{
        console.log("updated successfully.");
        location.reload();
        this.blogForm.reset();
        this.dialogRef.close('update');
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }
}
