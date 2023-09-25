# Cars (test task)

by Aleksandr Piliugin

- Email: **zakofpl@gmail.com**
- Telegram: **@bebra_smell**

## Installation
### via Docker

Package already includes test MongoDB server with default configuration:
- HOST: localhost
- PORT: 27017
- No manual user name
- No manual password

---

1. Run app via Docker compose:
```
docker-compose up -d
```
2. Enter Client folder:
```
cd ./client
```
3. Run install and build:
```
npm i && npm run build
```

### via Node

1. Install root package:
```
npm run install
```
2. Build both packages from root:
```
npm run build
```

## Usage
### How to
1. Enter __./client__ folder:
```
cd ./client
```
2. Execute commands with ```node build/index.js```:
```
node build/index.js create
node build/index.js list -s year
node build/index.js read <id>
node build/index.js update <id>
node build/index.js delete <id>
```

### Available comands
#### Create
Creates a new **Car**.
```
node build/index.js create
```
#### List
Lists all **Cars**.
```
node build/index.js list
```
Options:
- ```-s, --sort brand``` – sorts list by brand;
- ```-s, --sort model``` – sorts list by model;
- ```-s, --sort year``` – sorts list by year;
- ```-s, --sort price``` – sorts list by price;

> By default, list is sorted by ID (identically to Time added).

#### Read
Reads a **Car** info with specified ```id```.
```
node build/index.js read <id>
```

#### Update
Updates a **Car** info with specified ```id```.
```
node build/index.js update <id>
```

#### Delete
Deletes a **Car** with specified ```id```.
```
node build/index.js delete <id>
```


## Third-party packages
These packages with MIT license were used to complete this task:

### Server
- Typescript
- Mongoose
- Express
- Dotenv
- Zod
- Helmet (for Express)

### Client
- Typescript
- Axios
- Chalk
- Cli-table
- Commander
- Inquirer


## Core architectural decisions
### Server
This application implements **CA** (step forward from **MVC**) architecture, which can be defined by these major layers:

- **Router** (exposes API);
- **Service** (handles requests);
- **Model** (business logic and CRUD);
- **Entity** (connects *Model* with a Database);
- **View** (handles Response formatting);
- *Utils* (minor single-purpose functions).

This architecture scales easily and works perfectly for production-ready microservice applications.

### Client
This client app implements classic **MVC** architecture which is great for small single-purpose applications.

> PS: Зачем писать приложения за 3 часа, если можно запотеть и сделать нормально?