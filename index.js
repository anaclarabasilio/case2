const readline = require("readline");
const Cliente = require("./classes/Cliente");
const Funcionario = require("./classes/Funcionario");
const Quartos = require("./classes/Quartos");
const Reserva = require("./classes/Reserva");



// conseguir exibir uma pergunta na tela
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



let tipo = ""; // cliente ou funcionario

// Listas simuladas
let clientes = [
  new Cliente("1", "ana", "24/07/2004", "1234", "ana@email.com", "123")
];
let funcionarios = [
  new Funcionario("1", "joao", "9999", "joao@email.com", "123")
];

// Lista com os quartos
let quartocasal = [
  new Quartos('1', 'RS250', 2, 'Casal', 'Quarto perfeito para o casal!')
]
let quartofamilia = [
  new Quartos('2', 'RS350', 2, 'Família', 'Quarto que possui 1 cama de casal e 1 de solteiro')
]

let reservas = [
  new Reserva('1', '1', 'status', '1/1', '1,2')
]

// Início do programa
function iniciar() {
  rl.question("Você é cliente ou funcionário? (c/f): ", function(res) {
  // rl.question - exibe uma pergunta na tela e espera a resposta do usuário  
  // function(res) - chamei uma função descrita abaixo e o que o usuário digitar será passado como parâmetro 'res'
    if (res === "c") {
      tipo = "cliente";
    } else if (res === "f") {
      tipo = "funcionario";
    } else {
      console.log("Opção inválida.");
      return iniciar();
    }

    mostrarMenuInicial();
  });
}

// Menu inicial (login/cadastro/sair)
function mostrarMenuInicial() {
  console.log("\n1. Fazer Login\n2. Fazer Cadastro\n3. Sair do Programa");
  rl.question("Escolha uma opção: ", function(opcao) {
    if (opcao === "1") {
      fazerLogin();
    } else if (opcao === "2") {
      fazerCadastro();
    } else if (opcao === "3") {
      console.log("Encerrando programa...");
      rl.close();
    } else {
      console.log("Opção inválida.");
      mostrarMenuInicial();
    }
  });
}

// Login de cliente ou funcionário
function fazerLogin() {
  rl.question("Nome de usuário: ", function(usuario) {
    rl.question("Senha: ", function(senha) {
      if (tipo === "funcionario") {
        var funcionarioEncontrado = null;
        // Guarda o funcionário com o login certo
        for (var i = 0; i < funcionarios.length; i++) {
            // Percorre cada lista de funcionário
          if (funcionarios[i].nomeUsuario === usuario && funcionarios[i].senha === senha) {
          // funcionarios[i].nomeUsuario - percorre em cada lista o atributo nome do funcionario  
            funcionarioEncontrado = funcionarios[i];
            // Se esse usuário existir ele recebe o objeto que representa aquele funcionario
            break;
          }
        }

        if (funcionarioEncontrado) {
        // Se funcionarioEncontrado não for nulo    
          console.log("\nLogin realizado com sucesso!\n");
          console.log("4. Ver Meus Dados");
          console.log("5. Ver Lista de Reservas");
          console.log("6. Ver Lista de Quartos");
          console.log("7. Ver Lista de Clientes");
          console.log("8. Mudar status da reserva");
          console.log("9. Adicionar Quarto");
          rl.question("Escolha uma opção : ", function(Flogado){
            if (Flogado === '4') {
                console.log(funcionarios[i])
                rl.close()
            }
            else if (Flogado === '5'){
                console.log(reservas)
                rl.close()
            }
            else if (Flogado === '6'){
                console.log(quartocasal, quartofamilia)
                rl.close()
            }
            else if (Flogado === '7'){
                console.log(clientes)
                rl.close()
            }
            else if (Flogado === '8'){
                console.log('alterar reserva')
            }
            else if (Flogado === '9'){
                console.log('lista de reserva')
            }
          })
        } else {
          console.log("Credenciais inválidas.");
          rl.close();
        }

      } else { // cliente
        var clienteEncontrado = null;
        for (var j = 0; j < clientes.length; j++) {
          if (clientes[j].nome === usuario && clientes[j].senha === senha) {
            clienteEncontrado = clientes[j];
            break;
          }
        }

        if (clienteEncontrado) {
          console.log("\nLogin realizado com sucesso!\n");
          console.log("1. Ver Meus Dados");
          console.log("2. Ver Lista de Quartos");
          console.log("3. Fazer Reserva");
          console.log("4. Cancelar Reserva");
          console.log("5. Ver Minhas Reservas");
          rl.question("Escolha um número: ", function(Clogado){
            if (Clogado === '1'){
              console.log(clientes[j])
            }
            else if (Clogado === '2'){
              console.log(quartocasal, quartofamilia)
            }
            else if (Clogado === '3'){
              fazerReserva();
            }
            else if (Clogado === '4'){

            }
            else if (Clogado === '5'){
              for ( var i = 0; i < reservas.length; i++) {
                // percorre cada reserva
                if(reservas[i].IdCliente === clientes[j].id){
                // se o id do cliente na reserva for igual o id do cliente no login
                  console.log(reservas[i])
                  // imprime suas reservas
                }
              }
              rl.close()
            }
            else {
              console.log('Não existe essa opção.')
              // tenho que colocar para perguntar de novo o número
            }

          })
        } else {
          console.log("Credenciais inválidas.");
          rl.close();
        }
      }
    });
  });
}

// Cadastro de cliente ou funcionário
function fazerCadastro() {
  if (tipo === "funcionario") {
    rl.question("ID: ", function(id) {
      rl.question("Nome de usuário: ", function(nome) {
        rl.question("CPF: ", function(cpf) {
          rl.question("Email: ", function(email) {
            rl.question("Senha: ", function(senha) {
              var novoFuncionario = new Funcionario(id, nome, cpf, email, senha);
              // adiciona na classe funcionario as infos do novo funcionario cadastrado
              funcionarios.push(novoFuncionario);
              // adiciona na lista funcionarios
              console.log("Funcionário cadastrado com sucesso!");
              iniciar();
            });
          });
        });
      });
    });

  } else { // cliente
    rl.question("ID: ", function(id) {
      rl.question("Nome: ", function(nome) {
        rl.question("Data de nascimento: ", function(dataNasc) {
          rl.question("CPF: ", function(cpf) {
            rl.question("Email: ", function(email) {
              rl.question("Senha: ", function(senha) {
                var novoCliente = new Cliente(id, nome, dataNasc, cpf, email, senha);
                clientes.push(novoCliente);
                console.log("Cliente cadastrado com sucesso!");
                iniciar();
              });
            });
          });
        });
      });
    });
  }
}

function fazerReserva(){ 
  rl.question('ID único: ', function(IdUnico){
    rl.question('ID do cliente: ', function(IdCliente){
      rl.question('Data de chek-in: ', function(DataIn){
        rl.question('Data de check-out: ', function(DataOut){
          var novaReserva = new Reserva(IdUnico, IdCliente,'Realizada', DataIn, DataOut);
          // quando a reserva é feita o status ter ser 'realidada'
          reservas.push(novaReserva);
          console.log("Reserva realizada com sucesso!");
          iniciar();
        })
      })
    })
  })

}

iniciar();

