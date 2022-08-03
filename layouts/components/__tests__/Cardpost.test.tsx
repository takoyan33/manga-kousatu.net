/**
 * @jest-environment jsdom
 */

import { Cardpost } from "../../Cardpost";
import { render } from "@testing-library/react";

test("CardPostのテスト", () => {
  render(
    <Cardpost
      downloadURL={""}
      id={0}
      title={""}
      categori={""}
      netabare={""}
      context={""}
      email={""}
      photoURL={""}
      displayname={""}
      createtime={""}
      likecount={0}
    />
  );
});
