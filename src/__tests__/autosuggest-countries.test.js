import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
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
        vi.unstubAllGlobals();
        cleanup();
    });

    const getMockedFetchQuery = (data) => {
        return vi.fn(() => {
            return Promise.resolve({
                json: () => {
                    return new Promise(res => {
                        setTimeout(()=>{
                            res(data);
                        },1000);
                    });
                }
            })
        });
    }

    it("should show a loading state before API response is received for input - in", async () => {
        vi.stubGlobal("fetch", getMockedFetchQuery(IN_MOCK_DATA));

        render(<CountriesSearchBar />);

        const inputEl = screen.getByRole("textbox");
        await act(async () => {
            fireEvent.change(inputEl, { target: {value: "in" } });
            vi.advanceTimersByTime(500); // debounced search
        });
        
        const loaderBlockEl = screen.getByTestId("loader-block");
        expect(loaderBlockEl).toBeInTheDocument();
    });

    it("should render API response when received and dismiss loading state for input - in", async () => {
        vi.stubGlobal("fetch", getMockedFetchQuery(IN_MOCK_DATA));

        render(<CountriesSearchBar />);

        const inputEl = screen.getByRole("textbox");
        await act(async () => {
            fireEvent.focus(inputEl);
            fireEvent.change(inputEl, { target: { value : "in" } });
            vi.advanceTimersByTime(500); // debounced search
        })

        const loaderBlockEl = screen.getByTestId("loader-block");
        expect(loaderBlockEl).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(1000);
        })
        
        const countriesBlockElArr = screen.getAllByTestId("api-res-unit");
        expect(countriesBlockElArr.length).toBe(39);
    });

    it("should dismiss loading state if input field loses focus for input - in", async () => {
        vi.stubGlobal("fetch", getMockedFetchQuery(IN_MOCK_DATA));

        render(<CountriesSearchBar />);

        const inputEl = screen.getByRole("textbox");
        await act(async () => {
            fireEvent.focus(inputEl);
            fireEvent.change(inputEl, { target : { value: "in" } });
            vi.advanceTimersByTime(500);
        });

        const loaderBlockEl = screen.getByTestId("loader-block");
        expect(loaderBlockEl).toBeInTheDocument();

        await act(async () => {
            fireEvent.blur(inputEl);
        });
        expect(loaderBlockEl).not.toBeInTheDocument();
    });

    it("should dismiss API response state if input field loses focus for input - in", async ()=>{
        vi.stubGlobal("fetch", getMockedFetchQuery(IN_MOCK_DATA));

        render(<CountriesSearchBar />);

        const inputEl = screen.getByRole("textbox");
        await act(async () => {
            fireEvent.focus(inputEl);
            fireEvent.change(inputEl, { target : { value : "in" }});
            vi.advanceTimersByTime(500);
        });
        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        const countriesBlockEl = screen.getByTestId("api-res-block");
        expect(countriesBlockEl).toBeInTheDocument();

        await act(async () => {
            fireEvent.blur(inputEl);
        });

        expect(countriesBlockEl).not.toBeInTheDocument();
    });

    it("should render no countries found UI when API throws an error for input - in", async ()=>{
        const mockedfetchError = vi.fn(() => {
            return Promise.reject(new Error("error in fetching..."));
        });

        vi.stubGlobal("fetch", mockedfetchError);

        render(<CountriesSearchBar />);

        const inputEl = screen.getByRole("textbox");
        await act(async () => {
            fireEvent.focus(inputEl);
            fireEvent.change(inputEl, { target: { value: "in" } });
            vi.advanceTimersByTime(500);
        });
        
        const noCountriesBlock = screen.getByTestId("no-country-res");
        expect(noCountriesBlock).toBeInTheDocument();

    });

    it("should hide API response state if input field is cleared for input - in", async ()=>{
        vi.stubGlobal("fetch", getMockedFetchQuery(IN_MOCK_DATA));

        render(<CountriesSearchBar />);

        const inputEl = screen.getByRole("textbox");
        await act(async () => {
            fireEvent.focus(inputEl);
            fireEvent.change(inputEl, { target: { value: "in" } });
            vi.advanceTimersByTime(500);
        });

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });
        const apiResBlock = screen.getByTestId("api-res-block");
        expect(apiResBlock).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(inputEl, { target: { value: "" } });
        });
        await act(async () => {
            vi.advanceTimersByTime(500);
        });
        expect(apiResBlock).not.toBeInTheDocument();
    });

    it("should render 'no countries found' text, when API response contains no countries for input - qw", async ()=>{
        vi.stubGlobal("fetch", getMockedFetchQuery(WQ_MOCK_DATA));

        render(<CountriesSearchBar />);

        const inputEl = screen.getByRole("textbox");
        await act(async () => {
            fireEvent.focus(inputEl);
            fireEvent.change(inputEl, { target: { value: "wq" } });
            vi.advanceTimersByTime(500);
        });

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });
        const noCountriesBlock = screen.getByTestId("no-country-res");
        expect(noCountriesBlock).toBeInTheDocument();
    });

    it("should show api response state when input field is focussed after being blurred, after response has already be fetched for input - in", async ()=>{
        vi.stubGlobal("fetch", getMockedFetchQuery(IN_MOCK_DATA));

        render(<CountriesSearchBar />);

        const inputEl = screen.getByRole("textbox");
        await act(async () => {
            fireEvent.focus(inputEl);
            fireEvent.change(inputEl, { target: { value: "in" } });
            vi.advanceTimersByTime(500);
        });
        await act(async () => {
            vi.advanceTimersByTime(1000);
        });
        
        const apiResBlock = screen.getByTestId("api-res-block");
        expect(apiResBlock).toBeInTheDocument();

        await act(async () => {
            fireEvent.blur(inputEl);
        });
        expect(apiResBlock).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.focus(inputEl);
        });
        const apiResBlockv2 = screen.getByTestId("api-res-block");
        expect(apiResBlockv2).toBeInTheDocument();
    });
});
