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
import { createActiveParticipantsHackathonTimeTable } from './createActiveParticipantsHackathonTimeTable';
import { createHackathonSheets } from './createHackathonSheets';
import { getNextHackathon } from './getNextHackathon';
import { outputHackathonTimeTable } from './outputHackathonTimeTable';

export function createNextHackathonTimeTable() {
  const timeTableSheetName = 'タイムテーブル';
  const nextHackathon = getNextHackathon();
  createHackathonSheets(nextHackathon.spreadSheetId, [timeTableSheetName]);
  const timeTableData =
    createActiveParticipantsHackathonTimeTable(nextHackathon);
  outputHackathonTimeTable(
    nextHackathon.spreadSheetId,
    timeTableData,
    timeTableSheetName
  );
}
