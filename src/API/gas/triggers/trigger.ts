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
  postNextEventAnnouncementForDiscord,
  postNextEventAnnouncementForTwitter,
  postTodayEventAnnouncementForDiscord,
  postTodayEventAnnouncementForTwitter,
} from '../../../postEventAnnouncement';
import {
  isVRChatAbleToLoginWithTwoFactorAuth,
  postVRChatGroupAnnouncement,
} from '../../vrchat/postVRChatGroupAnnouncement';
import { createNextHackathonTimeTable } from '../../../models/hackathons/createNextHackathonTimeTable';

export function triggerTodayAnnouncementTweet() {
  postTodayEventAnnouncementForTwitter()

  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'triggerTodayAnnouncementTweet') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

export function triggerTodayAnnouncement() {
  postTodayEventAnnouncementForDiscord();

  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'triggerTodayAnnouncement') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

export function triggerWeekAnnouncement() {
  postNextEventAnnouncementForDiscord();
  postNextEventAnnouncementForTwitter()

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
