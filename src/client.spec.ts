import * as https from 'https';

import test from 'ava';
import axios from 'axios';
import dotenv from 'dotenv';

import { Client } from './client';

let apiKey: string;
if (process.argv.length > 2) {
  apiKey = process.argv[2];
} else {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
    apiKey = process.env.YELP_API_KEY;
  }
}

test('businessDetailsAsync', async (t) => {
  const agent = new https.Agent({ keepAlive: true });
  const axiosInstance = axios.create({
    headers: { Authorization: `Bearer ${apiKey}` },
    httpsAgent: agent,
  });

  const client = new Client({
    apiKey: apiKey,
    axiosInstance: axiosInstance,
  });

  const businessDetails = await client.businessDetailsAsync(
    'mm0qwYzOilFNVV2us5_8Rg'
  );

  t.is(businessDetails.alias, 'echo-coffee-scottsdale');
});

test('businessesDetailsAsync', async (t) => {
  const agent = new https.Agent({ keepAlive: true });
  const axiosInstance = axios.create({
    headers: { Authorization: `Bearer ${apiKey}` },
    httpsAgent: agent,
  });

  const client = new Client({
    apiKey: apiKey,
    axiosInstance: axiosInstance,
  });

  const businessIDs = ['mm0qwYzOilFNVV2us5_8Rg', 'Noi53T0PWNEN9mQRS3-Ncg'];
  const businessDetails = await client.businessesDetailsAsync(businessIDs);

  t.is(businessDetails.length, businessIDs.length);
});

test('businessesSearchInstance', async (t) => {
  const agent = new https.Agent({ keepAlive: true });
  const axiosInstance = axios.create({
    headers: { Authorization: `Bearer ${apiKey}` },
    httpsAgent: agent,
  });

  const client = new Client({
    apiKey: apiKey,
    axiosInstance: axiosInstance,
  });

  const searchResults = await client.businessesSearchAsync({
    limit: 6,
    latitude: 33.476429,
    longitude: -111.934067,
  });

  t.is(searchResults.businesses.length, 6);
});

test('businessesSearchNoInstance', async (t) => {
  const client = new Client({
    apiKey: apiKey,
  });

  const searchResults = await client.businessesSearchAsync({
    limit: 6,
    latitude: 33.476429,
    longitude: -111.934067,
  });

  t.is(searchResults.businesses.length, 6);
});
