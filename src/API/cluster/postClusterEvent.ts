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
/* eslint-disable */
function createClusterEvent() {
  const url = 'https://api.cluster.mu/v1/events';
  const payload = {
    name: 'TestTestGas',
    detail: {
      description: '',
      hashtag: '',
      photoUrl: '/images/hero/default.png',
      subtitle: '',
    },
    privacyType: 'Public',
    reservation: { openDatetime: '2024-05-22T17:45:00Z' },
    venue: { venueId: 'venue_fac3dfb1b74f1ccba9432dde45' },
    youtubeLiveVideoId: '',
    design: { accentColorHex: '22afed', isDarkMode: false },
    venueWorldRoomSetId: '6af6bf12-6462-11ea-b28b-0ef3638656a6',
  };

  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'X-Cluster-Device': 'Web',
      'X-Cluster-Platform': 'Web',
      'X-Cluster-App-Version': '2.124.2405131233',
      'Authorization': 'Bearer' /* TODO: 環境変数でトークンを設定 */,
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  });
}
