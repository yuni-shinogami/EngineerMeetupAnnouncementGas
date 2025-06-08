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
import { getNumberOfDaysLeft } from '../../../../utils/utils';
import { HackathonEventsType, HackathonParticipantsType } from './types';

export function hackathonsMapper(
  sheetName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allValues: any[][]
): HackathonEventsType[] {
  const hackathonsList = [];
  const titles = allValues[0];

  for (let i = 0; i < allValues.length; i++) {
    if (i === 0) continue;
    const row = i + 1;

    hackathonsList.push({
      sheetName: sheetName,
      row: row,
      eventDate: allValues[i][titles.indexOf('eventDate')],
      numberOfDaysLeft: getNumberOfDaysLeft(
        allValues[i][titles.indexOf('eventDate')]
      ),
      eventCount: allValues[i][titles.indexOf('eventCount')],
      platform: allValues[i][titles.indexOf('platform')],
      theme: allValues[i][titles.indexOf('theme')],
      entryStartDate: allValues[i][titles.indexOf('entryStartDate')],
      entryDeadlineDateTime:
        allValues[i][titles.indexOf('entryDeadlineDateTime')],
      kickOffDateTime: allValues[i][titles.indexOf('kickOffDateTime')],
      numberOfDaysLeftUntilKickOff: getNumberOfDaysLeft(
        allValues[i][titles.indexOf('kickOffDateTime')]
      ),
      openingTimeMin: allValues[i][titles.indexOf('openingTimeMin')],
      endingTimeMin: allValues[i][titles.indexOf('endingTimeMin')],
      preparationTimeMin: allValues[i][titles.indexOf('preparationTimeMin')],
      presentationMaxTimeMin:
        allValues[i][titles.indexOf('presentationMaxTimeMin')],
      breakTimingNum: allValues[i][titles.indexOf('breakTimingNum')],
      breakTimeMin: allValues[i][titles.indexOf('breakTimeMin')],
      abstentions: allValues[i][titles.indexOf('abstentions')],
      googleFormUrl: allValues[i][titles.indexOf('googleFormUrl')],
      spreadSheetUrl: allValues[i][titles.indexOf('spreadSheetUrl')],
      spreadSheetId: allValues[i][titles.indexOf('spreadSheetId')],
    });
  }
  return hackathonsList;
}

export function hackathonParticipantsMapper(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allValues: any[][]
): HackathonParticipantsType[] {
  const participantsList = [];
  const titles = allValues[0];

  for (let i = 0; i < allValues.length; i++) {
    if (i === 0) continue;
    const row = i + 1;

    participantsList.push({
      row: row,
      timestamp: allValues[i][titles.indexOf('タイムスタンプ')],
      mail: allValues[i][titles.indexOf('メールアドレス')],
      teamName:
        allValues[i][titles.findIndex(title => title.includes('チーム名'))],
      teamLeader:
        allValues[i][titles.findIndex(title => title.includes('代表者'))],
      member:
        allValues[i][titles.findIndex(title => title.includes('メンバー'))],
      allowPhoto:
        allValues[i][
          titles.findIndex(title => title.includes('写真撮影の可否'))
        ],
      allowMovie:
        allValues[i][
          titles.findIndex(title => title.includes('撮影動画の公開可否'))
        ],
    });
  }
  return participantsList;
}
