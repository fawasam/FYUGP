import { screen, render } from "@testing-library/react";
import Home from "@/app/page";
import { it } from "node:test";

it("should have docs text", () => {
  render(<Home />);

  const myElem = screen.getByText("YOUR DEGREE PARTNER");
  //  expect(myElem).toBeInTheDocument();
});
