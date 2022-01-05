
## Description

Github Handler Application is a system which is used to fetch the github repositories of a particular user.
I can also fetch the user profile by users github account name.


## What we want to achieve

  - Fetch all the repositories of the user having fields like: owner_name, repo_name, repo_url, description, star_count.

  - Fetch the github profile details of the user having fields like: owner_name, image_url,followers_count, following_count,       no_of_repos & created_at.
  

## Setting up env files

- You will be required to create an environment file and add the content in it (Similar to development.json).
- Add all the desired configurations like: port, database username, password, github token and github baseurl.


## Installation

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```


## APIs

- [Postman Collection](https://www.getpostman.com/collections/b8a5cb53950218184650)


   GET: /api/v1/githubReposHandler/:owner_name

   ```
   params: 
   {
       owner_name: string;
   }
   ```

   GET /api/v1/githubProfileHandler/:owner_name

   ```
   params: 
   {
       owner_name: string;
   }

   ```
