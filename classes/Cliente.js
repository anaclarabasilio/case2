class Cliente {
  constructor(id, nome, dataNascimento, cpf, email, senha) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
  }

  verDados() {
    return `
ID: ${this.id}
Nome: ${this.nome}
Nascimento: ${this.dataNascimento}
CPF: ${this.cpf}
Email: ${this.email}
------------------------------`;
  }
}

module.exports = Cliente;
