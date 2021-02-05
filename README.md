# Projeto prático backend - Processo seletivo PJC-MT
API Rest construída utilizando Node.js, Electron e dockerizada. Upload de arquivos utilizando Min.Io

## Dados de inscrição
Candidato: Rafael Cândido Santana de Lima
- Vaga: Analista Desenvolvedor

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
Aparecendo a mensagem "BD SINCRONIZADO", retorne ao terminal e insira os comandos:
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

## O que foi implementado:

* Não permissão de acesso a qualquer endpoint a partir de domínios diversos do qual estará hospedado o serviço; 

* Controle de acesso por meio de autenticação JWT com expiração a cada 5 minutos e possibilidade de renovação;

* Implementação de todos os verbos HTTP;

* Recursos de paginação na consulta dos álbuns;

* Exposição de quais álbuns são/tem os cantores e/ou bandas possibilitando consultas parametrizadas (por nome do artista ou do ábum);

* Possibilidade de realizar consultas por nome do artista, permitindo ordenar por ordem alfabética (asc e desc);

* Possibilidade de fazer o upload de uma ou mais imagens da capa do álbum;

* Armazenamento de imagens​ Object Store MinIO utilizando API S3;

* Recuperação das imagens através de links apontando para o Min.IO Play com tempo de expiração.

## O que não foi implementado:

* Rotinas de testes automatizadas, devido a priorização nos estudos e implementação do upload e recuperação de imagens utilizando Min.Io. (Possuía experiência apenas com Digital Ocean Space, Amazon S3 e Armazenamento de mídia local do lado do servidor)