import { test, request, expect } from '@playwright/test';
import { loadTestData } from '../../api-request/json-data-loader';


test('POST test sample /api/tutorials', async ({ request }) => {

  const testData = loadTestData('./data/tutorials.json', {
    VALUE: 'testValue',
    VALUE2_1: 'testValue2_1',
    VALUE2_2: 'testValue2_2',
    VALUE3_1: 'testValue3_1',
    VALUE3_2: 'testValue3_2',
    VALUE3_3: 'testValue3_3',
  });

  // console.log(testData);

  // const res = await request.get('https://tempmail.plus/api/mails?email=tempmailtester02%40mailto.plus&limit=20&epin=');
  const res = await request.post('http://localhost:8082/api/tutorials',
    { data: testData }
  );

  expect(res.ok()).toBeTruthy();
  expect(res.status()).toBe(201);

  const data = await res.json();
  // console.log(JSON.stringify(data));

  const payLoad = {
    message: 'create OK',
    reqBody: {
      key: 'testValue',
      key2: {
        key2_1: 'testValue2_1',
        key2_2: 'testValue2_2'
      },
      key3: [
        {
          key3_1: 'testValue3_1'
        },
        {
          key3_2: 'testValue3_2'
        },
        {
          key3_3: 'testValue3_3'
        }
      ]
    }
  }

  expect(data.message).toBe(payLoad.message);
  expect(data.reqBody.key).toStrictEqual(payLoad.reqBody.key);
  expect(data.reqBody).toStrictEqual(payLoad.reqBody);

  // expect(Array.isArray(data)).toBe(true);
  // expect(data[0]).toHaveProperty('id');
});
