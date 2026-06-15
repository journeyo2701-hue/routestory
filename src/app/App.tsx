import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CMSProvider } from "./context/CMSContext";
import { ConfirmProvider } from "./context/ConfirmContext";

export default function App() {
  return (
    <CMSProvider>
      <ConfirmProvider>
        <RouterProvider router={router} />
      </ConfirmProvider>
    </CMSProvider>
  );
}
