import React from "react";
import { test } from "uvu";
// import * as assert from "uvu/assert";
import { matchMedia } from "mock-match-media";
import {
  render,
  screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";
import { MockedProvider } from "@apollo/client/testing";

import Homepage from "@/pages";

test.before((ctx) => {
  registerSuite(ctx);
  window.matchMedia = matchMedia;
});

test.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

test("Homepage", () => {
  render(
    <MockedProvider>
      <Homepage />
    </MockedProvider>
  );
  screen.getByRole("heading", { name: /welcome to apcca 2022/i });
});

test.run();
