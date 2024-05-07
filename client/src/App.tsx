import { Layout } from "./Layout";
import { PasswordReset } from "./pages/PasswordReset";
import { ProtectedRoute } from "./ProtectedRoute";
import "./index.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { PasswordResetRequest } from "./pages/PasswordResetRequest";
import { PasswordResetRequestAcknowledgement } from "./pages/PasswordResetRequestAcknowledgement";
import { Register } from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/page1" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} />
            </Route>
            <Route path="/" element={<Home />} index />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset-request" element={<PasswordResetRequest />} />
            <Route path="/password-reset-requested" element={<PasswordResetRequestAcknowledgement />} />
            <Route path="/password-reset/:resetCode" element={<PasswordReset />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}
