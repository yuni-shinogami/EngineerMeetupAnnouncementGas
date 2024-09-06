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
import { getHackathonsList } from '../../API/gas/spreadsheet/hackathon/sheet';

export function getNextHackathon() {
  const today = new Date();
  const todayWithDateTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  const hackathonsList = getHackathonsList();
  const futureEvents = hackathonsList.filter(
    hackathon => hackathon.eventDate >= todayWithDateTime
  );
  console.log(
    '次回開催のハッカソンテーマ：',
    futureEvents[0].theme,
    futureEvents[0].eventDate
  );
  return futureEvents[0];
}
