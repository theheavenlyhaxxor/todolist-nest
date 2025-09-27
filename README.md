# 📌 Todo List

## 📖 Description  
This project is a task management application that allows users to create, update, and delete tasks. It includes authentication, and REST API. 

---

##  Tech Stack  
- **Backend:** NestJS  
- **Database:** MySQL

---

##  Requirements  
- Node.js 
- MySQL
- Git  
- pnpm  

---

##  Installation  

```bash
# 1. Clone the repository
https://github.com/theheavenlyhaxxor/todolist-nest.git
cd todolist-nest

# 2. Install dependencies
pnpm install
```

##  Setup  
### Create .env file
```bash
PORT=your_server_port
DATABASE_NAME=your_database_name
DATABASE_PASSWORD=your_database_password
DATABASE_USER=your_database_user
DATABASE_PORT=your_database_port
DATABASE_HOST=your_database_host
JWT_SECRET=your_secret
JWT_EXPIRES_IN=your_expiration
JWT_REFRESH_SECRET=your_secret_refresh
JWT_REFRESH_EXPIRES_IN=your_refresh_expiration
```

### Start the Server

```
pnpm run start:dev
```

## Folder Structure 
```
todolist-nest
├── dist
├── eslint.config.mjs
├── nest-cli.json
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── src
│   ├── app.module.ts
│   ├── auth
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   └── dto
│   │       ├── login.dto.ts
│   │       ├── refresh-token.dto.ts
│   │       └── signup.dto.ts
│   ├── config
│   │   └── config.ts
│   ├── database
│   │   ├── database.module.ts
│   │   └── database.service.ts
│   ├── guards
│   │   └── guards.ts
│   ├── main.ts
│   ├── task
│   │   ├── dto
│   │   │   ├── create-task.dto.ts
│   │   │   └── update-task.dto.ts
│   │   ├── task.controller.spec.ts
│   │   ├── task.controller.ts
│   │   ├── task.module.ts
│   │   ├── task.service.spec.ts
│   │   └── task.service.ts
│   └── user
│       ├── dto
│       │   └── user.update.dto.ts
│       ├── user.controller.spec.ts
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.service.spec.ts
│       └── user.service.ts
├── test
├── tsconfig.build.json
└── tsconfig.json
```

# Usage 
## Authentication
```
/auth/signup, POST
# Request
{
  "username": "your username"
  "password": "your password"
}

# Response 
{
  "message": "Succesfuly created"
}
```
```
/auth/login, POST
# Request
{
  "username": "your username"
  "password": "your password"
}

# Response 
{
  "accessToken": "token",
  "refreshToken": "refresh token"
}
```

```
/auth/logout, POST
# Request
Authorization: Bearer <accessToken>

# Response 
{
  "message": "Successfully logged out"
}
```
## USER CRUD
```
/user, GET 
# Request
Authorization: Bearer <accessToken>

# Response, get all users
{
        "id": 5,
        "username": "your username",
        "password": "hashed password",
        "refreshToken": null,
        "createdAt": "date"
}
```
```
/user/username, GET 
# Request, get a user by username
Authorization: Bearer <accessToken>
{
  "username": "your username"
}

# Response, get all users
{
        "id": 5,
        "username": "your username",
        "password": "hashed password",
        "refreshToken": null,
        "createdAt": "date"
}
```
```
/user/:id, GET 
# Request, get a user by username
Authorization: Bearer <accessToken>


# Response, get user by id
{
        "id": 5,
        "username": "your username",
        "password": "hashed password",
        "refreshToken": null,
        "createdAt": "date"
}
```
```
/user/:id, DELETE 
# Request
Authorization: Bearer <accessToken>

# Response
{
    "message": "succesfully deleted user"
}
```
```
/user/:id, PATCH 
# Request
Authorization: Bearer <accessToken>
{
	"username": "your username",
    "password": "your password"
}
# Response
{
    "message": "User Updated succesfully"
}
```
## TODO CRUD
```
/task, POST 
# Request
Authorization: Bearer <accessToken>
{
    "title": "kamusta mundo",
    "description": "Hello World"
}
# Response
{
    "messsage": "task created"
}
```
```
/task, GET 
# Request, get all task of that user
Authorization: Bearer <accessToken>

# Response
[
    {
        "id": 10,
        "userId": 8,
        "title": "kamusta mundo",
        "description": "Hello World",
        "isCompleted": 0,
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
```
/task/:id, GET 
# Request, get one task of that user
Authorization: Bearer <accessToken>

# Response
[
    {
        "id": 10,
        "userId": 8,
        "title": "kamusta mundo",
        "description": "Hello World",
        "isCompleted": 0,
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
```
/task/:id, PATCH 
# Request, 
Authorization: Bearer <accessToken>
{
    "title": "kamusta mundo",
    "description": "Hello World"
}
# Response
{
    "message": "Task updated successfully"
}
```
```
/task/:id, DELETE 
# Request, 
Authorization: Bearer <accessToken>

# Response
{
    "message": "Task deleted successfully"
}
```