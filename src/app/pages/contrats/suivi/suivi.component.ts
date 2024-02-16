import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild
} from "@angular/core";
import { saveAs } from 'file-saver';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ContratsSoutraitancesComponent } from "../../administration/contrats-soutraitances/contrats-soutraitances.component";
import { ContratsSService } from "src/app/services/contrats-s.service";
import { AffaireComponent } from "../../administration/affaire/affaire.component";
import { AffaireService } from "src/app/services/affaire.service";
import { PoleServiceService } from "src/app/services/pole-service.service";
import { StepFeildsService } from "src/app/services/step-feilds.service";
import { EntryDateServiceService } from "src/app/services/entry-date-service.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { userSelector } from "src/app/store/reducers/user.reducer";
import { StepService } from "src/app/services/step.service";
import WebViewer from "@pdftron/webviewer";

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit{
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


  sousTraitances: any=[
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
  selectedSoustraitance:any= {};
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
    private service: ContratsSService,
    private affaireService:AffaireService,
    private poleService:PoleServiceService,
    private stepFields:StepFeildsService,
    private entryDateS:EntryDateServiceService,
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

  keyword = 'contratNumber';
 

  selectEvent(item) {
    // do something with selected item
    console.log(item);
    this.selectedSoustraitance = item;
    this.getStepFields(item.contratID,item.currentStep.stepID)
    // this.getFactures(item.id);
    this.getEntryDate(item.contratID,item.currentStep.stepID);

    this.paramValue = this.selectedSoustraitance.contratID;

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
  this.service
          .download(fileData)
          .subscribe(blob => saveAs(blob, fileData.filename));
}

  ngOnInit(): void {
    this.initForm();


      // Subscribe to route parameter changes
      this.routeSub = this.route.params.subscribe(params => {
        // Access the parameter value here
        this.paramValue = params['contratID'];
        if(this.paramValue )this.getContratById()
        console.error(params)
      });

    this.GetAllSousTraitances()
  }



  getContratById(){
    this.service.getContratById(this.paramValue).subscribe(
      res=>{
        // this.selectedFactures = res;
        console.log(res)
        this.selectedSoustraitance = res
        this.getEntryDate(this.selectedSoustraitance.contratID,this.selectedSoustraitance.currentStep.stepID);
        this.getStepFields(res.contratID,res.currentStep.stepID)

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
      this.service.uploadFileReparation(this.selectedSoustraitance.contratID,formData).subscribe(res=>{
        this.loading = false 

        Swal.fire('les fichiers sont bien stockées')
        this.selectedSoustraitance = res

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


  getEntryDate(contratID,stepID): void {
    this.removeCounter()
    // Fetch the list of businesses from your service
    this.entryDateS.getEntryDate(contratID,stepID).subscribe(res=>{
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


  getStepFields(contratId,stepid){
    // this.selectedFacture = f;
    this.stepFieldsList = []
    this.currentStepId = stepid

    if(contratId && stepid)
    this.stepFields.findByContratAndStep(contratId,stepid).subscribe(res=>{
      console.log(res)
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

        swal.fire({
          icon:"success",
          title: "Oppération bien éffectué!",
          text: "Contrat est bien actualisée.",
        })
    },
    (err)=>{
      this.loading = false 

      swal.fire({
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


    GetAllSousTraitances(){

      this.service.getAllContratssses().subscribe(
        res=>{
          // this.selectedFactures = res;
          console.log(res)
          this.sousTraitances = res
          
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

    
    if(this.selectedSoustraitance?.currentStep?.previousStep != null){
      console.warn("rani dkhelt")
      if(this.selectedSoustraitance?.currentStep?.previousStep.stepID == this.nextstepID){
        this.service.transitionContratToStep(this.selectedSoustraitance.contratID,this.selectedSoustraitance?.currentStep?.previousStep?.stepID,this.commentaire).subscribe(res=>{
        
        
          this.loading = false;

          console.log(res)
        },err=>
        
      {  
        this.loading = false;
      
        swal.fire({
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

    
    
    // if(this.selectedSoustraitance?.currentStep?.nextStep?.stepID == this.nextstepID){
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
      this.service.transitionContratToStep(this.selectedSoustraitance.contratID,this.selectedSoustraitance?.currentStep?.nextStep?.stepID,this.commentaire).subscribe(res=>{
        this.loading = false;
    
        swal.fire({
        icon:"success",
        title: "Oppération bien éffectué!",
        text: "Contrat est bien actualisée.",
      })
        this.getContratById()

      },err=>{
        this.loading = false;
        swal.fire({
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
      swal.fire({
        icon:"error",
        title: "Oppération réfusée!",
        text: "veuillez choisir votre destinataire.",
      })

      return;
    }


        this.service.transitionContratToStep(this.selectedSoustraitance.contratID,this.nextstepID,this.commentaire).subscribe(res=>{
          this.loading = false

          swal.fire({
            icon:"success",
            title: "Oppération bien éffectué!",
            text: "Contrat est bien actualisée.",
          })
          this.getContratById()
        },err=>{
          this.loading = false

          swal.fire({
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

      this.service.validateContrat(this.selectedSoustraitance.contratID,"contrat bien validé").subscribe(res=>{
        this.loading = false
      swal.fire({
        icon:"success",
        title: "Oppération bien éffectué!",
        text: "Contrat est bien actualisée.",
      })
        this.getContratById()

      },err=>{
        this.loading = false
        swal.fire({
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


}

  


