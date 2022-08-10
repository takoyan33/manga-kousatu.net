/**
 * @jest-environment jsdom
 */

import Avater from "../text/Avater";
import { render, screen } from "@testing-library/react";

test("Avaterのテスト", () => {
  render(<Avater photoURL={""} displayname={""} />);
  screen.debug();
});
