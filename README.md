# 🛠️ Sycamore Backend Assessment – Wallet & Interest API
This project is a Node.js + TypeScript backend API built as part of the Sycamore Backend Engineer (Mid-Level) assessment.

It demonstrates:

Transaction-safe wallet transfers
Idempotent APIs to prevent double spending
Double-entry ledger accounting
Daily interest calculation with high-precision math
PostgreSQL with Sequelize ORM
Redis (optional) for idempotency locking
Dockerized local database setup
---

## 🚀 Getting Started

### 1. Clone the Repo

````bash

git clone https://github.com/Charlesuwaje/Transfer-Assessment.git
cd sycamore-assessment

cd your-project

    ```
 2. Install Dependencies


    npm install

```
 3.  Environment Setup using docker 

 PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/sycamore
DB_HOST=127.0.0.1
DB_USER="root"
DB_PASSWORD=""
DB_NAME="sycamore"
DB_DIALECT="postgres"

 4. Start PostgreSQL using Docker
`````
docker run --name sycamore-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sycamore \
  -p 5432:5432 \
  -d postgres:16

```
5. Sequelize Setup

   npx sequelize-cli init

    ``

6. Create a Migration

    npx sequelize-cli migration:generate --name create-users

    ``

 7.   Run Migrations

    npx sequelize-cli db:migrate

    ``

  8.  Undo Last Migration

    ``
    npx sequelize-cli db:migrate:undo

    ``

  9.  Seed the Database
    npx sequelize-cli seed:generate --name demo-user

    ``

   10. Run All Seeders

    npx sequelize-cli db:seed:all

    ``

   11.  Run a Specific Seeder

    npx sequelize-cli db:seed:run

    ``
  12.  Undo All Seeders

        npx sequelize-cli db:seed:undo:all
        ``
    13.  add a migration file to an existing table 

  npx sequelize-cli migration:generate --name add-title-location-to-users

    ``

    ## API Examples

    - Do a transfer 
     \_ Method and Headers
    transfer
    http://localhost:3000/transfer
    ```
    Host: ""
  Content-Type: application/json

  ````
  _ Request Body

    {
  "fromWalletId": "11111111-1111-1111-1111-111111111111",
  "toWalletId": "22222222-2222-2222-2222-222222222222",
  "amount": "50.00",
//   "idempotencyKey": "tap-0002"
"idempotencyKey": "tap-0001"
}
`````

      * Response Body: 200
  ````

  ```json
  {
    "id": "08fa44de-d571-4d8c-aa9e-a80912453df2",
    "status": "SUCCESS"
}
  ```




