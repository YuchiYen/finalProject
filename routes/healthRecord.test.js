// const request = require("supertest");
// const server = require("../server");
// const testUtils = require('../test-utils');
// const mongoose = require('mongoose');
// const { ObjectId, } = require('mongodb');

// const User = require('../models/user');
// const healthRecordModel = require('../models/healthRecord');
// const jwt = require('jsonwebtoken');
// const secret = 'my super secret';

// describe("/healthRecord", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     const healthRecord0 = { sleepHours: 12, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-01T00:00:00.000Z" }
//     const healthRecord1 = { sleepHours: 14, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-02T00:00:00.000Z" }
//     const healthRecord2 = { sleepHours: 8, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-03T00:00:00.000Z" }
//     const healthRecord3 = { sleepHours: 9, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-04T00:00:00.000Z" }
//     const healthRecord4 = { sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-05T00:00:00.000Z" }
//     //   const healthRecord5 = {userId: new ObjectId("647c1955cd4d4d73cbcdf459"), sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime:  Date("2023-05-06T00:00:00.000Z")}
//     //   const healthRecord6 = {userId: new ObjectId("647c1955cd4d4d73cbcdf459"), sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime:  Date("2023-05-07T00:00:00.000Z")}
//     //   const healthRecord7 = {userId: new ObjectId("647c1955cd4d4d73cbcdf459"), sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime:  Date("2023-05-08T00:00:00.000Z")}
//     //   const healthRecord8 = {userId: new ObjectId("647c1955cd4d4d73cbcdf459"), sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime:  Date("2023-05-09T00:00:00.000Z")}
//     //   const healthRecord9 = {userId: new ObjectId("647c1955cd4d4d73cbcdf459"), sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime:  Date("2023-05-10T00:00:00.000Z")}

//     describe('Before login', () => {
//         describe('POST /', () => {
//             it('should send 401 without a token', async () => {
//                 const res = await request(server).post("/healthRecord/create").send(healthRecord0);
//                 expect(res.statusCode).toEqual(401);
//             });
//             it('should send 401 with a bad token', async () => {
//                 const res = await request(server)
//                     .post("/healthRecord/create")
//                     .set('Authorization', 'Bearer BAD')
//                     .send(healthRecord0);
//                 expect(res.statusCode).toEqual(401);
//             });
//         });
//         describe('GET /', () => {
//             it('should send 401 without a token', async () => {
//                 const res = await request(server).get("/healthRecord").send(healthRecord0);
//                 expect(res.statusCode).toEqual(401);
//             });
//             it('should send 401 with a bad token', async () => {
//                 const res = await request(server)
//                     .get("/healthRecord")
//                     .set('Authorization', 'Bearer BAD')
//                     .send();
//                 expect(res.statusCode).toEqual(401);
//             });
//         });
//     });

//     describe('after login', () => {
//         const user0 = {
//             email: 'user0@mail.com',
//             password: '123password'
//         };
//         const user1 = {
//             email: 'user1@mail.com',
//             password: '456password'
//         }
//         let token0;
//         let adminToken; //do authorization on this one later
//         let decryptedToken0;
//         beforeEach(async () => {
//             await request(server).post("/login/signup").send(user0);
//             const res0 = await request(server).post("/login").send(user0);
//             token0 = res0.body.token;
//             //console.log('token0 is: ' , token0);
//             decryptedToken0 = jwt.verify(token0, secret);
//             //console.log('decryptedToken0 is: ', decryptedToken0);

//             await request(server).post("/login/signup").send(user1);
//             //await User.updateOne({ email: user1.email }, { $push: { roles: 'admin'} });   //TODO add isPremiumUser code here.
//             const res1 = await request(server).post("/login").send(user1);
//             adminToken = res1.body.token;
//             //console.log('adminToken is: ', adminToken);
//         });
//         describe.each([healthRecord0, healthRecord1])("POST / healthRecord %#", (healthRecord) => {
//             it('should send 200 and store healthRecord', async () => {
//                 const res = await request(server)
//                     .post("/healthRecord/create")
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send(healthRecord);
//                 expect(res.statusCode).toEqual(200);
//                 // console.log('res.body is: ', res.body); 
//                 // console.log('healthRecord is: ' , healthRecord)
//                 expect(res.body).toMatchObject(healthRecord)
//                 const savedHealthRecord = await healthRecordModel.findOne({ _id: res.body._id }).lean();

//                 let svdHRStringDate = {
//                     ...savedHealthRecord,
//                     dateTime: savedHealthRecord.dateTime.toISOString()
//                 }
//                 // console.log('savedHealthRecord is: ', savedHealthRecord); 
//                 // console.log('healthRecord is: ' , healthRecord)
//                 expect(svdHRStringDate).toMatchObject(healthRecord);
//             });
//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .post("/healthRecord/create")
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send(healthRecord);
//                 expect(res.statusCode).toEqual(500);

//                 //expect(res.body).toMatchObject(healthRecord)
//                 console.log("POST res.body ", res.body);
//             });
//         });
//         describe.each([healthRecord0, healthRecord1])("PUT / healthRecord %#", (healthRecord) => {
//             let originalHealthRecord;
//             beforeEach(async () => {
//                 const res = await request(server)
//                     .post("/healthRecord/create")
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send(healthRecord);

//                 //console.log('res is: ', res);            
//                 originalHealthRecord = res.body;
//             });

//             it('should send 200 and update healthRecord', async () => {
//                 const res = await request(server)
//                     .put("/healthRecord/" + originalHealthRecord._id)
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send({ ...healthRecord, highBP: healthRecord.highBP + 1 });
//                 expect(res.statusCode).toEqual(200);
//                 const newHealthRecord = await healthRecordModel.findById(originalHealthRecord._id).lean();
//                 newHealthRecord._id = newHealthRecord._id.toString();
//                 newHealthRecord.dateTime = newHealthRecord.dateTime.toISOString();
//                 newHealthRecord.userId = newHealthRecord.userId.toString();
//                 expect(newHealthRecord).toMatchObject({ ...originalHealthRecord, highBP: originalHealthRecord.highBP + 1 });
//             });

//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .put("/healthRecord/" + originalHealthRecord._id)
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send(healthRecord);
//                 expect(res.statusCode).toEqual(500);
//                 //expect(res.body).toMatchObject(healthRecord)                
//             });


//         });
//         describe("GET /", () => {
//             let healthRecords;
//             beforeEach(async () => {
//                 let healthRecord2a = { ...healthRecord2, userId: decryptedToken0._id };
//                 let healthRecord3a = { ...healthRecord3, userId: decryptedToken0._id };
//                 healthRecords = (await healthRecordModel.insertMany([healthRecord2a, healthRecord3a])).map(i => i.toJSON())
//                 healthRecords.forEach(i => { i._id = i._id.toString(), i.userId = i.userId.toString() });
//                 //console.log('healthRecords is: ', healthRecords)
//             });

//             it('should send 200 to normal user and return all healthRecords', async () => {
//                 const res = await request(server)
//                     .get("/healthRecord")
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();

//                 const modifiedData = res.body.map(obj => {
//                     return {
//                         ...obj,
//                         dateTime: new Date(obj.dateTime)
//                     };
//                 });
//                 expect(res.statusCode).toEqual(200);
//                 expect(modifiedData).toMatchObject(healthRecords);
//             });

//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .get("/healthRecord")
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(500);
//                 //expect(res.body).toMatchObject(healthRecord)                
//             });
//         });

//         describe("Delete / ", () => {
//             let healthRecord0a, healthRecord1a, healthRecord2a, healthRecord3a, healthRecord4a;
//             let records;
//             let testUserId;

//             beforeAll(async () => {
//                 const user2 = {
//                     email: 'user2@mail.com',
//                     password: 'abcpassword'
//                 };
//                 await request(server).post("/login/signup").send(user2);
//                 const res2 = await request(server).post("/login").send(user2);
//                 //console.log('res2: ', res2);
//                 let token2 = res2.body.token;
//                 //console.log('token2: ', token2);
//                 //console.log('secret: ', secret);

//                 let testUser = jwt.verify(token2, secret);
//                 testUserId = testUser._id;

//                 healthRecord0a = { ...healthRecord0, userId: testUserId };
//                 healthRecord1a = { ...healthRecord1, userId: testUserId };
//                 healthRecord2a = { ...healthRecord2, userId: testUserId };
//                 healthRecord3a = { ...healthRecord3, userId: testUserId };
//                 healthRecord4a = { ...healthRecord4, userId: testUserId };
//                 records = await healthRecordModel.insertMany([
//                     healthRecord0a,
//                     healthRecord1a,
//                     healthRecord2a,
//                     healthRecord3a,
//                     healthRecord4a,
//                 ]);
//             });
//             it('should send 200 and delete a record', async () => {
//                 const res = await request(server)
//                     .delete("/healthRecord/" + records[0]._id)
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(200);
//                 //console.log('userId: decryptedToken0._id BEFORE GETTING COUNT', testUserId)
//                 const count = await healthRecordModel.countDocuments({ userId: testUserId });
//                 expect(count).toEqual(4);
//             });
//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .delete("/healthRecord/" + records[0]._id)
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(500);
//                 //expect(res.body).toMatchObject(healthRecord)                
//             });
//             it('should send 200 and delete all records for the same user', async () => {
//                 const res = await request(server)
//                     .delete("/healthRecord")
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(200);
//                 //console.log('userId: decryptedToken0._id BEFORE GETTING COUNT', testUserId)
//                 const count = await healthRecordModel.countDocuments({ userId: testUserId });
//                 expect(count).toEqual(0);
//             });
//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .delete("/healthRecord")
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(500);
//                 //expect(res.body).toMatchObject(healthRecord)                
//             });
//         });
//     });
// });