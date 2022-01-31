# NarutoAPI

Criei essa API para exercitar o meu conhecimento referente ao backend e tambem para aprendizado do GraphQL junto com Typescript. A ideia de criar essa API surgiu do meu irmão mais novo que é fascinado no Naruto já assistiu o clássico/shippuden e atualmente está lendo o manga. Achei que seria interessante criar uma API pública para que todo mundo possa desfrutar/usar para seus projetos pessoais e afins. [NarutoAPI](http://www.narutoapi.com.br/api/v1/rest)

# Endpoints

- Rest (v1/rest) 
  ```
  List all routes for REST endpoint.
  ```
- GraphQL (v1/graphql)


# Como iniciar o projeto

## 1. Instale o redis caso não possua (Ubuntu PPA)

```sh
$ sudo add-apt-repository ppa:redislabs/redis
$ sudo apt-get update
$ sudo apt-get install redis
```

## 2. Instale as depedências

```dosini
$ yarn install
# or yarn
```

## 3. Crie um arquivo .env ou renomeie .env.example e coloque os valores nas variaveis

```dosini
# Application is listening in this port
PORT=

# Redis Settings because Rate Limiter
REDIS_PORT=
REDIS_HOST=
REDIS_DB=

# Username can also be passed via URI.
# It's worth to noticing that for compatibility reasons `allowUsernameInURI`
# need to be provided, otherwise the username part will be ignored.
REDIS_URL="redis://username:authpassword@127.0.0.1:6380/4?allowUsernameInURI=true"

# DB Settings for Prisma and Docker
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=

# Prisma Connection
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
```

## 4. Rode o comando para criar o banco de dados

```dosini
$ npx prisma migrate dev
```

## 5. Depois rode o comando para o seed no banco

```dosini
$ yarn seed
# Or npx prisma db seed --preview-feature
```

## 6. Rode o servidor

```dosini
$ yarn dev
```

## Para buildar o projeto

```dosini
# Mude as variaveis de ambiente novamente, caso precise mudar o banco de dados
$ npx prisma migrate deploy
$ yarn seed # or npx prisma db seed --preview-feature
$ yarn start # builda o projeto e starta o servidor
```


# Todo List

- [] Adicionar Testes
