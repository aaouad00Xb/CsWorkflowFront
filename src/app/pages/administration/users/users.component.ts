import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent{

  adduser:boolean= false
 poles: any;
 divisions: any;
 selectPole: any;
 role: any;
 users: any;
  constructor(private service:UserServiceService,private poleService:PoleServiceService){

   this.loadPoles()
   this.getUsers()
  }

  loadPoles(): void {
   // Fetch the list of businesses from your service
   this.poleService.getAllPoles().subscribe(res=>{
     console.log(res)
     this.poles =res
   },err=>{
     console.log(err)
   });
 }


 
 onChangeDivision(eve): void {
   this.service.getUsersBySelectedRoleAndDivision(this.role,eve.target.value).subscribe(res=>{
     console.log(res)
     this.users =res
   },err=>{
     console.log(err)
   });
 }

 onPoleChange(p): void {
   // Handle business selection change
   console.log(p.target.value)
   const selectedPole = p.target.value.poleID;
   this.selectPole = this.poles.find(pl => {
     return pl.poleID == p.target.value;
   });
   
   console.log('this.selectPole:', this.selectPole);
   // Fetch related SousTraitants and other data based on the selected business
   console.log(this.selectPole)
   this.divisions = this.selectPole.divisions
   // You can also load other related data here
 }


 register(ngForm:NgForm){

   this.service.register(ngForm.value).subscribe(res=>{
     console.log(res);
     ngForm.reset();
   },err=>console.error(err)
   )
   console.log(ngForm.value)

 }

 getUsers(){
   this.service.getUsers().subscribe(res=>{
   console.log(res)
     this.users = res;   
   },err=>console.error(err)
   )
 }


 toggleUserActiveStatus(ele){
   this.service.toggleUserActiveStatus(ele).subscribe(res=>{
   console.log(res)
  
   },err=>console.error(err)
   )
 }
 save_user(ele){
   console.log(ele)
   console.log(ele.id)
   this.service.updateUser(ele.id,ele).subscribe(res=>{
   console.log(res)
  
   },err=>console.error(err)
   )
 }


}
