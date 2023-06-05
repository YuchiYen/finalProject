# Final Project

Project Proposal:

Basic health tracker

## Week 9 update
Change of design:
Since this App only had one set of CRUD and I need 2 sets, I added a migraine tracker which records migraine start time, duration, medicine taken.
The other statics I'm tracking - sleep hour, weight, blood pressure are all factors of migraine. I can use aggregate lookup and match to generate reports.
I have the following route.js
healthRecord handles all health stat input RUD
migraine handles all migraine record input RUD
reports handles all reports - this is a number of get operation - get all health records. get all migraine records. get all records. 


Progress:

created healthRecord.js and migraine.js data models and data access objects.

created all but one of hte following routes of the routes:
post login/signup

post login/

get  healthRecord

del  healthRecord

put  healthRecord

post healthRecord/create

post migraine/create

put  migraine

get  migraine

del  migraine

get  report/getAllRecordsForOneUser

get  report/getSleepHoursBetweenMigraines

get  report/MedicineTakenTextSearch  ... need working



need to create unit tests.
need to remove the components I don't use ( because it's modeled after a previous homework)
need to clean up, refine some code.


## What is it

An application that allows users to login and record their weight, Blood Pressure, Heart Rate and hours of Sleep.
It will use node.js, express.js, MongoDb, and Jest.js for unit testing.
Depending on the access level, basic users can access only the weight tracker, and premium users can access the other trackers.
The application will have signup, login and use middleware to determine the access level of different users.
I will use what we learned in the class to implement the above actions.

## Routes
for routes, it will have:
signup post
login post
change password put
enter health data post
update health data put
delete health data delete
Get health data get

## Models
for data model:
We will have 
user
Health record which will have all the data.
I'm still deciding if I should have a big colleciton of documents that has all the fields or put the data in indivdual collections like weight, BP, HR, and Hour of sleep.

## Time

I will try to wrap up the coding in the next 2 weekends, and finish it by 6/6. I'm expecting to spend time to get my project setup since I'm starting from scratch.
The week after I will complete the unit test to cover my code and be done with it.
In the last week of the class, I'll only touch it if I'm missing anything.





