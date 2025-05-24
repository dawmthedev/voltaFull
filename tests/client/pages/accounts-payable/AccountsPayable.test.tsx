import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountsPayable from "../../../../client/src/pages/AccountsPayable";

describe("AccountsPayable page", () => {
  it("renders heading and placeholder row", () => {
    render(<AccountsPayable />);
    expect(
      screen.getByRole("heading", { name: /accounts payable/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
