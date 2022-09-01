import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Paging from "./paging";

configure({ adapter: new Adapter() });

describe("<Paging />", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Paging />);
    });
    it("Renderiza un <div>", () => {
      expect(wrapper.find("div")).toHaveLength(1);
    });
    it("Renderiza un <ul> que contenga >> y otro que contenga <<", () => {
      expect(wrapper.find("ul").text()).toBe("<<>>");
    });
  });
});
