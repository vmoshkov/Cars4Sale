
Car Desk Demo Application demonstrates a simple app that provides an ability to create advertisements for selling cars;

Requirements to build this app:
1) docker
2) jre 8
3) maven
4) nodejs
5) typescript


To run this example:

a) create Docker image and start Docker container as discribed here - https://github.com/vmoshkov/Cars4Sale/tree/master/DerbyDockerImage

b) compile and run Spring.Server application (https://github.com/vmoshkov/Cars4Sale/tree/master/Spring.Server) localy:
b.1) get sources from https://github.com/vmoshkov/Cars4Sale/tree/master/Spring.Server
b.2) in project directory run:
1. mvn clean install
2. mvn spring-boot:run

c) build and run ReactJS.Client application (https://github.com/vmoshkov/Cars4Sale/tree/master/ReactJS.Client) localy:
c.1) get sources from https://github.com/vmoshkov/Cars4Sale/tree/master/ReactJS.Client
c.2) in project directory install dependencies:
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev react react-dom @types/react @types/react-dom react-transition-group
npm install --save-dev awesome-typescript-loader clean-webpack-plugin html-webpack-plugin copy-webpack-plugin css-loader style-loader file-loader
npm install --save-dev bootstrap  @blueprintjs/core @blueprintjs/datetime react-responsive-carousel context-menu

c.3) in project directory build application:
npm run build
c.4) start client application in <project root>/build/dist:
npx http-server
c.5) Open a browser and navigate to http://localhost:8080/


Technology stack: docker, Hibernate, Spring Boot, Spring MVC, Spring Data, nodejs, TypeScript, ReactJS, blueprintjs, Apache Derby DB



