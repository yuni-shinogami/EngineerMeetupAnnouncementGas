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
import { sendMessageToDiscordChannel } from '../discord/postMessageToDiscord';
import { applicationEnv } from '../../setting';
import {
  getScriptProperty,
  setValueToCell,
  toggleChangeCheckBox,
} from '../gas/spreadsheet/helper/helper';
import { eventsSheetId } from '../../constants';

const CONSUMER_API_KEY = getScriptProperty('TwitterConsumerApiKey');
const CONSUMER_API_SECRET = getScriptProperty('TwitterConsumerApiKeySecret');
const ACCESS_TOKEN = getScriptProperty('TwitterAccessToken');
const ACCESS_TOKEN_SECRET = getScriptProperty('TwitterAccessTokenSecret');
if (!CONSUMER_API_KEY)
  throw new Error('TwitterConsumerApiKeyが指定されていません');
if (!CONSUMER_API_SECRET)
  throw new Error('TwitterConsumerApiKeySecretが指定されていません');
if (!ACCESS_TOKEN) throw new Error('TwitterAccessTokenが指定されていません');
if (!ACCESS_TOKEN_SECRET)
  throw new Error('TwitterAccessTokenSecretが指定されていません');

// OAuth1認証
const getTwitterService = function () {
  return OAuth1.createService('Twitter')
    .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
    .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
    .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
    .setConsumerKey(CONSUMER_API_KEY)
    .setConsumerSecret(CONSUMER_API_SECRET)
    .setAccessToken(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    .setCallbackFunction('authCallbackTwitterService'); // コールバック関数名
};

/* eslint-disable */
// OAuthコールバック
// function authCallbackTwitterService(request: any) {
//   const service = getTwitterService();
//   const authorized = service.handleCallback(request);
//   if (authorized) {
//     return HtmlService.createHtmlOutput('Success!');
//   } else {
//     return HtmlService.createHtmlOutput('Denied.');
//   }
// }
/* eslint-enable */

function postTweetWithImage(text: string, imageUrl: string) {
  const env = applicationEnv();
  const twitter = getTwitterService();
  if (twitter.hasAccess()) {
    const endpoint1 = 'https://upload.twitter.com/1.1/media/upload.json';
    const endpoint2 = 'https://api.twitter.com/2/tweets';

    if (imageUrl) {
      const imgBlob = UrlFetchApp.fetch(imageUrl).getBlob();
      const img_64 = Utilities.base64Encode(imgBlob.getBytes()); //Blobを経由してBase64に変換

      const img_option = { method: 'POST', payload: { media_data: img_64 } };
      const image_repsponse = twitter.fetch(endpoint1, img_option);
      const image_result = JSON.parse(image_repsponse.getContentText());

      const mediainfo = {
        media_ids: [image_result['media_id_string']],
      };
      const payload = {
        text: text,
        media: mediainfo,
      };

      if (env === 'PRD') {
        const response = twitter.fetch(endpoint2, {
          method: 'post',
          muteHttpExceptions: true,
          payload: JSON.stringify(payload),
          contentType: 'application/json',
        });
        const result = JSON.parse(response.getContentText());
        return result;
      } else if (env === 'TEST') {
        console.log('postTweetWithImage');
        return {
          data: {
            id: 'testId',
          },
        };
      } else {
        sendMessageToDiscordChannel(
          'postTweetWithImageでenvが正しく設定されていません',
          'Admin'
        );
      }
    } else {
      postTweetWithImage(
        'postTweetWithImageでTweetのポストが失敗しました',
        'Admin'
      );
    }
  }
}

export function postTweet(text: string = 'test') {
  const env = applicationEnv();
  const twitter = getTwitterService();
  if (twitter.hasAccess()) {
    const endpoint2 = 'https://api.twitter.com/2/tweets';
    const payload = {
      text: text,
    };

    if (env === 'PRD') {
      const response = twitter.fetch(endpoint2, {
        method: 'post',
        muteHttpExceptions: true,
        payload: JSON.stringify(payload),
        contentType: 'application/json',
      });
      const result = JSON.parse(response.getContentText());
      return result;
    } else if (env === 'TEST') {
      console.log('postTweet');
      return {
        data: {
          id: 'testId',
        },
      };
    } else {
      sendMessageToDiscordChannel(
        'postTweetでenvが正しく設定されていません',
        'Admin'
      );
    }
  }
}

export function announceEventToTwitter(
  text: string,
  imageUrl: string,
  sheetName: string,
  isTweetPostedWeekRow: number,
  isTweetPostedWeekColumn: number,
  tweetUrlRow: number,
  tweetUrlColumn: number
) {
  const response = postTweetWithImage(text, imageUrl);
  const tweetId = response.data.id;
  const tweetUrl = 'https://x.com/VRENGAssoc/status/' + tweetId;

  toggleChangeCheckBox(
    sheetName,
    eventsSheetId,
    isTweetPostedWeekRow,
    isTweetPostedWeekColumn
  );
  setValueToCell(
    sheetName,
    eventsSheetId,
    tweetUrlRow,
    tweetUrlColumn,
    tweetUrl
  );
}
