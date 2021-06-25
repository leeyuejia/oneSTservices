# oneST services

## Repository link
Repo link : https://github.com/leeyuejia/oneSTservices/tree/master
Main deployed branch : master
## Deployed site
Deployed on netlify : https://onestservices-leeyj.netlify.app/
deployed branch : master

## Clone this project and follow the below steps to run locally. 

1) Please clone the repository from https://github.com/leeyuejia/oneSTservices.git

2) switch branch to "MASTER"

3) In terminal while pointing to the root project directory, run "npm install" to install all dependencies

4) run "npm run start" to start project in localhost. 

5) point browswer to http://localhost:3000/ 

6) if there are any errors regarding dependencies, please try to run the below step
    a) remove node_modules folder (if any)
    b) clear npm cache by running <npm cache clean --force>
    c) run <npm install>
    d) run <npm dedupe>

## Brief

### Services one - uen authentication

Based on validation criteria from https://www.uen.gov.sg/ueninternet/faces/pages/admin/aboutUEN.jspx, this services will take a user's input and validate if user's input is valid or not. Errors displayed on the frontend would show user what went wrong with the input. 

### Services two - Singapore Weather Forecast For the next 2 hours

User would select a location from a dropdown list of location in singpapore. Upon selecting a location, It will display the weather forecase for the next 2 hours. 