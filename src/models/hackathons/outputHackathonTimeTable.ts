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
import { HackathonTimeTableType } from '../../API/gas/spreadsheet/hackathon/types';
import { getSheetByName } from '../../utils/spreadsheet/utils';

export function outputHackathonTimeTable(
  sheetId: string,
  timeTableData: HackathonTimeTableType[],
  timeTableSheetName: string
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeTable: any[][] = [
    ['内容', '開始時間', '終了時間', 'チーム名', '写真撮影可', '動画撮影可'],
  ];
  for (let i = 0; i < timeTableData.length; i++) {
    const timeTableRow = timeTableData[i];
    switch (timeTableRow.type) {
      case 'opening':
        timeTable.push([
          '開会式',
          timeTableRow.startTime,
          timeTableRow.endTime,
          '',
          '',
          '',
        ]);
        break;
      case 'break':
        timeTable.push([
          '休憩',
          timeTableRow.startTime,
          timeTableRow.endTime,
          '',
          '',
          '',
        ]);
        break;
      case 'preparation':
        timeTable.push([
          '準備',
          timeTableRow.startTime,
          timeTableRow.endTime,
          '',
          '',
          '',
        ]);
        break;
      case 'presentation':
        timeTable.push([
          'プレゼン',
          timeTableRow.startTime,
          timeTableRow.endTime,
          timeTableRow.teamName,
          timeTableRow.allowPhoto,
          timeTableRow.allowMovie,
        ]);
        break;
      case 'ending':
        timeTable.push([
          '閉会式',
          timeTableRow.startTime,
          timeTableRow.endTime,
          '',
          '',
          '',
        ]);
        break;
    }
  }

  const sheet = getSheetByName(timeTableSheetName, sheetId);
  sheet
    .getRange(1, 1, timeTable.length, timeTable[0].length)
    .setValues(timeTable);
}
