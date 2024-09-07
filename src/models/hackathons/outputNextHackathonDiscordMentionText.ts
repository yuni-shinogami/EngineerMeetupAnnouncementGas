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
import { getSheetByName } from '../../API/gas/spreadsheet/helper/helper';
import { createHackathonDiscordMentionText } from './createDiscordMentionText';
import { getNextHackathon } from './getNextHackathon';

export function outputNextHackathonDiscordMentionText() {
  const discordSheetName = 'Discord';
  const nextHackathon = getNextHackathon();

  const mentionText = createHackathonDiscordMentionText(nextHackathon);
  const sheet = getSheetByName(discordSheetName, nextHackathon.spreadSheetId);
  sheet.getRange('A1').setValues([[mentionText]]);
}
