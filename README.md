# CryptoViewer

Server + Client for watching current Crypto Currencies.

* App is written with React Native
* Client is written with React JS
* Server and Services are written with Node JS
* The Database is a MySQL Database

## Getting Started

You need npm and node js get it [here](https://www.npmjs.com/get-npm)
then open a command prompt and type
```
npm install npm@latest -g
```
Then you can do this
```
git clone https://github.com/MatthiasHerzog2000/CryptoViewer
cd *foldername*
npm install
```

### Prerequisites
I would recommend [visual studio code](https://code.visualstudio.com/) for inspecting 
also for the Database Connection you need [Xampp](https://www.apachefriends.org/de/download.html)
and if you want to open the App use Expo, which you can get from the Play Store


### Installing

Before you can start you will need create-react-app and create-react-native-app 

create-react-app
```
npm install -g create-react-app

```
create-react-native-app
```
npm install -g create-react-native-app
```
Start Xampp and there apache and MySQL
open all four files in different Windows 
1. Go to CryptoServer and type the following in to the command prompt
```
npm start
```
2. Go to FetchCryptoData

there are three Files so open 3 command prompts(in VS Code CTRL + ö and press the + button)

index.js and client.js is for writting into the database so that there is data even when no one is connected to the Server
in index.js the Data will be fetched in then it gets written into the database

Command Prompt 1
```
node ./index.js
```
Command Prompt 2
```
node ./client.js
```
Command Prompt 3

This is for the actual User this looks almost the same as index.js but the User only sends a get Request to get the Data
```
node ./UserService.js
```
Now you can ether use the App or the WebClient or both they are almost the same
For the App use crypto-App and follow these instructions [here](https://github.com/react-community/create-react-native-app#npm-start)

For the Web Client use 
```
npm start
```

## Built With

* [create-react-app](https://github.com/facebookincubator/create-react-app) - Web Client
* [Node JS](https://nodejs.org/en/) - REST Server and Websockets
* [create-react-native-app](https://github.com/react-community/create-react-native-app) - App

## Note
The Web Client has no styling so feel free to add you own custom styles


