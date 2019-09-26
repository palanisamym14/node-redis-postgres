# Product Information System

    

## Dependencies
#### Backend Dependencies
    * ExpressJS
    * Postgres
    * TypeScript
    * concurrently
    * redis


#### Installation and Setup
* Navigate to a directory of choice
* Clone this repo
    ```sh
    git clone https://github.com/palanisamym14/node-redis-postgres.git
    ```

* Install app dependencies
    ```sh
    npm install
    ```
* Run the server
    ```sh
    npm run start
    ```
* Deploying app for production
    ```sh
    npm run start-build
    ```
* Deploy on Docker
    ### build app image node-redis-server(image name)
    ```sh
    docker build -t node-redis-server .
    docker-compose up
    ```

    ### Start The Docker Image
    ```sh
    docker-compose up
    ```
    ### stop the Docker image service
    ```sh
    docker-compose kill
    docker-compose rm -f
    ```
