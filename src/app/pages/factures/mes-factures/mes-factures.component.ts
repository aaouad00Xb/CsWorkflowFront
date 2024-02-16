import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
  HostListener
} from "@angular/core";
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
import { Router } from "@angular/router";
import { FactureService } from "src/app/services/facture.service";

@Component({
  selector: 'app-mes-factures',
  templateUrl: './mes-factures.component.html',
  styleUrls: ['./mes-factures.component.scss']
})
export class MesFacturesComponent implements OnInit{
  mesContrat: any = [];
  mesContratAilleur: any = [];
  MesContratValid: any = [];
  entries: number = 10;
  entries2: number = 10;
  entries3: number = 10;
  temp2: any = [];
  temp3: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private service: FactureService,
    private affaireService:AffaireService,
    private poleService:PoleServiceService,
    private stepFields:StepFeildsService,
    private entryDateS:EntryDateServiceService,
    private modalService: BsModalService,
    private elementRef: ElementRef,
    private router: Router
  ) {
   
  }


  selected: any[] = [];
  temp = [];
  activeRow: any;



  

  ngOnInit(): void {

    this.getMesContart()
    this.getMesContratAilleur()
    this.getMesContratValid()
    
  }






  getMesContart(){
    this.service.MesContrat(2).subscribe(res=>{
      console.log(res)
      this.mesContrat = res;
      this.temp2 = this.mesContrat.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });
    },err=>console.log(err))
  }

  getMesContratAilleur(){
    this.service.MesContratAilleur(2).subscribe(res=>{
      console.log(res)
      this.mesContratAilleur = res;

      this.temp3 = this.mesContratAilleur.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });

    },err=>console.log(err))
  }

  getMesContratValid(){
    this.service.MesContratValid(2).subscribe(res=>{
      console.log(res)
      this.MesContratValid = res
      this.temp = this.MesContratValid.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });
  
    },err=>console.log(err))
  }
 


  tableWidthPercentage = 100; // Initialize with default width

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Adjust table width on window resize or collapse/expand events
    this.temp = [...this.temp];
    console.log("hello")
  }

  
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  entriesChange2($event) {
    this.entries2 = $event.target.value;
  }


  entriesChange3($event) {
    this.entries3 = $event.target.value;
  }
  // filterTable($event) {
  //   let val = $event.target.value;
  //   this.temp = this.MesContratValid.filter((d)=> {
  //     for (var key in d) {
  //       if (d[key].toLowerCase().indexOf(val) !== -1) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  // }

  filterTable($event) {
    let val = $event.target.value.toLowerCase();
    this.temp = this.MesContratValid.filter((d) => {
      for (const key in d) {
        if (Object.prototype.hasOwnProperty.call(d, key)) {
          if (typeof d[key] === 'string' && d[key].toLowerCase().includes(val)) {
            return true; // String property contains the search value
          } else if (typeof d[key] === 'object') {
            // Handle nested objects, adjust based on your object structure
            for (const nestedKey in d[key]) {
              if (Object.prototype.hasOwnProperty.call(d[key], nestedKey) &&
                  typeof d[key][nestedKey] === 'string' &&
                  d[key][nestedKey].toLowerCase().includes(val)) {
                return true; // Nested string property contains the search value
              }
            }
          }
        }
      }
      return false;
    });
  }
 

  filterTable2($event) {
    let val = $event.target.value.toLowerCase();
    this.temp2 = this.mesContrat.filter((d) => {
      for (const key in d) {
        if (Object.prototype.hasOwnProperty.call(d, key)) {
          if (typeof d[key] === 'string' && d[key].toLowerCase().includes(val)) {
            return true; // String property contains the search value
          } else if (typeof d[key] === 'object') {
            // Handle nested objects, adjust based on your object structure
            for (const nestedKey in d[key]) {
              if (Object.prototype.hasOwnProperty.call(d[key], nestedKey) &&
                  typeof d[key][nestedKey] === 'string' &&
                  d[key][nestedKey].toLowerCase().includes(val)) {
                return true; // Nested string property contains the search value
              }
            }
          }
        }
      }
      return false;
    });
  }


  
  filterTable3($event) {
    let val = $event.target.value.toLowerCase();
    this.temp3 = this.mesContratAilleur.filter((d) => {
      for (const key in d) {
        if (Object.prototype.hasOwnProperty.call(d, key)) {
          if (typeof d[key] === 'string' && d[key].toLowerCase().includes(val)) {
            return true; // String property contains the search value
          } else if (typeof d[key] === 'object') {
            // Handle nested objects, adjust based on your object structure
            for (const nestedKey in d[key]) {
              if (Object.prototype.hasOwnProperty.call(d[key], nestedKey) &&
                  typeof d[key][nestedKey] === 'string' &&
                  d[key][nestedKey].toLowerCase().includes(val)) {
                return true; // Nested string property contains the search value
              }
            }
          }
        }
      }
      return false;
    });
  }



  
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log("hello")
  }
  onActivate(event) {
    this.activeRow = event.row;
  }


  onRowAction(ele) {
    // Navigating to the 'about' route with parameters
    console.log(ele)
    this.router.navigate(['/SuivitFacture/test', ele]);
  }


  onEditAction(ele) {
    // Navigating to the 'about' route with parameters
    console.log(ele)
    this.router.navigate(['/SuivitFacture/rechercheFactures', ele]);
  }




}

  


