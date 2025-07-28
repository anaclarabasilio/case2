class Quartos {
  constructor(QntCamas, preco, QntDisp, nome, descricao) {
    this.QntCamas = QntCamas;
    this.preco = preco;
    this.QntDisp = 10;
    // toda vez que houver uma nova reserva preciso diminuir 1 na qnt de quartos
    this.nome = nome;
    this.descricao = descricao;
    
  }

  verDados() {
    return `
Quantidade de camas por quarto: ${this.QntCamas}
Preço por noite: ${this.preco}
Quantidade disponível de quartos: ${this.QntDisp}
Nome: ${this.nome}
Descrição: ${this.descricao}
------------------------------`;
  }
}

module.exports = Quartos;