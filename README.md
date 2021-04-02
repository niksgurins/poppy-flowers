## Getting the application to run on any machine and be open to the public

#### Prerequisites
1. Install [Node](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/try/download/community?tck=docs_server)(app runs on mongodb version 4.2(x64), but you can install any version, you'll just have to change the start-mongo script).
2. Open TCP connection on ports 3000 and 9000 in your router settings. (Try [192.168.0.1](http://192.168.0.1) to access your router)

#### Running the app
1. Change the ip address to your [public ip](https://www.whatismyip.com/) within results.jsx and form.jsx.
2. Press the windows key and type cmd, hit enter.
3. cd(change directory) to where you have the poppy-flowers repo saved.
4. cd into front-end and type "npm install". Hit enter and wait for the packages to install.
5. Type "cd ../back-end", hit enter and then type "npm install". Hit enter and wait for the packages to install.
2. Run the app by double clicking the Run App.bat file within the poppy-flowers folder.
3. Now you, and everyone else should be able to connect to the application by going to your public ip address on port 3000 (http://<your-ip>:3000)
