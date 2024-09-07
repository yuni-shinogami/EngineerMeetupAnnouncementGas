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
  HackathonParticipantsType,
  HackathonTimeTableType,
} from '../../API/gas/spreadsheet/hackathon/types';
import { addMinutes } from './helper/helper';

export function createHackathonTimeTable(
  startTime: Date,
  openingTimeMin: number,
  endingTimeMin: number,
  preparationTimeMin: number,
  breakTimingNum: number,
  breakTimeMin: number,
  presentationTimeMin: number,
  participants: HackathonParticipantsType[]
): HackathonTimeTableType[] {
  const timeTable: HackathonTimeTableType[] = [];
  let sectionStartTime = new Date(
    startTime.getFullYear(),
    startTime.getMonth(),
    startTime.getDate(),
    startTime.getHours(),
    startTime.getMinutes()
  );
  let sectionEndTime = new Date(
    startTime.getFullYear(),
    startTime.getMonth(),
    startTime.getDate(),
    startTime.getHours(),
    startTime.getMinutes()
  );

  sectionEndTime = addMinutes(sectionStartTime, openingTimeMin);
  timeTable.push({
    type: 'opening',
    startTime: sectionStartTime,
    endTime: sectionEndTime,
  });
  sectionStartTime = addMinutes(sectionStartTime, openingTimeMin);

  for (let i = 0; i < participants.length; i++) {
    if (i !== 0 && i % breakTimingNum === 0) {
      sectionEndTime = addMinutes(sectionStartTime, breakTimeMin);
      timeTable.push({
        type: 'break',
        startTime: sectionStartTime,
        endTime: sectionEndTime,
      });
      sectionStartTime = addMinutes(sectionStartTime, breakTimeMin);
    } else {
      sectionEndTime = addMinutes(sectionStartTime, preparationTimeMin);
      timeTable.push({
        type: 'preparation',
        teamName: participants[i].teamName,
        startTime: sectionStartTime,
        endTime: sectionEndTime,
        allowPhoto: participants[i].allowPhoto,
        allowMovie: participants[i].allowMovie,
      });
      sectionStartTime = addMinutes(sectionStartTime, preparationTimeMin);
    }

    sectionEndTime = addMinutes(sectionStartTime, presentationTimeMin);
    timeTable.push({
      type: 'presentation',
      teamName: participants[i].teamName,
      startTime: sectionStartTime,
      endTime: sectionEndTime,
      allowPhoto: participants[i].allowPhoto,
      allowMovie: participants[i].allowMovie,
    });
    sectionStartTime = addMinutes(sectionStartTime, presentationTimeMin);
  }

  sectionEndTime = addMinutes(sectionStartTime, endingTimeMin);
  timeTable.push({
    type: 'ending',
    startTime: sectionStartTime,
    endTime: sectionEndTime,
  });
  sectionStartTime = addMinutes(sectionStartTime, endingTimeMin);

  return timeTable;
}
