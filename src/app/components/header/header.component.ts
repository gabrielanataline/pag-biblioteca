import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.sair().subscribe(response => {
      this.notification.showMessege("Até logo!", "success");
      this.router.navigate(["/login"]);
    }
    )
  }

}
