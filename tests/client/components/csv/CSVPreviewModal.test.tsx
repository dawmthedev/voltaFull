import { render, screen } from "@testing-library/react"
import CSVPreviewModal from "../../../../client/src/components/CSVPreviewModal"
import { Provider } from "../../../../client/src/components/ui/provider"

describe("CSVPreviewModal", () => {
  it("shows rows and confirm button", () => {
    const rows = [{ Homeowner: "John", Status: "Open" }]
    render(
      <Provider>
        <CSVPreviewModal isOpen={true} onClose={() => {}} rows={rows} onConfirm={() => {}} />
      </Provider>
    )
    expect(screen.getByDisplayValue("John")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /confirm upload/i })).toBeInTheDocument()
  })
})
