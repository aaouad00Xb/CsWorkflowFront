export class FileData {
  filename?: string;
  contentType?: string;
  size?: number;
}

import { saveAs } from 'file-saver';


import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import WebViewer from '@pdftron/webviewer';
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
import { FileService } from "src/app/services/file.service";
@Component({
  selector: 'app-contrat-profil',
  templateUrl: './contrat-profil.component.html',
  styleUrls: ['./contrat-profil.component.scss']
})
export class ContratProfilComponent implements OnInit{
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
  history: any = [  ];
  pathImage: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: ContratsSService,
    private affaireService:AffaireService,
    private poleService:PoleServiceService,
    private stepFields:StepFeildsService,
    private entryDateS:EntryDateServiceService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private fileService: FileService
  ) {

    this.url = this.service.url

  }

  keyword = 'contratNumber';
 

  selectEvent(item) {
    // do something with selected item
    console.log(item);
    this.selectedSoustraitance = item;
    this.getStepFields(item.contratID,item.currentStep.stepID)
    // this.getFactures(item.id);
    
   }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }


 

  ngOnInit(): void {
    this.initForm();

 

     // Subscribe to route parameter changes
     this.routeSub = this.route.params.subscribe(params => {
      // Access the parameter value here
      this.paramValue = params['contratID'];
      this.getContratById()
      console.log(this.paramValue); // Use the received parameter as needed
    });

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
  getAllEntryDate(contratID): void {
    // Fetch the list of businesses from your service
    this.entryDateS.getAllEntryDate(contratID).subscribe(res=>{
      console.log(res)
      this.history = res
    },err=>{
      console.log(err)
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


  

  // formatTime(totalSeconds: number): string {
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;
  
  //   const displayHours = this.padZero(hours);
  //   const displayMinutes = this.padZero(minutes);
  //   const displaySeconds = this.padZero(seconds);
  
  //   return `${displayHours}:${displayMinutes}:${displaySeconds}`;
  // }

  
  
  // padZero(value: number): string {
  //   return value < 10 ? `0${value}` : `${value}`;
  // }

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
    this.stepFields.updateStepFields(this.stepFieldsList).subscribe((res)=>console.log(res),(err)=>console.log(err));
  }


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


    // GetAllSousTraitances(){

    //   this.service.getAllContratssses().subscribe(
    //     res=>{
    //       // this.selectedFactures = res;
    //       console.log(res)
    //       this.sousTraitances = res
          
    //     },err=>{
    //       console.log(err)
    //     }
    //   )  }
      getContratById(){
      this.service.getContratById(this.paramValue).subscribe(
        res=>{
          // this.selectedFactures = res;
          console.log(res)
          this.selectedSoustraitance = res
          this.getEntryDate(this.selectedSoustraitance.contratID,this.selectedSoustraitance.currentStep.stepID);
          this.getAllEntryDate(this.selectedSoustraitance.contratID);
       
       
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
    let valid = true 
    for(let ele of this.stepFieldsList){
      if(!ele.valid){
        valid =false
      }
    }

    if(this.selectedSoustraitance?.currentStep?.previousStep.stepID == this.nextstepID){
      this.service.transitionContratToStep(this.selectedSoustraitance.contratID,this.selectedSoustraitance?.currentStep?.previousStep?.stepID,this.commentaire).subscribe(res=>{
        console.log(res)
      },err=>console.log(err))
      return;
    }

    if(!valid){
      
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

      this.service.transitionContratToStep(this.selectedSoustraitance.contratID,this.selectedSoustraitance?.currentStep?.nextStep?.stepID,this.commentaire).subscribe(res=>{
        console.log(res)
      },err=>console.log(err))
    


  }

  openImageInNewWindow(imageUrl): void {
    window.open(this.url+"/" + imageUrl, '_blank');
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




// downloadFile(fileName: string): void {
//   this.service.downloadFile(fileName).subscribe(
//     (response: Blob) => {
//       console.log('Response:', response);
//       // Rest of your code...
//     },
//     error => {
//       console.error('Error downloading file:', error);
//     })

    downloadFile(fileData: any): void {
      this.service
              .download(fileData)
              .subscribe(blob => saveAs(blob, fileData.filename));
  }
    
  // this.service.downloadFile(fileName).subscribe(
  //   (response) => {
  //     console.error(response);
  //     // // Create a blob URL from the response
  //     // const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  //     // const url = window.URL.createObjectURL(blob);

  //     // // Create a link element and trigger the download
  //     // const a = document.createElement('a');
  //     // a.href = url;
  //     // a.download = fileName;
  //     // document.body.appendChild(a);
  //     // a.click();
  //     // window.URL.revokeObjectURL(url);
  //   },
  //   error => {
  //     // Handle error
  //     console.error('Error downloading file:', error);
  //   }
  // );



  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = inputElement.files;
    }
  }



 

  ngOnDestroy() {
    // Unsubscribe to route parameter changes to avoid memory leaks
    this.removeCounter()
  }

  removeCounter(){
    this.routeSub.unsubscribe();
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}

  


