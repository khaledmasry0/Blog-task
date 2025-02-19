import { Button } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "0.5rem",
      }}
      id="error-page"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Button className="mt-4" onClick={() => navigate("/", { replace: true })}>
        go back
      </Button>
    </div>
  );
};
