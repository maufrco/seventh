# k8s configurações Kubernetes / Minikube

Inicialmente desenvolvido local via Minikube

Arquivos de configuração de ambientes contendo

- Elasticsearch
- Kibana
- apm-server


Comandos básicos Minikube

$ minikube dashboard
Abre o dashboard com informações


Comandos básicos Kubernetes

$ kubectl create -f [aquivo.yaml]
Inicia e aplica o script 

$ kubectl apply -f [aquivo.yaml]
Atualiza o cenario rodando o script yaml novamente

$ kubectl get pod
Lista todos os status dos pods em execução

$ kubectl logs -f [NAME]
Exibe logs pod

$  kubectl describe pod
Exibe detalhes dos pods em execução

$ kubectl config view
Exibe as configurações do kubernetes (IP server, Certificate,  etc)

$ kubectl get services -o wide
Exibe os serviços ativos, serviços estão na camada acima de PODs onde é possivel gerenciar rotas entre outros



$ eval $(minikube docker-env)
Altero o ambiente para o virtual (minikube)