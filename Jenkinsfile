pipeline {
    agent any

    environment {
        NODE_VERSION = '18.16.0'
        TYPESCRIPT_VERSION = '^4.4.4'
        EMAIL = 'testes107email@gmail.com'
    }

    stages {
        stage('Set Environment Variable') {
            steps {
                script {
                    env.EMAIL = EMAIL
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building...'
                dir('Aula-GitHub-Actions') {
                    sh "node --version"
                    sh "npm --version"
                    sh 'npm install'
                    sh 'npm run build'
                }
                archiveArtifacts 'src/target/*'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                dir('Aula-GitHub-Actions') {
                    sh "node --version"
                    sh "npm --version"
                    sh 'npm i --legacy-peer-deps'
                    sh 'npm run test'
                }
                archiveArtifacts 'src/report.html'
            }
        }

        stage('Notifications') {
            steps {
                echo 'Sending notifications...'
                sh 'npm install'
                sh 'node scripts/send-email.js'
            }
        }
    }
}
