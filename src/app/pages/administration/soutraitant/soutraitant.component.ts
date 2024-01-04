import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import { SoustraitantService } from 'src/app/services/soustraitant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soutraitant',
  templateUrl: './soutraitant.component.html',
  styleUrls: ['./soutraitant.component.scss']
})
export class SoutraitantComponent implements OnInit {
  poles: any;
  soustraitants: any;
  patente: any;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private poleService:PoleServiceService,private service:SoustraitantService){
    this.gettingAllSoutraitant()
  }

  submitForm(form:NgForm){
    this.service.createSoustraitant(form.value).subscribe(res=>{
      this.gettingAllSoutraitant()
      Swal.fire('opération bien effectuée')

    },error=> Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur s\'est produite. Route déja utilisé dans une formulaire.'
    }))
  }


  gettingAllSoutraitant(){
    this.service.getAllSoustraitant().subscribe(res=>{
      this.soustraitants = res;
      console.log(this.poles)
    },error=>console.log(error))

  }


  updateSoustraitant(id,i){
    this.service.update(id,this.soustraitants[i]).subscribe(res=>{
      this.gettingAllSoutraitant()
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
        this.delete(id)
      } else if (result.isDismissed) {
      
      }
    });
    
   
    
  }
  
  delete(id){
    this.service.delete(id).subscribe(res=>{
      this.gettingAllSoutraitant()
    },error=>console.log(error))

  }
}
