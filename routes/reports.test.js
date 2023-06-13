const request = require("supertest");
const server = require("../server");
const testUtils = require('../test-utils');
const mongoose = require('mongoose');
const { ObjectId, } = require('mongodb');

const userModel = require('../models/user');
const healthRecordModel = require('../models/healthRecord');
const migraineModel = require('../models/migraine');
const jwt = require('jsonwebtoken');
const secret = 'my super secret';

describe("/report", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);
    afterEach(testUtils.clearDB);

    const healthRecord0 = { sleepHours: 12, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-01T00:00:00.000Z" }
    const healthRecord1 = { sleepHours: 14, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-02T00:00:00.000Z" }
    const healthRecord2 = { sleepHours: 8, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-03T00:00:00.000Z" }
    const healthRecord3 = { sleepHours: 9, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-04T00:00:00.000Z" }
    const healthRecord4 = { sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-05T00:00:00.000Z" }
    const healthRecord5 = { sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-06T00:00:00.000Z" }
    const healthRecord6 = { sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-07T00:00:00.000Z" }
    const healthRecord7 = { sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-08T00:00:00.000Z" }
    const healthRecord8 = { sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-09T00:00:00.000Z" }
    const healthRecord9 = { sleepHours: 7, weight: 210, highBP: 120, lowBP: 85, dateTime: "2023-05-10T00:00:00.000Z" }

    const migraine0 = { durationHours: 3, tookMedicine: true, medicineTaken: 'triptan ,ibuprofen, acetaminophen', startDate: '2023-05-01T00:00:00.000Z' }
    const migraine1 = { durationHours: 3, tookMedicine: true, medicineTaken: 'triptan ,ibuprofen, acetaminophen', startDate: '2023-05-05T00:00:00.000Z' }
    const migraine2 = { durationHours: 16, tookMedicine: false, startDate: '2023-05-10T00:00:00.000Z' }
    const migraine3 = { durationHours: 3, tookMedicine: true, medicineTaken: 'triptan ,ibuprofen, acetaminophen', startDate: '2023-05-15T00:00:00.000Z' }

    describe('Before login', () => {
        describe('GET /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).get("/report/getAllRecordsForOneUser").send();
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 without a token', async () => {
                const res = await request(server).get("/report/getAllRecordsForOneUser").send();
                expect(res.statusCode).toEqual(401);
            });
        });
    });

    describe('after login', () => {
        const user0 = {
            email: 'user0@mail.com',
            password: '123password'
          };
          const user1 = {
            email: 'user1@mail.com',
            password: '456password'
          }

        let token0;       
        let premiumUserToken0;
        let decryptedToken0;
        let decryptedPremiumUserToken0;
        beforeEach(async () => {            
            await request(server).post("/login/signup").send(user0);
            const res0 = await request(server).post("/login").send(user0);
            token0 = res0.body.token;
            decryptedToken0 = jwt.verify(token0, secret);

            await request(server).post("/login/signup").send(user1);
            await userModel.updateOne({ email: user1.email }, { $push: { roles: 'premiumUser'} });
            const res1 = await request(server).post("/login").send(user1);
            premiumUserToken0 = res1.body.token;
            decryptedPremiumUserToken0 = jwt.verify(premiumUserToken0, secret);
        });

        describe("GET /", () => {
            let healthRecords;
            beforeEach(async () => {
                let healthRecord0a = { ...healthRecord0, userId: decryptedToken0._id };
                let healthRecord1a = { ...healthRecord1, userId: decryptedToken0._id };
                let healthRecord2a = { ...healthRecord2, userId: decryptedToken0._id };
                let healthRecord3a = { ...healthRecord3, userId: decryptedToken0._id };
                let healthRecord4a = { ...healthRecord4, userId: decryptedToken0._id };
                let healthRecord5a = { ...healthRecord5, userId: decryptedToken0._id };
                let healthRecord6a = { ...healthRecord6, userId: decryptedToken0._id };
                let healthRecord7a = { ...healthRecord7, userId: decryptedToken0._id };
                let healthRecord8a = { ...healthRecord8, userId: decryptedToken0._id };
                let healthRecord9a = { ...healthRecord9, userId: decryptedToken0._id };

                healthRecords = (await healthRecordModel.insertMany([healthRecord0a, healthRecord1a, healthRecord2a, healthRecord3a, healthRecord4a,
                    healthRecord5a, healthRecord6a, healthRecord7a, healthRecord8a, healthRecord9a])).map(i => i.toJSON())
                healthRecords.forEach(i => { i._id = i._id.toString(), i.userId = i.userId.toString() });

                let migraine0a = { ...migraine0, userId: decryptedToken0._id };
                let migraine1a = { ...migraine1, userId: decryptedToken0._id };
                let migraine2a = { ...migraine2, userId: decryptedToken0._id };
                let migraine3a = { ...migraine3, userId: decryptedToken0._id };

                migraines = (await migraineModel.insertMany([migraine0a, migraine1a, migraine2a, migraine3a])).map(i => i.toJSON())
                migraines.forEach(i => { i._id = i._id.toString(), i.userId = i.userId.toString() });
            });


            //let expectedResult = '[{"healthRecords": [{"__v": 0, "_id": "6488c6f182574793a1b2df95", "dateTime": "2023-05-01T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 12, "userId": "6488c6f182574793a1b2df8d", "weight": 210}, {"__v": 0, "_id": "6488c6f182574793a1b2df96", "dateTime": "2023-05-02T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 14, "userId": "6488c6f182574793a1b2df8d", "weight": 210}, {"__v": 0, "_id": "6488c6f182574793a1b2df97", "dateTime": "2023-05-03T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 8, "userId": "6488c6f182574793a1b2df8d", "weight": 210}, {"__v": 0, "_id": "6488c6f182574793a1b2df98", "dateTime": "2023-05-04T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 9, "userId": "6488c6f182574793a1b2df8d", "weight": 210}], "migraine": {"__v": 0, "_id": "6488c6f182574793a1b2dfa0", "durationHours": 3, "medicineTaken": "triptan ,ibuprofen, acetaminophen", "startDate": "2023-05-01T00:00:00.000Z", "tookMedicine": true, "userId": "6488c6f182574793a1b2df8d"}}, {"healthRecords": [{"__v": 0, "_id": "6488c6f182574793a1b2df99", "dateTime": "2023-05-05T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 7, "userId": "6488c6f182574793a1b2df8d", "weight": 210}, {"__v": 0, "_id": "6488c6f182574793a1b2df9a", "dateTime": "2023-05-06T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 7, "userId": "6488c6f182574793a1b2df8d", "weight": 210}, {"__v": 0, "_id": "6488c6f182574793a1b2df9b", "dateTime": "2023-05-07T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 7, "userId": "6488c6f182574793a1b2df8d", "weight": 210}, {"__v": 0, "_id": "6488c6f182574793a1b2df9c", "dateTime": "2023-05-08T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 7, "userId": "6488c6f182574793a1b2df8d", "weight": 210}, {"__v": 0, "_id": "6488c6f182574793a1b2df9d", "dateTime": "2023-05-09T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 7, "userId": "6488c6f182574793a1b2df8d", "weight": 210}], "migraine": {"__v": 0, "_id": "6488c6f182574793a1b2dfa1", "durationHours": 3, "medicineTaken": "triptan ,ibuprofen, acetaminophen", "startDate": "2023-05-05T00:00:00.000Z", "tookMedicine": true, "userId": "6488c6f182574793a1b2df8d"}}, {"healthRecords": [{"__v": 0, "_id": "6488c6f182574793a1b2df9e", "dateTime": "2023-05-10T00:00:00.000Z", "highBP": 120, "lowBP": 85, "sleepHours": 7, "userId": "6488c6f182574793a1b2df8d", "weight": 210}], "migraine": {"__v": 0, "_id": "6488c6f182574793a1b2dfa2", "durationHours": 16, "startDate": "2023-05-10T00:00:00.000Z", "tookMedicine": false, "userId": "6488c6f182574793a1b2df8d"}}, {"healthRecords": [], "migraine": {"__v": 0, "_id": "6488c6f182574793a1b2dfa3", "durationHours": 3, "medicineTaken": "triptan ,ibuprofen, acetaminophen", "startDate": "2023-05-15T00:00:00.000Z", "tookMedicine": true, "userId": "6488c6f182574793a1b2df8d"}}]'

            it('should send 200 to normal user and return all items', async () => {
                const res = await request(server)
                    .get("/report/getAllRecordsForOneUser")
                    .set('Authorization', 'Bearer ' + token0)
                    .send();

                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toEqual(14);
                expect(res.body[0].sleepHours).toEqual(12);
                expect(res.body[1].durationHours).toEqual(3);
                expect(res.body[2].sleepHours).toEqual(14);
                expect(res.body[3].sleepHours).toEqual(8);
                expect(res.body[3].date).toEqual('2023-05-03T00:00:00.000Z');
                //console.log('modifiedData is : ', res.body);
            });

            it('should return 500 for internal error', async () => {
                const res = await request(server)
                    .get("/report/getAllRecordsForOneUser")
                    .query({ 'errorMode': 'y' })
                    .set('Authorization', 'Bearer ' + token0)
                    .send();
                expect(res.statusCode).toEqual(500);
            });

            it('should send 200 to normal user and return all items', async () => {
                const res = await request(server)
                    .get("/report/getSleepHoursBetweenMigraines")
                    .set('Authorization', 'Bearer ' + token0)
                    .send();

                expect(res.statusCode).toEqual(200);
                console.log('modifiedData is : ', res.body);
                //expect(res.body).toEqual(expectedResult);                
            });

            it('should return 500 for internal error', async () => {
                const res = await request(server)
                    .get("/report/getSleepHoursBetweenMigraines")
                    .query({ 'errorMode': 'y' })
                    .set('Authorization', 'Bearer ' + token0)
                    .send();
                expect(res.statusCode).toEqual(500);
            });
        });
    });
});