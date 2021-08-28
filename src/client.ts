import * as https from 'https';

import {
  BusinessDetails,
  BusinessesDetailsSearchResponse,
  BusinessesSearchResponse,
  LatLngBusinessesSearchRequest,
  LocationBusinessesSearchRequest,
} from '@kobdev/types/types/yelp-fusion-plus';
import axios, { AxiosInstance } from 'axios';
import Bottleneck from 'bottleneck';

export type IClientOptions = {
  readonly apiKey: string;
  readonly axiosInstance?: AxiosInstance;
};

export class Client {
  private axiosInstance: AxiosInstance;
  private baseUrl = 'https://api.yelp.com';

  limiter = new Bottleneck({
    minTime: 200, // execute 6 requests per second
  });

  constructor(clientOptions: IClientOptions) {
    if (clientOptions.axiosInstance) {
      this.axiosInstance = clientOptions.axiosInstance;
      if (!this.axiosInstance.defaults.headers.Authorization) {
        this.axiosInstance.defaults.headers = {
          Authorization: `Bearer ${clientOptions.apiKey}`,
        };
      }
    } else {
      this.axiosInstance = this.createNewAxiosInstance(clientOptions.apiKey);
    }
  }

  // public functions

  /** returns detailed business */
  async businessDetailsAsync(id: string) {
    const url = `${this.baseUrl}/v3/businesses/${id}`;
    const axiosResponse = await this.limiter.schedule(() =>
      this.axiosInstance.get(url)
    );
    return axiosResponse.data as BusinessDetails;
  }

  /** return detailed business for ids */
  async businessesDetailsAsync(ids: string[]) {
    const promises = ids.map((id) => this.businessDetailsAsync(id));
    return await Promise.all(promises);
  }

  /** returns businesses based on the provided search criteria */
  async businessesSearchAsync(
    businessesSearchRequest:
      | LatLngBusinessesSearchRequest
      | LocationBusinessesSearchRequest
  ) {
    const qs = Object.keys(businessesSearchRequest)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            businessesSearchRequest[key]
          )}`
      )
      .join('&');
    const url = `${this.baseUrl}/v3/businesses/search?${qs}`;
    return (await this.axiosInstance.get(url)).data as BusinessesSearchResponse;
  }

  /** returns detailed businesses based on the provided search criteria  */
  async businessesSearchDetailsAsync(
    businessesSearchRequest:
      | LatLngBusinessesSearchRequest
      | LocationBusinessesSearchRequest
  ) {
    const response = await this.businessesSearchAsync(businessesSearchRequest);
    const businessIDs = response.businesses.map((b) => b.id);
    const detailedBusinesses = await this.businessesDetailsAsync(businessIDs);
    return {
      businesses: detailedBusinesses,
      region: response.region,
      total: response.total,
    } as BusinessesDetailsSearchResponse;
  }

  // private functions

  private createNewAxiosInstance(apiKey: string) {
    const httpsAgent = new https.Agent({ keepAlive: true });
    return axios.create({
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      httpsAgent: httpsAgent,
    });
  }
}
