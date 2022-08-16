/**
 * @jest-environment jsdom
 */

import Openbutton from "../button/Openbutton";
import { render } from "@testing-library/react";

test("Loginbuttonのテスト", () => {
  render(
    <Openbutton
      text={""}
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
});
