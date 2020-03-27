# Teste Seventh
#### Estrutura de projeto em nodeJS para teste SEVENTH

> Estruture uma aplicação cloud (SaaS) para o cenário abaixo, que permita a extensibilidade e escalabilidade. Quais ferramentas você utilizaria e quais decisões de projeto você considera importantes. 
Crie os artefatos e compartilhe seu projeto. Explique suas decisões. 
O prazo para resolução é de 3 dias úteis.*


#### Cenário
> Serviço de Monitoramento de Disponibilidade de Sites. O usuário do serviço informa, via aplicação Web, uma lista de sites aos quais ele deseja monitorar a disponibilidade. A aplicação verifica, periodicamente, a disponibilidade da porta HTTP/HTTPS desses sites, registrando o status da disponibilidade, bem como o tempo de resposta do site.
O usuário consulta, via aplicação Web, o histórico da disponibilidade dos sites monitorados.


Desenvolvimento baseado em contract-first, acesse a [documentação](https://app.swaggerhub.com/apis/maufrco/Seventh/1.0.0)

# Instalação NodeJS

Acesse a pasta /node
```
cd node
```

Execute o instalador do NPM
```
npm i
```

Configure o arquivo /node/config/database.js com as suas credenciais do BD Mysql

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

# Instalação Golang