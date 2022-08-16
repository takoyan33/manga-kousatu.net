/**
 * @jest-environment jsdom
 */
import React from "react";
import { Loginbutton } from "../button/loginbutton";
import { render } from "@testing-library/react";

test("Loginbuttonのテスト", () => {
  render(<Loginbutton />);
});
