import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DivisionserviceService } from 'src/app/services/divisionservice.service';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss']
})
export class DivisionsComponent  implements OnInit {
  poles: any;
  divisions: any;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private divisionService:DivisionserviceService,private poleService:PoleServiceService){
    this.gettingAllPoles()
    this. getAllDivisions()
  }
  submit(form:NgForm){
    this.divisionService.createDivision(form.value).subscribe(res=>{
      this.getAllDivisions()
      Swal.fire('opération bien effectuée')

    },error=> Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur s\'est produite. Route déja utilisé dans une formulaire.'
    }))
  }


  gettingAllPoles(){
    this.poleService.getAllPoles().subscribe(res=>{
      this.poles = res;
      console.log(this.poles)
    },error=>console.log(error))


  }


  getAllDivisions(){
    this.divisionService.getAllDivisions().subscribe(res=>{
      this.divisions = res.body;
      console.log(this.divisions)
    },error=>console.log(error))

  }


  updateDivision(id,i){
    this.divisionService.updateDivision(id,this.divisions[i]).subscribe(res=>{
      this.getAllDivisions()
    },error=>console.log(error))

  }

  verify(id){
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        // The user clicked "Oui" (Yes)
        // Call your function for "Oui"
        this.deleteDivision(id)
      } else if (result.isDismissed) {
      
      }
    });
    
   
    
  }
  
  deleteDivision(id){
    this.divisionService.deleteDivision(id).subscribe(res=>{
      this.getAllDivisions()
    },error=>console.log(error))

  }
}
