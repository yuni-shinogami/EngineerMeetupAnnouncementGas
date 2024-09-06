/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
declare namespace OAuth1 {
  interface OAuth1Service {
    setAccessTokenUrl(url: string): this;
    setRequestTokenUrl(url: string): this;
    setAuthorizationUrl(url: string): this;
    setConsumerKey(key: string): this;
    setConsumerSecret(secret: string): this;
    setAccessToken(token: string, secret: string): this;
    setCallbackFunction(callbackName: string): this;
    // handleCallback(request: any): boolean;
    hasAccess();
    fetch(url: string, params: object): GoogleAppsScript.URL_Fetch.HTTPResponse;
    getLastError();
  }
  function createService(serviceName: string): OAuth1Service;
}
