# Web Notary Service
A service to registry notes about contracts and more.

This project is a part of a Software Engineer challenge.

### Summary
* [Dependencies](#dependencies)
* [Before Running](#before-running)
* [Environment Settings](#environment-settings)
* [Docker Settings](#docker-settings)
  * [Setting Docker](#setting-docker)
  * [Running Docker](#running-docker)
* [Migrations](#migrations)
* [Notes](#notes)

### Dependencies
This project was built considering the following main dependencies:
* NodeJS 24.16.0; 
* ReactJS with Vite;
* Docker and Docker Compose;

### Before Running
Consider installing the package [nvm](https://github.com/nvm-sh/nvm) to your system. Then install the Node version.
Choose a version of **node>=18.14.1.**

> **Note: you can have errors because of node version.** I have chosen the node 24.16.0.

**Installing Node used by author:**
```commandline
nvm install 24.16.0
```

**Using that version as global:**
```commandline
nvm alias default 24.16.0
```

> **Configure the part of ENVIRONMENT variables, take a look at [Environment Settings](#environment-settings)** and follow the steps there.

After you configuring the environment variables. Take a lock at **[Docker Settings](#docker-settings)** and follow the steps there.

**Then, you need to navigate to:**
* [backend/](backend)
* [frontend/](frontend)

And running `npm install` to both, each one. After at backend level, you need to generate the prisma client: `npx prisma generate`.

### Environment Settings
* Rename the file [.env.example](.env.example) to **.env**;
* Generate a new password or create one yourself and replace _password_database_ and _password_database_test_ to your password;
  * I strongly recommend you create one for each respectively;
* Replace the usernames for production and testing with your choice;

After, we're going configuring **the backend project:**
* Access the [backend/](backend) project;
* Rename the file [backend/.env.example](backend/.env.example) to **.env**;
  * Replace the values of `POSTGRES_USER` and `POSTGRES_PASSWORD` to the respectively found in **[.env](.env)**;
* Rename the file [backend/.env.test.example](backend/.env.test.example) to **.env.test**;
  * Replace the values of `POSTGRES_USER_TEST` and `POSTGRES_PASSWORD_TEST` to the respectively found in **[.env](.env)**;

### Docker Settings
For this project I've used docker to install an image to the database context because of commodity.

#### Setting Docker
**Start Docker:**
```commandline
sudo systemctl start docker
```

**Starting Service on system boot:**
```commandline
sudo systemctl enable docker
```

**User Permissions (Not use sudo):**
```commandline
sudo usermod -aG docker $USER
```

#### Running Docker
```commandline
docker compose up -d
```

To see the result, run the following command:
```commandline
docker compose ps
```

To stop the running, please type:
```commandline
docker compose down
```

### Migrations
This project uses the library Prisma as ORM. At [backend/package.json](backend/package.json) you find the key scripts.

But if you want to configure that project, you need to run the migrations, this project has a normal and a test environment.

To run the migrations to the production database, please:
```commandlien
npm run prisma:migrate
```

After run the same migration to the test database:
```commandline
npm run prisma:test
```

**Note: to run the migrations to the test database, you've need to run the migrations to the production mode.**

### Notes
* The script [gitter.py](gitter.py) is used to make GIT operations.

---
*That's all Folks!*
