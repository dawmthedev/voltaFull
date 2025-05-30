import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectDetailPage from "../../../../client/src/pages/ProjectDetailPage";
import { Provider } from "../../../../client/src/components/ui/provider";
import "@testing-library/jest-dom";

describe("ProjectDetailPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: { id: "1", homeowner: "H", contractAmount: 100, payroll: [{ technicianId: 't1', percentage: 50 }] } })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: [{ _id: "t1", name: "Tech", role: "tech" }] })
      })
      .mockResolvedValue({ ok: true });
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

  it("posts allocations on save", async () => {
    render(
      <Provider>
        <MemoryRouter initialEntries={["/dashboard/projects/1"]}>
          <Routes>
            <Route path="/dashboard/projects/:projectId" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText(/Project Details/i);
    fireEvent.click(screen.getByRole("tab", { name: /Payroll/i }));

    fireEvent.change(screen.getAllByPlaceholderText(/Select Technician/i)[0], {
      target: { value: "t1" },
    });
    fireEvent.change(screen.getAllByRole("spinbutton")[0], {
      target: { value: "50" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save Payroll/i }));

    await screen.findByRole("button", { name: /Save Payroll/i });

    expect((global.fetch as jest.Mock).mock.calls[2][0]).toContain(
      "/rest/projects/1/payroll"
    );
    expect((global.fetch as jest.Mock).mock.calls[2][1]).toMatchObject({
      method: "POST",
    });
  });
});
