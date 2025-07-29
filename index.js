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
  new Cliente(0, "ana", "24/07/2004", "1234", "ana@email.com", "123")
];
let funcionarios = [
  new Funcionario(0, "joao", "10/10/2000", "joao@email.com", "admin")
];

// Lista com os quartos
let tiposDeQuartos = [
  new Quartos(1, '1', 'RS250', 2, 'Casal', 'Quarto perfeito para o casal!'),

  new Quartos(2, '2', 'RS350', 2, 'Família', 'Quarto que possui 1 cama de casal e 1 de solteiro')
]

//quero q o total de quartos de casal seja 2 e de familia 2 também

let reservas = [
  new Reserva(0, 0, 1, 'pendente', '1/1', '1,2'),
  new Reserva(1, 0, 2, 'realizada', '2/2', '3/2')
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
          rl.question("Escolha uma opção : ", function(funcionarioLogado){
            if (funcionarioLogado === '4') {
                console.log(funcionarios[i])
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '5'){
                console.log(reservas)
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '6'){
                console.log(tiposDeQuartos)
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '7'){
                console.log(clientes)
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '8'){
                alterarStatusReserva(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '9'){
                adicionarQuarto(funcionarioEncontrado)
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
          rl.question("Escolha um número: ", function(clienteLogado){
            if (clienteLogado === '1'){
              console.log(clientes[j]);
              finalizouAcaoCliente(clienteEncontrado);
            }
            else if (clienteLogado === '2'){
              console.log(tiposDeQuartos);
              finalizouAcaoCliente(clienteEncontrado);
            }
            else if (clienteLogado === '3'){
              fazerReserva(clienteEncontrado);
              
            }
            else if (clienteLogado === '4'){
              excluirReserva(clienteEncontrado);
              
            }
            else if (clienteLogado === '5'){
              mostrarReserva(clienteEncontrado);
              finalizouAcaoCliente(clienteEncontrado);
              
            }
            else {
              console.log('Não existe essa opção.')
              rl.close()
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
    var id = funcionarios.length
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
    

  } else { // cliente
    var id = clientes.length
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
    
  }
}

function fazerReserva(clienteEncontrado){ 
  var IdUnico = reservas.length;
  if (clienteEncontrado.id == 0){
    //clienteEncontrado.id qnd o id é igual a 0 ve como undefined
    var IdCliente = 0
  }
  else {
    var IdCliente = clienteEncontrado.id
  }
 
      console.log(tiposDeQuartos);
  rl.question('Qual tipo de quarto você deseja? (id Quarto): ', function(r) {
    function encontrarQuartoDisponivel(q) {
    return q.idQuarto == r && q.QntDisp > 0;
}

  const quartoEscolhido = tiposDeQuartos.find(encontrarQuartoDisponivel);


  if (!quartoEscolhido) {
    console.log("Quarto não encontrado ou sem disponibilidade.");
    return finalizouAcaoCliente(clienteEncontrado);
  }

  // Reduz a quantidade disponível
  quartoEscolhido.QntDisp--;

  console.log(`Quarto reservado.`);

  rl.question("Digite a data de check-in: ", function(DataIn) {
    rl.question("Digite a data de check-out: ", function(DataOut) {

      const novaReserva = new Reserva(IdUnico, IdCliente, r, 'realizada', DataIn, DataOut);
      reservas.push(novaReserva);

      console.log("Reserva realizada com sucesso!");
      finalizouAcaoCliente(clienteEncontrado);
    });
  });
});

        

}

function mostrarReserva(clienteEncontrado){
  for ( var i = 0; i < reservas.length; i++) {
  // percorre cada reserva
    if(reservas[i].IdCliente == clienteEncontrado.id){
    // se o id do cliente na reserva for igual o id do cliente no login
      console.log(reservas[i])
      // imprime suas reservas
    }
  }

}



function finalizouAcaoCliente(clienteEncontrado){
  rl.question('Quer sair do programa?(s/n) ', function(res){
    if (res === 's'){
      console.log('Programa fechado!');
      rl.close();
    }
    else if (res === 'n'){
      console.log("1. Ver Meus Dados");
          console.log("2. Ver Lista de Quartos");
          console.log("3. Fazer Reserva");
          console.log("4. Cancelar Reserva");
          console.log("5. Ver Minhas Reservas");
          rl.question("Escolha um número: ", function(clienteLogado){
            if (clienteLogado === '1'){
              console.log(clienteEncontrado)
              finalizouAcaoCliente(clienteEncontrado)

            }
            else if (clienteLogado === '2'){
              console.log(tiposDeQuartos)
              finalizouAcaoCliente(clienteEncontrado)
            }
            else if (clienteLogado === '3'){
              fazerReserva(clienteEncontrado);
            }
            else if (clienteLogado === '4'){
              excluirReserva(clienteEncontrado);
            }
            else if (clienteLogado === '5'){
              mostrarReserva(clienteEncontrado);
              finalizouAcaoCliente(clienteEncontrado)
            }
            else {
              console.log('Não existe essa opção.')
              finalizouAcaoCliente(clienteEncontrado)
            }

          })
    }
  })
}

function finalizouAcaoFuncionario(funcionarioEncontrado){
  rl.question('Quer sair do programa?(s/n) ', function(res){
    if (res === 's'){
      console.log('Programa fechado!');
      rl.close();
    }
    else if (res === 'n'){
      console.log("4. Ver Meus Dados");
          console.log("5. Ver Lista de Reservas");
          console.log("6. Ver Lista de Quartos");
          console.log("7. Ver Lista de Clientes");
          console.log("8. Mudar status da reserva");
          console.log("9. Adicionar Quarto");
          rl.question("Escolha uma opção : ", function(funcionarioLogado){
            if (funcionarioLogado === '4') {
                console.log(funcionarios[i])
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '5'){
                console.log(reservas)
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '6'){
                console.log(tiposDeQuartos)
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '7'){
                console.log(clientes)
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '8'){
                alterarStatusReserva(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '9'){
                adicionarQuarto(funcionarioEncontrado)
            }
          })
        } else {
          console.log("Credenciais inválidas.");
          rl.close();
        

    }
  } )
}

// Função para alterar status da reserva (pendente, adiada, realizada, cancelada)
function alterarStatusReserva(funcionarioEncontrado) {
  console.log("Reservas atuais:");
  console.log(reservas);
  rl.question("Digite o ID único da reserva que deseja alterar: ", function(idAlterar) {
    rl.question("Digite o novo status (pendente, adiada, realizada, cancelada): ", function(novoStatus) {
      function verificarIdUnico(reserva) {
        return reserva.IdUnico == idAlterar;
      }

      let reservaEncontrada = reservas.find(verificarIdUnico);

      if (reservaEncontrada) {
        reservaEncontrada.status = novoStatus;
        console.log("Status da reserva alterado com sucesso!");
        console.log(reservaEncontrada);
      } else {
        console.log("Reserva não encontrada.");
      }
      finalizouAcaoFuncionario(funcionarioEncontrado);
    });
  });
}

// Função para adicionar um novo quarto
function adicionarQuarto(funcionarioEncontrado) {
  const novoId = tiposDeQuartos.length + 1;
  rl.question("Digite o número de camas do quarto: ", function(numero) {
    rl.question("Digite o preço (ex: RS350): ", function(preco) {
      rl.question("Digite a quantidade de quartos disponíveis: ", function(qntDisp) {
        rl.question("Digite o tipo (Casal, Família, etc.): ", function(tipo) {
          rl.question("Digite a descrição: ", function(descricao) {
            const novoQuarto = new Quartos(novoId, numero, preco, parseInt(qntDisp), tipo, descricao);
            tiposDeQuartos.push(novoQuarto);
            console.log("Quarto adicionado com sucesso!");
            console.log(novoQuarto);
            iniciar();
          });
        });
      });
    });
  });
}

function excluirReserva(clienteEncontrado) {
  mostrarReserva(clienteEncontrado);
  rl.question("Deseja cancelar qual reserva? (Id único): ", function(idCancelar) {
    function verificarReserva(reserva) {
      return reserva.IdUnico == idCancelar && reserva.IdCliente == clienteEncontrado.id;
    }

    let reservaEncontrada = reservas.find(verificarReserva);

    if (reservaEncontrada) {
      reservaEncontrada.status = "cancelada";
      console.log("Reserva cancelada com sucesso!");
      console.log("Lista atualizada:", reservas);
    } else {
      console.log("Reserva não encontrada ou não pertence a você.");
    }
    iniciar();
  });
}

iniciar();

