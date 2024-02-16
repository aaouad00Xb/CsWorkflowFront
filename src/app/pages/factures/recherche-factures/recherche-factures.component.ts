import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import WebViewer from '@pdftron/webviewer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AffaireService } from 'src/app/services/affaire.service';
import { ContratsSService } from 'src/app/services/contrats-s.service';
import { EntryDateFServiceService } from 'src/app/services/entry-date-fservice.service';
import { EntryDateServiceService } from 'src/app/services/entry-date-service.service';
import { FactureService } from 'src/app/services/facture.service';
import { PoleServiceService } from 'src/app/services/pole-service.service';
import { StepFeildsService } from 'src/app/services/step-feilds.service';
import { StepFeildsfService } from 'src/app/services/step-feildsf.service';
import { StepService } from 'src/app/services/step.service';
import { userSelector } from 'src/app/store/reducers/user.reducer';
import Swal from "sweetalert2";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-recherche-factures',
  templateUrl: './recherche-factures.component.html',
  styleUrls: ['./recherche-factures.component.scss']
})
export class RechercheFacturesComponent  implements OnInit{
  factureForm!: FormGroup;
  @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;

  businesses: any[]=[]; // Replace with your Business model
  sousTraitants: any[]=[] // Replace with your SousTraitant model
  poles: any=[];
  nextstepID
  divisions: any;
  selectedFactures: any;
  projectManagerID: any;
  currentStepId: any;
  selectedFiles: FileList;
  stepFieldsList: any;
  loading: boolean=false;

  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered"
  };


  factures: any=[
    {
      id: 1,
      nstraitance: 'Georgia'
    },
     {
       id: 2,
       nstraitance: 'Usa'
     },
     {
       id: 3,
       nstraitance: 'England'
     }
  ];
  selectedfacture:any= {};
  selectedFacture: any;
  url: string;
  entryDate: any;
  timer: any;
  commentaire: any;
  receivedDate: Date;
  elapsedSeconds: number;
  private routeSub: Subscription;
  paramValue: any;
  myuser: any;
  steps: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: FactureService,
    private Contratservice: ContratsSService,
    
    private affaireService:AffaireService,
    private poleService:PoleServiceService,
    private stepFields:StepFeildsfService,
    private entryDateS:EntryDateFServiceService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private store: Store<any>,
    private step:StepService

  ) {

    this.url = this.service.url

    this.store.select(userSelector).subscribe((data)=>{
      console.error(data)
      this.myuser = data
    })

    this.getAllSteps()
  }

  keyword = 'factureNumber';
 

  selectEvent(item) {
    // do something with selected item
    console.log(item);
    this.selectedfacture = item;
    this.getStepFields(item.factureID,item.currentStep.stepID)
    // this.getFactures(item.id);
    this.getEntryDate(item.factureID,item.currentStep.stepID);

    this.paramValue = this.selectedfacture.factureID;

   }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }

  getAllSteps(){
    this.step.findAll().subscribe(
      res=>{
        console.log(res)
        this.steps = res
      },
      error=>console.log(error)
    )
  }

  ngOnInit(): void {
    this.initForm();

    // Subscribe to route parameter changes
      this.routeSub = this.route.params.subscribe(params => {
        // Access the parameter value here
        this.paramValue = params['factureID'];
        if(this.paramValue )this.getContratById()
        console.error(params)
      });

    this.GetAllfactures()
  }



  getContratById(){
    this.service.getContratById(this.paramValue).subscribe(
      res=>{
        // this.selectedFactures = res;
        console.log(res)
        this.selectedfacture = res
        this.getEntryDate(this.selectedfacture.factureID,this.selectedfacture.currentStep.stepID);
        this.getStepFields(res.factureID,res.currentStep.stepID)

      },err=>{
        console.log(err)
      }
    )  }


 

    

  saveFiles(){
    if (!this.selectedFiles) {
      console.error('No file selected.');
      return;
    }

    if (this.selectedFiles && this.selectedFiles?.length > 0) {
      const formData = new FormData();
  
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }
  this.loading = true 
      this.service.uploadFileReparation(this.selectedfacture.factureID,formData).subscribe(res=>{
        this.loading = false 

        Swal.fire('les fichiers sont bien stockées')
        this.selectedfacture = res

      },err=>{
        
        this.loading = false 

        Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite. upload des fichier!!.'
      })})
    }
  }

  initForm(): void {
    this.factureForm = this.formBuilder.group({
      divisions: [null, Validators.required],
      poles: [null, Validators.required],
      business: [null, Validators.required],
      sousTraitant: [null, Validators.required],
      factureNumber: [''],
      factureDate: [''],
      totalAmount: [''],
      currentStep: [''],
      projectManager: ['']
    });
  }

  loadBusinesses(): void {
    // Fetch the list of businesses from your service
    this.affaireService.getBusinesses().subscribe(res=>{
      console.log(res)
      this.businesses =res
    },err=>{
      console.log(err)
    });
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


  getEntryDate(factureID,stepID): void {
    this.removeCounter()
    // Fetch the list of businesses from your service
    this.entryDateS.getEntryDate(factureID,stepID).subscribe(res=>{
      console.log(res)
      this.entryDate = res;
      this.startTimer();
    },err=>{
      console.log(err)
      this.removeCounter()
    });
  }


  startTimer() {
    this.receivedDate = new Date(this.entryDate.entryDate); // Example date

    this.timer = setInterval(() => {
      const currentDate = new Date();
      const difference = Math.floor((currentDate.getTime() -  this.receivedDate.getTime()) / 1000);
      this.elapsedSeconds = difference;
    }, 1000); // Update every second (1000ms)
  }


  ngOnDestroy() {
    // Unsubscribe to route parameter changes to avoid memory leaks
    this.removeCounter()
  }

  removeCounter(){
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.entryDate = null
  }
  formatTime(totalSeconds: number): string {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const remainingSeconds = totalSeconds % (3600 * 24);
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
  
    const displayDays = days > 0 ? `${this.padZero(days)}jrs ` : '';
    const displayHours = this.padZero(hours);
    const displayMinutes = this.padZero(minutes);
    const displaySeconds = this.padZero(seconds);
  
    return `${displayDays}${displayHours}:${displayMinutes}:${displaySeconds}`;
  }
  
  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }


  getStepFields(factureID,stepid){
    // this.selectedFacture = f;
    this.stepFieldsList = []
    this.currentStepId = stepid
    console.log("FactureStepFields")
    if(factureID && stepid)
    this.stepFields.findByContratAndStep(factureID,stepid).subscribe(res=>{
      console.warn(res)
      this.stepFieldsList = res;
    },
    err=>
    console.log(err))
   
  }

  updateStepFields(){
    this.loading = true 

    this.stepFields.updateStepFields(this.stepFieldsList).subscribe(
      (res)=>{
        this.loading = false 

        Swal.fire({
          icon:"success",
          title: "Oppération bien éffectué!",
          text: "Contrat est bien actualisée.",
        })
    },
    (err)=>{
      this.loading = false 

      Swal.fire({
        icon:"error",
        title: "Erreur de serveur!",
        text: "Veuillez essayer plutard",
      })
    });
  }

  // updateStepFieldsAdministration(){
  //   this.stepFields.updateStepFieldsAdministration(this.stepFieldsList).subscribe((res)=>console.log(res),(err)=>console.log(err));
  // }


  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  
  getProjectManager(){

    if(this.selectedFacture){
      for(let ele of this.selectedFacture.business.userList    ){
        if(ele.role == "PROJECT_MANAGER"){
          this.projectManagerID = ele.id
          return ele.name
        }
      }
    }
  
    
  }


  
  

  // getFactures(id){

  //   this.service.getFacturesBySousTraitance(id).subscribe(
  //     res=>{
  //       console.log(res)
  //       this.selectedFactures = res;
        
  //     },err=>{
  //       console.log(err)
  //     }
  //   )  }


    GetAllfactures(){

      this.service.MesContrat(2).subscribe(
        res=>{
          // this.selectedFactures = res;
          console.error(res)
          this.factures = res
          
        },err=>{
          console.log(err)
        }
      )  }



  // onStraitanthange(): void {
  //   // Handle business selection change
  //    = this.factureForm.get('sousTraitant').value
 
  //   // You can also load other related data here
  // }


  onBusinessChange(): void {
    // Handle business selection change
    const selectedBusinessId = this.factureForm.get('business').value.businessID;
    // Fetch related SousTraitants and other data based on the selected business
  //  this.service.getSousTraitantsBybuisenssid(selectedBusinessId).subscribe(
  //   res=>{
  //     this.sousTraitants = res
  //   },err=>console.log(err)
  //  );
    // You can also load other related data here
  }

  onPoleChange(): void {
    // Handle business selection change
    const selectedPole = this.factureForm.get('poles').value;
    // Fetch related SousTraitants and other data based on the selected business
    console.log(selectedPole)
    this.divisions = selectedPole.divisions
    // You can also load other related data here
  }

  onChangeDivision(): void {
    // Handle business selection change
    const selectedPole = this.factureForm.get('divisions').value;
    // Fetch related SousTraitants and other data based on the selected business
    console.log(selectedPole)
    this.businesses = selectedPole.businesses
    // You can also load other related data here
  }


  onSubmit(f): void {

    let obj = {
      business:this.factureForm.get('business').value.businessID,
      sousTraitant:this.factureForm.get('sousTraitant').value?.id,
      projectManager:this.projectManagerID
    }
    Object.assign(obj, f.value);
        console.log(obj)

    // this.service.createsFacture(obj).subscribe((response) => {
    //   // Handle the response
    // });
  }


  async validate(){
    this.loading = true;
    let valid = true 
    for(let ele of this.stepFieldsList){
      if(!ele.valid){
        valid =false
      }
    }

    
    if(this.selectedfacture?.currentStep?.previousStep != null){
      console.warn("rani dkhelt")
      if(this.selectedfacture?.currentStep?.previousStep.stepID == this.nextstepID){
        this.service.transitionContratToStep(this.selectedfacture.factureID,this.selectedfacture?.currentStep?.previousStep?.stepID,this.commentaire).subscribe(res=>{
        
        
          this.loading = false;

          console.log(res)
        },err=>
        
      {  
        this.loading = false;
      
        Swal.fire({
          icon:"error",
          title: "Oppération réfusée!",
          text: "veuillez choisir votre destinataire.",
        })
      }
        )
        return;
      }
    }
   

    if(!valid){
      this.loading = false;
      Swal.fire({
        title: "le passage vers la nouvelle étape nécessite la validation de toutes les requis",
        icon: "info",
        iconHtml: "!",
        confirmButtonText: "Je comprend",
        showCancelButton: false,
        showCloseButton: true
      });
      return;
    }

    
    
    // if(this.selectedfacture?.currentStep?.nextStep?.stepID == this.nextstepID){
        //  const button = document.createElement('button');
        //     button.innerText = 'Click me';
        //     button.style.visibility = 'hidden'; // Set the initial visibility to hidden
        //     button.setAttribute('data-bs-toggle', 'modal'); // Set the data-bs-toggle attribute
        //     button.setAttribute('data-bs-target', '#exampleModal'); // Set the data-bs-target attribute
        //     button.addEventListener('click', () => {
        //       console.log('Button clicked');
        //     });
        //     // Add the button element to the container element
        //     this.buttonContainer.nativeElement.appendChild(button);
        //     button.click()

      


      const result = await this.stepFields.updateStepFields(this.stepFieldsList).toPromise();
      console.log(result)
      this.loading = true;
      this.service.transitionContratToStep(this.selectedfacture.factureID,this.selectedfacture?.currentStep?.nextStep?.stepID,this.commentaire).subscribe(res=>{
        this.loading = false;
    
        Swal.fire({
        icon:"success",
        title: "Oppération bien éffectué!",
        text: "Contrat est bien actualisée.",
      })
        this.getContratById()

      },err=>{
        this.loading = false;
        Swal.fire({
          icon:"error",
          title: "Oppération réfusée!",
          text: "veuillez choisir votre destinataire.",
        })
      })
    
    
    // }

  }

  async validateNot(){
 
    this.loading = true
    if(!this.nextstepID || this.nextstepID == undefined){
      Swal.fire({
        icon:"error",
        title: "Oppération réfusée!",
        text: "veuillez choisir votre destinataire.",
      })

      return;
    }


        this.service.transitionContratToStep(this.selectedfacture.factureID,this.nextstepID,this.commentaire).subscribe(res=>{
          this.loading = false

          Swal.fire({
            icon:"success",
            title: "Oppération bien éffectué!",
            text: "Contrat est bien actualisée.",
          })
          this.getContratById()
        },err=>{
          this.loading = false

          Swal.fire({
            icon:"error",
            title: "Oppération réfusée!",
            text: "veuillez essayer ULTÉRIEUREMENT.",
          })
          console.log(err)

        })
      

  
    
   

  }


  async validateDG(){
    this.loading = true;
    let valid = true 

    for(let ele of this.stepFieldsList){
      if(!ele.valid){
        valid =false
      }
    }
    if(!valid){
      this.loading = false;
      Swal.fire({
        title: "le passage vers la nouvelle étape nécessite la validation de toutes les requis",
        icon: "info",
        iconHtml: "!",
        confirmButtonText: "Je comprend",
        showCancelButton: false,
        showCloseButton: true
      });
      return;
    }

      const result = await this.stepFields.updateStepFields(this.stepFieldsList).toPromise();
      console.log(result)

      this.service.validateContrat(this.selectedfacture.factureID,"contrat bien validé").subscribe(res=>{
        this.loading = false
      Swal.fire({
        icon:"success",
        title: "Oppération bien éffectué!",
        text: "Contrat est bien actualisée.",
      })
        this.getContratById()

      },err=>{
        this.loading = false
        Swal.fire({
          icon:"error",
          title: "Erreur de serveur ",
          text: "",
        })
      })
    
    
    // }

  }

  openImageInNewWindow(imageUrl): void {
    window.open(this.url+"/" + imageUrl, '_blank');
  }




  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = inputElement.files;
    }
  }

  addElementsToPdfContainer(file:string){
    // this.show = true;
    const child1 = document.getElementById("viewer"); // Get the child div element
    if(child1){
      child1.remove();
    }


    const parent = document.getElementById("test");
    const child = document.createElement("div");
    child.id = "viewer";
    child.classList.add("webviewer");
    child.style.width = "100%"; // Add inline style to set width to 100%
    child.style.height = "70vh"; // Add inline style to set height to 100vh
    parent.appendChild(child);

    WebViewer({
      // path: ../../assets/lib,
      path:`assets/lib`,
      initialDoc: this.url+'/'+ file ,

    },document.getElementById("viewer"))
  }


downloadFile(fileData: any): void {
  this.Contratservice
          .download(fileData)
          .subscribe(blob => saveAs(blob, fileData.filename));
}

}

  

