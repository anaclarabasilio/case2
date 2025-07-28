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
  new Funcionario(0, "joao", "9999", "joao@email.com", "123")
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
                console.log('alterar reserva')
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '9'){
                console.log('adicionar quarto')
                finalizouAcaoFuncionario(funcionarioEncontrado)
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
 
      console.log(tiposDeQuartos)
      rl.question('Qual tipo de quarto você deseja?(id Quarto) ', function(r){
        if (r == 1){
          console.log("Menos 1 quarto de casal!")
          //quero descontar da quantidade de quartos de casal
          for (var h = 0; h < tiposDeQuartos.length; h++ ){
            
            if (tiposDeQuartos[h].idQuarto == 1){
              tiposDeQuartos[h].QntDisp = tiposDeQuartos[h].QntDisp - 1;
              console.log(tiposDeQuartos[h].QntDisp);
            }
          }
          rl.question("Digite a data de checkin: ", function(DataIn){
          rl.question('Digite a data de checkout: ', function(DataOut){
            var novaReserva = new Reserva(IdUnico, IdCliente, r, 'Realizada', DataIn, DataOut);
            // quando a reserva é feita o status deve ser 'realizada'
            reservas.push(novaReserva);
            console.log("Reserva realizada com sucesso!");
            finalizouAcaoCliente(clienteEncontrado);

          })
        })
        }  
        else if(r==2){
          console.log('menos um quarto família!')
          for (var h = 0; h < tiposDeQuartos.length; h++ ){
            
            if (tiposDeQuartos[h].idQuarto == 2){
              tiposDeQuartos[h].QntDisp = tiposDeQuartos[h].QntDisp - 1;
              console.log(tiposDeQuartos[h].QntDisp);
            }
          }
          rl.question("Digite a data de checkin: ", function(DataIn){
          rl.question('Digite a data de checkout: ', function(DataOut){
            var novaReserva = new Reserva(IdUnico, IdCliente, r, 'Realizada', DataIn, DataOut);
            // quando a reserva é feita o status deve ser 'realizada'
            reservas.push(novaReserva);
            console.log("Reserva realizada com sucesso!");
            console.log(reservas)
            finalizouAcaoCliente(clienteEncontrado);

          })
        })

        }
        
        
        })
            
    
  

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

function excluirReserva(clienteEncontrado) {
  mostrarReserva(clienteEncontrado);
  
  rl.question("Deseja excluir qual reserva? (Id único): ", function(idExcluir) {
    let reservasDoCliente = [];

    // Filtra as reservas que pertencem ao cliente logado
    for (let k = 0; k < reservas.length; k++) {
      if (reservas[k].IdCliente == clienteEncontrado.id) {
        reservasDoCliente.push(reservas[k]);
      }
    }

    // Verifica se o ID informado pertence a uma reserva do cliente
    let podeExcluir = false;
    for (let i = 0; i < reservasDoCliente.length; i++) {
      if (reservasDoCliente[i].IdUnico == idExcluir) {
        podeExcluir = true;
        break;
      }
    }

    if (podeExcluir) {
      function manterReservasDiferentes(reserva) {
        return reserva.IdUnico != idExcluir;
      }

      reservas = reservas.filter(manterReservasDiferentes);
      console.log("Reserva excluída com sucesso!");
      console.log("Lista atualizada:", reservas);
      finalizouAcaoCliente(clienteEncontrado);
      
    } 
    else {
      console.log("Não é possível excluir essa reserva pois ela não pertence a você.");
      finalizouAcaoCliente(clienteEncontrado);
    }
    
  });
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
                console.log('alterar reserva')
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
            else if (funcionarioLogado === '9'){
                console.log('lista de reserva')
                finalizouAcaoFuncionario(funcionarioEncontrado)
            }
          })
        } else {
          console.log("Credenciais inválidas.");
          rl.close();
        

    }
  } )
}

iniciar();

