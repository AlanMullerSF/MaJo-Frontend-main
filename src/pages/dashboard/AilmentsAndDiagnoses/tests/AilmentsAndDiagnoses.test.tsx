import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import AilmentsAndDiagnoses from "../index";

export const restHandlers = [
  http.post("http://localhost:8080/auth/authenticate", () => {
    return HttpResponse.json({ token: "asodfoiashf" });
  }),
  http.put("http://localhost:8080/diagnostics_ailments", () =>
    HttpResponse.json([]),
  ),
  http.get("http://localhost:8080/cards/diagnostics_ailments", () =>
    HttpResponse.json([]),
  ),
];

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("AilmentsAndDiagnoses Page is rendered", () => {
  const component = renderer.create(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <AilmentsAndDiagnoses />
      </Router>
    </Provider>,
  );
  expect(component).toBeTruthy();
});

test("AilmentsAndDiagnoses Page is rendered without content", () => {
  const component = renderer.create(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <AilmentsAndDiagnoses />
      </Router>
    </Provider>,
  );
  const renderedText = JSON.stringify(component.toJSON());
  expect(renderedText).toContain("No hay información disponible aún");
});

test("AilmentsAndDiagnoses Page title renders correctly", () => {
  const component = renderer.create(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <AilmentsAndDiagnoses />
      </Router>
    </Provider>,
  );
  const renderedText = JSON.stringify(component.toJSON());
  expect(renderedText).toContain("Diagnóstico y Padecimientos");
  expect(renderedText).toContain("Tabla");
  expect(renderedText).toContain("Gráfica");
  expect(renderedText).toContain("Descargar Reporte");
});
