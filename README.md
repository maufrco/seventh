# apm-nodejs
#Estrutura de projeto em nodeJS para teste SEVENTH

    Estruture uma aplicação cloud (SaaS) para o cenário abaixo, que permita a extensibilidade e escalabilidade. Quais ferramentas você utilizaria e quais decisões de projeto você considera importantes. Crie os artefatos e compartilhe seu projeto. Explique suas decisões. O prazo para resolução é de 3 dias úteis.


#Cenário
 Serviço de Monitoramento de Disponibilidade de Sites. O usuário do serviço informa, via aplicação Web, uma lista de sites aos quais ele deseja monitorar a disponibilidade. A aplicação verifica, periodicamente, a disponibilidade da porta HTTP/HTTPS desses sites, registrando o status da disponibilidade, bem como o tempo de resposta do site.

O usuário consulta, via aplicação Web, o histórico da disponibilidade dos sites monitorados.



#Instalação
npm i
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all     
npm run start