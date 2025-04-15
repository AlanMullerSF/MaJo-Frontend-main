import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Router } from "react-router";
import Login from "../index";

test("Login Page is rendered", () => {
  const component = renderer.create(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <Login />
      </Router>
    </Provider>,
  );
  expect(component).toBeTruthy();
});

test("Login Page renders login form correctly", () => {
  const component = renderer.create(
    <Provider store={store}>
      {/* @ts-expect-error navigator is not needed */}
      <Router location="/" navigator={{}}>
        <Login />
      </Router>
    </Provider>,
  );
  const renderedText = JSON.stringify(component.toJSON());
  expect(renderedText).toContain("Iniciar sesión");
  expect(renderedText).toContain("Correo Electrónico");
  expect(renderedText).toContain("Contraseña");
});
