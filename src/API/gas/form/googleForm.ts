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
export function copyGoogleFormTemplate(templateUrl: string) {
  const template = FormApp.openByUrl(templateUrl);
  const file = DriveApp.getFileById(template.getId());
  const copyFile = file.makeCopy();
  const copyFileUrl = copyFile.getUrl();

  return copyFileUrl;
}

export function editGoogleFormFileName(fileUrl: string, name: string) {
  const form = FormApp.openByUrl(fileUrl);
  const file = DriveApp.getFileById(form.getId());
  file.setName(name);
}

export function editGoogleFormTitle(fileUrl: string, title: string) {
  const file = FormApp.openByUrl(fileUrl);
  file.setTitle(title);
}

export function editGoogleFormDescription(fileUrl: string, text: string) {
  const file = FormApp.openByUrl(fileUrl);
  file.setDescription(text);
}
