# Teste Seventh
Desenvolvimento baseado em contract-first, acesse a [documentação](https://app.swaggerhub.com/apis/maufrco/Seventh/1.0.0)

## Escopo
##### Estrutura de projeto em nodeJS para teste SEVENTH
> Estruture uma aplicação cloud (SaaS) para o cenário abaixo, que permita a extensibilidade e escalabilidade. Quais ferramentas você utilizaria e quais decisões de projeto você considera importantes. 
Crie os artefatos e compartilhe seu projeto. Explique suas decisões. 
O prazo para resolução é de 3 dias úteis.*


##### Cenário
> Serviço de Monitoramento de Disponibilidade de Sites. O usuário do serviço informa, via aplicação Web, uma lista de sites aos quais ele deseja monitorar a disponibilidade. A aplicação verifica, periodicamente, a disponibilidade   da porta HTTP/HTTPS desses sites, registrando o status da disponibilidade, bem como o tempo de resposta do site.
O usuário consulta, via aplicação Web, o histórico da disponibilidade dos sites monitorados.


## NodeJS

### Instalação NodeJS

Acesse a pasta /node
```
cd node
```

Execute o instalador do NPM
```
npm i
```

Configure o arquivo /node/.env com as suas credenciais do BD Mysql

Obs: No arquivo /node/.env tem uma configuração de um banco de dados já configurado. Para usá-lo basta pular as etapas abaixo de execução do sequelize e ir direto para execução do node [npm run start]

Execute o script para criação da Database
```
npx sequelize db:create
```
Execute o script para criação das Tabelas (hosts e monitors)
```
npx sequelize db:migrate
```
Execute o script para popular dados mock na tabela host
```
npx sequelize db:seed:all     
```
Execute o NodeJs 
```
npm run start
```


## Frontend
O frontend foi desenvolvido em ReactJs acompanhado das seguintes tecnologias:


- **[Redux](https://github.com/reduxjs/redux)**;
- **[Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)**;
- **[ImmutableJs](https://github.com/immutable-js/immutable-js)**;
- **[Jest](https://github.com/facebook/jest)**;
- **[Enzyme](https://github.com/airbnb/enzyme)**;
- **[Axios](https://github.com/axios/axios)**;
- **[Highchart](https://github.com/highcharts/highcharts)**;
- **[Styled-components](https://github.com/styled-components/styled-components)**;

### Preview 

![](https://github.com/maufrco/seventh/blob/master/frontend/public/preview.png)



### Instalação

Acesse a pasta /frontend
```
cd frontend
```

Execute o instalador do NPM
```
npm i
```

Configure o arquivo "frontend/src/environments/environments.js" adicionando o servidor node em execução.
Obs: No arquivo existe uma configuração de um servidor node em execução.

Para testar localmente utilize o comando 
```
npm run start
```

## Golang

Foi desenvolvido uma aplicação em GO, que percorre todos os hosts cadastrados e obtem a velocidade e  o status da requisição.

O codigo encontra-se na pasta /go .
