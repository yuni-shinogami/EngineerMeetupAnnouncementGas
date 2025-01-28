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
import { applicationEnv } from '../../setting';
import {
  getScriptProperty,
  toggleChangeCheckBox,
} from '../../utils/spreadsheet/utils';
import { EventType } from '../gas/spreadsheet/events/type';
import { eventsSheetId } from '../../constants';

export function sendMessageToDiscordChannel(
  text: string,
  channel: 'Admin' | 'Notice'
) {
  const env = applicationEnv();
  let mentionedText;
  let fetchUrl = '';

  if (env === 'PRD' && channel === 'Admin') {
    mentionedText = '<@583543106926936074>\n' + text;
    const URL = getScriptProperty('DiscordAdminChannelURL');
    if (!URL) throw new Error('URLが指定されていません');
    fetchUrl = URL;
  }

  if (env === 'PRD' && channel === 'Notice') {
    mentionedText = '@everyone\n' + text;
    const URL = getScriptProperty('DiscordNoticeChannelURL');
    if (!URL) throw new Error('URLが指定されていません');
    fetchUrl = URL;
  }

  if (env === 'TEST') {
    mentionedText = '<@583543106926936074>\n' + text;
    const URL = getScriptProperty('DiscordTestChannelURL');
    if (!URL) throw new Error('URLが指定されていません');
    fetchUrl = URL;
  }

  if (env !== 'PRD' && env !== 'TEST') {
    mentionedText = mentionedText + '\nenvが正しく設定されていません';
    const URL = getScriptProperty('DiscordAdminChannelURL');
    if (!URL) throw new Error('URLが指定されていません');
    fetchUrl = URL;
  }

  if (channel !== 'Admin' && channel !== 'Notice') {
    mentionedText = mentionedText + '\nchannelが正しく設定されていません';
    const URL = getScriptProperty('DiscordAdminChannelURL');
    if (!URL) throw new Error('URLが指定されていません');
    fetchUrl = URL;
  }

  const payload = {
    username: 'エンジニア作業飲み集会告知お知らせBot',
    content: mentionedText,
  };

  UrlFetchApp.fetch(fetchUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  });
}

export function announceEventToDiscord(
  message: string,
  sheetName: string,
  isDiscordPostedRow: number,
  isDiscordPostedColumn: number
) {
  sendMessageToDiscordChannel(message, 'Notice');
  toggleChangeCheckBox(
    sheetName,
    eventsSheetId,
    isDiscordPostedRow,
    isDiscordPostedColumn
  );
}

export function checkAnnouncementStatus(eventInfo: EventType) {
  const sheetUrl = getScriptProperty('SheetURL');
  if (!sheetUrl) throw new Error('sheetUrlが指定されていません');

  let isNotice = false;
  let noticeText =
    '以下のイベント告知作業の実施をお願いいたします\n告知シートリンク：' +
    sheetUrl;

  if (
    eventInfo.platform === 'VRChat' &&
    !eventInfo.isVRCEventCalendarCreated.value
  ) {
    isNotice = true;
    noticeText =
      noticeText + '\n- VRCイベントカレンダーにイベントを登録してください';
  }

  if (
    eventInfo.platform === 'cluster' &&
    !eventInfo.isClusterEventCreated.value
  ) {
    isNotice = true;
    noticeText = noticeText + '\n- clusterイベントを作成してください';
  }

  if (!eventInfo.isConnpassEventCreated.value) {
    isNotice = true;
    noticeText = noticeText + '\n- connpassイベントを作成してください';
  }

  if (isNotice) {
    sendMessageToDiscordChannel(noticeText, 'Admin');
  }
}
