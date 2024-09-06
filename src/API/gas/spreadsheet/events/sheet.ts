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
  getAllValues,
  getColumnValuesWithTitle,
  getSheetsByKeyWord,
} from '../helper/helper';
import { EventType } from './type';
import { clusterEventMapper, vrchatEventMapper } from './mapper';
import { eventsSheetId } from '../../../../constants';

export function getEventsList(): EventType[] {
  const eventSheets = getSheetsByKeyWord('event', eventsSheetId);
  let eventsList: EventType[] = [];
  for (let i = 0; i < eventSheets.length; i++) {
    const eventDateValues = getColumnValuesWithTitle(
      eventSheets[i],
      'eventDate'
    );
    const allValues = getAllValues(eventSheets[i]);
    const sheetName = eventSheets[i].getSheetName();

    if (sheetName.includes('VRChat')) {
      const vrchatEvents = vrchatEventMapper(
        sheetName,
        eventDateValues,
        allValues
      );
      eventsList = eventsList.concat(vrchatEvents);
    }

    if (sheetName.includes('cluster')) {
      const clusterEvents = clusterEventMapper(
        sheetName,
        eventDateValues,
        allValues
      );
      eventsList = eventsList.concat(clusterEvents);
    }
  }
  eventsList.sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
  return eventsList;
}
