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
                sh "node --version"
                sh "npm --version"
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                
                sh "node --version"
                sh "npm --version"
                sh 'npm i --legacy-peer-deps'
                sh 'npm run test'
                
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
