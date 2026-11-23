import { describe, expect, it } from "vitest";

import { getTimeLeft } from "./countdown";

describe("getTimeLeft", () => {
  it("splits the remaining time into days, hours, minutes and seconds", () => {
    const target = new Date("2027-02-14T19:00:00+05:30");
    const now = new Date("2027-02-12T16:58:30+05:30");
    expect(getTimeLeft(target, now)).toEqual({
      days: 2,
      hours: 2,
      minutes: 1,
      seconds: 30,
      done: false,
    });
  });

  it("shows zeros once the wedding has started", () => {
    const target = new Date("2027-02-14T19:00:00+05:30");
    const now = new Date("2027-02-14T19:00:01+05:30");
    expect(getTimeLeft(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      done: true,
    });
  });
});
