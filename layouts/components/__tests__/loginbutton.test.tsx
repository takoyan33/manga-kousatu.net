/**
 * @jest-environment jsdom
 */

import { Loginbutton } from "../button/loginbutton";
import { render } from "@testing-library/react";

test("Loginbuttonのテスト", () => {
  render(<Loginbutton />);
});
