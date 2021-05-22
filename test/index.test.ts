import { ICalEvent } from 'ical-gen';
import { ICalCalendarCalzone, ICalCalendarCalzoneOptions } from '../src';


describe('ICalCalendarCalzone', () => {
	const demoEvent1 = new ICalEvent({
		// Note: For the given dates in time zone Europe/London,
		// the resulting local time should be +1 hour (British
		// Summer Time).
		start: {
			date: new Date('2021-05-15T00:00:00.000Z'),
			zone: 'Europe/London',
		},
		end: {
			date: new Date('2021-05-16T00:00:00.000Z'),
			zone: 'Europe/London',
		},
		sequence: 1,
		stamp: new Date('2021-05-15T00:00:00.000Z'),
		summary: 'Test 1',
		uid: 'testuid1',
	});

	const demoEvent2 = new ICalEvent({
		// Note: For the given dates in time zone Europe/Berlin,
		// the resulting local time should be +2 hour (Central
		// European Summer Time).
		start: {
			date: new Date('2021-05-15T00:00:00.000Z'),
			zone: 'Europe/Berlin',
		},
		end: {
			date: new Date('2021-05-16T00:00:00.000Z'),
			zone: 'Europe/Berlin',
		},
		sequence: 1,
		stamp: new Date('2021-05-15T00:00:00.000Z'),
		summary: 'Test 2',
		uid: 'testuid2',
	});

	describe('renderToString()', () => {
		it('renders the calendar with all three time zone components', async () => {
			// Initialize options object separately to test the TS type.
			const options: ICalCalendarCalzoneOptions = {
				prodId: {
					company: 'My Company X',
					product: 'My Product Name',
					language: 'XX',
				},
				children: [demoEvent1, demoEvent2],
				timezone: 'Europe/Paris',
			};
			const str = await new ICalCalendarCalzone(options).renderToString();
			expect(str.match(/BEGIN:VTIMEZONE/g) || []).toHaveLength(3);
			expect(str).toContain('TZID:Europe/Paris');
			expect(str).toContain('TZID:Europe/London');
			expect(str).toContain('TZID:Europe/Berlin');
			expect(str).toMatchSnapshot();
		});

		it('renders the calendar with resolved time zone components, ingnores the unresolved time zone', async () => {
			const str = await new ICalCalendarCalzone({
				prodId: {
					company: 'My Company X',
					product: 'My Product Name',
					language: 'XX',
				},
				children: [demoEvent1, demoEvent2],
				timezone: 'Something/Wrong',
			}).renderToString();
			expect(str.match(/BEGIN:VTIMEZONE/g) || []).toHaveLength(2);
			expect(str).toContain('TZID:Europe/London');
			expect(str).toContain('TZID:Europe/Berlin');
			expect(str).not.toContain('TZID:Something/Wrong');
			expect(str).toMatchSnapshot();
		});
	});
});
