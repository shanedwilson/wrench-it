# Wrench It
This app is my final capston project for my C#/.Net back-end course work at Nashville Software School. Wrench It is an app for keeping track of one's machines, the machines' service records, parts associated with the machines and DIY links for the machines.

After authorization the database is checked for an existing Firebase ID. If none is found, the registration page mounts and the user must register. User profiles are editable.

A machine may be added to the user's garage. The machine may be edited or soft deleted.

On the garage page a machine may be selected from a dropdown. The machine's info is then displayed.

The parts associated with the machine may be selected from dropdowns and edited.

Parts may be added to the machine's list of parts.

A service record can be added.

The user may choose to see a list of service records. Clicking on a service record brings up a detail view. The service may be edited.

The user may choose to see the links page where they may select a machine and see any YouTube videos saved for that machine. YouTube may be searched to find more videos.

Upon login, if there is any machine with a service record older than three months, the Alerts tab in the navbar glows red. Selecting 'Alerts'
routes the user to the alerts page. Clicking on an alert routes the user to the garage with the info preselected for the machine requiring service.

## Tech Used
* React.js
* C#/.Net/
* Boostrap
* SCSS
* Reactstrap
* React libraries including React Search Field and React Animated CSS
* Planning with Github Projects

## Screenshots
![Auth Screenshot](./images/wrench-it-auth.png)
![Home Screenshot](./screenshots/wrench-it-home.png)
![Garage Screenshot](./screenshots/wrench-it-garage.png)
![Links Screenshot](./screenshots/wrench-it-links.png)

## How to run this project:

* Setup Firebase  
  -Create a firebase project  
  -Enable 'Google Authentication'  
  -Create an apiKeys.js file (an example file exists in the 'helpers' folder)
  -Copy firebase keys from firebase web app settings into apiKeys.js

* Clone or download the repo

* Browse to the repo directory in your terminal

* In the ClientApp folder of the project run ```npm install``` to install necessary dependencies

* Run the project from Visual Studio

## Thank You To:
* Nathan Gonzalez (NSS E8 Backend Chief Badass)
* Martin Cross (NSS E8 Backend Assistant Badass)
* Adam Wieckert (NSS E8 Backend Assistant Badass)
* Marco Crank (Compadre and Wise Counsel)
