pipeline {
    agent any

    stages {
        stage ('Set Environment Variable') {
            steps {
                script {
                    env.EMAIL = 'sjoaoryan@gmail.com'
                }
            }
        }

        stage ('Test') {
            steps {
                echo 'Testing'
                sh '''
                    node --version
                    npm --version
                    npm i --legacy-peer-deps     
                    npm run test
                '''
                archiveArtifacts 'report.html'
            }
        }

        stage ('Notifications') {
            steps {
                echo 'Notifications'
                emailext (
                    subject: 'Pipeline Executado!',
                    body: 'Build completed. Please check the status.',
                    to: env.EMAIL,
                    from: 'sjoaoryan@gmail.com',
                    mimeType: 'text/html'
                )
            }
        }
    }
}
