import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import HomePage from "../index";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import { general } from "../../../../../fixtures/general/general.fixtures";
import { generalCards } from "../../../../../fixtures/general/generalCards.fixtures";
import { fireEvent, render } from "@testing-library/react";

export const restHandlers = [
  http.post("http://localhost:8080/auth/authenticate", () => {
    return HttpResponse.json({ token: "asodfoiashf" });
  }),
  http.put("http://localhost:8080/general", () => {
    return HttpResponse.json(general);
  }),
  http.get("http://localhost:8080/cards/general", () => {
    return HttpResponse.json(generalCards);
  }),
];

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("HomePage Cards renders with data", async () => {
  const { findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <HomePage />
      </Router>
    </Provider>,
  );

  const totalBeneficiaries = await findByText("Beneficiarios en total");
  const stateWithMostBeneficiaries = await findByText(
    "Estado con mayor número de beneficiarios",
  );
  const averageAge = await findByText("Edad promedio de los beneficiarios");

  expect(totalBeneficiaries).toBeDefined();
  expect(stateWithMostBeneficiaries).toBeDefined();
  expect(averageAge).toBeDefined();
});

test("HomePage Table renders with data", async () => {
  const { getByText, findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <HomePage />
      </Router>
    </Provider>,
  );

  const tableButton = getByText("Tabla");
  fireEvent.click(tableButton);

  const beneficiaryText = await findByText("Axel");

  expect(beneficiaryText).toBeDefined();
});
