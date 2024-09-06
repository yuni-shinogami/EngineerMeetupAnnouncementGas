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
export function getScriptProperty(key: string) {
  const scriptProps = PropertiesService.getScriptProperties();
  return scriptProps.getProperty(key);
}

export function getSheetByName(sheetName: string, spreadSheetId: string) {
  const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
  const sheet = spreadSheet.getSheetByName(sheetName);
  if (!sheet) throw new Error('sheetがありません');
  return sheet;
}

export function getSheetsByKeyWord(keyWord: string, spreadSheetId: string) {
  const spredsheet = SpreadsheetApp.openById(spreadSheetId);
  const sheets = spredsheet.getSheets();
  const filteredSheets = sheets.filter(sheet =>
    sheet.getSheetName().includes(keyWord)
  );
  return filteredSheets;
}

function getTitleColumn(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  title: string
) {
  const textObject = sheet.createTextFinder(title);
  const results = textObject.findAll();

  if (results.length === 0) {
    throw new Error(`${sheet.getSheetName()}に${title}がありません`);
  }

  if (results.length > 1) {
    throw new Error(`${sheet.getSheetName()}に複数の${title}が見つかりました`);
  }

  return results[0].getColumn();
}

export function toggleChangeCheckBox(
  sheetName: string,
  spreadSheetId: string,
  row: number,
  column: number
) {
  const sheet = getSheetByName(sheetName, spreadSheetId);
  const cellRange = sheet.getRange(row, column);
  cellRange.check();
}

export function setValueToCell(
  sheetName: string,
  spreadSheetId: string,
  row: number,
  column: number,
  value: string
) {
  const sheet = getSheetByName(sheetName, spreadSheetId);
  const cellRange = sheet.getRange(row, column);
  cellRange.setValue(value);
}

export const getAllValues = (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, lastRow, lastColumn);
  const values = range.getValues();
  return values;
};

export const getColumnValuesWithTitle = (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  title: string
) => {
  const column = getTitleColumn(sheet, title);
  const lastCol = sheet.getLastColumn();
  const range = sheet.getRange(1, column, lastCol, 1);
  return range.getValues();
};

export function createNewSheet(title: string, spreadSheetId: string) {
  const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
  const newSheet = spreadSheet.insertSheet();
  newSheet.setName(title);
}

export function isSheetExist(sheetName: string, spreadSheetId: string) {
  const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
  const sheet = spreadSheet.getSheetByName(sheetName);
  return Boolean(sheet);
}
