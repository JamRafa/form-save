export interface IRef {
    handleComplete: () => void
}

export interface IPesoais{
    name: string;
}

export interface IEstagio{
    id: number,
    resposta: string;
    check: boolean;
}

export interface INota{
    id: number;
    resposta: string;
    check: boolean;
}

export interface IDesafio{
    desafio: string;
    presencial: string;
}

export interface Iredux{
    pessoais: IPesoais[]
    estagios: IEstagio[]
    nota: INota[]
    desafio: IDesafio[]
    botao: number
}