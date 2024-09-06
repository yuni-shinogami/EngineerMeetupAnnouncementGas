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
export type EventType = VRChatEvent | ClusterEvent;
export type VRChatEvent = EventCommonType &
  VRChatEventType &
  NoticeTwitterType &
  NoticeDiscordType &
  NoticeConnpassType;
export type ClusterEvent = EventCommonType &
  ClusterEventType &
  NoticeTwitterType &
  NoticeDiscordType &
  NoticeConnpassType;

export type EventCommonType = {
  sheetName: string;
  row: number;
  eventDate: Date;
  numberOfDaysLeft: number;
};

type VRChatEventType = {
  platform: 'VRChat';
  dateForVRCEventCalendar: Date;
  isVRCEventCalendarCreated: {
    row: number;
    column: number;
    value: boolean;
  };
  vrcEventCalendarUrl: string;
  groupText: string;
};

type ClusterEventType = {
  platform: 'cluster';
  isClusterEventCreated: {
    row: number;
    column: number;
    value: boolean;
  };
  clusterEventUrl: string;
};

type NoticeTwitterType = {
  tweetPostDate: Date;
  isTweetPostedWeek: {
    row: number;
    column: number;
    value: boolean;
  };
  tweetUrl: {
    row: number;
    column: number;
    value: string;
  };
  tweetTextWeek: string;
  tweetTextToday: string;
  tweetImageUrl: string;
};

type NoticeDiscordType = {
  isDiscordPostedWeek: {
    row: number;
    column: number;
    value: boolean;
  };
  isDiscordPostedToday: {
    row: number;
    column: number;
    value: boolean;
  };
  discordTextWeek: string;
  discordTextToday: string;
};

type NoticeConnpassType = {
  isConnpassEventCreated: {
    row: number;
    column: number;
    value: boolean;
  };
  connpassText: string;
};
