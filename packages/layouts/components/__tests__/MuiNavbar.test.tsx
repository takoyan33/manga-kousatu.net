/**
 * @jest-environment jsdom
 */

import { MuiNavbar } from "../MuiNavbar";
import { render } from "@testing-library/react";

test("CardPostのテスト", () => {
  render(<MuiNavbar />);
});
