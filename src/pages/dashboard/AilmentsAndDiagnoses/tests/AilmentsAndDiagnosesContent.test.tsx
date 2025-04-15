import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import AilmentsAndDiagnoses from "../index";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import {
  tableData,
  cardsData,
} from "../../../../../fixtures/ailmentsAndDiagnoses/ailmentsAndDiagnoses";
import { fireEvent, render } from "@testing-library/react";

export const restHandlers = [
  http.post("http://localhost:8080/auth/authenticate", () => {
    return HttpResponse.json({ token: "asodfoiashf" });
  }),
  http.put("http://localhost:8080/diagnostics_ailments", () => {
    return HttpResponse.json(tableData);
  }),
  http.get("http://localhost:8080/cards/diagnostics_ailments", () => {
    return HttpResponse.json(cardsData);
  }),
];

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("AilmentsAndDiagnoses Page Cards renders with data", async () => {
  const { findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <AilmentsAndDiagnoses />
      </Router>
    </Provider>,
  );

  const totalBeneficiaries = await findByText("Beneficiarios en total");
  const femaleBeneficiaries = await findByText("Beneficiarios mujeres");
  const maleBeneficiaries = await findByText("Beneficiarios hombres");
  const geneticDiagnostic = await findByText(
    "Beneficiarios con diagnóstico genético",
  );

  expect(totalBeneficiaries).toBeDefined();
  expect(femaleBeneficiaries).toBeDefined();
  expect(maleBeneficiaries).toBeDefined();
  expect(geneticDiagnostic).toBeDefined();
});

test("AilmentsAndDiagnoses Table renders with data", async () => {
  const { getByText, findByText } = render(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <AilmentsAndDiagnoses />
      </Router>
    </Provider>,
  );

  const tableButton = getByText("Tabla");
  fireEvent.click(tableButton);

  const beneficiaryText = await findByText("Axel");

  expect(beneficiaryText).toBeDefined();
});
