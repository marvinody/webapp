// Sh**t! I Smoke
// Copyright (C) 2018-2020  Marcelo S. Coelho, Amaury Martiny

// Sh**t! I Smoke is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Sh**t! I Smoke is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Sh**t! I Smoke.  If not, see <http://www.gnu.org/licenses/>.

import { navigate } from 'gatsby';
import React, { useState } from 'react';

import location from '../../../assets/images/icons/location_white.svg';
import { logEvent } from '../../util';
import { Button } from '../Button';

interface GpsButtonProps {
	className?: string;
}

/**
 * Handler when a user clicks on a button to fetch browser's GPS.
 *
 * @param setStatus - A function to set the status of the GPS fetch.
 */
export function onGpsButtonClick(
	setStatus: (status: string | undefined) => void
): void {
	setStatus("Fetching browser's GPS location...");
	if (!navigator.geolocation) {
		setStatus(
			'❌ Error: Geolocation is not supported for this Browser/OS.'
		);
		setTimeout(() => setStatus(undefined), 1500);
	} else {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				navigate(
					`/city?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
				);
			},
			(err) => {
				setStatus(`❌ Error: ${err.message}`);
				setTimeout(() => setStatus(undefined), 1500);
			}
		);
	}
}

const DEFAULT_TEXT = 'Use my location';

export function GpsButton(_props: GpsButtonProps): React.ReactElement {
	const [text, setText] = useState<string>();

	return (
		<Button
			className="py-3"
			primary
			onClick={(): void => {
				logEvent('GpsButton.Button.Click');
				onGpsButtonClick(setText);
			}}
		>
			<div className="px-2 flex flex-row justify-center">
				{!text && <img alt="location" src={location} />}
				<p className="ml-3 py-1 type-300 text-white uppercase truncate">
					{text || DEFAULT_TEXT}
				</p>
			</div>
		</Button>
	);
}
