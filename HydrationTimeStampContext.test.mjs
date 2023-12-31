// @ts-check

import { strictEqual } from "node:assert";
import React from "react";

import HydrationTimeStampContext from "./HydrationTimeStampContext.mjs";
import assertBundleSize from "./test/assertBundleSize.mjs";
import createReactTestRenderer from "./test/createReactTestRenderer.mjs";

/**
 * Adds `HydrationTimeStampContext` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add("`HydrationTimeStampContext` bundle size.", async () => {
    await assertBundleSize(
      new URL("./HydrationTimeStampContext.mjs", import.meta.url),
      150
    );
  });

  tests.add("`HydrationTimeStampContext` used as a React context.", () => {
    let contextValue;

    function TestComponent() {
      contextValue = React.useContext(HydrationTimeStampContext);
      return null;
    }

    const value = 1;

    createReactTestRenderer(
      React.createElement(
        HydrationTimeStampContext.Provider,
        { value },
        React.createElement(TestComponent)
      )
    );

    strictEqual(contextValue, value);
  });
};
