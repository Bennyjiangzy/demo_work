# API demo work
This is a demo work for API integration. In Backend I used Node&Express. In Frontend I used Vue.js. Deployed by Docker on Digital Ocean.

* Allow user to get a joke by option
* Allow user to translate languages and the joke
* Allow user to get a random dogs img and save, delete the imgs

[Live http://146.190.174.177:8080](http://146.190.174.177:8080)

![image](./structure.png)

# Installation
### Initial settings <a id="initial-settings"></a>
You need to replace the api address and add api key in backend for LibreTranslate.
And change the API address in frontend

* **Backend**: LibreTranslate API url (you can [deploy](https://github.com/LibreTranslate/LibreTranslate/tree/main#install-and-run) by your. You can directly use the url I configured in the json will not close that translate server until my demo is done)
```json
/backend/appsettings.json

    "translateAPI":
    {
        "url":"http://{api url}/translate",
        "key":"{api key}"        
    },
```
* **Frontend** backend api address (if you run in local for your backend  replace to **localhost**)
```json
/frontend/src/assets/appsetting

        "backendbaseurl":"http://{vm_ip or localhost}:8000",
```
### Docker
I recommed use docker it will save a lot of time, you can simply run it the same way on the cloud by the following steps:
* Install [docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04) on your local or vm
* Git clone this repo
* Change the [initial settings](#initial-settings)
* Run the following command
```bash

cd /demo_work
chmod 777 ./run.sh
./run.sh

# ------------
# Actual command in run.sh

# build docker imges
docker build -t demo-backend ./backend
docker build -t demo-frontend ./frontend

# This will stop all containers, I run it for test. Double check before you run this command
# docker stop $(docker ps -a -q)

# you can simply improved by docker-compose or K8S
docker run -itdp 8000:8000 demo-backend
docker run -itdp 8080:8080 demo-frontend
```
You should be able to access the web in http://{your_vm_ip or localhost }:8080

### Local
You can run the following steps to run the apps locally
* Git clone this repo
* Change the [initial settings](#initial-settings)
* Install [Vue](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/vue-on-windows)
* Install [TypeScript](https://www.typescriptlang.org/download#:~:text=You%20can%20use%20npm%20to,tsc%20for%20one%2Doff%20occasions.)
* Run the following command
```bash
# One terminal for backend
cd demo_work/backend
npm install
npm start


# One terminal for frontend
cd demo_work/frontend
npm install
npm run serve
```
You should be able to see both back and front end running on port 8000 and 8080 respectively. Go visit http://localhost:8080 

# Challenges
I met two challenges in Technical and one in decision

### Technical
* **Real-time translation**: I want users to complete the translation after they typed rather than click the button. It will waster too many time during interaction. Therefore, I set an input event to trigger the call but that will cause every time a letter typed, it will send the request and increase the server load. I finally fix it by add a settime function it will always hold for 2 seconds after a type call. If the user really finish the typing it will send the request.
* **Parse value among components**: There was a scene that user can click the translate button to translate a joke directly in my app. But the joke and translate are two different components which cannot communicate directly for exchange the value. Therefore, I serached the answer for document and the solution will be that create a send value event in joke, then create a recive event in their parent component which is home, from that to send the value to translate component. Finally, set a watch component to listen that value, if changed means user click the translate in joke, and call the predefined method in translate.

### Decision
* **Misunderstanding about requirement**: In the first two days of development, I misunderstood the meaning of the requirements and did not integrate the APIs, but did different functions separately until I foud this mistake in the next afternoon. I first re-read the requirements carefully, tested the given dog and joke API by poostman. I finally choose joke api since is a pure text response. The time is urgen, so I re-planned the map and execute it. Spent two hour in build and testing backend, another two hour in frontend. And one hour in testing on cloud. As a result, I successfully complete the correct requrement in the end of the day. I think it is very common to misinterpret user needs or change user needs in the real development process. You must have the ability to re-plan the development route according to the needs in anypart of the development.

# Other

I designed serveral features for future update and upgrade

* **TypeScript**: I applied typescript for the backend it helps me and other developer read, code better in now and future.
* **Logs**: I set console.log() in each call in backend, we can replace it in real logs module and save logs in json file and manage it centrally
* **Seperate Folder**: I Sperate the frontend and the backend, therefore we can develop it at the same time for different team in real production and better for CI/CD, testing and deployment.
* **Config**: I used .json file to save api url and other information. In real production, we can replace it in app.config for sensitive information or use keyvault and terraform to manage it. 