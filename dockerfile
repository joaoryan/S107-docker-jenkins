# Use a imagem oficial do Jenkins com suporte a Java 8
FROM jenkins/jenkins:latest

# Define o usuário root para realizar instalações
USER root

# Instalação do Node.js e npm
RUN apt-get update \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get install -y build-essential

# Instalação de plugins do Jenkins (exemplo com dois plugins)
RUN jenkins-plugin-cli --plugins

# Volta ao usuário Jenkins
USER jenkins
