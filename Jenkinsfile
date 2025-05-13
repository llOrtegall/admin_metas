pipeline {
  agent any
    
  tools { nodejs 'node-v22' }

  environment { 
    ENV_METAS_ADM_API = credentials('ENV_METAS_ADM_API')
  }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
            def env_api = readFile(ENV_METAS_ADM_API)
            writeFile file: './api/.env', text: env_api
          }
        }
      }

      stage('install dependencies frontend') {
        steps {
          dir('client') {
            sh 'bun install'
            sh 'bun run build'
          }
        }
      }

      stage('build server') {
        steps {
          dir('server') {
            sh 'bun install'
            sh 'bun run build'
          }
        }
      }

      stage('down docker compose'){
        steps {
          sh 'docker compose down'
        }
      }

      stage('delete images if exist') {
        steps{
          script {
            def images = 'api_adm_metas:v2.0'
            if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
              sh "docker rmi ${images}"
            } else {
              echo "Image ${images} does not exist."
              echo "continuing..."
            }
          }
        }
      }

      stage('run docker compose'){
        steps {
          sh 'docker compose up -d'
        }
      }
    }
}
