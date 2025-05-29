import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountsPayablePage from "../../../../client/src/pages/AccountsPayablePage";
import { Provider } from "../../../../client/src/components/ui/provider";

describe("AccountsPayable page", () => {
  it("renders heading and placeholder row", () => {
    render(
      <Provider>
        <AccountsPayablePage />
      </Provider>
    );
    expect(
      screen.getByRole("heading", { name: /accounts payable/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
