import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountsPayablePage from "../../../../client/src/pages/AccountsPayablePage";

describe("AccountsPayablePage", () => {
  it("renders heading", () => {
    render(<AccountsPayablePage />);
    expect(
      screen.getByRole("heading", { name: /accounts payable/i })
    ).toBeInTheDocument();
  });
});
