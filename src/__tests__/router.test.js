import { cleanup, render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ROUTES } from "../constant";
import Routes from "../routes";

describe("Routing related tests", () => {

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.resetAllMocks();
        cleanup();
    });

    it("should render countdown timer", () => {
        const router = createMemoryRouter(Routes, {
            initialEntries: [`${ROUTES.COUNTDOWN_TIMER}`],
            initialIndex: 0,
          });
        
        render(<RouterProvider router={router} />);

        const timerHeadingEl = screen.getByText("Enter time in min(s)");
        expect(timerHeadingEl).toBeInTheDocument();
    });

    it("should render stopwatch", () => {
        const router = createMemoryRouter(Routes, {
            initialEntries: [`${ROUTES.STOPWATCH}`],
            initialIndex: 0,
          });
        
        render(<RouterProvider router={router} />);

        const headingEl = screen.getByText("Get, set, go...!");
        expect(headingEl).toBeInTheDocument();
    });

    it("should render tic-tac-toe", () => {
        const router = createMemoryRouter(Routes, {
            initialEntries: [`${ROUTES.TIC_TAC_TOE}`],
            initialIndex: 0,
          });
        
        render(<RouterProvider router={router} />);

        const inputBlockArr = screen.getAllByTestId("test-box");
        expect(inputBlockArr.length).toBe(9);
    });

    it("should render notepad", () => {
        const alertMock = vi.fn(() => true);
        vi.stubGlobal("alert", alertMock);

        const router = createMemoryRouter(Routes, {
            initialEntries: [`${ROUTES.TEXT_DOC_ANIMATION}`],
            initialIndex: 0,
          });
        
        render(<RouterProvider router={router} />);

        const textAreaEl = screen.getByTestId("textareaEl");
        expect(textAreaEl).toBeInTheDocument();
    });

    it("should render autosuggest countries", () => {
        const router = createMemoryRouter(Routes, {
            initialEntries: [`${ROUTES.DEBOUNCED_SEARCH}`],
            initialIndex: 0,
          });
        
        render(<RouterProvider router={router} />);

        const headingEl = screen.getByText("Where do you wanna go next ?");
        expect(headingEl).toBeInTheDocument();
    });


});