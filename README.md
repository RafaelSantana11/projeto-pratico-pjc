# Projeto prático backend - Processo seletivo PJC-MT
API Rest construída utilizando Node.js, Electron e dockerizada. Upload de arquivos utilizando Min.Io

## Dados de inscrição
Candidato: Rafael Cândido Santana de Lima
Vaga: Analista Desenvolvedor

## Execução do projeto
Siga os seguintes passos para a execução do projeto, sendo necessária a pré instalação do NPM, do Docker e Docker Compose

### Instalando dependências
```
npm install
```

### Subindo o container Docker
```
docker-compose up -d
```

### Criação do banco de dados
Primeiramente abra o navegador e acesse:

```
http://localhost:3060/sincronizar
```
Aparecendo a mensagem "BD SINCRONIZADO", retorne ao terminal e insira os comandos
```
docker exec -it server /bin/bash
```
```
npx sequelize-cli db:seed:all
```
```
exit
```

### (Opicional): Ver logs do sistema
```
docker logs -f --tail 100 server
```

### Encerrar execução do sistema
```
docker-compose down
```