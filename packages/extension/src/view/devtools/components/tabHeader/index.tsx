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
 * External dependencies.
 */
import React, { useState } from 'react';
/**
 * Internal dependencies
 */
import Accordion from './accordion';
import { File, FileWhite } from '../../../../icons';
import { useCookieStore } from '../../stateProviders/syncCookieStore';

interface TabHeaderProps {
  tabsNames: string[];
  selectedIndex: number;
  setIndex: (index: number) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({
  tabsNames,
  selectedIndex,
  setIndex,
}) => {
  const [accordionState, setAccordionState] = useState(false);
  const { setSelectedFrame, selectedFrame, tabFrames } = useCookieStore(
    ({ state, actions }) => ({
      setSelectedFrame: actions.setSelectedFrame,
      tabFrames: state.tabFrames,
      selectedFrame: state.selectedFrame,
    })
  );
  return (
    <>
      {tabsNames.map((name, index: number) => (
        <div
          key={name}
          data-testid={name}
          className={`flex items-center cursor-pointer ${
            selectedIndex === index && name !== 'Cookies'
              ? 'bg-selected-background-color text-white'
              : ''
          }`}
          onClick={() => {
            setIndex(index);
            if (selectedFrame) {
              setSelectedFrame(null);
            }
          }}
        >
          {name === 'Cookies' ? (
            <Accordion
              tabFrames={tabFrames}
              setSelectedFrame={setSelectedFrame}
              selectedFrame={selectedFrame}
              selectedIndex={selectedIndex}
              index={index}
              tabName={name}
              accordionState={accordionState}
              setAccordionState={setAccordionState}
            />
          ) : (
            <div className="flex items-center pl-6 py-0.5 pt-1.5">
              <div className="h-4">
                {selectedIndex === index ? <FileWhite /> : <File />}
              </div>
              <span className="pl-2.5">{name}</span>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default TabHeader;
