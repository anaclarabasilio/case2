class Reserva {
  constructor(IdUnico, IdCliente, status, DataIn, DataOut) {
    this.IdUnico = IdUnico;
    this.IdCliente = IdCliente;
    this.status = status;
    this.DataIn = DataIn;
    this.DataOut = DataOut;
    
  }

  verDados() {
    return `
Id Único: ${this.IdUnico}
Id cliente: ${this.IdCliente}
Status: ${this.status}
Check-in: ${this.DataIn}
Check-out: ${this.DataOut}
------------------------------`;
  }
}

module.exports = Reserva;