import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NavigatorComponent } from "../navigator/navigator.component";
import { blogModel } from "../blog/blog.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log(this.navigate1);
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.maxLength(10),
          Validators.minLength(5),
          Validators.required,
        ],
      ],
    });
    //console.log(this.isObject(this.navigate.actionBtn));
  }

  ngAfterViewInit(): void {}

  isObject(value: any): boolean {
    return typeof value === "string";
  }

  login() {
    this.http.get("http://localhost:3000/signupUsers").subscribe({
      next: (res: any) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          let role = user.role;
          let id = user.id;
          if(role === "admin"){
            localStorage.setItem("admin",'true');
          }
          console.log("login successfull");
          localStorage.setItem("id", id);
          localStorage.setItem("isLoggedIn", "true");
          
          this.router.navigate(['blog']);
          this.loginForm.reset();
          

          // setTimeout(() => {
          //   this.navigator.action = 'LogOut';
          // }, 0);
        } else {
        }
        location.reload();
      },
    });
  }
}
