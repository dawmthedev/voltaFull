import { render, screen } from "@testing-library/react";
import AddProjectModal from "../../../../client/src/components/AddProjectModal";

describe("AddProjectModal", () => {
  it("disables save when required fields missing", () => {
    render(<AddProjectModal isOpen={true} onClose={() => {}} />);
    const save = screen.getByRole("button", { name: /save/i });
    expect(save).toBeDisabled();
  });
});
