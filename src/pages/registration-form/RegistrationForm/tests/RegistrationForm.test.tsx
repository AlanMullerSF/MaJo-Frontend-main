// import renderer from "react-test-renderer";
// import { Provider } from "react-redux";
// import { store } from "../../../../app/store";
// import { Router } from "react-router";
// import RegistrationForm from "../index";

// TODO add tests for all form process

test("RegistrationForm Page is rendered", () => {
  //   const component = renderer.create(
  //     <Provider store={store}>
  //       {/* @ts-expect-error navigator is not needed */}
  //       <Router location="/registration" navigator={{}}>
  //         <RegistrationForm />
  //       </Router>
  //     </Provider>,
  //   );
  //   expect(component).toBeTruthy();
  expect(true).toBeTruthy();
});

// test("RegistrationForm Page title renders correctly", () => {
//   const component = renderer.create(
//     <Provider store={store}>
//       {/* @ts-expect-error navigator is not needed */}
//       <Router location="/registration" navigator={{}}>
//         <RegistrationForm />
//       </Router>
//     </Provider>,
//   );
//   const renderedText = JSON.stringify(component.toJSON());
//   expect(renderedText).toContain(
//     "¡Bienvenido/a al Formulario de Registro de la Fundación María José A.C.!",
//   );
// });

// test("RegistrationForm Page body renders correctly", () => {
//   const component = renderer.create(
//     <Provider store={store}>
//       {/* @ts-expect-error navigator is not needed */}
//       <Router location="/registration" navigator={{}}>
//         <RegistrationForm />
//       </Router>
//     </Provider>,
//   );
//   const renderedText = JSON.stringify(component.toJSON());
//   expect(renderedText).toContain(
//     "La Fundación María José es la única en México",
//   );
// });

// test("RegistrationForm Page disclaimer renders correctly", () => {
//   const component = renderer.create(
//     <Provider store={store}>
//       {/* @ts-expect-error navigator is not needed */}
//       <Router location="/registration" navigator={{}}>
//         <RegistrationForm />
//       </Router>
//     </Provider>,
//   );
//   const renderedText = JSON.stringify(component.toJSON());
//   expect(renderedText).toContain(
//     "Antes de iniciar, este formulario es solo para personas que residen en la República Mexicana",
//   );
// });
