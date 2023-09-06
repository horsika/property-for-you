import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmailVerificationService} from "../../services/email-verification.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  emailToken: string;
  successMessage: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private emailVerificationService: EmailVerificationService) {
    this.route.params.subscribe(params => {
      this.emailToken = params['token'];
    })
  }

  ngOnInit(): void {
    this.emailVerificationService.verifyEmail(this.emailToken).subscribe(response => {
      },
      error => {
        // to be done
      },
      () => {
        this.router.navigate(["/register"]);
      })
  }

}
