import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectDetailPage from "../../../../client/src/pages/ProjectDetailPage";
import { Provider } from "../../../../client/src/components/ui/provider";
import "@testing-library/jest-dom";

describe("ProjectDetailPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: { _id: "1", homeowner: "H", contractAmount: 100 } })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: [{ _id: "t1", name: "Tech", role: "tech" }] })
      });
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  it("renders payroll tab", async () => {
    render(
      <Provider>
        <MemoryRouter initialEntries={["/dashboard/projects/1"]}>
          <Routes>
            <Route path="/dashboard/projects/:projectId" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/Project Details/i)).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Payroll/i })).toBeInTheDocument();
  });
});
