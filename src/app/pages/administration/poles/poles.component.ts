import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poles',
  templateUrl: './poles.component.html',
  styleUrls: ['./poles.component.scss']
})
export class PolesComponent implements OnInit {
  poles: any;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private poleService:PoleServiceService){
    this.gettingAllPoles()
  }
  submit(form:NgForm){
    this.poleService.savePole(form.value).subscribe(res=>{
      this.gettingAllPoles()
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


  updatePole(id,i){
    this.poleService.updatePole(id,this.poles[i]).subscribe(res=>{
      this.gettingAllPoles()
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
        this.deletePole(id)
      } else if (result.isDismissed) {
      
      }
    });
    
   
    
  }
  
  deletePole(id){
    this.poleService.deletePole(id).subscribe(res=>{
      this.gettingAllPoles()
    },error=>console.log(error))

  }
}
