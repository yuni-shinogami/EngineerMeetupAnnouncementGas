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
import { getNumberOfDaysLeft } from '../../../../utils/utils';
import { ClusterEvent, VRChatEvent } from './type';

export const vrchatEventMapper = (
  sheetName: string,
  // スプレッドシートの入力内容を型で管理できないため、any型を使用
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventDateValues: any[][],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allValues: any[][]
): VRChatEvent[] => {
  const eventsList = [];
  const titles = allValues[0];

  for (let i = 0; i < allValues.length; i++) {
    if (i === 0) continue;
    const row = i + 1;

    eventsList.push({
      sheetName: sheetName,
      row: row,
      eventCount: allValues[i][titles.indexOf('eventCount')],
      eventDate: eventDateValues[i][0],
      numberOfDaysLeft: getNumberOfDaysLeft(eventDateValues[i][0]),
      platform: allValues[i][titles.indexOf('platform')],
      dateForVRCEventCalendar:
        allValues[i][titles.indexOf('dateForVRCEventCalendar')],
      tweetPostDate: allValues[i][titles.indexOf('tweetPostDate')],
      isConnpassEventCreated: {
        row: row,
        column: titles.indexOf('isConnpassEventCreated') + 1,
        value: allValues[i][titles.indexOf('isConnpassEventCreated')],
      },
      isVRCEventCalendarCreated: {
        row: row,
        column: titles.indexOf('isVRCEventCalendarCreated') + 1,
        value: allValues[i][titles.indexOf('isVRCEventCalendarCreated')],
      },
      isTweetPostedWeek: {
        row: row,
        column: titles.indexOf('isTweetPostedWeek') + 1,
        value: allValues[i][titles.indexOf('isTweetPostedWeek')],
      },
      isDiscordPostedWeek: {
        row: row,
        column: titles.indexOf('isDiscordPostedWeek') + 1,
        value: allValues[i][titles.indexOf('isDiscordPostedWeek')],
      },
      isDiscordPostedToday: {
        row: row,
        column: titles.indexOf('isDiscordPostedToday') + 1,
        value: allValues[i][titles.indexOf('isDiscordPostedToday')],
      },
      tweetUrl: {
        row: row,
        column: titles.indexOf('tweetUrl') + 1,
        value: allValues[i][titles.indexOf('tweetUrl')],
      },
      vrcEventCalendarUrl: allValues[i][titles.indexOf('vrcEventCalendarUrl')],
      connpassText: allValues[i][titles.indexOf('connpassText')],
      tweetTextWeek: allValues[i][titles.indexOf('tweetTextWeek')],
      tweetTextToday: allValues[i][titles.indexOf('tweetTextToday')],
      tweetImageUrl: allValues[i][titles.indexOf('tweetImageUrl')],
      discordTextWeek: allValues[i][titles.indexOf('discordTextWeek')],
      discordTextToday: allValues[i][titles.indexOf('discordTextToday')],
      groupText: allValues[i][titles.indexOf('groupText')],
    });
  }
  return eventsList;
};

export const clusterEventMapper = (
  sheetName: string,
  // スプレッドシートの入力内容を型で管理できないため、any型を使用
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventDateValues: any[][],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allValues: any[][]
): ClusterEvent[] => {
  const eventsList = [];
  const titles = allValues[0];

  for (let i = 0; i < allValues.length; i++) {
    if (i === 0) continue;
    const row = i + 1;

    eventsList.push({
      sheetName: sheetName,
      row: row,
      eventCount: allValues[i][titles.indexOf('eventCount')],
      eventDate: eventDateValues[i][0],
      numberOfDaysLeft: getNumberOfDaysLeft(eventDateValues[i][0]),
      platform: allValues[i][titles.indexOf('platform')],
      tweetPostDate: allValues[i][titles.indexOf('tweetPostDate')],
      clusterEventUrl: allValues[i][titles.indexOf('clusterEventUrl')],
      isConnpassEventCreated: {
        row: row,
        column: titles.indexOf('isConnpassEventCreated') + 1,
        value: allValues[i][titles.indexOf('isConnpassEventCreated')],
      },
      isClusterEventCreated: {
        row: row,
        column: titles.indexOf('isClusterEventCreated') + 1,
        value: allValues[i][titles.indexOf('isClusterEventCreated')],
      },
      isTweetPostedWeek: {
        row: row,
        column: titles.indexOf('isTweetPostedWeek') + 1,
        value: allValues[i][titles.indexOf('isTweetPostedWeek')],
      },
      isDiscordPostedWeek: {
        row: row,
        column: titles.indexOf('isDiscordPostedWeek') + 1,
        value: allValues[i][titles.indexOf('isDiscordPostedWeek')],
      },
      isDiscordPostedToday: {
        row: row,
        column: titles.indexOf('isDiscordPostedToday') + 1,
        value: allValues[i][titles.indexOf('isDiscordPostedToday')],
      },
      tweetUrl: {
        row: row,
        column: titles.indexOf('tweetUrl') + 1,
        value: allValues[i][titles.indexOf('tweetUrl')],
      },
      connpassText: allValues[i][titles.indexOf('connpassText')],
      tweetTextWeek: allValues[i][titles.indexOf('tweetTextWeek')],
      tweetTextToday: allValues[i][titles.indexOf('tweetTextToday')],
      tweetImageUrl: allValues[i][titles.indexOf('tweetImageUrl')],
      discordTextWeek: allValues[i][titles.indexOf('discordTextWeek')],
      discordTextToday: allValues[i][titles.indexOf('discordTextToday')],
    });
  }

  return eventsList;
};
