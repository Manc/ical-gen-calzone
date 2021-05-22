# ICalCalendarCalzone for ical-gen

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-version-image]][npm-url]
[![Size][min-size-image]][npm-url]
[![MIT License][license-image]][license-url]

**ICalCalendarCalzone** is a class that you can use instead of the more basic `ICalCalendar` class that comes with [**ical-gen**](https://github.com/Manc/ical-gen). It gives your calendar component class the extra power to automatically resolve and include iCalendar-compatible `VTIMEZONE` components fast. Time zones that cannot be resolved will be ignored silently.

This class must be used together with [**ical-gen**](https://github.com/Manc/ical-gen), a fast and modular iCalendar (ICS) generator written in TypeScript.

The time zone data is provided by [**iCalzone**](https://github.com/Manc/icalzone).


## ⚡️ Quick Start

### Installation

This package requires `ical-gen`, so make sure to install that as well.

```sh
yarn add ical-gen ical-gen-calzone
# or
npm install ical-gen ical-gen-calzone
```


### Basic Usage

The class `ICalCalendarCalzone` has exactly the same API as its super class `ICalCalendar`, so you can easily replace it to give it the extra power.

```typescript
import { ICalEvent } from 'ical-gen';
import { ICalCalendarCalzone } from 'ical-gen-calzone';

const cal = new ICalCalendarCalzone({
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
      summary: 'My Example Appointment',
      uid: 'xxxxxx@example.com',
    })
  ],
});

cal.renderToString().then(ics => {
  console.log(ics);
})
```


## Development

If you want to help with the development of this package, here are some tips.

Although I’m personally a fan of Yarn, in this case it’s best to install the dependencies with NPM version 7+ after cloning:

```sh
npm install
```

That’s because this package has a peer dependency and I don’t currently know how to make Yarn install it so it is available during development.



[npm-url]: https://npmjs.org/package/ical-gen-calzone
[npm-version-image]: https://img.shields.io/npm/v/ical-gen-calzone.svg?style=flat

[travis-url]: https://travis-ci.org/Manc/ical-gen-calzone
[travis-image]: https://img.shields.io/travis/Manc/ical-gen-calzone/main.svg?style=flat

[min-size-image]: https://img.shields.io/bundlephobia/min/ical-gen-calzone?style=flat

[license-url]: LICENSE
[license-image]: https://img.shields.io/badge/license-ISC-blue.svg?style=flat
