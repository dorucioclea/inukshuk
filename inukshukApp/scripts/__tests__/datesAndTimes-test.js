/**
 * Created by paul on 26/03/17.
 */
import 'react-native'
import React from 'react'

var datesAndTimes = require('../datesAndTimes');

test('Convert to Month', () => {
    expect(datesAndTimes.toMonth(3,false)).toEqual("April");
});

test('Convert to Month short', () => {
    expect(datesAndTimes.toMonth(5,true)).toEqual("Jun");
});

test('Convert to weekday', () => {
    expect(datesAndTimes.toWeekday(1,false)).toMatch("Monday");
});

test('Convert to weekday short', () => {
    expect(datesAndTimes.toWeekday(2,true)).toMatch("Tue");
});

test('Pad Time', () => {
    expect(datesAndTimes.padTime(4)).toMatch("04");
});

test('Pad time long', () => {
    expect(datesAndTimes.padTime(11)).toMatch("11");
});

test('Convert to time - Morning', () => {
    expect(datesAndTimes.toTwentyFour("11:25 AM")).toEqual([11,25]);
});

test('Convert to time - Afternoon', () => {
    expect(datesAndTimes.toTwentyFour("02:25 PM")).toEqual([14,25]);
});

