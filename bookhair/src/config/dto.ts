export interface ClientDto {
    id: string;
    name: string;
    lastname: string;
    role: string;
    email: string;
    emailVerified: Date;
    password: string;
    phone: string; 
    image: string;
    reservations: ReservationDto[];
    commentaires: CommentaireDto[];
}

export interface CoiffeurDto {
    id: string;
    nom: string;
    role: string;
    email: string;
    mot_de_passe: string;
    numero_telephone: string;
    adresse: string;
    date_creation: Date;
    date_modification: Date;
    servicedetails: ServiceDetailsDto[];
    commentaires: CommentaireDto[];
}

export interface ServiceDetailsDto {
    id: string;
    prix: string;
    coupe_id: string;
    coiffeur_id: string;
    service_id: string;
    date_creation: Date;
    date_modification: Date;
    coupe?: CoupeDto;
    coiffeur: CoiffeurDto;
    service: ServiceDto;
    reservations: ReservationDto[];
}

export interface ReservationDto {
    [x: string]: any;
    id: string;
    date_reserv: Date;
    user_id: string;
    service_details_id: string;
    date_creation: Date;
    date_modification: Date;
    client: ClientDto;
    serviceDetails: ServiceDetailsDto;
}

export interface ServiceDto {
    id: string;
    nom: string;
    description: string;
    duree: number;
    date_creation: Date;
    date_modification: Date;
    servicedetails: ServiceDetailsDto[];
}

export interface CoupeDto {
    id: string;
    categorie: CategorieDto;
    name: string;
    servicedetails?: ServiceDetailsDto;
    sdId: string;
}

export interface CommentaireDto {
    id: string;
    commentaire: string;
    note: number;
    date_com: Date;
    user_id: string;
    coiffeur_id: string;
    date_creation: Date;
    date_modification: Date;
    client: ClientDto;
    coiffeur: CoiffeurDto;
}

export enum CategorieDto {
    CHEVEUX,
    BARBE,
    VISAGE
}