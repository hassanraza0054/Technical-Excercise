import React from "react";
import { Provider } from "react-redux";
import { item1, item2 } from "../../utilities/testData";
import * as actionCreators from "../../store/actions/layout";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../Layout";
import { store } from "../../store";
afterEach(cleanup);

function renderWithRedux(component) {
  return { ...render(<Provider store={store}>{component}</Provider>) };
}

it("Renders store button [Layout Component]", () => {
  const { getByTestId } = renderWithRedux(<Layout />);
  expect(getByTestId("storeBtn")).toHaveTextContent("Open Store");
});

it("Renders view button [Layout Component]", () => {
  const { getByTestId } = renderWithRedux(<Layout />);
  expect(getByTestId("viewBtn")).toHaveTextContent("Home View");
});

it("Renders ItemCategories Component", async () => {
  await store.dispatch(actionCreators.initialize());
  store.dispatch(actionCreators.storeOpen());

  const { getByTestId } = renderWithRedux(<Layout />);
  const node = getByTestId("itemContainer");

  expect(node.children).toHaveLength(1);
});

it("Renders ItemGroups Component", async () => {
  await store.dispatch(actionCreators.initialize());
  store.dispatch(actionCreators.storeOpen());
  store.dispatch(
    actionCreators.groupsOpen({
      itemCategoryIndex: 0,
      activeCategoryName: "Skin",
    })
  );

  const { getByTestId } = renderWithRedux(<Layout />);
  const node = getByTestId("itemContainer");

  expect(node.children).toHaveLength(2);
});

it("Renders Items Component", async () => {
  await store.dispatch(actionCreators.initialize());
  store.dispatch(actionCreators.storeOpen());
  store.dispatch(
    actionCreators.groupsOpen({
      itemCategoryIndex: 0,
      activeCategoryName: "Skin",
    })
  );
  store.dispatch(
    actionCreators.itemsOpen({
      itemGroupIndex: 0,
      activeGroupName: "Cleanse",
    })
  );

  const { getByTestId } = renderWithRedux(<Layout />);
  const node = getByTestId("itemContainer");

  expect(node.children).toHaveLength(3);
});

it("Renders Item Component [with 0 ItemVariant Component]", async () => {
  await store.dispatch(actionCreators.initialize());
  store.dispatch(actionCreators.storeOpen());
  store.dispatch(
    actionCreators.groupsOpen({
      itemCategoryIndex: 0,
      activeCategoryName: "Skin",
    })
  );
  store.dispatch(
    actionCreators.itemsOpen({
      itemGroupIndex: 0,
      activeGroupName: "Cleanse",
    })
  );
  store.dispatch(actionCreators.itemVariantsOpen(item1));

  const { getByTestId } = renderWithRedux(<Layout />);
  const node = document.querySelectorAll('[data-testid="itemVariant"]');
  expect(node.length).toEqual(0);
});

it("Renders Item Component [with 2 Item Variant Components]", async () => {
  await store.dispatch(actionCreators.initialize());
  store.dispatch(actionCreators.storeOpen());
  store.dispatch(
    actionCreators.groupsOpen({
      itemCategoryIndex: 0,
      activeCategoryName: "Skin",
    })
  );
  store.dispatch(
    actionCreators.itemsOpen({
      itemGroupIndex: 0,
      activeGroupName: "Cleanse",
    })
  );
  store.dispatch(actionCreators.itemVariantsOpen(item2));

  const { getByTestId } = renderWithRedux(<Layout />);
  const node = document.querySelectorAll('[data-testid="itemVariant"]');
  expect(node.length).toEqual(2);
});
