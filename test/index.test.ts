import { ICalEvent } from 'ical-gen';
import { ICalCalendarCalzone, ICalCalendarCalzoneOptions } from '../src';


describe('ICalCalendarCalzone', () => {
	const demoEvent1 = new ICalEvent({
		// timezone: 'Europe/London',
		start: {
			date: new Date(1621036800000),
			zone: 'Europe/London',
		},
		end: {
			date: new Date(1621123200000),
			zone: 'Europe/London',
		},
		sequence: 1,
		stamp: new Date(1621036800000),
		summary: 'Test 1',
		uid: 'testuid1',
	});

	const demoEvent2 = new ICalEvent({
		// timezone: 'Europe/Berlin',
		start: {
			date: new Date(1621036800000),
			zone: 'Europe/Berlin',
		},
		end: {
			date: new Date(1621123200000),
			zone: 'Europe/Berlin',
		},
		sequence: 1,
		stamp: new Date(1621036800000),
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
