export interface Rifa {
  key?: string;
  titulo: string;
  descricao: string;
  foto?: string;
  dataInicio: Date;
  dataFim: Date;
  precoBilhete: number;
  numMaxBilhete: number;
  numMinBilhete: number;
  qtdeNumPorBilhete: number;
  tempoExpiracao: number;
  percentualCambista: number;
  status: number; //0 canecalada, 1 andamento, 2 concluída
  participantes: any;
  numBilhetesVendidos: number;
  numBilhetesRestante: number;
  vencedor: any;
  cambista: any;
  generateBilhete: boolean;
}
