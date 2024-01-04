import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AffaireService } from 'src/app/services/affaire.service';
import { DivisionserviceService } from 'src/app/services/divisionservice.service';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.scss']
})
export class AffaireComponent implements OnInit {
  poles: any;
  divisions: any;
  affaires: any;
  currentPage: number;
  itemsPerPage: number;
  totalItems: any;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private divisionService:DivisionserviceService,private poleService:PoleServiceService,private affaireService:AffaireService){
    this.gettingAllPoles()
    this. getAllDivisions()


    this.currentPage =0;   // Current page number
    this.itemsPerPage = 30;
    this.loadPaginatedData(this.currentPage, this.itemsPerPage);
    
  }


  loadPaginatedData(page: number, size: number) {
    this.affaireService.getAllAffairesPaginated(page, size)
      .subscribe((response: any) => {
        console.error(response)
        this.affaires = response.content;
        this.currentPage = page;
        this.itemsPerPage = size;
        this.totalItems = response.totalElements;
        console.error(response)
      });
  }


  
  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadPaginatedData(this.currentPage + 1, this.itemsPerPage);
    }
  }
  
  prevPage() {
    if (this.currentPage > 0) {
      this.loadPaginatedData(this.currentPage - 1, this.itemsPerPage);
    }
  }

  submit(form:NgForm){
    this.affaireService.createBusiness(form.value).subscribe(res=>{
      this.loadPaginatedData(this.currentPage, this.itemsPerPage);
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


  updateBusiness(id,i){
    this.affaireService.update(id,this.affaires[i]).subscribe(res=>{
      this.loadPaginatedData(this.currentPage, this.itemsPerPage);
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
      this.deleteAffaire(id)
      } else if (result.isDismissed) {
      
      }
    });
    
   
    
  }
  
  deleteAffaire(id){
    this.affaireService.delete(id).subscribe(res=>{
      this.loadPaginatedData(this.currentPage, this.itemsPerPage);
    },error=>console.log(error))

  }
}

