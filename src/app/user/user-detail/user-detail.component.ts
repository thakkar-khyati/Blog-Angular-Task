import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { userModal } from "../user.model";
import { UserDialogComponent } from "src/app/user-dialog/user-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import * as CryptoJS from "crypto-js";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  userId!: { id: number };
  selected!: userModal;
  isLoggedIn = localStorage.getItem("isLoggedIn");
  isAdmin = localStorage.getItem("admin");
  tokenFromUI: string = "0123456789123456";
  _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
  _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
  enPassword!:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = {
      id: this.route.snapshot.params["id"],
    };

    this.userId.id = Number(this.userId.id);
    this.getUser();
    this.enPassword= CryptoJS.AES.encrypt(
      JSON.stringify(this.selected.password),
      this._key,
      {
        keySize: 16,
        iv: this._iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    // console.log(this.enPassword);
  }

  encrypt() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(this.selected.password),
      _key,
      {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    this.enPassword = encrypted.toString();
    console.log(this.enPassword);
  }

  getUser() {
    return this.api.getUserDetail(this.userId.id).subscribe({
      next: (res: any) => {
        this.selected = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateUser(event: any) {
    this.dialog
      .open(UserDialogComponent, {
        width: "80%",
        height: "90%",
        data: this.selected,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === "update") {
          this.getUser();
        }
      });
  }

  deleteUser(event: any) {
    this.api.deleteUser(this.userId.id).subscribe({
      next: (res) => {
        this.router.navigate(["user"]);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
