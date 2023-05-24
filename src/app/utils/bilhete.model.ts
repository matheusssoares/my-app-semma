export interface Bilhete {
  key?: string;
  numeroBilhete: string;
  numeros: string[];
  status: boolean; // true disponível, false reservado
  cambista?: any;
  cliente?: any;
}
