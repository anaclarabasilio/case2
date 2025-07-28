class Quartos {
  constructor(QntCamas, preco, QntDisp, nome, descricao) {
    this.QntCamas = '1';
    this.preco = 'RS 250';
    this.QntDisp = 10 - IdReserva;
    // toda vez que houver uma nova reserva preciso diminuir 1 na qnt de quartos
    this.nome = 'Quarto casal';
    this.descricao = 'quarto perfeito para sua lua de mel!';
    
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