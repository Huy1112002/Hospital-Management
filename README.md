# Smart_rooming_house_BE



## Introduction

## Table of Contents

### Installation

### Prerequisites
- Node.js 14 or higher
- npm 7 or higher
- MySQL 8 or higher, MariaDB same

### Dependencies
- @nestjs/core
- @nestjs/common
- @nestjs/platform-express
- @nestjs/typeorm
- @nestjs/jwt
- @nestjs/passport
- @nestjs/schedule
- typeorm
- bcryt
- class-validator
- dotenv
- babel
...

### Commands and steps
- Clone the repository: `git clone https://github.com/Huy1112002/Hospital-Management`
- Change directory: `cd Hospital-Management`
- Install dependencies: `npm install`
- Create a .env file and fill like 
**.env.development**
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=HOSPITAL
DB_USER=HOSPITAL_ADMIN
DB_PASSWORD=HOSPITAL

NODE_ENV=127.0.0.1
PORT=3000
```
- Run migration: `npm run migration:run`
- Start the project: `npm run start:dev`
