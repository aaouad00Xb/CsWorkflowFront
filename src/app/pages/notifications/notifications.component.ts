import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DivisionserviceService } from '../../services/divisionservice.service';
import { PoleServiceService } from '../../services/pole-service.service';
import { AffaireService } from '../../services/affaire.service';
import { NotificationServiceService } from '../../services/notification-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent  implements OnInit {
  poles: any;
  divisions: any;
  affaires: any;
  currentPage: number;
  itemsPerPage: number;
  totalItems: any;
  notifications: any = [];

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private notificationsService:NotificationServiceService){

    this.checkUnreadNotifications();

    
  }

  checkUnreadNotifications() {
    this.notificationsService.getUnreadNotifications(66).subscribe(
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

  
}

