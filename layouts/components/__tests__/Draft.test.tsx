/**
 * @jest-environment jsdom
 */

import  Draft  from "../../draft";
import { render } from "@testing-library/react";

test("Draftのテスト", () => {
  render(<Draft />);
});
