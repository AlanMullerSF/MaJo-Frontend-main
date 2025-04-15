import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import PersonalInfo from "../index";

export const restHandlers = [
  http.post("http://localhost:8080/auth/authenticate", () => {
    return HttpResponse.json({ token: "asodfoiashf", role: "ADMIN" });
  }),
  http.put("http://localhost:8080/personal_info", () => HttpResponse.json([])),
];

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("PersonalInfo Page is rendered", () => {
  const component = renderer.create(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/informacion-personal" navigator={{}}>
        <PersonalInfo />
      </Router>
    </Provider>,
  );
  expect(component).toBeTruthy();
});

test("PersonalInfo Page title renders correctly", () => {
  const component = renderer.create(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/informacion-personal" navigator={{}}>
        <PersonalInfo />
      </Router>
    </Provider>,
  );
  const renderedText = JSON.stringify(component.toJSON());
  expect(renderedText).toContain("Información Personal");
  expect(renderedText).toContain("Descargar Reporte");
});
