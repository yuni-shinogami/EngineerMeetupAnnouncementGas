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
import { getNextEvent } from './models/events/getNextEvent';
import {
  announceEventToDiscord,
  checkAnnouncementStatus,
} from './API/discord/postMessageToDiscord';
import { announceEventToTwitter, postTweet } from './API/twitter/postTweet';

export function postNextEventAnnouncementForDiscord() {
  const nextEventInfo = getNextEvent();
  checkAnnouncementStatus(nextEventInfo);
  announceEventToDiscord(
    nextEventInfo.discordTextWeek,
    nextEventInfo.sheetName,
    nextEventInfo.isDiscordPostedWeek.row,
    nextEventInfo.isDiscordPostedWeek.column
  );
}

export function postNextEventAnnouncementForTwitter() {
  const nextEventInfo = getNextEvent();
  checkAnnouncementStatus(nextEventInfo);
  announceEventToTwitter(
    nextEventInfo.tweetTextWeek,
    nextEventInfo.tweetImageUrl,
    nextEventInfo.sheetName,
    nextEventInfo.isTweetPostedWeek.row,
    nextEventInfo.isTweetPostedWeek.column,
    nextEventInfo.tweetUrl.row,
    nextEventInfo.tweetUrl.column
  );
}

export function postTodayEventAnnouncementForDiscord() {
  const nextEventInfo = getNextEvent();
  announceEventToDiscord(
    nextEventInfo.discordTextToday,
    nextEventInfo.sheetName,
    nextEventInfo.isDiscordPostedToday.row,
    nextEventInfo.isDiscordPostedToday.column
  );
}

export function postTodayEventAnnouncementForTwitter() {
  const nextEventInfo = getNextEvent();
  const text = nextEventInfo.tweetTextToday
  postTweet(text);
}
