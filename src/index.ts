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

import {
  copyGoogleFormTemplate,
  editGoogleFormDescription,
  editGoogleFormTitle,
} from './API/gas/form/googleForm';
import { debugFunctions } from './test';
import {
  triggerCreateNextHackathonTimeTable,
  triggerIsVRChatAbleToLoginWithTwoFactorAuth,
  triggerTodayAnnouncement,
  triggerTodayAnnouncementTweet,
  triggerVRChatAnnouncement,
  triggerWeekAnnouncement,
} from './API/gas/triggers/trigger';
import { outputNextHackathonDiscordMentionText } from './models/hackathons/outputNextHackathonDiscordMentionText';

/* eslint-disable */
function MainTriggerTodayAnnouncementTweet() {
  triggerTodayAnnouncementTweet();
}

function MainTiggerTodayAnnouncement() {
  triggerTodayAnnouncement();
}

function MainTriggerWeekAnnouncement() {
  triggerWeekAnnouncement();
}

function MainTriggerVRChatAnnouncement() {
  triggerVRChatAnnouncement();
}

function MainTriggerVRChatAbleToLoginWithTwoFactorAuth() {
  triggerIsVRChatAbleToLoginWithTwoFactorAuth();
}

function MainTriggerCreateNextHackathonTimeTable() {
  triggerCreateNextHackathonTimeTable()
}

function testGoogleForm() {
  const formUrl = copyGoogleFormTemplate('https://docs.google.com/forms/d/1dLFfhUSxM8NVk0Rr7ITECdPMRzYNREyKw4O5GXdKB24/edit');
  editGoogleFormDescription(formUrl, 'testtesttesttesttesttesttesttest');
  editGoogleFormTitle(formUrl, 'test');
}

function testDiscordTest() {
  outputNextHackathonDiscordMentionText();
}

function MainDebug() {
  debugFunctions();
}
