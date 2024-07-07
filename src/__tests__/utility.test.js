import { describe, expect, it } from "vitest";
import { formatMsToMMSS, formatTimeToHHMMSS } from "../utility";

describe("testing formatMsToMMSS", () => {
    it("should return 00:00:000 for 0ms as input", () => {
        expect(formatMsToMMSS(0)).toBe("00:00:000");
    });

    it("should return 01:01:010 for 61010 ms as input", () => {
        expect(formatMsToMMSS(61010)).toBe("01:01:010");
    });

    it("should return 02:00:000 for 120000 ms as input", () => {
        expect(formatMsToMMSS(120000)).toBe("02:00:000");
    });

    it("should return 12:12:120 for 732120 ms as input", () => {
        expect(formatMsToMMSS(732120)).toBe("12:12:120");
    });

    it("should return 00:00:000 for null as input", () => {
        expect(formatMsToMMSS(null)).toBe("00:00:000");
    });

    it("should return 00:00:000 for undefined as input", () => {
        expect(formatMsToMMSS(undefined)).toBe("00:00:000");
    });

    it("should return 00:00:000 for '120' string as input", () => {
        expect(formatMsToMMSS('120')).toBe("00:00:000");
    });

    it("should return 00:00:000 for [] object as input", () => {
        expect(formatMsToMMSS([])).toBe("00:00:000");
    });

    it("should return 00:00:000 for {} as input", () => {
        expect(formatMsToMMSS({})).toBe("00:00:000");
    });

    it("should return 00:00:000 for false as input", () => {
        expect(formatMsToMMSS(false)).toBe("00:00:000");
    });

    it("should return 00:00:000 for NaN as input", () => {
        expect(formatMsToMMSS(NaN)).toBe("00:00:000");
    });

    it("should return 00:00:000 for empty string as input", () => {
        expect(formatMsToMMSS("")).toBe("00:00:000");
    });
});

describe("testing formatTimeToHHMMSS", () => {
    it("should return 00:00:00 for 0 secs as input", () => {
        expect(formatTimeToHHMMSS(0)).toBe("00:00:00");
    });

    it("should return 00:12:06 for 726 secs as input", () => {
        expect(formatTimeToHHMMSS(726)).toBe("00:12:06");
    });

    it("should return 00:12:30 for 750 secs as input", () => {
        expect(formatTimeToHHMMSS(750)).toBe("00:12:30");
    });

    it("should return 12:12:30 for 43950 secs as input", () => {
        expect(formatTimeToHHMMSS(43950)).toBe("12:12:30");
    });

    it("should return 00:00:00 for null as input", () => {
        expect(formatTimeToHHMMSS(null)).toBe("00:00:00");
    });

    it("should return 00:00:00 for undefined as input", () => {
        expect(formatTimeToHHMMSS(undefined)).toBe("00:00:00");
    });

    it("should return 00:00:00 for '120' string as input", () => {
        expect(formatTimeToHHMMSS('120')).toBe("00:00:00");
    });

    it("should return 00:00:00 for [] object as input", () => {
        expect(formatTimeToHHMMSS([])).toBe("00:00:00");
    });

    it("should return 00:00:00 for {} as input", () => {
        expect(formatTimeToHHMMSS({})).toBe("00:00:00");
    });

    it("should return 00:00:00 for false as input", () => {
        expect(formatTimeToHHMMSS(false)).toBe("00:00:00");
    });

    it("should return 00:00:00 for NaN as input", () => {
        expect(formatTimeToHHMMSS(NaN)).toBe("00:00:00");
    });

    it("should return 00:00:00 for empty string as input", () => {
        expect(formatTimeToHHMMSS("")).toBe("00:00:00");
    });
});

