import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { Store } from "@ngrx/store";
import { NotificationServiceService } from "src/app/services/notification-service.service";
import { userSelector } from "src/app/store/reducers/user.reducer";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  sidenavOpen: boolean = true;
  notifications: any = [];
  timer: any;
  user: any;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private store: Store<any>,
    private notificationService: NotificationServiceService
  ) {

    this.store.select(userSelector).subscribe(data => this.user = data)
    this.location = location;
    this.router.events.subscribe((event: Event) => {
       if (event instanceof NavigationStart) {
           // Show loading indicator

       }
       if (event instanceof NavigationEnd) {
           // Hide loading indicator

           if (window.innerWidth < 1200) {
             document.body.classList.remove("g-sidenav-pinned");
             document.body.classList.add("g-sidenav-hidden");
             this.sidenavOpen = false;
           }
       }

       if (event instanceof NavigationError) {
           // Hide loading indicator

           // Present error to user
           console.log(event.error);
       }
   });

  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.checkUnreadNotifications(this.user?.id);
    // Poll for unread notifications every 30 seconds
    this.timer = setInterval(() => {
      this.checkUnreadNotifications(this.user?.id);

    }, 60000);     
  }


    checkUnreadNotifications(id) {
      this.notificationService.getUnreadNotifications(id).subscribe(
        (notifications) => {
          // Process notifications received from the backend
          // Update UI with new notifications

          console.log("notifications");
          console.log(notifications);
          this.notifications = notifications
          
        },
        (error) => {
          console.error('Error fetching unread notifications:', error);
        }
      );
    }


  getTimePassed(notificationDate) {
    const now = new Date();
    const diff = now.getTime() - new Date(notificationDate).getTime();
    const diffInSeconds = Math.floor(diff / 1000);

    if (diffInSeconds < 60) {
        return `il y a ${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} `;
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `il y a ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} `;
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `il y a ${diffInHours} heure${diffInHours === 1 ? '' : 's'} `;
    } else {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `il y a ${diffInDays} jour${diffInDays === 1 ? '' : 's'} `;
    }
}



  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function() {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }
  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }
  openSidebar() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }
  toggleSidenav() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }



  
  ngOnDestroy() {
    // Unsubscribe to route parameter changes to avoid memory leaks
    this.removeCounter()
  }

  removeCounter(){
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}
