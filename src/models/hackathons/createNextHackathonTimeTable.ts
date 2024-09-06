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
import { getHackathonParticipantsList } from '../../API/gas/spreadsheet/hackathon/sheet';
import {
  createNewSheet,
  isSheetExist,
} from '../../API/gas/spreadsheet/helper/helper';
import { createHackathonTimeTable } from './createTimeTable';
import { getNextHackathon } from './getNextHackathon';
import { outputHackathonTimeTable } from './outputHackathonTimeTable';

export function createNextHackathonTimeTable() {
  const timeTableSheetName = 'タイムテーブル';
  const nextHackathon = getNextHackathon();
  const participants = getHackathonParticipantsList(
    nextHackathon.spreadSheetId
  );

  if (!isSheetExist(timeTableSheetName, nextHackathon.spreadSheetId)) {
    createNewSheet(timeTableSheetName, nextHackathon.spreadSheetId);
  }

  const abstentions = nextHackathon.abstentions.split(',');
  const timeTableData = createHackathonTimeTable(
    nextHackathon.eventDate,
    nextHackathon.openingTimeMin,
    nextHackathon.endingTimeMin,
    nextHackathon.preparationTimeMin,
    nextHackathon.breakTimingNum,
    nextHackathon.breakTimeMin,
    nextHackathon.presentationMaxTimeMin,
    participants,
    abstentions
  );
  outputHackathonTimeTable(
    nextHackathon.spreadSheetId,
    timeTableData,
    timeTableSheetName
  );
}
