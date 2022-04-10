export interface Denuncias {
    isAnonimo: boolean,
    nome: string,
    apelido?: string,
    rg?: string,
    cpf?: string,
    contato?: string,
    endereco?: string,
    data_denuncia: string,
    prioridade: string,
    servidor_responsavel: string,
    descricao: string,
    protocolo: number,
    status: number,
    create_in: Date,
    update_in?: Date

}