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
import { TOOLTIP_CLASS } from '../../constants';
import getFrameAttributes from '../../utils/getFrameAttributes';
import type { ResponseType } from '../../types';

/**
 * Creates a tooltip element for an iframe overlay.
 * @param {HTMLIFrameElement | HTMLElement} frame - The iframe or HTML element for which the tooltip is created.
 * @param {ResponseType} data - The response data associated with the frame.
 * @returns {HTMLDivElement} The tooltip element containing information about the frame.
 */
const createTooltip = (
  frame: HTMLIFrameElement | HTMLElement,
  data: ResponseType
) => {
  const isMainFrame = document.location.origin === data.selectedFrame;
  let isHidden = false;
  const tooltip = document.createElement('div');
  const content = document.createElement('div');
  let insideFrame: HTMLIFrameElement | null = null;

  let attributes = {};

  if (!isMainFrame && frame.dataset?.psatInsideFrame) {
    // we don't need to worry if querySelector will fail becuase there will be no psatInsideFrame if we can't access contentDocument of frame.
    insideFrame = frame?.contentDocument.querySelector(
      'iframe[src="' + frame.dataset.psatInsideFrame + '"]'
    );
    attributes = getFrameAttributes(insideFrame as HTMLIFrameElement);
  } else if (!isMainFrame) {
    attributes = getFrameAttributes(frame as HTMLIFrameElement);
  }

  const { width, height } = frame.getBoundingClientRect();

  tooltip.classList.add(TOOLTIP_CLASS);
  content.classList.add('ps-content');

  if (height === 0 && width === 0) {
    isHidden = true;
  }

  const frameSrc = attributes.src?.startsWith('//')
    ? 'https:' + attributes.src
    : attributes?.src;
  const frameOrigin = frameSrc ? new URL(frameSrc || '').origin : '';

  const origin = isMainFrame ? data.selectedFrame : frameOrigin;

  let frameType = 'iframe';

  if (isHidden) {
    frameType = 'Hidden iframe';
  } else if (insideFrame) {
    frameType = 'iframe(nested frame)';
  } else if (frame.tagName === 'BODY') {
    frameType = 'Main Frame';
  }

  const info: Record<string, string> = {
    Type: frameType,
    Origin: `<a href="${origin}">${origin}</a>`,
    'First-party cookies': String(data?.firstPartyCookies || '0'),
    'Third-party cookies': String(data?.thirdPartyCookies || '0'),
    'Allowed features': attributes.allow || ' ',
  };

  // Reset the dataset of parent frame.
  if (insideFrame) {
    frame.dataset.psatInsideFrame = '';
  }

  // eslint-disable-next-line guard-for-in
  for (const label in info) {
    const value = info[label];

    if (value) {
      const p: HTMLParagraphElement = document.createElement('p');

      p.innerHTML = `<strong style="color:#202124">${label}</strong>: ${value}`;

      content.appendChild(p);
    }
  }

  tooltip.appendChild(content);

  tooltip.popover = 'manual';

  return tooltip;
};

export default createTooltip;
