# edisonjpp/Store backend ✨

## Features

- Filter post by dynamic params, general params, category and sub-category
- Auth
- user; create and encripting password, update and remove.
- Categorie; getAll
- Sub-categories; CRUD, get by slug, get by parent

## Tech

- [Node.js] - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Typescript] - Is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Postgresql] - is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- [Graphql] - Is a query language for APIs and a runtime for fulfilling those queries with your existing data.
- [Redis] - is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.
- [TypeOrm] - Is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
- [Apollo Server] - Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.
- [Jwt] - JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.

## Installation

requires [Node.js](https://nodejs.org/) v10+ to run and [Docker].

Install the dependencies and devDependencies and start the server.

```sh
$ cd store-api
$ docker-compose up
$ yarn install
$ yarn run start:dev
```

## License

MIT

[node.js]: http://nodejs.org
[typescript]: https://www.typescriptlang.org
[postgresql]: https://www.postgresql.org
[typeorm]: https://typeorm.io/
[apollo server]: https://www.apollographql.com/docs/apollo-server
[redis]: https://redis.io
[graphql]: https://graphql.org
[jwt]: https://jwt.io/
[docker]: https://www.docker.com/
