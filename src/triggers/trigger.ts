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
import { getNextEvent } from '../models/events/getNextEvent';
import {
  postNextEventAnnouncement,
  postTodayEventAnnouncement,
} from '../postEventAnnouncement';
import { postTweet } from '../API/twitter/postTweet';
import {
  isVRChatAbleToLoginWithTwoFactorAuth,
  postVRChatGroupAnnouncement,
} from '../API/vrchat/postVRChatGroupAnnouncement';
import { createNextHackathonTimeTable } from '../models/hackathons/createNextHackathonTimeTable';

export function triggerTodayAnnouncementTweet() {
  const nextEventInfo = getNextEvent();
  const text =
    `今日はエンジニア作業飲み集会やるよー!\n良かったら遊びに来てねーーーー！\n` +
    nextEventInfo.tweetUrl.value;
  postTweet(text);

  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'triggerTodayAnnouncementTweet') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

export function triggerTodayAnnouncement() {
  postTodayEventAnnouncement();

  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'triggerTodayAnnouncement') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

export function triggerWeekAnnouncement() {
  postNextEventAnnouncement();

  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'triggerWeekAnnouncement') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

// --- VRChat ---
export function triggerVRChatAnnouncement() {
  postVRChatGroupAnnouncement();

  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'triggerVRChatAnnouncement') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

export function triggerIsVRChatAbleToLoginWithTwoFactorAuth() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (
      triggers[i].getHandlerFunction() ===
      'triggerIsVRChatAbleToLoginWithTwoFactorAuth'
    ) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  isVRChatAbleToLoginWithTwoFactorAuth();
}

export function triggerCreateNextHackathonTimeTable() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (
      triggers[i].getHandlerFunction() === 'triggerCreateNextHackathonTimeTable'
    ) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  createNextHackathonTimeTable();
}
