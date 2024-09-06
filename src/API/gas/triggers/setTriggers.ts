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
import { getNextEvent } from '../../../models/events/getNextEvent';

export function setTriggerTodayAnnouncementTweet() {
  // MEMO: 毎週金曜日の00:00~01:00に実行する
  const time = new Date();
  time.setHours(12);
  time.setMinutes(0);

  const nextEventInfo = getNextEvent();

  if (nextEventInfo.numberOfDaysLeft === 0) {
    ScriptApp.newTrigger('triggerTodayAnnouncementTweet')
      .timeBased()
      .at(time)
      .create();
  }
}

export function setTriggerTodayAnnouncement() {
  // MEMO: 毎週金曜日の00:00~01:00に実行する
  const time = new Date();
  time.setHours(21);
  time.setMinutes(50);

  ScriptApp.newTrigger('triggerTodayAnnouncement')
    .timeBased()
    .at(time)
    .create();
}

export function setTriggerWeekAnnouncement() {
  // MEMO: 毎週月曜日の00:00~01:00に実行する
  const time = new Date();
  time.setHours(12);
  time.setMinutes(0);

  ScriptApp.newTrigger('triggerWeekAnnouncement').timeBased().at(time).create();
}

export function setTriggerVRChatAnnouncement() {
  // MEMO: 毎週金曜日の00:00~01:00に実行する
  const time = new Date();
  time.setHours(22);
  time.setMinutes(0);

  const nextEvent = getNextEvent();
  if (nextEvent.platform === 'VRChat') {
    ScriptApp.newTrigger('triggerVRChatAnnouncement')
      .timeBased()
      .at(time)
      .create();
  }
}

export function setTriggerIsVRChatAbleToLoginWithTwoFactorAuth(
  hour: number,
  minute: number
) {
  // MEMO: 毎週金曜日の00:00~01:00に実行する
  const time = new Date();

  if (!hour && !minute) {
    time.setHours(21);
    time.setMinutes(0);
  } else {
    time.setHours(hour);
    time.setMinutes(minute);
  }

  ScriptApp.newTrigger('triggerIsVRChatAbleToLoginWithTwoFactorAuth')
    .timeBased()
    .at(time)
    .create();
}
