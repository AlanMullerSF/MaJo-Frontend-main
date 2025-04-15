import "./styles.scss";

type Step = {
  step: number;
};

/**
 * Renders a progress bar component with different steps based on the provided step value.
 * @param {Step} step - The current step of the progress bar.
 * @returns The rendered progress bar component.
 */
export default function ProgressBar({ step }: Step) {
  return (
    <div className="progress-bar">
      <div className="progress-circle full">
        <span>Datos Padre/Madre Tutor</span>
      </div>
      <div className="progress-line"></div>
      <div className={step > 1 ? "progress-circle full" : "progress-circle"}>
        <span>Datos Beneficiario</span>
      </div>
      <div className="progress-line"></div>
      <div className={step > 2 ? "progress-circle full" : "progress-circle"}>
        <span>Información de Educación</span>
      </div>
      <div className="progress-line"></div>
      <div className={step > 3 ? "progress-circle full" : "progress-circle"}>
        <span>Información SPW</span>
      </div>
      <div className="progress-line"></div>
      <div className={step > 4 ? "progress-circle full" : "progress-circle"}>
        <span>Información Adicional</span>
      </div>
    </div>
  );
}
