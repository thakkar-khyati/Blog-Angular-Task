import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mNumber: [
        "",
        [
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.required,
        ],
      ],
      role:["",Validators.required],
      address:["",Validators.required],
      city:["",Validators.required],
      country:["",Validators.required],
      password: [
        "",
        [
          Validators.maxLength(10),
          Validators.minLength(5),
          Validators.required,
        ],
      ],
    });
  }

  signup() {
    this.http
      .post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe({
        next: (res) => {
          console.log("successfully signed up");
          this.signupForm.reset();
          this.router.navigate(["login"]);
        },
      });
  }
}
