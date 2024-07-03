import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CountriesSearchBar from "../autosuggest-countries";
import { act } from "react-dom/test-utils";
import IN_MOCK_DATA from "../mocks/in-data.json";
import WQ_MOCK_DATA from "../mocks/wq-data.json";

describe("initial render related test cases", ()=>{

    afterEach(() => {
        cleanup();
    });

    it("should render correct heading text", ()=>{
        render(<CountriesSearchBar />);
        const headingEl = screen.getByRole("heading");
        expect(headingEl).toBeInTheDocument();
    });

    it("should render correct sub-heading text", ()=>{
        render(<CountriesSearchBar />);
        const subheadingEl = screen.getByTestId("subheading");
        expect(subheadingEl).toBeInTheDocument();
    });

    it("should render correct placeholder text in input field", ()=>{
        render(<CountriesSearchBar />);
        const inputEl = screen.getByRole("textbox");
        expect(inputEl.placeholder).toBe("Enter your text here...");
    });

    it("should render empty input box initially", ()=>{
        render(<CountriesSearchBar />);
        const inputEl = screen.getByRole("textbox");
        expect(inputEl.value).toBe("");
    });
});

describe("user interactions - happy flow", () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.resetAllMocks();
        cleanup();
    });

    const fetchMockForInQuery = vi.fn(() => {
        return Promise.resolve({
            json: () => {
                return new Promise(res => {
                    setTimeout(()=>{
                        res(IN_MOCK_DATA);
                    },1000);
                });
            }
        })
    });

    const fetchMockForWqQuery = vi.fn(() => {
        return Promise.resolve({
            json: () => {
                return new Promise(res => {
                    setTimeout(()=>{
                        res(WQ_MOCK_DATA);
                    },1000);
                });
            }
        })
    });


    it("should dismiss loading state if input field loses focus for input - in", ()=>{

    });

    it("should dismiss API response state if input field loses focus for input - in", ()=>{

    });

    it("should render loading state once again, if input field was initally in focus, then blurred and then again focussed before API response is received for input - in", ()=>{

    });

    it("should render API response state once again, if input field was initally in focus, then blurred and then again focussed after API response is received for input - in", ()=>{

    });

    it("should hide API response state if input field is cleared for input - in", ()=>{

    });

    it("should render 'no countries found' text, when API response contains no countries for input - qw", ()=>{

    });
});
