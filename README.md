# desafio-ddd-fc
projeto desafios durante modulo 'DDD: Modelagem Tática e Patterns' do curso full cycle


#DESAFIO 1
Nesse desafio você deverá fazer com que a classe OrderRepository implemente totalmente os métodos definidos pelo OrderRepositoryInterface. Toda essa implementação deverá ser reproduzida através de testes.

Após realizar tal implementação submeta seu projeto, nesse ponto todos os testes devem estar passando.

#DESAFIO 2
Agora que você já possui a base sobre Domain Events, implemente dois Eventos de Domínio para o agregado de Customer.

O primeiro evento deverá acontecer quando um novo Customer é criado. Nesse ponto, crie 2 handlers exibindo um "console.log". 

Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated".
Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: CustomerCreated". 
O segundo evento deverá ser disparado quando o endereço do Customer é trocado (método changeAddress()). Nesse caso, o ID, Nome, bem como os dados do endereço devem ser passados ao evento.

Handler: EnviaConsoleLogHandler. Mensagem: "Endereço do cliente: {id}, {nome} alterado para: {endereco}".

