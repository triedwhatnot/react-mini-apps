import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TextDocAnimation from "../text-doc-animation";
import { act } from "react-dom/test-utils";

const getAlertMock = () => {
    return vi.fn(() => true);
}

describe("initial render related tests", () => {
    afterEach(()=>{
        vi.resetAllMocks();
        vi.unstubAllGlobals();
        cleanup();
    });

    it("should render an alert on inital render, giving relevant instructions", () => {
        const alertMock = getAlertMock();
        vi.stubGlobal("alert", alertMock);

        render(<TextDocAnimation />);
        expect(alertMock).toHaveBeenCalledTimes(1);
    });
    
    it("should render both sections on acknowledging alert", () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);

        const textareaEl = screen.getByTestId("textareaEl");
        expect(textareaEl).toBeInTheDocument();

        const notepadEl = screen.getByTestId("notepadEl");
        expect(notepadEl).toBeInTheDocument();
    });

    it("should display correct placeholder text in the textarea i.e. Enter your text here...", () => {
        const alertMock = getAlertMock();
        vi.stubGlobal("alert", alertMock);

        render(<TextDocAnimation />);
        const textareaEl = screen.getByTestId("textareaEl");
        expect(textareaEl.placeholder).toBe("Enter your text here...");
    });
});

describe('user interaction - happy flow', () => { 

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(()=>{
        vi.resetAllMocks();
        vi.unstubAllGlobals();
        cleanup();
    });

    it("should empty the textbox on enter click", async () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);
        const inputEl = screen.getByTestId("textareaEl");
        fireEvent.change(inputEl, { target: { value: "First line of dummy input" }});
        fireEvent.keyDown(inputEl, { key: "Enter" });
        expect(inputEl.value).toBe("");
    });
    
    it("should relfect the textarea text in notepad section on enter click", async () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);

        const dummyText = "Entering some dummy text here";
        const inputEl = screen.getByTestId("textareaEl");
        
        await act(async () => {
            fireEvent.change(inputEl, { target : { value: dummyText }});
            fireEvent.keyDown(inputEl, { key: "Enter" });
        });
        
        const textUnitsArr = screen.getAllByTestId("text-unit");
        expect(textUnitsArr.length).toBe(1);
    });
    
    it("should render multiple enteries of text in correct order in notepad section", async () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);
        
        const inputEl = screen.getByTestId("textareaEl");
        const dummyText1 = "This is a dummy text 1";
        const dummyText2 = "This is a dummy text 2";
        const dummyText3 = "This is a dummy text 3";
        const dummyText4 = "This is a dummy text 4";
        const dummyText5 = "This is a dummy text 5";

        await act(async () => {
            fireEvent.change(inputEl, { target : { value: dummyText1 } });
            fireEvent.keyDown(inputEl, { key: "Enter" });

            fireEvent.change(inputEl, { target : { value: dummyText2 } });
            fireEvent.keyDown(inputEl, { key: "Enter" });

            fireEvent.change(inputEl, { target : { value: dummyText3 } });
            fireEvent.keyDown(inputEl, { key: "Enter" });

            fireEvent.change(inputEl, { target : { value: dummyText4 } });
            fireEvent.keyDown(inputEl, { key: "Enter" });

            fireEvent.change(inputEl, { target : { value: dummyText5 } });
            fireEvent.keyDown(inputEl, { key: "Enter" });
        });

        const textUnitsArr = screen.getAllByTestId("text-unit");
        expect(textUnitsArr[0].innerHTML).toBe(dummyText1);
        expect(textUnitsArr[1].innerHTML).toBe(dummyText2);
        expect(textUnitsArr[2].innerHTML).toBe(dummyText3);
        expect(textUnitsArr[3].innerHTML).toBe(dummyText4);
        expect(textUnitsArr[4].innerHTML).toBe(dummyText5);
    });

    it("should scroll down to last entry of notepad section after text is input and enter is pressed", async () => {
        vi.stubGlobal("alert", getAlertMock());

        await act(async () => {
            render(<TextDocAnimation />);
        });

        const inputEl = screen.getByTestId("textareaEl");
        await act(async () => {
            for(let i = 0; i < 50; i++){
                fireEvent.change(inputEl, { target: { value: "This is a dummy text" }});
                fireEvent.keyDown(inputEl, { key: "Enter" });
                vi.advanceTimersByTime(100);
            }
        });

        const textUnitsArr = screen.getAllByTestId("text-unit");

        const isElementInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
          };


        expect(isElementInViewport(textUnitsArr[textUnitsArr.length - 1])).toBe(true);
    });

    it("should show a fading background color effect when text is rendered in notepad section", async () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);

        const inputEl = screen.getByTestId("textareaEl");
        await act(async () => {
            fireEvent.change(inputEl, { target: { value: "This is a dummy text" }});
            fireEvent.keyDown(inputEl, { key: "Enter" });
        });

        const textUnitsArr = screen.getAllByTestId("text-unit");
        expect(textUnitsArr[0]).toHaveStyle("animation: bg-fade-out 1 2s ease-in-out;");
    });

});

describe("user interaction - edge cases", () => {
    it("shouldn't make an entry in notepad for empty textarea, provided 1 entry is already present in notepad", async () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);

        const inputEl = screen.getByTestId("textareaEl");
        const dummyText = "This is a dummy text";
        await act(async () => {
            fireEvent.change(inputEl, { target: { value: dummyText }});
            fireEvent.keyDown(inputEl, { key: "Enter" });
            fireEvent.keyDown(inputEl, { key: "Enter" });
        });

        const textUnitsArr = screen.getAllByTestId("text-unit");
        expect(textUnitsArr.length).toBe(1);
    });

    it("shouldn't empty textarea value, if any other key is pressed other than enter key", async () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);

        const inputEl = screen.getByTestId("textareaEl");
        const dummyText = "This is a dummy text";
        await act(async () => {
            fireEvent.change(inputEl, { target: { value: dummyText }});
            fireEvent.keyDown(inputEl, { key: "ArrowUp" });
        });
        expect(inputEl.value).toBe(dummyText);
    });

    it("shouldn't move textarea input to notepad section, if any other key is pressed other than enter key. Provided 1 entry is already present in notepad", async () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);

        const inputEl = screen.getByTestId("textareaEl");
        const dummyText = "This is a dummy text";
        await act(async () => {
            fireEvent.change(inputEl, { target: { value: dummyText }});
            fireEvent.keyDown(inputEl, { key: "Enter" });
            fireEvent.change(inputEl, { target: { value: dummyText }});
            fireEvent.keyDown(inputEl, { key: "ArrowUp" });
        });

        const textUnitsArr = screen.getAllByTestId("text-unit");
        expect(textUnitsArr.length).toBe(1);
    });
    
    it("should trim whitespaces before / after text entered in textarea when rendered in notepad section", async () => {
        vi.stubGlobal("alert", getAlertMock());

        render(<TextDocAnimation />);

        const inputEl = screen.getByTestId("textareaEl");
        await act(async () => {
            fireEvent.change(inputEl, { target: { value: "   This is a dummy text    " }});
            fireEvent.keyDown(inputEl, { key: "Enter" });
        });
        const textUnitsArr = screen.getAllByTestId("text-unit");
        expect(textUnitsArr[0].innerHTML).toBe("This is a dummy text");
    });

});
