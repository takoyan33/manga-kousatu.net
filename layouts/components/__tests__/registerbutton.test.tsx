/**
 * @jest-environment jsdom
 */

import { Registerbutton } from "../button/registerbutton";
import { render } from "@testing-library/react";

test("Loginbuttonのテスト", () => {
  render(<Registerbutton text={""} />);
});
