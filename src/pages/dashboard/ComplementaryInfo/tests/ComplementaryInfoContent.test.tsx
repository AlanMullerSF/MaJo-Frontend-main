import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import ComplementaryInfo from "../index";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import {
  tableData,
  cardsData,
} from "../../../../../fixtures/complementaryInfo/complementaryInfo";
import { fireEvent, render } from "@testing-library/react";

export const restHandlers = [
  http.post("http://localhost:8080/auth/authenticate", () => {
    return HttpResponse.json({ token: "asodfoiashf" });
  }),
  http.put("http://localhost:8080/complimentary_info", () => {
    return HttpResponse.json(tableData);
  }),
  http.get("http://localhost:8080/cards/complimentary_info", () => {
    return HttpResponse.json(cardsData);
  }),
];

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("ComplementaryInfo Page Cards renders with data", async () => {
  const { findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <ComplementaryInfo />
      </Router>
    </Provider>,
  );

  const beneficiariesWithRegime = await findByText("Beneficiarios con régimen");
  const reasonToJoin = await findByText(
    "Razón principal del acercamiento a la fundación",
  );

  expect(beneficiariesWithRegime).toBeDefined();
  expect(reasonToJoin).toBeDefined();
});

test("ComplementaryInfo Table renders with data", async () => {
  const { getByText, findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <ComplementaryInfo />
      </Router>
    </Provider>,
  );

  const tableButton = getByText("Tabla");
  fireEvent.click(tableButton);

  const beneficiaryText = await findByText("Axel");

  expect(beneficiaryText).toBeDefined();
});
