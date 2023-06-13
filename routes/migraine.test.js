// const request = require("supertest");
// const server = require("../server");
// const testUtils = require('../test-utils');
// const mongoose = require('mongoose');


// const User = require('../models/user');
// const migraineModel = require('../models/migraine');
// const jwt = require('jsonwebtoken');
// const secret = 'my super secret';

// describe("/migraine", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     const migraine0 = {
//         durationHours: 3,
//         tookMedicine: true,
//         medicineTaken: 'triptan ,ibuprofen, acetaminophen',
//         startDate: '2023-05-01T00:00:00.000Z'
//     }

//     const migraine1 = {
//         durationHours: 3,
//         tookMedicine: true,
//         medicineTaken: 'triptan ,ibuprofen, acetaminophen',
//         startDate: '2023-05-05T00:00:00.000Z'
//     }

//     const migraine2 = {
//         durationHours: 16,
//         tookMedicine: false,
//         startDate: '2023-05-10T00:00:00.000Z'
//     }

//     const migraine3 = {
//         durationHours: 3,
//         tookMedicine: true,
//         medicineTaken: 'triptan ,ibuprofen, acetaminophen',
//         startDate: '2023-05-15T00:00:00.000Z'
//     }

//     describe('Before login', () => {
//         describe('POST /', () => {
//             it('should send 401 without a token', async () => {
//                 const res = await request(server).post("/migraine/create").send(migraine0);
//                 expect(res.statusCode).toEqual(401);
//             });
//             it('should send 401 with a bad token', async () => {
//                 const res = await request(server)
//                     .post("/migraine/create")
//                     .set('Authorization', 'Bearer BAD')
//                     .send(migraine0);
//                 expect(res.statusCode).toEqual(401);
//             });
//         });
//         describe('GET /', () => {
//             it('should send 401 without a token', async () => {
//                 const res = await request(server).get("/migraine").send(migraine0);
//                 expect(res.statusCode).toEqual(401);
//             });
//             it('should send 401 with a bad token', async () => {
//                 const res = await request(server)
//                     .get("/migraine")
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
//         describe.each([migraine0, migraine1])("POST / migraine %#", (migraine) => {
//             it('should send 200 and store migraine', async () => {
//                 const res = await request(server)
//                     .post("/migraine/create")
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send(migraine);
//                 expect(res.statusCode).toEqual(200);
//                 //console.log('res.body is: ', res.body); 
//                 //console.log('migraine is: ' , migraine)
                
//                 expect(res.body).toMatchObject(migraine)
//                 const savedMigraine = await migraineModel.findOne({ _id: res.body._id }).lean();

//                 let svdHRStringDate = {
//                     ...savedMigraine,
//                     startDate: savedMigraine.startDate.toISOString()
//                 }
//                 // console.log('savedMigraine is: ', savedMigraine); 
//                 // console.log('migraine is: ' , migraine)
//                 expect(svdHRStringDate).toMatchObject(migraine);
//             });
//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .post("/migraine/create")
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send(migraine);
//                 expect(res.statusCode).toEqual(500);      
//             });
//         });
//         describe.each([migraine0, migraine1])("PUT / migraine %#", (migraine) => {
//             let originalMigraine;
//             beforeEach(async () => {
//                 const res = await request(server)
//                     .post("/migraine/create")
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send(migraine);

//                 //console.log('res is: ', res);            
//                 originalMigraine = res.body;
//             });

//             it('should send 200 and update item', async () => {
//                 const res = await request(server)
//                     .put("/migraine/" + originalMigraine._id)
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send({ ...migraine, durationHours: migraine.durationHours + 1 });
//                 expect(res.statusCode).toEqual(200);
//                 const newHealthRecord = await migraineModel.findById(originalMigraine._id).lean();
//                 newHealthRecord._id = newHealthRecord._id.toString();
//                 newHealthRecord.startDate = newHealthRecord.startDate.toISOString();
//                 newHealthRecord.userId = newHealthRecord.userId.toString();
//                 expect(newHealthRecord).toMatchObject({ ...originalMigraine, durationHours: originalMigraine.durationHours + 1 });
//             });

//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .put("/migraine/" + originalMigraine._id)
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send(migraine);
//                 expect(res.statusCode).toEqual(500);
//             });
//         });
//         describe("GET /", () => {
//             let migraines;
//             beforeEach(async () => {
//                 let migraine2a = { ...migraine2, userId: decryptedToken0._id };
//                 let migraine3a = { ...migraine3, userId: decryptedToken0._id };
//                 migraines = (await migraineModel.insertMany([migraine2a, migraine3a])).map(i => i.toJSON())
//                 migraines.forEach(i => { i._id = i._id.toString(), i.userId = i.userId.toString() });
//                // console.log('migraines is the following after the initial get at line 172: ', migraines)
//             });

//             it('should send 200 to normal user and return all migraines', async () => {
//                 const res = await request(server)
//                     .get("/migraine")
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();

//                 const modifiedData = res.body.map(obj => {
//                     return {
//                         ...obj,
//                         startDate: new Date(obj.startDate)
//                     };
//                 });
//                 expect(res.statusCode).toEqual(200);
//                 //console.log('at line 193 migraines is: ', migraines);
//                 expect(modifiedData).toMatchObject(migraines);
//             });

//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .get("/migraine")
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(500);
//             });

//             it('text search should return 200 and result', async () => {
//                 const res = await request(server)
//                     .get('/migraine/search')
//                     .query({ 'searchTerm': 'triptan' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();

//                 const responseFixedDate = res.body.map(obj => {
//                     return {
//                         ...obj,
//                         startDate: new Date(obj.startDate)
//                     };
//                 });
//                 expect(res.statusCode).toEqual(200);
//                 expect(responseFixedDate.length).toEqual(1);
//                 expect(responseFixedDate[0].medicineTaken).toEqual('triptan ,ibuprofen, acetaminophen');
//             });

//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)                    
//                     .get('/migraine/search')
//                     .query({ 'searchTerm': 'triptan' ,'errorMode': 'y'})                    
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(500);
//             });
//         });

//         describe("Delete / ", () => {
//             let migraine0a, migraine1a, migraine2a, migraine3a;
//             let records;
//             let testUserId;
    
//             beforeAll(async () => {
//                 const user2 = {
//                     email: 'user2@mail.com',
//                     password: 'abcpassword'
//                 };
//                 await request(server).post("/login/signup").send(user2);
//                 const res2 = await request(server).post("/login").send(user2);
//                 let token2 = res2.body.token;
    
//                 let testUser = jwt.verify(token2, secret);
//                 testUserId = testUser._id;
    
//                 migraine0a = { ...migraine0, userId: testUserId };
//                 migraine1a = { ...migraine1, userId: testUserId };
//                 migraine2a = { ...migraine2, userId: testUserId };
//                 migraine3a = { ...migraine3, userId: testUserId };            
//                 records = await migraineModel.insertMany([
//                     migraine0a,
//                     migraine1a,
//                     migraine2a,
//                     migraine3a,                
//                 ]);
//             });
//             it('should send 200 and delete a record', async () => {
//                 const res = await request(server)
//                     .delete("/migraine/" + records[0]._id)
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(200);
//                 const count = await migraineModel.countDocuments({ userId: testUserId });
//                 expect(count).toEqual(3);
//             });
//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .delete("/migraine/" + records[0]._id)
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(500);
//                 //expect(res.body).toMatchObject(migraine)                
//             });
//             it('should send 200 and delete all records for the same user', async () => {
//                 const res = await request(server)
//                     .delete("/migraine")
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(200);
//                 //console.log('userId: decryptedToken0._id BEFORE GETTING COUNT', testUserId)
//                 const count = await migraineModel.countDocuments({ userId: testUserId });
//                 expect(count).toEqual(0);
//             });
//             it('should return 500 for internal error', async () => {
//                 const res = await request(server)
//                     .delete("/migraine")
//                     .query({ 'errorMode': 'y' })
//                     .set('Authorization', 'Bearer ' + token0)
//                     .send();
//                 expect(res.statusCode).toEqual(500);
//             });
//         });    
//     });    
// });