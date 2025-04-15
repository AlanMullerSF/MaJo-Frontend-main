import { ReactElement, useCallback, useState } from "react";

/**
 * Custom hook for managing a multi-step form.
 * @param {ReactElement[]} steps - An array of React elements representing each step of the form.
 * @returns An object containing the current step index, the current step element, the array of all steps,
 * a boolean indicating if the current step is the first step, a boolean indicating if the current step is the last step,
 * functions to go to a specific step, go to the next step, and go back to the previous step.
 */
export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStateIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentStateIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }, [steps.length]);

  const back = useCallback(() => {
    setCurrentStateIndex((i) => {
      if (i <= 0) return 1;
      return i - 1;
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentStateIndex(index);
  }, []);

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
