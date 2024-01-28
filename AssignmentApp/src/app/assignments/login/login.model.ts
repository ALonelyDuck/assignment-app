export class Users {
    username!: string;
    password!: string;
    role!: 'user' | 'admin' | 'etudiant' | 'enseignant';
    nom!: string;
    prenom!: string;
}