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
import { EventCommonType } from '../events/type';

export type HackathonParticipantsType = {
  row: number;
  timestamp: Date;
  mail: string;
  teamName: string;
  teamLeader: string;
  member: string;
  allowPhoto: string;
  allowMovie: string;
};

export type HackathonEventsType = EventCommonType & {
  row: number;
  eventCount: number;
  platform: 'VRChat' | 'cluster';
  theme: string;
  entryStartDate: Date;
  entryDeadlineDateTime: Date;
  kickOffDateTime: Date;
  numberOfDaysLeftUntilKickOff: number;
  openingTimeMin: number;
  endingTimeMin: number;
  preparationTimeMin: number;
  presentationMaxTimeMin: number;
  breakTimingNum: number;
  breakTimeMin: number;
  abstentions: string;
  googleFormUrl: string;
  spreadSheetUrl: string;
  spreadSheetId: string;
};

export type HackathonTimeTableType =
  | {
      type: 'opening' | 'break' | 'ending';
      startTime: Date;
      endTime: Date;
    }
  | {
      type: 'preparation' | 'presentation';
      startTime: Date;
      endTime: Date;
      teamName: string;
      allowPhoto: string;
      allowMovie: string;
    };
