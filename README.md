# Fetch Take Home Assessment, Feb 2, 2025

## Assumptions
1. The time between 14:00 - 16:00 is inclusive
2. String with just empty spaces is considered invalid - " " 

## Tech Stack
1. Express.js
2. Redis Stack

## Runing project
### Option 1 - Running it with docker
1. Clone the repository
2. The default port is 3000. If that port is unavailable, update the port in docker-compose.yml (it has appropriate comments).
3. run "docker-compose up -d"

### Option 2 - Running it without docker
1. Verify that Node.js is installed before proceeding.
2. Clone the repository
3. At the root level. Run following command "npm install"
4. Open the index.js file at the root level and uncomment ToggleToObject();. This will switch data storage from Redis Stack to a simple JavaScript object.
5. Run following command "npm start"
