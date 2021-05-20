# ICalCalendarWithZones for ical-gen

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-version-image]][npm-url]
[![Size][min-size-image]][npm-url]
[![MIT License][license-image]][license-url]

**ICalCalendarWithZones** is a class that extends `ICalCalendar` of [**ical-gen**](https://github.com/Manc/ical-gen). It gives your calendar component class the power to automatically resolve and include iCalendar-compatible `VTIMEZONE` components fast. Time zones that cannot be resolved will be ignored silently.

This class must be used together with [**ical-gen**](https://github.com/Manc/ical-gen), a fast and modular iCalendar (ICS) generator written in TypeScript.

The time zone data is provided by [**iCalzone**](https://github.com/Manc/icalzone).


## 📦 Installation

```sh
yarn add ical-gen icalzone
# or
npm install ical-gen icalzone
```


## ⚡️ Quick Start

```typescript
import { ICalEvent } from 'ical-gen';
import ICalCalendarWithZones from 'ical-gen-calzone';

const cal = new ICalCalendarWithZones({
  prodId: {
    company: 'My Company X',
    product: 'My Product Name',
    language: 'XX',
  },
  children: [
    new ICalEvent({
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
    })
  ],
});

cal.renderToString().then(ics => {
  console.log(ics);
})
```



[npm-url]: https://npmjs.org/package/ical-gen-calzone
[npm-version-image]: https://img.shields.io/npm/v/ical-gen-calzone.svg?style=flat

[travis-url]: https://travis-ci.org/Manc/ical-gen-calzone
[travis-image]: https://img.shields.io/travis/Manc/ical-gen-calzone/main.svg?style=flat

[min-size-image]: https://img.shields.io/bundlephobia/min/ical-gen-calzone?style=flat

[license-url]: LICENSE
[license-image]: https://img.shields.io/badge/license-ISC-blue.svg?style=flat
