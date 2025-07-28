class Reserva {
  constructor(IdUnico, IdCliente, idQuarto, status, DataIn, DataOut) {
    this.IdUnico = IdUnico;
    this.IdCliente = IdCliente;
    this.idQuarto = idQuarto;
    //nome do quarto
    this.status = status;
    this.DataIn = DataIn;
    this.DataOut = DataOut;
    
  }

  verDados() {
    return `
Id Único: ${this.IdUnico}
Id cliente: ${this.IdCliente}
Id quarto:  ${this.idQuarto}
Status: ${this.status}
Check-in: ${this.DataIn}
Check-out: ${this.DataOut}
------------------------------`;
  }
}

module.exports = Reserva;