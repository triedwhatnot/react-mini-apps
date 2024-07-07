import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TicTacToe from "../tic-tac-toe";
import { act } from "react-dom/test-utils";

describe("user interactions", () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.resetAllMocks();
        vi.unstubAllGlobals();
        cleanup();
    });


    it("should render 9 boxes initially", () => {
        render(<TicTacToe />);
        const testBoxArr = screen.getAllByTestId("test-box");
        expect(testBoxArr.length).toBe(9);
    });

    it("should render X for 1st player move", () => {
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        
        expect(testBoxArr[0].innerHTML).toBe("X");
    });

    it("should render O for 2nd player move", () => {
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[1]);
        
        expect(testBoxArr[1].innerHTML).toBe("O");
    });

    it("should alternate between players after every move, provided we check for first 5 moves only", () => {
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[1]);
        fireEvent.click(testBoxArr[2]);
        fireEvent.click(testBoxArr[3]);
        fireEvent.click(testBoxArr[4]);
        
        expect(testBoxArr[0].innerHTML).toBe("X");
        expect(testBoxArr[1].innerHTML).toBe("O");
        expect(testBoxArr[2].innerHTML).toBe("X");
        expect(testBoxArr[3].innerHTML).toBe("O");
        expect(testBoxArr[4].innerHTML).toBe("X");
    });

    it("should declare player 1 win for this particular combinations of moves", async () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        const alertSpy = vi.spyOn(window, 'alert');
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[1]);
        fireEvent.click(testBoxArr[2]);
        fireEvent.click(testBoxArr[5]);
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[6]);
        fireEvent.click(testBoxArr[8]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });
        expect(alertSpy).toHaveBeenLastCalledWith('Player 1 won!! Restart Game?');


    });

    it("should declare player 2 win for this particular combinations of moves", async () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        const alertSpy = vi.spyOn(window, 'alert');
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[1]);
        fireEvent.click(testBoxArr[2]);
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[8]);
        fireEvent.click(testBoxArr[7]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });
        expect(alertSpy).toHaveBeenLastCalledWith('Player 2 won!! Restart Game?');
    });

    it("should declare a tie for this particular combinations of moves", async () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        const alertSpy = vi.spyOn(window, 'alert');
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[8]);
        fireEvent.click(testBoxArr[6]);
        fireEvent.click(testBoxArr[2]);
        fireEvent.click(testBoxArr[5]);
        fireEvent.click(testBoxArr[3]);
        fireEvent.click(testBoxArr[1]);
        fireEvent.click(testBoxArr[7]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });
        expect(alertSpy).toHaveBeenLastCalledWith('Game ended in a tie!! Restart Game?');
    });

    it("should declare a tie for this particular combinations of moves", async () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        const alertSpy = vi.spyOn(window, 'alert');
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[6]);
        fireEvent.click(testBoxArr[3]);
        fireEvent.click(testBoxArr[5]);
        fireEvent.click(testBoxArr[1]);
        fireEvent.click(testBoxArr[7]);
        fireEvent.click(testBoxArr[8]);
        fireEvent.click(testBoxArr[2]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });
        expect(alertSpy).toHaveBeenLastCalledWith('Game ended in a tie!! Restart Game?');
    });

    it("should declare player 1 win for this particular combinations of moves", async () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        const alertSpy = vi.spyOn(window, 'alert');
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[8]);
        fireEvent.click(testBoxArr[6]);
        fireEvent.click(testBoxArr[2]);
        fireEvent.click(testBoxArr[5]);
        fireEvent.click(testBoxArr[1]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });
        expect(alertSpy).toHaveBeenLastCalledWith('Player 1 won!! Restart Game?');
    });

    it("should declare player 2 win for this particular combinations of moves", async () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        const alertSpy = vi.spyOn(window, 'alert');
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[1]);
        fireEvent.click(testBoxArr[3]);
        fireEvent.click(testBoxArr[5]);
        fireEvent.click(testBoxArr[6]);
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[8]);
        fireEvent.click(testBoxArr[2]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });
        expect(alertSpy).toHaveBeenLastCalledWith('Player 2 won!! Restart Game?');
    });

    it("should not let player update already filled block by clicking again", () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[0]);

        expect(testBoxArr[0].innerHTML).toBe("X");


        fireEvent.click(testBoxArr[5]);
        expect(testBoxArr[5].innerHTML).toBe("O");
    });

    it("should re-initialise the board on acknowledging the game end alert", async () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        const alertSpy = vi.spyOn(window, 'alert');
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[1]);
        fireEvent.click(testBoxArr[3]);
        fireEvent.click(testBoxArr[5]);
        fireEvent.click(testBoxArr[6]);
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[8]);
        fireEvent.click(testBoxArr[2]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });

        expect(alertSpy).toHaveBeenLastCalledWith('Player 2 won!! Restart Game?');
        expect(testBoxArr[0].innerHTML).toBe(" ");
        expect(testBoxArr[1].innerHTML).toBe(" ");
        expect(testBoxArr[2].innerHTML).toBe(" ");
        expect(testBoxArr[3].innerHTML).toBe(" ");
        expect(testBoxArr[4].innerHTML).toBe(" ");
        expect(testBoxArr[5].innerHTML).toBe(" ");
        expect(testBoxArr[6].innerHTML).toBe(" ");
        expect(testBoxArr[7].innerHTML).toBe(" ");
        expect(testBoxArr[8].innerHTML).toBe(" ");
    });

    it("should re-initialise the board on acknowledging the game end alert and lead to player 2 win with these moves", async () => {
        vi.stubGlobal("alert", vi.fn((arg) => arg));
        const alertSpy = vi.spyOn(window, 'alert');
        
        render(<TicTacToe />);

        const testBoxArr = screen.getAllByTestId("test-box");
        fireEvent.click(testBoxArr[2]);
        fireEvent.click(testBoxArr[6]);
        fireEvent.click(testBoxArr[5]);
        fireEvent.click(testBoxArr[8]);
        fireEvent.click(testBoxArr[7]);
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[3]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });

        expect(alertSpy).toHaveBeenLastCalledWith('Player 2 won!! Restart Game?');

        expect(testBoxArr[0].innerHTML).toBe(" ");
        expect(testBoxArr[1].innerHTML).toBe(" ");
        expect(testBoxArr[2].innerHTML).toBe(" ");
        expect(testBoxArr[3].innerHTML).toBe(" ");
        expect(testBoxArr[4].innerHTML).toBe(" ");
        expect(testBoxArr[5].innerHTML).toBe(" ");
        expect(testBoxArr[6].innerHTML).toBe(" ");
        expect(testBoxArr[7].innerHTML).toBe(" ");
        expect(testBoxArr[8].innerHTML).toBe(" ");

        fireEvent.click(testBoxArr[3]);
        fireEvent.click(testBoxArr[2]);
        fireEvent.click(testBoxArr[1]);
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[4]);
        fireEvent.click(testBoxArr[0]);
        fireEvent.click(testBoxArr[7]);
        fireEvent.click(testBoxArr[6]);

        await act(async () => {
            vi.advanceTimersByTime(500);
        });

        expect(alertSpy).toHaveBeenLastCalledWith('Player 2 won!! Restart Game?');
    });
});
