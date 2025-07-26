class Reserva {
    constructor(IDunicoR, IDclienteR, statusR, chekinR, chekoutR){

    this.IDunico = IDunico
    this.IDcliente = IDcliente
    this.status = status
    this.chekin = chekin
    this.chekout = chekout
}

}

class Funcionario {
    constructor(IDunicoF, usuarioF, cpfF, emailF, senhaF){

        this.IDunicoF = IDunicoF
        this.usuarioF = usuarioF
        this.cpfF = cpfF
        this.emailF = emailF
        this.senhaF = senhaF
    }

//nao logado    
login() {

}

cadastro(){

}

sair(){

}
    
}

class Cliente {
    constructor(IDunicoC, nomeC, nascimentoC, cpfC, emailC, senhaC) {

        this.IDunicoC = IDunicoC
        this.nomeC = nomeC
        this.nascimentoC = nascimentoC
        this.cpfC = cpfC
        this.emailC = emailC
        this.senhaC = senhaC

    }
//nao logado     

login(){

}   

cadastro(){

}

sair(){

}

}

class Quartos {
    constructor(qntcamas, preco, qnddisp, nome, descricao){ 
        this.qntcamas = qntcamas 
        this.preco = preco
        this.qndddisp = qnddisp
        this.nome = nome
        this.descricao = descricao

    }
}

class sistema {

    
}
