import { afterEach, beforeAll, describe, expect, vi } from "vitest";
import CountdownTimer from "../countdown-timer";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("inital state related test cases", () => {

    afterEach(() => {
        cleanup();
    });

    it("should render time input field with 0 mins", () => {
        render(<CountdownTimer />);
        const inputEl = screen.getByRole("spinbutton");
        expect(inputEl.value).toBe("0");
    });

    it("should render 0 timestamp initially", () => {
        render(<CountdownTimer />);
        const timerEl = screen.getByTestId("timer-text");
        expect(timerEl.innerHTML).toBe("00:00:00");
    });

    it("should render start button", () => {
        render(<CountdownTimer />);
        const startBtn = screen.getByRole("button", { name: "Start"});
        expect(startBtn).toBeInTheDocument();
    });

    it("should render reset button", () => {
        render(<CountdownTimer />);
        const resetBtn = screen.getByRole("button", { name: "Reset"});
        expect(resetBtn).toBeInTheDocument();
    });
});

describe('happy flow related test cases', () => { 
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("should update timestamp value when input value changes", () => {
        render(<CountdownTimer />);
        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target: { value: "5" } });
        const timerEl = screen.getByTestId("timer-text");
        expect(timerEl.innerHTML).toBe("00:05:00");
    });

    it("should show 1 sec timestamp after 5 secs have been passed since start was clicked, provided initial start value is 6 secs", async () => {
        render(<CountdownTimer />);
        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target : {value : "0.1"}});
        const startBtn = screen.getByRole("button", {name : "Start"});
        fireEvent.click(startBtn);
        await act(async () => {
            vi.advanceTimersByTime(5000);
        });
        const timerEl = screen.getByTestId("timer-text");
        expect(timerEl.innerHTML).toBe("00:00:01");
    });

    it("should show pause button in place of start buttom after start was clicked, provided initial start value is 6 secs", () => {
        render(<CountdownTimer />);
        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target : { value: "0.1"}});
        const startBtn = screen.getByRole("button", { name: "Start"});
        fireEvent.click(startBtn);
        const pauseBtn = screen.getByRole("button", { name: "Pause"});
        expect(pauseBtn).toBeInTheDocument();
    });

    it("should show a timestamp of 2secs and change pause button to start buttom after pause is clicked after 4secs on a running timer, provided initial start value is 6 secs", async () => {
        render(<CountdownTimer />);
        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target: { value: "0.1" }});
        const startBtn = screen.getByRole("button", { name: "Start"});
        fireEvent.click(startBtn);
        await act(async () => {
            vi.advanceTimersByTime(4000);
        });
        
        const timerTextEl = screen.getByTestId("timer-text");
        expect(timerTextEl.innerHTML).toBe("00:00:02");
        expect(startBtn).toBeInTheDocument();
    });

    it("should reset timestamp to initial value and pause button to start button while timer is running and reset button is clicked after 4secs, provided initial start value is 6 secs", async () => {
        render(<CountdownTimer />);

        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target : { value : "0.1" } });
        const startBtn = screen.getByRole("button", {name: "Start"});
        fireEvent.click(startBtn);
        await act(async () => {
            vi.advanceTimersByTime(4000);
        });
        const resetBtn = screen.getByRole("button", { name : "Reset"});
        fireEvent.click(resetBtn);

        const timerTextEl = screen.getByTestId("timer-text");
        expect(timerTextEl.innerHTML).toBe("00:00:06");
        expect(startBtn).toBeInTheDocument();
    });

    it("should reset timestamp to initial value and pause button to start button while timer is paused and reset button is clicked after 4secs, provided initial start value is 6 secs", async () => {
        render(<CountdownTimer />);

        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target : { value : "0.1" } });
        const startBtn = screen.getByRole("button", {name: "Start"});
        fireEvent.click(startBtn);
        await act(async () => {
            vi.advanceTimersByTime(4000);
        });
        const pauseBtn = screen.getByRole("button", { name: "Pause" });
        fireEvent.click(pauseBtn);
        const resetBtn = screen.getByRole("button", { name : "Reset"});
        fireEvent.click(resetBtn);

        const timerTextEl = screen.getByTestId("timer-text");
        expect(timerTextEl.innerHTML).toBe("00:00:06");
        expect(startBtn).toBeInTheDocument();
    });

    it("should reset input value and timestamp to 0 after timer has completed running its course and user has acknowledged time's up alert, provided initial start value is 6 secs", async () => {
        render(<CountdownTimer />);

        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target : { value: "0.1" } });
        const startBtn = screen.getByRole("button", { name: "Start" });
        fireEvent.click(startBtn);

        const alertMock = vi.fn(() => true);
        vi.stubGlobal('alert', alertMock);

        await act(async () => {
            vi.advanceTimersByTime(6000);
        });
        expect(inputEl.value).toBe("0");
        const timerTextEl = screen.getByTestId("timer-text");
        expect(timerTextEl.innerHTML).toBe("00:00:00");
        
    });

    it("should show alert of time's up after 6 secs have been passed since start was clicked, provided initial start value is 6 secs", async () => {
        render(<CountdownTimer />);

        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target : { value: "0.1" } });
        const startBtn = screen.getByRole("button", { name: "Start" });
        fireEvent.click(startBtn);
        
        const alertMock = vi.fn(() => true);
        vi.stubGlobal('alert', alertMock);

        await act(async () => {
            vi.advanceTimersByTime(6000);
        });
        expect(alertMock).toHaveBeenCalledTimes(1);
    });

    it("should convert  mins into HH:MM:SS correctly", async () => {
        render(<CountdownTimer />);

        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target : { value: "610.5" } });

        const timerTextEl = screen.getByTestId("timer-text");
        expect(timerTextEl.innerHTML).toBe("10:10:30");
    });   

});

describe("edge case related test cases", () => {
    afterEach(() => {
        cleanup();
    });

    it("should change nothing, when input value is zero and start is clicked", async () => {
        render(<CountdownTimer />);

        const inputEl = screen.getByRole("spinbutton");
        expect(inputEl.value).toBe("0");

        const startBtn = screen.getByRole("button", { name: "Start" });
        await act(async () => {
            fireEvent.click(startBtn);
        });

        const timerTextEl = screen.getByTestId("timer-text");
        expect(timerTextEl.innerHTML).toBe("00:00:00");
        expect(startBtn).toBeInTheDocument();
    });
    
    it("should change nothing, when input value is zero and reset is clicked", async () => {
        render(<CountdownTimer />);

        const inputEl = screen.getByRole("spinbutton");
        expect(inputEl.value).toBe("0");

        const resetBtn = screen.getByRole("button", { name: "Reset" });
        await act(async () => {
            fireEvent.click(resetBtn);
        });

        const timerTextEl = screen.getByTestId("timer-text");
        expect(timerTextEl.innerHTML).toBe("00:00:00");
        const startBtn = screen.getByRole("button", { name: "Start" });
        expect(startBtn).toBeInTheDocument();
    });
    
    it("should change nothing, when input value is 6 secs and reset is clicked", async () => {
        render(<CountdownTimer />);

        const inputEl = screen.getByRole("spinbutton");
        fireEvent.change(inputEl, { target: { value: "0.1" } });

        const resetBtn = screen.getByRole("button", { name: "Reset" });
        await act(async () => {
            fireEvent.click(resetBtn);
        });

        const timerTextEl = screen.getByTestId("timer-text");
        expect(timerTextEl.innerHTML).toBe("00:00:06");
        const startBtn = screen.getByRole("button", { name: "Start" });
        expect(startBtn).toBeInTheDocument();
    });
});
