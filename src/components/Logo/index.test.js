import { render } from "@testing-library/react";
import Logo from "../Logo";

describe("Logo component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Logo />);
    expect(container).toBeInTheDocument();
  });

  it("renders with default size (small)", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");

    // Check if `svg` exists in case it's not rendering as expected
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute("width")).toBe("130");
    expect(svg.getAttribute("height")).toBe("60");
  });

  it("renders with large size", () => {
    const { container } = render(<Logo size="large" />);
    const svg = container.querySelector("svg");

    // Check if `svg` exists in case it's not rendering as expected
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute("width")).toBe("160");
    expect(svg.getAttribute("height")).toBe("60");
  });
});
