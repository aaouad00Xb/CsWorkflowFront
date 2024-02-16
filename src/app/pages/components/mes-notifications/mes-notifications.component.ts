import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { imagePath } from 'src/app/services/envirement';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { userSelector } from 'src/app/store/reducers/user.reducer';

@Component({
  selector: 'app-mes-notifications',
  templateUrl: './mes-notifications.component.html',
  styleUrls: ['./mes-notifications.component.scss']
})
export class MesNotificationsComponent implements OnInit {
  poles: any;
  divisions: any;
  affaires: any;
  currentPage: number;
  itemsPerPage: number;
  totalItems: any;
  notifications: any = [];
  path = imagePath
  user: any;
  hasContrat: boolean = false;
  hasFacture: boolean = false;
  forMe: boolean = false;
  filteredNotifications: any = [];

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private notificationsService:NotificationServiceService, private router: Router,private store: Store<any>,){
    this.store.select(userSelector).subscribe(data => this.user = data)

    this.checkUnreadNotifications();

    
  }



  

  applyFilters() {
    this.filteredNotifications = this.notifications.filter(notification => {
      let matchContrat = !this.hasContrat || notification.contratID != null;
      let matchFacture = !this.hasFacture || notification.factureID != null;
      let matchForMe = !this.forMe || notification.forMe;

      return matchContrat && matchFacture && matchForMe;
    });
  }

  checkUnreadNotifications() {
    this.notificationsService.getUnreadNotifications(this.user?.id).subscribe(
      (notifications) => {
        // Process notifications received from the backend
        // Update UI with new notifications

        console.log("notifications");
        console.log(notifications);
        this.notifications = notifications
        this.filteredNotifications = notifications
        
      },
      (error) => {
        console.error('Error fetching unread notifications:', error);
      }
    );
  }

  
  notificationContent(type:string){
    switch(type){
      case 'fuite':
        return 'notification -error'
        break;
      case 'reparation':
      return 'notification -success'
      break;
      case 'init':
        return 'notification -info'
        break;
      case 'alert':
      return 'notification -error'
      break;
      case 'disprove':
      return 'notification -error'
      break;
      case 'prove':
      return 'notification -success'
      break;
      default:
      return 'notification'
      break

    }
  }

  notificationContentimage(type:string){
    switch(type){
      case 'disprove':
        return `assets/img/attention.png`
        break;
      case 'prove':
      return `assets/img/check.png`
      break;
      default:
      return `assets/img/bell.png`
      break

    }
  }
  toMe(type:boolean){
    if(type){
        return `assets/img/appel-a-laction.png`
    }else{
      // return `assets/img/sticky-notes.png`
      return `assets/img/informatif.png`
    }
  }


  onRowAction(ele) {
    // Navigating to the 'about' route with parameters
    if(ele.contratID!= null){
      this.router.navigate(['/Suivitcontrat/test', {contratID:ele.contratID}]);

    }else{
      this.router.navigate(['/SuivitFacture/test', {factureID:ele.factureID}]);

    }
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

  
}

