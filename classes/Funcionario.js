class Funcionario {
  constructor(id, nomeUsuario, cpf, email, senha) {
    this.id = id;
    this.nomeUsuario = nomeUsuario;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
  }

  verDados() {
    return `
ID: ${this.id}
Usuário: ${this.nomeUsuario}
CPF: ${this.cpf}
Email: ${this.email}
------------------------------`;
  }
}

module.exports = Funcionario;
