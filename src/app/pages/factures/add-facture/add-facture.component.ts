import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AffaireService } from 'src/app/services/affaire.service';
import { ContratsSService } from 'src/app/services/contrats-s.service';
import { DivisionserviceService } from 'src/app/services/divisionservice.service';
import { FactureService } from 'src/app/services/facture.service';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import { SoustraitantService } from 'src/app/services/soustraitant.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})
export class AddFactureComponent implements OnInit {
  poles: any;
  divisions: any;
  soustraitants: any;
  business: any;
  contrats: any;
  selectedFiles: FileList;
  chefs: any;
  input: any;
  selectedContrat: any = 
  {
    contratID:0
  };
  loading:boolean = false
  factures: any[]=[];

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private contratService:ContratsSService,private poleService:PoleServiceService,private divisionService:DivisionserviceService,private service:SoustraitantService,private affaireService:AffaireService,private factureServices:FactureService,private userServ:UserServiceService){
    this.gettingAllPoles()
    this.getAllContrats()
    this.gettingAllAffaires()
    this.gettingAllSoutraitant()
    this.All()
    

  }


  gettingAllSoutraitant(){
    this.service.getAllSoustraitant().subscribe(res=>{
      this.soustraitants = res;
      console.log(this.poles)
    },error=>console.log(error))

  }
  selectContrat(x){
    this.selectedContrat = x
  }
  
  divisionChange(event){
   
    console.error(event.target.value);
    this.getchefsByDivisionID(event.target.value);
  }
  getchefsByDivisionID(divisonID){
    this.userServ.getchefsByDivisionID(divisonID).subscribe(res=>{
      this.chefs = res;
      console.log(this.chefs)
    },error=>console.log(error))

  }

  gettingAllAffaires(){
    this.affaireService.getBusinesses().subscribe(res=>{
      this.business = res.body
      console.error(res)
    },error=>console.log(error))

  }

  getAllContrats(){
    this.contratService.findAll().subscribe(res=>{
      this.contrats = res;
      console.warn(this.contrats)
    },error=>console.log(error))

  }

  submit(form:NgForm){
    this.loading = true
    this.factureServices.createFacture(form.value).subscribe(res=>{
      this.loading = false


      form.reset()
      console.log(res)
      Swal.fire('sauvegarde est bien effectuée')

      this.All()


      if (!this.selectedFiles) {
        console.error('No file selected.');
        return;
      }
  
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        const formData = new FormData();
    
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('files', this.selectedFiles[i]);
        }
    
        this.factureServices.uploadFileReparation(res.factureID,formData).subscribe(res=>{
          Swal.fire('les fichiers sont bien stockées')

        },err=>Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite. upload des fichier!!.'
        }))
      }




    },error=> {
      
      this.loading = false

      Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur s\'est produite. Route déja utilisé dans une formulaire.'
    })}
    
    
    )
  }


  gettingAllPoles(){
    this.poleService.getAllPoles().subscribe(res=>{
      this.poles = res;
      console.log(this.poles)
    },error=>console.log(error))

  }
  All(){
    this.factureServices.All().subscribe(res=>{
      this.factures = res;
      console.log(this.factures)
    },error=>console.log(error))

  }


  updateContrat(id,i){

    // this.contratService.update(id,this.contrats[i]).subscribe(res=>{
    //   this.gettingAllContrat()
    // },error=>console.log(error))
    
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

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = inputElement.files;
    }
  }
  
  deletePole(id){
  //   this.contratService.delete(id).subscribe(res=>{
  //     this.gettingAllContrat()
  //     Swal.fire('opération bien effectuée')
  //       },error=>Swal.fire({
  //         icon: 'error',
  //         title: 'Erreur',
  //         text: 'Une erreur s\'est produite. contrat déja utilisé.'
  //       }))

  // }
}
}
