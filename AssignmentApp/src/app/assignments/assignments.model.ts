export class Assignment {
    _id?:string;
    id!:number;
    nom!:string;
    auteur!:string;
    matiere!:string;
    note!:number;
    rendu!:boolean;
    dateDeRendu!:Date;
    commentaire!:string;
    description?:string;
}