import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import ParentsTutors from "../index";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import { tableData } from "../../../../../fixtures/parentsTutors/parentsTutors.fixtures";
import { render } from "@testing-library/react";

export const restHandlers = [
  http.post("http://localhost:8080/auth/authenticate", () => {
    return HttpResponse.json({ token: "asodfoiashf" });
  }),
  http.put("http://localhost:8080/tutors", () => {
    return HttpResponse.json(tableData);
  }),
];

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("ParentsTutors Table renders with data", async () => {
  const { findAllByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <ParentsTutors />
      </Router>
    </Provider>,
  );

  const adminData = await findAllByText("Villalvazo");

  expect(adminData).toBeDefined();
});
