/**
 * Renders a disclaimer component with a message and a link to the privacy policy.
 * @returns JSX element representing the disclaimer component.
 */
export default function Disclaimer() {
  return (
    <div>
      <h6 className="disclaimer">
        Disclaimer:
        <br />
        Antes de iniciar, este formulario es solo para personas que residen en
        la República Mexicana.
        <br />
        Para mayor información consulte nuestro Aviso de Privacidad. &nbsp;
        <a href="https://praderwillimexico.org/privacy-policy/">
          Privacy Policy | Prader Willi México
        </a>
      </h6>
    </div>
  );
}
