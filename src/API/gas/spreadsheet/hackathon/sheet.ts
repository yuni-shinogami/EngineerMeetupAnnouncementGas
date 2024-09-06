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
  eventsSheetId,
  googleFormAnswerSheetName,
  hackathonSheetName,
} from '../../../../constants';
import { getAllValues, getSheetByName } from '../helper/helper';
import { hackathonParticipantsMapper, hackathonsMapper } from './mapper';

export function getHackathonsList() {
  const sheet = getSheetByName(hackathonSheetName, eventsSheetId);
  const allValues = getAllValues(sheet);
  const hackathons = hackathonsMapper(hackathonSheetName, allValues);
  return hackathons;
}

export function getHackathonParticipantsList(spreadSheetId: string) {
  const sheet = getSheetByName(googleFormAnswerSheetName, spreadSheetId);
  const allValues = getAllValues(sheet);
  const participants = hackathonParticipantsMapper(allValues);
  return participants;
}
