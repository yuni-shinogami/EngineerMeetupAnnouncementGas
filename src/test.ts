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
// シナリオ
// Tweetの投稿
// Tweetの取得
// Tweetが存在することを確認
// Discordメッセージの投稿
// Discordメッセージの取得
// Discordメッセージが存在することを確認
// VRCGroupメッセージの投稿
// VRCGroupメッセージの取得
// VRCGroupメッセージが存在することを確認

import { applicationEnv } from './setting';
import {
  triggerIsVRChatAbleToLoginWithTwoFactorAuth,
  triggerTodayAnnouncement,
  triggerTodayAnnouncementTweet,
  triggerVRChatAnnouncement,
  triggerWeekAnnouncement,
} from './triggers/trigger';

// setTriggerTodayAnnouncementTweet
function testTriggerTodayAnnouncementTweet() {
  Logger.log('triggerTodayAnnouncementTweetの実行中');
  triggerTodayAnnouncementTweet();
  Logger.log('triggerTodayAnnouncementTweetの実行完了 1/5');
}

// setTiggerTodayAnnouncement
function testTiggerTodayAnnouncement() {
  Logger.log('triggerTodayAnnouncementの実行中');
  triggerTodayAnnouncement();
  Logger.log('triggerTodayAnnouncementの実行完了 2/5');
}

// setTriggerWeekAnnouncement
function testTriggerWeekAnnouncement() {
  Logger.log('triggerWeekAnnouncementの実行中');
  triggerWeekAnnouncement();
  Logger.log('triggerWeekAnnouncementの実行完了 3/5');
}

// setTriggerVRChatAnnouncement
function testTriggerVRChatAnnouncement() {
  Logger.log('triggerVRChatAnnouncementの実行中');
  triggerVRChatAnnouncement();
  Logger.log('triggerVRChatAnnouncementの実行完了 4/5');
}

// setTriggerVRChatAbleToLoginWithTwoFactorAuth
function testTriggerVRChatAbleToLoginWithTwoFactorAuth() {
  Logger.log('triggerIsVRChatAbleToLoginWithTwoFactorAuthの実行中');
  triggerIsVRChatAbleToLoginWithTwoFactorAuth();
  Logger.log('triggerIsVRChatAbleToLoginWithTwoFactorAuthの実行完了 5/5');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testTriggerCreateNextHackathonTimeTable() {
  // TODO: triggerCreateNextHackathonTimeTableのテストを追加する
}

/* eslint-disable */
export function debugFunctions() {
  const env = applicationEnv();
  if (env === 'TEST') {
    testTriggerTodayAnnouncementTweet();
    testTiggerTodayAnnouncement();
    testTriggerWeekAnnouncement();
    testTriggerVRChatAnnouncement();
    testTriggerVRChatAbleToLoginWithTwoFactorAuth();
  }
}
