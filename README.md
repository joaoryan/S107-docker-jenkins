 ## Projeto
- O projeto consiste em um sistema de CI/CD com Jenkins, para realizar etapas de um pipeline 
 
## Equipe
- Gabriel Guerzoni 235
- Joao Ryan 239

## Tecnologias
- Gerenciador de dependências: NodeJS
- Linguagem de Programação: Typescript

## Para baixar dependencias
```
- npm i
```

## Build e execução do codigo
```
- npm run build
- npm run start
```

## Executar testes
```
- npm run test
- npm run test:verbose
- npm run test:ci
```

## Comandos úteis Docker

Verificar a versão do docker:

```
docker --version
```

Listar containers docker rodando atualmente:

```
docker ps
```

Listar imagens docker na máquina:

```
docker image ls
```

Download de uma imagem do docker hub:

```
docker pull nome_da_imagem
```

Construir uma imagem docker com um dockerfile:

```
docker build --tag="tag_para_imagem" <diretorio_onde_se_encontra_o_dockerfile>
ex: docker build -t joaoryan/projeto-s107:v1.0.0 .
    docker push joaoryan/projeto-s107:v1.0.0
```

Executar o container utilizando docker-compose

```
docker compose -f up
```

Parar o container utilizando docker-compose

```
docker-compose -f down
```