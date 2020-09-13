# Publicize
It often occurs that whenever a club/student chapter wants to notify all the students of college, they heavily rely on their executives to publicize the event notification/message on different platforms like WhatsApp, Instagram, Discord, Slack, etc. 
Usually it happens that many executives fails to send the message or even read the message. It becomes difficult for the Core team/Organizers to make everyone aware of the event. Also, most of the people don't tend to open other apps except WhatsApp and they miss out on the notifications which leads to low attendance in the event. WhatsApp is something which everyone opens atleast once in 2 hours. 

What we have thought is of receiving WhatsApp message of the EVENTS of clubs/student chapters which the students opts for. 
It makes it much more convenient for the organizers to send the event message which includes text and images from a single channel on WhatsApp. Instead of relying on someone else to propagate the message, it will be easier to know many people are receiving the message.


## Workflow

1. Students of a college need to Sign Up on our website. There they can choose the clubs that they are interested in and want to receive notifications.

    ![](images/1.PNG)
  
  
2. The registered students need to add a number **+1(415)523-8886** and save it as any name they wish to call the service. To start receiving messages they need to send a message **join recall-master** to the same number as shown below. 

    ![](images/whapp1.jpeg)


3. The different clubs of a college need to register first to use our features.

    ![](images/2.PNG)
    

4. This is the dashboard of the Logged In club from where they can send notifications.

    ![](images/ss4.png)
  

5. We have added a feature wherein you can upload an image on your Google Drive from the site itself.

    ![](images/4.PNG)

6. Users can enter the google drive link or any other link which provides the required image in the textbox below.

    ![](images/5.PNG)

7. After filling all the details of the message and sending it, the users will receive the message as shown below.
    ![](images/whapp2.jpeg)


## Tech/framework used
The following tools were used in building this site
* Front-end development
  * HTML
  * CSS
  * BootStrap 
  * Semantic UI
  
* Back-end development
  * Javascript
  * Node.js
  * Express.js
  * jQuery
  
* Database used
  * mongodb
  
* Authorisation/Authentication
  * passport.js
  
* Google Drive API 
  * multer
  
  
  
  
  ## Installation
It is very easy to use our project if anyone wants. Just follow the steps :

1. Firstly if you are working locally then you need to install the following :
    * Node.js
    * MongoDB
    * VS Code ( recommended , Any other suitable code editor will work )
  
2. Next you need to clone our project's GitHub repository to your desktop 

3. Open command line navigate to the project folder. Then type the following commands to install required dependencies :
     ```javascript
      npm install async, body-parser, connect-flash, ejs, express, express-session, locus, method-override, mongoose, passport, passport-     local, passport-local-mongoose, puppeteer, request, multer, googleapis --save
     ```
4. Your package.json should look like this with the following dependencies
    ![](images/package-json.png)
    

     
6. After successful installation run the following command to start the application :
      ```javascript
       npm run dev
      ```
   If you see *Server Has Started!!* then you have successfully setup everything and good to go with our application.



