import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import ControlPanel from "../index";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import { tableData } from "../../../../../fixtures/staff/staff.fixtures";
import { render } from "@testing-library/react";

export const restHandlers = [
  http.post("http://localhost:8080/auth/authenticate", () => {
    return HttpResponse.json({ token: "asodfoiashf", role: "ADMIN" });
  }),
  http.put("http://localhost:8080/staff", () => {
    return HttpResponse.json(tableData);
  }),
];

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("ControlPanel Table renders with data", async () => {
  const { findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/control-panel" navigator={{}}>
        <ControlPanel />
      </Router>
    </Provider>,
  );

  const staff = await findByText("admin");

  expect(staff).toBeDefined();
});
