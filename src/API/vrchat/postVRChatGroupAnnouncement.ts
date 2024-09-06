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
import { getScriptProperty } from '../gas/spreadsheet/helper/helper';
import { setTriggerIsVRChatAbleToLoginWithTwoFactorAuth } from '../../triggers/setTriggers';

/* eslint-disable */
function setPropertyVrchatAuthToken() {
  const vrchatUserName = getScriptProperty('VRChatMentionAccountUserName');
  const vrchatPassword = getScriptProperty('VRChatMentionAccountPassword');
  const vrchatApiKey = getScriptProperty('VRChatApiKey');
  const queryString = '?apiKey=' + vrchatApiKey;
  const url = 'https://vrchat.com/api/1/auth/user' + queryString;

  if (!vrchatUserName) throw new Error('vrchatUserNameが設定されていません');
  if (!vrchatPassword) throw new Error('vrchatPasswordが設定されていません');

  const urlEncodUserName = encodeURI(vrchatUserName);
  const urlEncodedPassword = encodeURI(vrchatPassword);
  const base64EncodeUserInfo = Utilities.base64Encode(
    `${urlEncodUserName}:${urlEncodedPassword}`
  );

  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: {
      Authorization: `Basic ${base64EncodeUserInfo}`,
    },
    contentType: 'application/json',
  });
  const headers: { [prop: string]: any } = response.getHeaders();
  const cookie = headers['Set-Cookie'];

  const properties = PropertiesService.getScriptProperties();
  properties.setProperty('VRChatAuthToken', cookie);
}

function setPropertyVrchatTwoFactorAuthToken() {
  // TODO: 二要素認証をスプレッドシート上から、Emailのコードを入力して実行する方式にする
  const vrchatAuthToken = getScriptProperty('VRChatAuthToken');
  const url = 'https://vrchat.com/api/1/auth/twofactorauth/emailotp/verify';
  if (!vrchatAuthToken) throw new Error('VRChatAuthTokenが設定されていません');

  const payload = {
    code: '',
  };

  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    headers: {
      Cookie: vrchatAuthToken,
    },
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  });
  const cookie: { [prop: string]: any } = response.getHeaders();

  const properties = PropertiesService.getScriptProperties();
  properties.setProperty('VRChatTwoFactorAuthToken', cookie['Set-Cookie']);
}
/* eslint-enable */

export function isVRChatAbleToLoginWithTwoFactorAuth() {
  const vrchatAuthToken = getScriptProperty('VRChatAuthToken');
  const vrchatTwoFactorAuthToken = getScriptProperty(
    'VRChatTwoFactorAuthToken'
  );
  const vrchatApiKey = getScriptProperty('VRChatApiKey');

  const queryString = '?apiKey=' + vrchatApiKey;
  const url = 'https://vrchat.com/api/1/auth/user' + queryString;
  if (!vrchatAuthToken) throw new Error('VRChatAuthTokenが設定されていません');

  const vrchatToken = vrchatAuthToken + vrchatTwoFactorAuthToken;

  let responseCode;
  try {
    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: {
        Cookie: vrchatToken,
      },
      contentType: 'application/json',
    });
    responseCode = response.getResponseCode();
  } catch (e) {
    console.log(e);
    responseCode = 401;
  }

  try {
    if (responseCode >= 400) {
      console.log(responseCode);
      throw new Error('ログインに失敗');
    }
    console.log(responseCode);
    const properties = PropertiesService.getScriptProperties();
    properties.setProperty('VRChatLoginRetryCount', '0');
    properties.setProperty('VRChatLoginStatus', 'true');
    return true;
  } catch {
    const properties = PropertiesService.getScriptProperties();
    const count = Number(getScriptProperty('VRChatLoginRetryCount')) + 1;
    properties.setProperty('VRChatLoginStatus', 'false');

    if (count === 3) {
      sendMessageToDiscordChannel('VRChatのログインに3回失敗しました', 'Admin');
      properties.setProperty('VRChatLoginRetryCount', '0');
    } else {
      properties.setProperty('VRChatLoginRetryCount', count.toString());

      const time = new Date();
      time.setMinutes(time.getMinutes() + 1);
      const hour = time.getHours();
      const minute = time.getMinutes();
      setTriggerIsVRChatAbleToLoginWithTwoFactorAuth(hour, minute);
    }

    return null;
  }
}

export function postVRChatGroupAnnouncement() {
  const env = applicationEnv();
  const vrchatAuthToken = getScriptProperty('VRChatAuthToken');
  const vrchatTwoFactorAuthToken = getScriptProperty(
    'VRChatTwoFactorAuthToken'
  );
  const vrchatApiKey = getScriptProperty('VRChatApiKey');

  const isVRChatLoggedin = isVRChatAbleToLoginWithTwoFactorAuth();

  if (!isVRChatLoggedin) {
    Logger.log('VRChatログインに失敗しました');
    return;
  }

  const queryString = '?apiKey=' + vrchatApiKey;
  if (!vrchatAuthToken) {
    Logger.log('VRChatAuthTokenが設定されていません');
    return;
  }

  const vrchatToken = vrchatAuthToken + vrchatTwoFactorAuthToken;

  switch (env) {
    case 'PRD': {
      const groupId = 'grp_5a802e77-a436-491a-9edb-39fca4ff7805';
      const url =
        'https://api.vrchat.cloud/api/1/groups/' +
        groupId +
        '/posts' +
        queryString;
      const payload = {
        title: '今日はエンジニア作業飲み集会やるよーー！',
        text: '良かったら遊びに来てねーーー！',
        sendNotification: true,
      };

      try {
        const response = UrlFetchApp.fetch(url, {
          method: 'post',
          contentType: 'application/json',
          headers: {
            Cookie: vrchatToken,
          },
          muteHttpExceptions: true,
          payload: JSON.stringify(payload),
        });
        const responseCode = response.getResponseCode();
        if (responseCode >= 400) {
          throw new Error('Group通知に失敗');
        }
      } catch {
        sendMessageToDiscordChannel('VRChat Group通知に失敗しました', 'Admin');
      }

      break;
    }

    case 'TEST': {
      const groupId = 'grp_1b0b88a7-b453-4135-996d-1e0ec660fbc2';
      const url =
        'https://api.vrchat.cloud/api/1/groups/' +
        groupId +
        '/posts' +
        queryString;

      const payload = {
        title: 'GASから送信テスト',
        text: 'GASから送信',
        sendNotification: true,
      };

      try {
        const response = UrlFetchApp.fetch(url, {
          method: 'post',
          contentType: 'application/json',
          headers: {
            Cookie: vrchatToken,
          },
          muteHttpExceptions: true,
          payload: JSON.stringify(payload),
        });
        const responseCode = response.getResponseCode();
        if (responseCode >= 400) {
          throw new Error('Group通知に失敗');
        }
      } catch {
        sendMessageToDiscordChannel('VRChat Group通知に失敗しました', 'Admin');
      }
      break;
    }

    default:
      throw new Error('envが正しく設定されていません');
  }
}
