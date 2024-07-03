import { cleanup, fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import Stopwatch from "../stopwatch";
import { act } from "react-dom/test-utils";

describe("initial render tests", () => {
    afterEach(() => {
        cleanup();
    });

    it("should render all components initially", () => {
        // render
        render(<Stopwatch />);

        // query
        const headingEl = screen.getByRole("heading", {name : "Get, set, go...!"});
        const timeStampEl = screen.getByText("00:00:000");
        const startBtn = screen.getByRole("button", {name : "Start"});
        const resetBtn = screen.getByRole("button", {name : "Reset"});

        // assertion
        expect(headingEl).toBeInTheDocument();
        expect(timeStampEl).toBeInTheDocument();
        expect(startBtn).toBeInTheDocument();
        expect(resetBtn).toBeInTheDocument();
    });
});


describe('user interaction tests', () => { 
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("should change start button to stop button, when start is clicked", () => {
        render(<Stopwatch />);

        const startBtn = screen.getByRole("button", {name : "Start"});
        fireEvent.click(startBtn);

        const stopBtn = screen.getByRole("button", {name: "Stop"});
        expect(stopBtn).toBeInTheDocument();
    });

    it("should not impact heading, reset button when start is clicked", () => {
        
        render(<Stopwatch />);

        const startBtn = screen.getByRole("button", {name : "Start"});
        fireEvent.click(startBtn);

        const resetBtn = screen.getByRole("button", {name: "Reset"});
        const headingEl = screen.getByRole("heading", {name : "Get, set, go...!"});

        expect(resetBtn).toBeInTheDocument();
        expect(headingEl).toBeInTheDocument();
    });

    it("should change stop button to start button, after stop is clicked", () => {
        render(<Stopwatch />);

        const startBtn = screen.getByRole("button", {name : "Start"});
        fireEvent.click(startBtn);

        const stopBtn = screen.getByRole("button", {name : "Stop"});
        expect(stopBtn).toBeInTheDocument();

        fireEvent.click(stopBtn);
        const startBtnV2 = screen.getByRole("button", {name : "Start"});
        expect(startBtnV2).toBeInTheDocument();
    });

    it("should change stop button to start, after reset button is clicked", () => {
        render(<Stopwatch />);

        const startBtn = screen.getByRole("button", {name : "Start"});
        fireEvent.click(startBtn);

        const stopBtn = screen.getByRole("button", {name : "Stop"});
        expect(stopBtn).toBeInTheDocument();

        const resetBtn = screen.getByRole("button", {name : "Reset"});
        fireEvent.click(resetBtn);

        const startBtnV2 = screen.getByRole("button", {name : "Start"});
        expect(startBtnV2).toBeInTheDocument();
    });

    it("should not have 0 timestamp after start has been clicked", async () => {
        await act(async () => {
            render(<Stopwatch />);
        });

        const startBtn = screen.getByRole("button", {name : "Start"});
        await act(async ()=>{
            fireEvent.click(startBtn);
        });

        await act(async ()=>{
            vi.advanceTimersToNextTimer();
        });

        const timeStampEl = screen.getByTestId("timestampEl");
        expect(timeStampEl.innerHTML).not.toBe("00:00:000");
        
    });

    it("should reset timer to 0, when reset button is clicked after 2 secs", async () => {
        await act(async () => {
            render(<Stopwatch />);
        });

        const startBtn = screen.getByRole("button", {name : "Start"});
        fireEvent.click(startBtn);

        await act(async ()=>{
            vi.advanceTimersByTime(2000);
        });

        const timeStampEl = screen.getByTestId("timestampEl");
        expect(timeStampEl.innerHTML).toBe("00:02:000");

        const resetBtn = screen.getByRole("button", {name : "Reset"});
        await act(async () => {
            fireEvent.click(resetBtn);
        });

        expect(timeStampEl.innerHTML).toBe("00:00:000");
    });

    it("should represent correct timestamp after 5secs haven been passed since start button was clicked", async () => {
        await act(async () => {
            render(<Stopwatch />);
        });

        const startBtn = screen.getByRole("button", {name : "Start"});
        await act(async () => {
            fireEvent.click(startBtn);
        });

        await act(async ()=>{
            vi.advanceTimersByTime(5000);
        });

        const timeStampEl = screen.getByTestId("timestampEl");
        expect(timeStampEl.innerHTML).toBe("00:05:000");
    });

    it("should represent correct timestamp after 11 mins 20sec 340ms haven been passed since start button was clicked", async () => {
        await act(async () => {
            render(<Stopwatch />);
        });

        const startBtn = screen.getByRole("button", {name: "Start"});
        await act(async () => {
            fireEvent.click(startBtn);
        });

        await act(async ()=>{
            vi.advanceTimersByTime(680340);
        });

        const timeStampEl = screen.getByTestId("timestampEl");
        expect(timeStampEl.innerHTML).toBe("11:20:340");
    });
});