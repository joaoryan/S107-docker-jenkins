# Define nossa imagem base
FROM jenkins/jenkins:lts

# Cria uma variável com a versão do Node.js
ARG NODE_VERSION=18

# Cria uma variável com a versão do TypeScript
ARG TYPESCRIPT_VERSION=^4.4.4

# Define nosso usuário dentro do container
USER root

# Instala o Node.js e o TypeScript
RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g typescript@${TYPESCRIPT_VERSION}

# Configura o Jenkins para usar o Node.js e o TypeScript
USER jenkins
RUN jenkins-plugin-cli --plugins