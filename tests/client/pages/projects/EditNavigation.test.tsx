import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from "../../../../client/src/pages/ProjectsPage";
import ProjectDetailPage from "../../../../client/src/pages/ProjectDetailPage";
import { Provider } from "../../../../client/src/components/ui/provider";
import "@testing-library/jest-dom";

beforeEach(() => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ data: [{ _id: "1", homeowner: "Jane" }] }),
  })
  .mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ data: { _id: "1", homeowner: "Jane" } }),
  })
  .mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ data: [] }),
  });
});

afterEach(() => {
  (global.fetch as jest.Mock).mockRestore();
});

test("navigates to project detail page", async () => {
  render(
    <Provider>
      <MemoryRouter initialEntries={["/dashboard/projects"]}>
        <Routes>
          <Route path="/dashboard/projects" element={<ProjectsPage />} />
          <Route path="/dashboard/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(await screen.findByText("Jane")).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText(/edit project/i));
  expect(await screen.findByText(/project details/i)).toBeInTheDocument();
});
