import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountsPayablePage from "../../../../client/src/pages/AccountsPayablePage";

    expect(
      screen.getByRole("heading", { name: /accounts payable/i })
    ).toBeInTheDocument();
  });
});
