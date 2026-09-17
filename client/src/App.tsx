import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
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
import DeleteAccountPage from "@/pages/delete-account";
import VendorsPage from "@/pages/vendors";
import BlogPage from "@/pages/blog";
import SeoLandingPage from "@/pages/seo-landing";
import RegionalPartnerPage from "@/pages/regional-partner";
import SectionLandingPage from "@/pages/section-landing";
import AdminLoginPage from "@/pages/admin-login";
import AdminPage from "@/pages/admin";
import CookieConsent from "@/components/cookie-consent";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/features/:slug" component={FeaturePage} />
        <Route path="/benefits/:slug" component={BenefitPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/create-account" component={CreateAccountPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/delete-account" component={DeleteAccountPage} />
        <Route path="/vendors" component={VendorsPage} />
        <Route path="/resources" component={BlogPage} />
        <Route path="/regional-partner" component={RegionalPartnerPage} />
        <Route path="/faq" component={SectionLandingPage} />
        <Route path="/climate-positive" component={SectionLandingPage} />
        <Route path="/community-platform" component={SeoLandingPage} />
        <Route path="/community-management-software" component={SeoLandingPage} />
        <Route path="/community-app" component={SeoLandingPage} />
        <Route path="/sports" component={SeoLandingPage} />
        <Route path="/sports/sports-community-platform" component={SeoLandingPage} />
        <Route path="/sports/sports-fan-engagement" component={SeoLandingPage} />
        <Route path="/sports/football-community-platform" component={SeoLandingPage} />
        <Route path="/charities" component={SeoLandingPage} />
        <Route path="/charities/charity-community-platform" component={SeoLandingPage} />
        <Route path="/charities/charity-engagement-platform" component={SeoLandingPage} />
        <Route path="/membership" component={SeoLandingPage} />
        <Route path="/membership/membership-community-platform" component={SeoLandingPage} />
        <Route path="/membership/membership-engagement" component={SeoLandingPage} />
        <Route path="/rewards" component={SeoLandingPage} />
        <Route path="/rewards/community-rewards" component={SeoLandingPage} />
        <Route path="/rewards/community-gamification" component={SeoLandingPage} />
        <Route path="/white-label" component={SeoLandingPage} />
        <Route path="/white-label/white-label-community-platform" component={SeoLandingPage} />
        <Route path="/white-label/white-label-community-app" component={SeoLandingPage} />
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </>
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
