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
  copyGoogleFormTemplate,
  editGoogleFormDescription,
  editGoogleFormFileName,
  editGoogleFormTitle,
} from '../../API/gas/form/googleForm';
import { ltTemplateFormUrl } from '../../constants';

export function createLtForm() {
  const theme = 'test';
  const count = 99;
  const formTitle = `エンジニア集会LT会#${count} 「${theme}」 参加申し込み`;
  const formUrl = copyGoogleFormTemplate(ltTemplateFormUrl);
  editGoogleFormDescription(formUrl, 'testtesttesttesttesttesttesttest');
  editGoogleFormTitle(formUrl, formTitle);
  editGoogleFormFileName(formUrl, formTitle);
}
