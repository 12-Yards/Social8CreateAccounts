import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Clock3, Mail, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarketingFooter from "@/components/marketing-footer";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import logoPath from "@assets/s8logov2_clean.png";

const deletionSteps = [
  "Open Social8 on your iOS or Android device.",
  "Sign in to the account you want to delete.",
  "Tap your profile icon in the top-right corner.",
  "Select Profile from the menu.",
  "Choose Delete Account.",
  "Confirm the deletion request when prompted.",
];

export default function DeleteAccountPage() {
  useEffect(() => {
    updatePageSEO({
      title: "Delete Your Social8 Account | Social8",
      description: "Learn how to permanently delete your Social8 account from the app or request account deletion if you can no longer sign in.",
      url: "/delete-account",
    });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-background to-background" data-testid="page-delete-account">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          <Link href="/">
            <img src={logoPath} alt="Social8 Logo" className="h-10 object-contain cursor-pointer" data-testid="img-delete-account-logo" />
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-delete-account-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-10 md:py-16">
        <section className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl md:px-12 md:py-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">Public help page</p>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl" data-testid="heading-delete-account">
            Delete your Social8 account
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            This page explains how to permanently delete your Social8 account and what happens to your data. You can request deletion from inside the app or contact us if you can no longer sign in.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8" aria-labelledby="delete-in-app">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Smartphone className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="delete-in-app" className="text-xl font-semibold md:text-2xl">Option 1 — Delete from inside the app</h2>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted-foreground">
                  {deletionSteps.map((step) => <li key={step} className="pl-1 leading-7">{step}</li>)}
                </ol>
                <p className="mt-5 rounded-xl bg-muted/60 px-4 py-3 text-sm leading-6 text-muted-foreground">
                  Once confirmed, your account is queued for permanent deletion and you will be signed out.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8" aria-labelledby="request-deletion">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="request-deletion" className="text-xl font-semibold md:text-2xl">Option 2 — Request deletion from Social8</h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  If you cannot access the app, send us an account deletion request using our contact form. Use the email address linked to your Social8 account and include “Delete my account” in your message so we can verify and process your request.
                </p>
                <Link href="/contact">
                  <Button className="mt-5 gap-2" data-testid="button-request-account-deletion">
                    <Mail className="h-4 w-4" />
                    Contact Social8
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border bg-card p-6 shadow-sm" aria-labelledby="what-is-deleted">
              <ShieldCheck className="h-6 w-6 text-emerald-700" aria-hidden="true" />
              <h2 id="what-is-deleted" className="mt-4 text-xl font-semibold">What happens to your data</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Your account and personal profile information will be permanently removed or anonymised, subject to any information we must retain for legal, security or fraud-prevention purposes.
              </p>
            </section>
            <section className="rounded-3xl border bg-card p-6 shadow-sm" aria-labelledby="processing-time">
              <Clock3 className="h-6 w-6 text-emerald-700" aria-hidden="true" />
              <h2 id="processing-time" className="mt-4 text-xl font-semibold">Before you delete</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Account deletion is permanent and cannot be undone. If you manage a community, transfer any responsibilities you need to keep before submitting your request.
              </p>
            </section>
          </div>

          <p className="px-2 text-center text-sm leading-6 text-muted-foreground">
            For more information about how we handle personal data, read our{" "}
            <Link href="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>
            {" "}and{" "}
            <Link href="/terms" className="font-medium text-primary hover:underline">Terms of Service</Link>.
          </p>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}