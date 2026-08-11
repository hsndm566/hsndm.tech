/**
 * Design reminder — Operational Clarity: routes should keep every interaction in a clear,
 * legible service journey, including recovery states and enquiry completion.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Enquire from "@/pages/Enquire";
import NotFound from "@/pages/NotFound";
import ThankYou from "@/pages/ThankYou";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import "./updates.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/enquire" component={Enquire} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
