import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export abstract class APIRequestHandler {
    protected readonly apiRequest: APIRequestContext;
    protected readonly baseUrl: string;
    protected readonly apiEndpoint: string;
    protected readonly requestBody?: string;

    constructor(apiRequest: APIRequestContext, baseUrl: string, apiEndpoint: string, requestBody?: string) {
        this.apiRequest = apiRequest;
        this.baseUrl = baseUrl;
        this.apiEndpoint = apiEndpoint;
        this.requestBody = requestBody
    }

    private async requestWithMethod(
        method: 'get' | 'post' | 'put' | 'delete',
        endpoint: string,
        body?: Record<string, any>
    ): Promise<APIResponse> {
        const url = `${this.baseUrl}${endpoint}`;
        const options = body ? { data: body } : undefined;

        const response = await (this.apiRequest as any)[method](url, options);
        expect(response.ok()).toBeTruthy();
        return response;
    }

    protected get(endpoint: string) {
        return this.requestWithMethod('get', endpoint);
    }

    protected post(endpoint: string, body: Record<string, any>) {
        return this.requestWithMethod('post', endpoint, body);
    }

    protected put(endpoint: string, body: Record<string, any>) {
        return this.requestWithMethod('put', endpoint, body);
    }

    protected delete(endpoint: string) {
        return this.requestWithMethod('delete', endpoint);
    }
}