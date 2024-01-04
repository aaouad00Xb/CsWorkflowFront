import { createFeatureSelector ,createSelector} from "@ngrx/store";
import { CustomAction } from "../Store";

let initialState = {
    n:1,
    counted:0,
    porteursList:[],
    statutList:[],
    gm_terrain:false,
    nat:false,
    refM:false,
    reg:false,
    prov:false,
    comm:false,
    pro:true,
    regional:false,
    provincial:false,
    type:false,
    Typologie:false,
    ref_Convention_type:false,
    ref_Convention_type_Value:"",
    communal:false,
    porteur:false,
    cout :false,
    statut :false,
    engagement_Delai :false,
    menu:'seulProject',
    ref:'',
    selectedRegions:[],
    selectedProvinces:[],
    selectedCommunes:[],
    selectedPorteurs:[],
    selectedtypeRisque:[],
    selectedacategories:[],
    selectedAnnee_appel_projets:[],
    selectedselectedprojs:[],
    selectedrefMs:[],
    type_institution:[],
    selectedType_institutions:[],
    selectedstatus:[],
    proj:false,
    typeRisque:false,
    categorie:false,
    Annee_appel_projet:false,
    contribution_FLCN:false,
    taux_avancement_physique_global:false,
    typeIns:false,
    delai:false,
    taux_deblocage:false,
    mindelai:'',
    maxdelai:'',
    minContribution_FLCN:'',
    maxContribution_FLCN:'',
    maxtaux_avancement_physique_global:'',
    mintaux_avancement_physique_global:'',
    maxtaux_deblocage:'',
    mintaux_deblocage:'',
    taux_engagement:false,
    mintaux_engagement:'',
    maxtaux_engagement:'',
    tauxpaiement:false,
    execution_physique_Delai_conventionne:false,
    mintauxpaiement:'',
    maxtauxpaiement:'',
    engagement_vis_vis_Delai:'',
    minengagement_vis_vis_Delai:'',
    maxengagement_vis_vis_Delai:'',
    minexecution_physique_Delai_conventionne:'',
    maxexecution_physique_Delai_conventionne:'',

    minexecution_physique_vis_vis_Deblocage_credit:'',
    maxexecution_physique_vis_vis_Deblocage_credit:'',
    execution_physique_vis_vis_Deblocage_credit:false,


    minpaiement_vis_vis_Execution_physique:'',
    maxpaiement_vis_vis_Execution_physique:'',
    paiement_vis_vis_Execution_physique:false,

}

export function counterReducer(state =initialState,action:CustomAction ){
    switch(action.type){
        case "init":
            return{
                ...state,
                n:0,
                counted:0,
                gm_terrain:false,
                nat:false,
                reg:false,
                prov:false,
                comm:false,
                pro:true,
                regional:false,
                provincial:false,
                type:false,
                Typologie:false,
                communal:false,
                porteur:false,
                cout :false,
                statut :false,
                engagement_Delai :false,
                menu:'seulProject',
                ref:'',
                selectedRegions:[],
                selectedProvinces:[],
                selectedCommunes:[],
                selectedPorteurs:[],
                selectedtypeRisque:[],
                selectedacategories:[],
                selectedAnnee_appel_projets:[],
                selectedselectedprojs:[],
                selectedrefMs:[],
                type_institution:[],
                selectedType_institutions:[],
                selectedstatus:[],
                proj:false,
                refM:false,
                typeRisque:false,
                categorie:false,
                Annee_appel_projet:false,
                contribution_FLCN:false,
                taux_avancement_physique_global:false,
                typeIns:false,
                delai:false,
                taux_deblocage:false,
                mindelai:'',
                maxdelai:'',
                minContribution_FLCN:'',
                maxContribution_FLCN:'',
                maxtaux_avancement_physique_global:'',
                mintaux_avancement_physique_global:'',
                maxtaux_deblocage:'',
                mintaux_deblocage:'',
                taux_engagement:false,
                mintaux_engagement:'',
                maxtaux_engagement:'',
                tauxpaiement:false,
                execution_physique_Delai_conventionne:false,
                mintauxpaiement:'',
                maxtauxpaiement:'',
                engagement_vis_vis_Delai:'',
                minengagement_vis_vis_Delai:'',
                maxengagement_vis_vis_Delai:'',
                minexecution_physique_Delai_conventionne:'',
                maxexecution_physique_Delai_conventionne:'',
            
                minexecution_physique_vis_vis_Deblocage_credit:'',
                maxexecution_physique_vis_vis_Deblocage_credit:'',
                execution_physique_vis_vis_Deblocage_credit:false,
            
            
                minpaiement_vis_vis_Execution_physique:'',
                maxpaiement_vis_vis_Execution_physique:'',
                paiement_vis_vis_Execution_physique:false,
            }
        case "init_menu1":
            return{
                ...state,
                nat:false,
                reg:false,
                prov:false,
                comm:false,
                regional:false,
                provincial:false,
                communal:false,
                ref:null,
                selectedRegions:[],
                selectedProvinces:[],
                selectedCommunes:[]
               
            }
        case "init_menu2":
            return{
                ...state,
                n:0,
                counted:0,
                gm_terrain:false,
                nat:false,
                reg:false,
                prov:false,
                comm:false,
                pro:true,
                regional:false,
                provincial:false,
                type:false,
                Typologie:false,
                communal:false,
                porteur:false,
                cout :false,
                statut :false,
                engagement_Delai :false,
                menu:'seulProject',
                ref:'',
                selectedRegions:[],
                selectedProvinces:[],
                selectedCommunes:[],
                selectedPorteurs:[],
                selectedtypeRisque:[],
                selectedacategories:[],
                selectedAnnee_appel_projets:[],
                selectedselectedprojs:[],
                selectedrefMs:[],
                type_institution:[],
                selectedType_institutions:[],
                selectedstatus:[],
                proj:false,
                refM:false,
                typeRisque:false,
                categorie:false,
                Annee_appel_projet:false,
                contribution_FLCN:false,
                taux_avancement_physique_global:false,
                typeIns:false,
                delai:false,
                taux_deblocage:false,
                mindelai:'',
                maxdelai:'',
                minContribution_FLCN:'',
                maxContribution_FLCN:'',
                maxtaux_avancement_physique_global:'',
                mintaux_avancement_physique_global:'',
                maxtaux_deblocage:'',
                mintaux_deblocage:'',
                taux_engagement:false,
                mintaux_engagement:'',
                maxtaux_engagement:'',
                tauxpaiement:false,
                execution_physique_Delai_conventionne:false,
                mintauxpaiement:'',
                maxtauxpaiement:'',
                engagement_vis_vis_Delai:'',
                minengagement_vis_vis_Delai:'',
                maxengagement_vis_vis_Delai:'',
                minexecution_physique_Delai_conventionne:'',
                maxexecution_physique_Delai_conventionne:'',
            
                minexecution_physique_vis_vis_Deblocage_credit:'',
                maxexecution_physique_vis_vis_Deblocage_credit:'',
                execution_physique_vis_vis_Deblocage_credit:false,
            
            
                minpaiement_vis_vis_Execution_physique:'',
                maxpaiement_vis_vis_Execution_physique:'',
                paiement_vis_vis_Execution_physique:false,
               
            }
        case "incr":
            return{
                ...state,
                n: state.n +action.payload
            }
         case "decr":
            return{
                ...state,
                n: state.n -action.payload
            }
         case "porteurs":
            return{
                ...state,
                porteursList: action.payload
            }
         case "projectsIDS":
            return{
                ...state,
                projectsIDS: action.payload
            }
         case "refM":
            return{
                ...state,
                refM: action.payload
            }
         case "porteur":
            return{
                ...state,
                porteur: action.payload
            }
         case "TypeRisque":
            return{
                ...state,
                typeRisqueList: action.payload
            }
         case "categorie_project":
            return{
                ...state,
                categorie_project: action.payload
            }
         case "ref_Convention_annee":
            return{
                ...state,
                ref_Convention_annee: action.payload
            }
         case "refList":
            return{
                ...state,
                refList: action.payload
            }
         case "sources":
            return{
                ...state,
                sources: action.payload
            }
         case "font":
            return{
                ...state,
                gm_terrain: action.payload
            }
         case "National":
            return{
                ...state,
                nat: action.payload
            }
         case "Regional":
            return{
                ...state,
                reg: action.payload
            }
         case "Provincial":
            return{
                ...state,
                prov: action.payload
            }
         case "Communal":
            return{
                ...state,
                comm: action.payload
            }
         case "pro":
            return{
                ...state,
                pro: action.payload
            }
         case "ref":
            return{
                ...state,
                ref: action.payload
            }
         case "menu":
            return{
                ...state,
                menu: action.payload
            }
         case "regional":
            return{
                ...state,
                regional: action.payload
            }
         case "provincial":
            return{
                ...state,
                provincial: action.payload
            }
         case "ref_Convention_type":
            return{
                ...state,
                ref_Convention_value: action.payload
            }
         case "ref_Convention_type_Value":
            return{
                ...state,
                ref_Convention_type_Value: action.payload
            }
         case "communal":
            return{
                ...state,
                communal: action.payload
            }
         case "selectedRegions":
            return{
                ...state,
                selectedRegions: action.payload
            }
         case "selectedProvinces":
            return{
                ...state,
                selectedProvinces: action.payload
            }
         case "selectedCommunes":
            return{
                ...state,
                selectedCommunes: action.payload
            }
         case "Typologie":
            return{
                ...state,
                Typologie: action.payload
            }
         case "type":
            return{
                ...state,
                type: action.payload
            }
         case "selectedPorteurs":
            return{
                ...state,
                selectedPorteurs: action.payload
            }
         case "cout":
            return{
                ...state,
                cout: action.payload
            }
         case "min":
            return{
                ...state,
                min: action.payload
            }
         case "max":
            return{
                ...state,
                max: action.payload
            }
         case "selectedtypeRisque":
            return{
                ...state,
                selectedtypeRisque: action.payload
            }
         case "typeRisque":
            return{
                ...state,
                typeRisque: action.payload
            }
         case "categorie":
            return{
                ...state,
                categorie: action.payload
            }
         case "selectedacategories":
            return{
                ...state,
                selectedacategories: action.payload
            }
         case "Annee_appel_projet":
            return{
                ...state,
                Annee_appel_projet: action.payload
            }
         case "selectedAnnee_appel_projets":
            return{
                ...state,
                selectedAnnee_appel_projets: action.payload
            }
         case "proj":
            return{
                ...state,
                proj: action.payload
            }
         case "selectedselectedprojs":
            return{
                ...state,
                selectedselectedprojs: action.payload
            }
         case "selectedrefMs":
            return{
                ...state,
                selectedrefMs: action.payload
            }
         case "contribution_FLCN":
            return{
                ...state,
                contribution_FLCN: action.payload
            }
         case "minContribution_FLCN":
            return{
                ...state,
                minContribution_FLCN: action.payload
            }
         case "maxContribution_FLCN":
            return{
                ...state,
                maxContribution_FLCN: action.payload
            }
         case "type_institution":
            return{
                ...state,
                type_institution: action.payload
            }
         case "selectedType_institutions":
            return{
                ...state,
                selectedType_institutions: action.payload
            }
         case "typeIns":
            return{
                ...state,
                typeIns: action.payload
            }
         case "statutList":
            return{
                ...state,
                statutList: action.payload
            }
         case "statut":
            return{
                ...state,
                statut: action.payload
            }
         case "selectedstatus":
            return{
                ...state,
                selectedstatus: action.payload
            }
         case "taux_avancement_physique_global":
            return{
                ...state,
                taux_avancement_physique_global: action.payload
            }
         case "maxtaux_avancement_physique_global":
            return{
                ...state,
                maxtaux_avancement_physique_global: action.payload
            }
         case "mintaux_avancement_physique_global":
            return{
                ...state,
                mintaux_avancement_physique_global: action.payload
            }
         case "delai":
            return{
                ...state,
                delai: action.payload
            }
         case "maxdelai":
            return{
                ...state,
                maxdelai: action.payload
            }
         case "mindelai":
            return{
                ...state,
                mindelai: action.payload
            }
         case "taux_deblocage":
            return{
                ...state,
                taux_deblocage: action.payload
            }
         case "maxtaux_deblocage":
            return{
                ...state,
                maxtaux_deblocage: action.payload
            }
         case "mintaux_deblocage":
            return{
                ...state,
                mintaux_deblocage: action.payload
            }
         case "taux_engagement":
            return{
                ...state,
                taux_engagement: action.payload
            }
         case "mintaux_engagement":
            return{
                ...state,
                mintaux_engagement: action.payload
            }
         case "maxtaux_engagement":
            return{
                ...state,
                maxtaux_engagement: action.payload
            }
         case "tauxpaiement":
            return{
                ...state,
                tauxpaiement: action.payload
            }
         case "mintauxpaiement":
            return{
                ...state,
                mintauxpaiement: action.payload
            }
         case "maxtauxpaiement":
            return{
                ...state,
                maxtauxpaiement: action.payload
            }
         case "engagement_vis_vis_Delai":
            return{
                ...state,
                engagement_vis_vis_Delai: action.payload
            }
         case "minengagement_vis_vis_Delai":
            return{
                ...state,
                minengagement_vis_vis_Delai: action.payload
            }
         case "maxengagement_vis_vis_Delai":
            return{
                ...state,
                maxengagement_vis_vis_Delai: action.payload
            }
         case "engagement_Delai":
            return{
                ...state,
                engagement_Delai: action.payload
            }
         case "execution_physique_Delai_conventionne":
            return{
                ...state,
                execution_physique_Delai_conventionne: action.payload
            }
         case "minexecution_physique_Delai_conventionne":
            return{
                ...state,
                minexecution_physique_Delai_conventionne: action.payload
            }
         case "maxexecution_physique_Delai_conventionne":
            return{
                ...state,
                maxexecution_physique_Delai_conventionne: action.payload
            }
         case "execution_physique_vis_vis_Deblocage_credit":
            return{
                ...state,
                execution_physique_vis_vis_Deblocage_credit: action.payload
            }

         case "minexecution_physique_vis_vis_Deblocage_credit":
            return{
                ...state,
                minexecution_physique_vis_vis_Deblocage_credit: action.payload
            }

         case "maxexecution_physique_vis_vis_Deblocage_credit":
            return{
                ...state,
                maxexecution_physique_vis_vis_Deblocage_credit: action.payload
            }
         case "minpaiement_vis_vis_Execution_physique":
            return{
                ...state,
                minpaiement_vis_vis_Execution_physique: action.payload
            }
         case "maxpaiement_vis_vis_Execution_physique":
            return{
                ...state,
                maxpaiement_vis_vis_Execution_physique: action.payload
            }
         case "paiement_vis_vis_Execution_physique":
            return{
                ...state,
                paiement_vis_vis_Execution_physique: action.payload
            }

        default:
             return state;
    }

}



export class IncrimentAction{
    type:string = 'incr';
    payload:Number

    constructor(p){
        this.payload = p;
    }
}

export class DecrimentAction{
    type:string ='decr';
    payload:Number

    constructor(p){
        this.payload = p;
    }
}



//selectors
// counter is the name of the reducer;
const counterFs = createFeatureSelector<any>('counter');

export let nSelector = createSelector(counterFs,s=>s.n)
export let porteursListSelector = createSelector(counterFs,s=>s.porteursList)
export let typeRisqueListSelector = createSelector(counterFs,s=>s.typeRisqueList)
export let categorie_projectSelector = createSelector(counterFs,s=>s.categorie_project)
export let ref_Convention_anneeSelector = createSelector(counterFs,s=>s.ref_Convention_annee)
export let refListSelector = createSelector(counterFs,s=>s.refList)
export let sourcesSelector = createSelector(counterFs,s=>s.sources)
export let nationalSelector = createSelector(counterFs,s=>s.nat)
export let regionalSelector = createSelector(counterFs,s=>s.reg)
export let provincialSelector = createSelector(counterFs,s=>s.prov)
export let communalSelector = createSelector(counterFs,s=>s.comm)
export let fontSelector = createSelector(counterFs,s=>s.gm_terrain)
export let proSelector = createSelector(counterFs,s=>s.pro)
export let menuSelector = createSelector(counterFs,s=>s.menu)
export let refSelector = createSelector(counterFs,s=>s.ref)

export let communalFSelector = createSelector(counterFs,s=>s.communal)
export let provincialFSelector = createSelector(counterFs,s=>s.provincial)
export let regionalFSelector = createSelector(counterFs,s=>s.regional)


export let selectedRegionsSelector = createSelector(counterFs,s=>s.selectedRegions)
export let selectedProvincesSelector = createSelector(counterFs,s=>s.selectedProvinces)
export let selectedCommunesSelector = createSelector(counterFs,s=>s.selectedCommunes)
export let TypologieSelector = createSelector(counterFs,s=>s.Typologie)
export let typeSelector = createSelector(counterFs,s=>s.type)
export let voieValueSelector = createSelector(counterFs,s=>s.ref_Convention_type_Value)
export let voieSelector = createSelector(counterFs,s=>s.ref_Convention_type)
export let porteurSelector = createSelector(counterFs,s=>s.porteur)
export let selectedPorteursSelector = createSelector(counterFs,s=>s.selectedPorteurs)
export let CoutSelector = createSelector(counterFs,s=>s.cout)

export let maxSelector = createSelector(counterFs,s=>s.max)
export let minSelector = createSelector(counterFs,s=>s.min)

export let selectedtypeRisqueSelector = createSelector(counterFs,s=>s.selectedtypeRisque)
export let typeRisqueSelector = createSelector(counterFs,s=>s.typeRisque)
export let categorieSelector = createSelector(counterFs,s=>s.categorie)
export let selectedacategoriesSelector = createSelector(counterFs,s=>s.selectedacategories)
export let selectedAnnee_appel_projetsSelector = createSelector(counterFs,s=>s.selectedAnnee_appel_projets)
export let projSelector = createSelector(counterFs,s=>s.proj)
export let selectedselectedprojsSelector = createSelector(counterFs,s=>s.selectedselectedprojs)
export let selectedrefMsSelector = createSelector(counterFs,s=>s.selectedrefMs)


export let contribution_FLCNSelector = createSelector(counterFs,s=>s.contribution_FLCN)
export let minContribution_FLCNSelector = createSelector(counterFs,s=>s.minContribution_FLCN)
export let maxContribution_FLCNSelector = createSelector(counterFs,s=>s.maxContribution_FLCN)
export let type_institutionSelector = createSelector(counterFs,s=>s.type_institution)
export let typeInSelector = createSelector(counterFs,s=>s.typeIns)
export let selectedType_institutionsSelector = createSelector(counterFs,s=>s.selectedType_institutions)
export let statutListSelector = createSelector(counterFs,s=>s.statutList)
export let statutSelector = createSelector(counterFs,s=>s.statut)
export let selectedstatusSelector = createSelector(counterFs,s=>s.selectedstatus)
export let taux_avancement_physique_globalSelector = createSelector(counterFs,s=>s.taux_avancement_physique_global)
export let mintaux_avancement_physique_globalSelector = createSelector(counterFs,s=>s.mintaux_avancement_physique_global)
export let maxtaux_avancement_physique_globalSelector = createSelector(counterFs,s=>s.maxtaux_avancement_physique_global)
export let delaiSelector = createSelector(counterFs,s=>s.delai)
export let mindelaiSelector = createSelector(counterFs,s=>s.mindelai)
export let maxdelaiSelector = createSelector(counterFs,s=>s.maxdelai)
export let taux_deblocageSelector = createSelector(counterFs,s=>s.taux_deblocage)
export let maxtaux_deblocageSelector = createSelector(counterFs,s=>s.maxtaux_deblocage)
export let mintaux_deblocageSelector = createSelector(counterFs,s=>s.mintaux_deblocage)


export let taux_engagementSelector = createSelector(counterFs,s=>s.taux_engagement)
export let mintaux_engagementSelector = createSelector(counterFs,s=>s.mintaux_engagement)
export let maxtaux_engagementSelector = createSelector(counterFs,s=>s.maxtaux_engagement)

export let tauxpaiementSelector = createSelector(counterFs,s=>s.tauxpaiement)
export let mintauxpaiementSelector = createSelector(counterFs,s=>s.mintauxpaiement)
export let maxtauxpaiementSelector = createSelector(counterFs,s=>s.maxtauxpaiement)
export let engagement_vis_vis_DelaiSelector = createSelector(counterFs,s=>s.engagement_vis_vis_Delai)
export let engagement_DelaiSelector = createSelector(counterFs,s=>s.engagement_Delai)
export let maxengagement_vis_vis_DelaiSelector = createSelector(counterFs,s=>s.maxengagement_vis_vis_Delai)

export let minengagement_vis_vis_DelaiSelector = createSelector(counterFs,s=>s.minengagement_vis_vis_Delai)

export let execution_physique_Delai_conventionneSelector = createSelector(counterFs,s=>s.execution_physique_Delai_conventionne)
export let minexecution_physique_Delai_conventionneSelector = createSelector(counterFs,s=>s.minexecution_physique_Delai_conventionne)
export let maxexecution_physique_Delai_conventionneSelector = createSelector(counterFs,s=>s.maxexecution_physique_Delai_conventionne)

export let execution_physique_vis_vis_Deblocage_creditSelector = createSelector(counterFs,s=>s.execution_physique_vis_vis_Deblocage_credit)
export let minexecution_physique_vis_vis_Deblocage_creditSelector = createSelector(counterFs,s=>s.minexecution_physique_vis_vis_Deblocage_credit)
export let maxexecution_physique_vis_vis_Deblocage_creditSelector = createSelector(counterFs,s=>s.maxexecution_physique_vis_vis_Deblocage_credit)


export let minpaiement_vis_vis_Execution_physiqueSelector = createSelector(counterFs,s=>s.minpaiement_vis_vis_Execution_physique)
export let maxpaiement_vis_vis_Execution_physiqueSelector = createSelector(counterFs,s=>s.maxpaiement_vis_vis_Execution_physique)
export let paiement_vis_vis_Execution_physiqueSelector = createSelector(counterFs,s=>s.paiement_vis_vis_Execution_physique)
export let projectsIDsSelector = createSelector(counterFs,s=>s.projectsIDS)
export let refMSelector = createSelector(counterFs,s=>s.refM)

