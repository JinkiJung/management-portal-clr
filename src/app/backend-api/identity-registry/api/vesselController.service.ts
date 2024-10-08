/**
 * Maritime Connectivity Platform Identity Registry API
 * The MCP Identity Registry API can be used for managing entities in the Maritime Connectivity Platform.<br>Two versions of the API are available - one that requires authentication using OpenID Connect and one that requires authentication using a X.509 client certificate.<br>The OpenAPI descriptions for the two versions are available <a href=\"https://test-api.maritimeconnectivity.net/v3/api-docs/mcp-idreg-oidc\">here</a> and <a href=\"https://test-api-x509.maritimeconnectivity.net/v3/api-docs/mcp-idreg-x509\">here</a>.<br>Additionally, a SECOM based API is also available for which the OpenAPI description can be found <a href=\"https://test-api.maritimeconnectivity.net/v3/api-docs/mcp-idreg-secom\">here</a>.
 *
 * OpenAPI spec version: 1.3.0
 * Contact: info@maritimeconnectivity.net
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Certificate } from '../model/certificate';
import { CertificateRevocation } from '../model/certificateRevocation';
import { PageVessel } from '../model/pageVessel';
import { Service } from '../model/service';
import { Vessel } from '../model/vessel';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class VesselControllerService {

    protected basePath = 'https://test-api.maritimeconnectivity.net';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * Create a new vessel identity
     * @param body 
     * @param orgMrn 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createVessel(body: Vessel, orgMrn: string, observe?: 'body', reportProgress?: boolean): Observable<Vessel>;
    public createVessel(body: Vessel, orgMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Vessel>>;
    public createVessel(body: Vessel, orgMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Vessel>>;
    public createVessel(body: Vessel, orgMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createVessel.');
        }

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling createVessel.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Vessel>('post',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessel`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Delete a specific vessel identity
     * @param orgMrn 
     * @param vesselMrn 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteVessel(orgMrn: string, vesselMrn: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteVessel(orgMrn: string, vesselMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteVessel(orgMrn: string, vesselMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteVessel(orgMrn: string, vesselMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling deleteVessel.');
        }

        if (vesselMrn === null || vesselMrn === undefined) {
            throw new Error('Required parameter vesselMrn was null or undefined when calling deleteVessel.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessel/${encodeURIComponent(String(vesselMrn))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Get a page of vessel identities of the specified organization
     * @param orgMrn 
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOrganizationVessels(orgMrn: string, page?: number, size?: number, sort?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<PageVessel>;
    public getOrganizationVessels(orgMrn: string, page?: number, size?: number, sort?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageVessel>>;
    public getOrganizationVessels(orgMrn: string, page?: number, size?: number, sort?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageVessel>>;
    public getOrganizationVessels(orgMrn: string, page?: number, size?: number, sort?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling getOrganizationVessels.');
        }




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PageVessel>('get',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessels`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Get a specific vessel identity
     * @param orgMrn 
     * @param vesselMrn 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVessel(orgMrn: string, vesselMrn: string, observe?: 'body', reportProgress?: boolean): Observable<Vessel>;
    public getVessel(orgMrn: string, vesselMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Vessel>>;
    public getVessel(orgMrn: string, vesselMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Vessel>>;
    public getVessel(orgMrn: string, vesselMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling getVessel.');
        }

        if (vesselMrn === null || vesselMrn === undefined) {
            throw new Error('Required parameter vesselMrn was null or undefined when calling getVessel.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Vessel>('get',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessel/${encodeURIComponent(String(vesselMrn))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Get the vessel identity certificate with the given serial number
     * @param orgMrn 
     * @param vesselMrn 
     * @param serialNumber 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVesselCert(orgMrn: string, vesselMrn: string, serialNumber: number, observe?: 'body', reportProgress?: boolean): Observable<Certificate>;
    public getVesselCert(orgMrn: string, vesselMrn: string, serialNumber: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Certificate>>;
    public getVesselCert(orgMrn: string, vesselMrn: string, serialNumber: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Certificate>>;
    public getVesselCert(orgMrn: string, vesselMrn: string, serialNumber: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling getVesselCert.');
        }

        if (vesselMrn === null || vesselMrn === undefined) {
            throw new Error('Required parameter vesselMrn was null or undefined when calling getVesselCert.');
        }

        if (serialNumber === null || serialNumber === undefined) {
            throw new Error('Required parameter serialNumber was null or undefined when calling getVesselCert.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Certificate>('get',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessel/${encodeURIComponent(String(vesselMrn))}/certificate/${encodeURIComponent(String(serialNumber))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Get the set of service identities that are linked to the specified vessel identity
     * @param orgMrn 
     * @param vesselMrn 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVesselServices(orgMrn: string, vesselMrn: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Service>>;
    public getVesselServices(orgMrn: string, vesselMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Service>>>;
    public getVesselServices(orgMrn: string, vesselMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Service>>>;
    public getVesselServices(orgMrn: string, vesselMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling getVesselServices.');
        }

        if (vesselMrn === null || vesselMrn === undefined) {
            throw new Error('Required parameter vesselMrn was null or undefined when calling getVesselServices.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<Service>>('get',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessel/${encodeURIComponent(String(vesselMrn))}/services`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Create a new vessel identity certificate using CSR
     * @param body A PEM encoded PKCS#10 CSR
     * @param orgMrn 
     * @param vesselMrn 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newVesselCertFromCsr(body: string, orgMrn: string, vesselMrn: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public newVesselCertFromCsr(body: string, orgMrn: string, vesselMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public newVesselCertFromCsr(body: string, orgMrn: string, vesselMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public newVesselCertFromCsr(body: string, orgMrn: string, vesselMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling newVesselCertFromCsr.');
        }

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling newVesselCertFromCsr.');
        }

        if (vesselMrn === null || vesselMrn === undefined) {
            throw new Error('Required parameter vesselMrn was null or undefined when calling newVesselCertFromCsr.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/pem-certificate-chain'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/x-pem-file',
            'text/plain'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<string>('post',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessel/${encodeURIComponent(String(vesselMrn))}/certificate/issue-new/csr`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Revoke the vessel identity certificate with the given serial number
     * @param body 
     * @param orgMrn 
     * @param vesselMrn 
     * @param certId The serial number of the certificate given in decimal
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public revokeVesselCert(body: CertificateRevocation, orgMrn: string, vesselMrn: string, certId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public revokeVesselCert(body: CertificateRevocation, orgMrn: string, vesselMrn: string, certId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public revokeVesselCert(body: CertificateRevocation, orgMrn: string, vesselMrn: string, certId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public revokeVesselCert(body: CertificateRevocation, orgMrn: string, vesselMrn: string, certId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling revokeVesselCert.');
        }

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling revokeVesselCert.');
        }

        if (vesselMrn === null || vesselMrn === undefined) {
            throw new Error('Required parameter vesselMrn was null or undefined when calling revokeVesselCert.');
        }

        if (certId === null || certId === undefined) {
            throw new Error('Required parameter certId was null or undefined when calling revokeVesselCert.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessel/${encodeURIComponent(String(vesselMrn))}/certificate/${encodeURIComponent(String(certId))}/revoke`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Update a specific vessel identity
     * @param body 
     * @param orgMrn 
     * @param vesselMrn 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateVessel(body: Vessel, orgMrn: string, vesselMrn: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateVessel(body: Vessel, orgMrn: string, vesselMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateVessel(body: Vessel, orgMrn: string, vesselMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateVessel(body: Vessel, orgMrn: string, vesselMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateVessel.');
        }

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling updateVessel.');
        }

        if (vesselMrn === null || vesselMrn === undefined) {
            throw new Error('Required parameter vesselMrn was null or undefined when calling updateVessel.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/vessel/${encodeURIComponent(String(vesselMrn))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
