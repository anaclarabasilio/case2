class Quartos {
  constructor(idQuarto, QntCamas, preco, QntDisp, nome, descricao) {
    this.idQuarto = idQuarto
    //id do tipo de quarto
    this.QntCamas = QntCamas;
    this.preco = preco;
    this.QntDisp = QntDisp;
    // toda vez que houver uma nova reserva preciso diminuir 1 na qnt de quartos
    this.nome = nome;
    //tipo de quarto
    this.descricao = descricao;
    
  }

  verDados() {
    return `
Id do quarto: ${this.idQuarto}
Quantidade de camas por quarto: ${this.QntCamas}
Preço por noite: ${this.preco}
Quantidade disponível de quartos: ${this.QntDisp}
Nome: ${this.nome}
Descrição: ${this.descricao}
------------------------------`;
  }
}

module.exports = Quartos;