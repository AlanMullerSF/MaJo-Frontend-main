import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Lo sentimos, un error ha ocurrido.</p>
      <p>
        <i>
          {(error as { statusText: string }).statusText ||
            (error as { message: string }).message}
        </i>
      </p>
    </div>
  );
}
