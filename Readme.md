# Valex API

## Deploy:
Link de consulta do Heroku: 
https://projeto18-valex-ts.herokuapp.com/

## Sobre:
Projeto back end de um controle de cartões de beneficios, sendo possível a criação, ativação, recarga, bloquei, desbloqueio além de consultas.
Projeto 18 do curso da DRIVEN 
#
## Ferramentas:
<p float="left">
 <img style='height: 40px' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
<img style='height: 40px' alt="Node-JS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
<img style='height: 40px' alt="postgresql" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg"/>
 <img style='height: 40px' alt="Heroku" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg"/>
  <img style='height: 40px;' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
  <img style='height: 40px' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
</p>

#
## Funções:
### testes em localhost, para uso da versão web usar link do Heroku
> Algumas rotas necessitam de autenticação via token já cadastrado as empresas <br/>
> Todas as rotas autenticadas devem receber um header Authorization no formato x-api-key<br> 
> Apenas a rota para criar novo cartão e fazer sua recarga necessitam da key
<br/>

### POST:
#### Cadastrar novo cartão: 
 ~~~
 localhost:4000/newCard
 ~~~ 
#### Exemplo de body:
~~~ 
{
    "type":"health",
    "employeeId":1
}
~~~
#### Retorno:
~~~ 
{
  "number": "6709499272704441",
  "cardholderName": "Fulano R Silva",
  "securityCode": "881",
  "type": "health"
}
~~~
---
#### Ativar cartão: 
 ~~~
 localhost:4000/activateCard
 ~~~ 
#### Exemplo de body:
~~~ 
{

    "password":"4444",
    "cardNumber": "6372-7803-1965-7262",
    "cvc":"048"
} 
~~~
---
#### Bloquear cartão: 
 ~~~
 localhost:4000/blockCard
 ~~~ 
#### Exemplo de body:
~~~ 
{
    "cardId": 1,
    "password":"4444"
}
~~~
---
#### Desbloquear cartão: 
 ~~~
 localhost:4000/unblockCard
 ~~~ 
#### Exemplo de body:
~~~ 
{
    "cardId": 1,
    "password":"4444"
}
~~~
---
#### Realizar nova recarga: 
 ~~~
 localhost:4000/recharge
 ~~~ 
#### Exemplo de body:
~~~ 
{
    "amount":5000,
    "cardId": 3
}
~~~
---
#### Realizar uma compra: 
 ~~~
 localhost:4000/purchases
 ~~~ 
#### Exemplo de body:
~~~ 
{
    "cardId":3,
    "amount":5,
    "password":"4444",
    "businessId":1
}
~~~
---
### GET:

#### Extrato de recargas e gastos: 
 ~~~
 4000/extract/<id>
 ~~~
 #### Retorno:
 (Exemplo com o user de id: 3)
~~~
{
  "balance": 4945,
  "transactions": [
    {
      "id": 1,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T03:42:03.000Z",
      "amount": 20,
      "businessName": "Responde Aí"
    },
    {
      "id": 2,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T03:57:06.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 3,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T03:58:05.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 4,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T03:59:07.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 5,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T03:59:35.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 6,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T04:00:33.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 7,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T04:01:30.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 8,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T04:01:56.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 9,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T04:02:37.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 10,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T04:03:54.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 11,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T04:05:46.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    },
    {
      "id": 12,
      "cardId": 3,
      "businessId": 1,
      "timestamp": "2022-07-12T04:06:05.000Z",
      "amount": 5,
      "businessName": "Responde Aí"
    }
  ],
  "recharges": [
    {
      "id": 1,
      "cardId": 3,
      "timestamp": "2022-07-11T21:40:44.000Z",
      "amount": 20
    },
    {
      "id": 2,
      "cardId": 3,
      "timestamp": "2022-07-12T03:32:22.000Z",
      "amount": 5000
    }
  ]
}
~~~
---
