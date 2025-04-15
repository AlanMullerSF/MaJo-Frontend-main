import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import Schooling from "../index";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import {
  tableData,
  cardsData,
} from "../../../../../fixtures/schooling/schooling.fixtures";
import { fireEvent, render } from "@testing-library/react";

export const restHandlers = [
  http.post("http://localhost:8080/auth/authenticate", () => {
    return HttpResponse.json({ token: "asodfoiashf" });
  }),
  http.put("http://localhost:8080/scholarship", () => {
    return HttpResponse.json(tableData);
  }),
  http.get("http://localhost:8080/cards/scholarship", () => {
    return HttpResponse.json(cardsData);
  }),
];

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("Schooling Cards renders with data", async () => {
  const { findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/escolaridad" navigator={{}}>
        <Schooling />
      </Router>
    </Provider>,
  );

  const totalBeneficiaries = await findByText(
    "Beneficiarios asisten a la escuela",
  );
  const educationLevel = await findByText(
    "Es el nivel educativo mayormente alcanzado por los beneficiarios",
  );

  expect(totalBeneficiaries).toBeDefined();
  expect(educationLevel).toBeDefined();
});

test("Schooling Table renders with data", async () => {
  const { getByText, findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/escolaridad" navigator={{}}>
        <Schooling />
      </Router>
    </Provider>,
  );

  const tableButton = getByText("Tabla");
  fireEvent.click(tableButton);

  const beneficiaryText = await findByText("Axel");

  expect(beneficiaryText).toBeDefined();
});
