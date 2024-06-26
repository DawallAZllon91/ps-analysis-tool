/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Internal dependencies.
 */
import { getCurrentTabId } from './getCurrentTabId';

const reloadCurrentTab = async (tabId: number | undefined = undefined) => {
  const currentTabId: number | string | undefined =
    tabId || (await getCurrentTabId());

  const _currentTabId = Number(currentTabId);

  if (_currentTabId) {
    chrome.tabs.reload(_currentTabId, { bypassCache: true });
  }
};

export default reloadCurrentTab;
