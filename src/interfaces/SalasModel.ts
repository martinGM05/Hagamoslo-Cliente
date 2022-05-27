export interface SalasModel {
    id: number;
    idSala: string;
    idUsuario: number;
    Receptor: Receptor;
}

interface Receptor {
    id: number;
    nombre: string;
    descripcion: string;
    numero: string;
}


    // "idSala": "3QolFV3sBrjTFTe0rGGw",
    // "idUsuario": 1,
    // "Receptor": {
    // "id": 2,
    // "nombre": "Martin",
    // "descripcion": "Electricista de Microsoft XD",
    // "numero": "2311434214"
