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
import React from 'react';
import { type HeaderGroup } from '@tanstack/react-table';

/**
 * Internal dependencies.
 */
import type { TData } from '..';
import HeaderCell from './headerCell';

interface HeaderRowProps {
  headerGroup: HeaderGroup<TData>;
}

const HeaderRow = ({ headerGroup }: HeaderRowProps) => {
  return (
    <tr className="bg-gray-200">
      {headerGroup.headers.map((header) => (
        <HeaderCell key={header.id} header={header} />
      ))}
    </tr>
  );
};

export default HeaderRow;
