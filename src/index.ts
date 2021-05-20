// import type { ICalComponent } from 'ical-gen';
import { ICalCalendar, ICalTimeZone } from 'ical-gen';
import { getZoneLines } from 'icalzone';

function vTimeZoneGenerator(tz: string): ICalTimeZone | undefined {
	const tzLines = getZoneLines(tz, false);
	return tzLines && new ICalTimeZone({ fromLines: tzLines });
};

export default class ICalCalendarWithZones extends ICalCalendar {
	/**
	 * This implementation of `getChildrenForRender()` resolves all time zones
	 * to time zone components and dynamically adds them in front of all other
	 * other children.
	 */
	public getChildrenForRender = async () => {
		// Get all time zones, but ignore UTC.
		const timeZones = this.getTimeZones().filter(tz => tz !== 'UTC');

		// Try to generate a `VTIMEZONE` string for each time zone.
		const tzComponents: Array<ICalTimeZone> = timeZones
			.map(vTimeZoneGenerator)
			.filter(component => !!component) as ICalTimeZone[];

		return [
			...tzComponents, // Insert `VTIMEZONE`s first
			...this.children, // Then the rest like `VENENT` etc.
		];
	};
}
