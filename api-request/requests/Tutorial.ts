// userApi.ts
import { APIRequestHandler } from '../api-request-handler';
import { APIRequestContext, APIResponse } from '@playwright/test';

interface APIEndpointRequest {
    sendRequest(): Promise<APIResponse>;
}
export class TutorialApi extends APIRequestHandler implements APIEndpointRequest  {
    
    async sendRequest(): Promise<APIResponse> {
           const response: APIResponse = await this.apiRequest.post('http://localhost:8082/api/tutorials',
            { data: this.requestBody }
          );
          return response;
    }

    constructor(
        apiRequest: APIRequestContext,
        baseUrl: string,
        apiEndpoint : string,
        requestBody : string
    ) {
        super(apiRequest, baseUrl, '/api/tutorials',requestBody);
    }

}
