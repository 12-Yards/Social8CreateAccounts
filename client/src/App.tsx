import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import FeaturePage from "@/pages/feature";
import BenefitPage from "@/pages/benefit";
import LoginPage from "@/pages/login";
import CreateAccountPage from "@/pages/create-account";
import ContactPage from "@/pages/contact";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import BlogPage from "@/pages/blog";
import AdminLoginPage from "@/pages/admin-login";
import AdminPage from "@/pages/admin";
import CookieConsent from "@/components/cookie-consent";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/features/:slug" component={FeaturePage} />
      <Route path="/benefits/:slug" component={BenefitPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/create-account" component={CreateAccountPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
