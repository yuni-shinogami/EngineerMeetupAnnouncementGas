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
import { getEventsList } from '../../API/gas/spreadsheet/events/sheet';

export function getNextEvent() {
  const today = new Date();
  const todayWithDateTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  const eventsList = getEventsList();
  const futureEvents = eventsList.filter(
    event => event.eventDate >= todayWithDateTime
  );
  console.log(
    '次回開催のイベント',
    futureEvents[0].sheetName,
    futureEvents[0].eventDate,
    `残り日数: ${futureEvents[0].numberOfDaysLeft}`
  );
  return futureEvents[0];
}
