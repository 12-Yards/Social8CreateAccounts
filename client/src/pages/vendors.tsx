import { useEffect, useState, type FormEvent } from "react";
import { Link } from "wouter";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Coins,
  Handshake,
  LayoutDashboard,
  ListChecks,
  Loader2,
  LockKeyhole,
  LogIn,
  LogOut,
  PackageCheck,
  Pencil,
  Plus,
  ReceiptText,
  RefreshCw,
  Sparkles,
  Store,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MarketingFooter from "@/components/marketing-footer";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import logoPath from "@assets/s8logov2_clean.png";

const API_BASE = "https://social8.app";
const TOKEN_KEY = "social8_vendor_token";

type VendorModal = "signin" | "signup" | "dashboard";
type DashboardTab = "overview" | "profile" | "listings" | "redemptions" | "statement";
type VendorStatus = "pending" | "active" | "declined" | string;

type VendorUser = {
  id?: string;
  email?: string;
  accountType?: string;
  status?: VendorStatus;
  vendorName?: string;
  vendorDescription?: string;
  vendorWebsite?: string;
  contactName?: string;
  contactPhone?: string;
  [key: string]: unknown;
};

type VendorListing = {
  id?: string | number;
  title?: string;
  name?: string;
  description?: string;
  points?: number;
  pointsCost?: number;
  pricePoints?: number;
  active?: boolean;
  isActive?: boolean;
  [key: string]: unknown;
};

type AuthResult = {
  token?: string;
  user?: VendorUser;
  pendingApproval?: boolean;
  message?: string;
  [key: string]: unknown;
};

type ListingForm = {
  id: string | null;
  title: string;
  description: string;
  points: string;
};

const emptyListingForm: ListingForm = {
  id: null,
  title: "",
  description: "",
  points: "",
};

async function apiRequest(path: string, init: RequestInit = {}, token?: string | null): Promise<any> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
  const responseText = await response.text();
  let data: any = {};

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    data = { message: responseText };
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "The vendor service could not complete that request.");
  }

  return data;
}

function getUser(value: unknown): VendorUser {
  if (value && typeof value === "object") {
    const candidate = value as Record<string, unknown>;
    return (candidate.user && typeof candidate.user === "object" ? candidate.user : candidate) as VendorUser;
  }
  return {};
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function getCollection(value: unknown, keys: string[]): VendorListing[] {
  if (Array.isArray(value)) return value as VendorListing[];
  const record = asRecord(value);
  for (const key of keys) {
    if (Array.isArray(record[key])) return record[key] as VendorListing[];
  }
  return [];
}

function displayValue(value: unknown, fallback = "—"): string {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function statusLabel(status: VendorStatus | undefined): string {
  if (status === "active") return "Approved";
  if (status === "declined") return "Declined";
  return "Pending approval";
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      <span>{label}{required && <span className="text-destructive"> *</span>}</span>
      {children}
    </label>
  );
}

function ModalHeading({
  modal,
  title,
  description,
}: {
  modal: VendorModal;
  title: string;
  description: string;
}) {
  return (
    <DialogHeader className="flex shrink-0 flex-row items-center gap-3 border-b bg-background px-5 py-3 pr-14 text-left">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
        {modal === "signin" && <LogIn className="h-4 w-4" />}
        {modal === "signup" && <Sparkles className="h-4 w-4" />}
        {modal === "dashboard" && <LayoutDashboard className="h-4 w-4" />}
      </div>
      <div>
        <DialogTitle className="text-base">{title}</DialogTitle>
        <DialogDescription className="mt-1 text-xs">{description}</DialogDescription>
      </div>
    </DialogHeader>
  );
}

function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive" role="alert">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

function SignInView({
  onAuthenticated,
  onSwitchSignup,
}: {
  onAuthenticated: (result: AuthResult) => void;
  onSwitchSignup: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Enter your email address and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password, accountType: "vendor" }),
      }) as AuthResult;
      const token = result.token || null;
      const user = result.user || getUser(await apiRequest("/api/auth/user", {}, token));
      if (user.accountType && user.accountType !== "vendor") {
        throw new Error("This account is not a vendor account.");
      }
      if (user.status === "declined") {
        throw new Error("This vendor application was declined. Please contact Social8 if you need help.");
      }
      onAuthenticated({ ...result, token: token || undefined, user });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <form onSubmit={submit} className="mx-auto grid max-w-md gap-5 p-6 sm:p-10">
        <div>
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your vendor account and offers.</p>
        </div>
        <ErrorMessage message={error} />
        <div className="grid gap-4">
          <Field label="Email address" required>
            <Input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Field>
          <Field label="Password" required>
            <Input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </Field>
        </div>
        <Button type="submit" disabled={loading} className="w-full gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign In
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          New to Social8?{" "}
          <button type="button" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400" onClick={onSwitchSignup}>
            Register as a Vendor
          </button>
        </p>
      </form>
    </div>
  );
}

function SignUpView({
  onAuthenticated,
  onSwitchSignin,
}: {
  onAuthenticated: (result: AuthResult) => void;
  onSwitchSignin: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorDescription, setVendorDescription] = useState("");
  const [vendorWebsite, setVendorWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => setCooldown((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  async function requestOtp(event?: FormEvent) {
    event?.preventDefault();
    setError("");
    setMessage("");
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const result = await apiRequest("/api/auth/signup/request-otp", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), accountType: "vendor" }),
      });
      setStep(2);
      setCooldown(60);
      setMessage(result.message || "Verification code sent. Check your email.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to send the verification code.");
    } finally {
      setLoading(false);
    }
  }

  async function createAccount(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!otp.trim() || !password || !vendorName.trim() || !contactName.trim() || !contactPhone.trim()) {
      setError("Complete all required fields before creating your account.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const body: Record<string, string> = {
        email: email.trim(),
        password,
        otp: otp.trim(),
        accountType: "vendor",
        vendorName: vendorName.trim(),
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
      };
      if (vendorDescription.trim()) body.vendorDescription = vendorDescription.trim();
      if (vendorWebsite.trim()) body.vendorWebsite = vendorWebsite.trim();
      const result = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(body),
      }) as AuthResult;
      const token = result.token || null;
      const user = result.user || getUser(await apiRequest("/api/auth/user", {}, token));
      onAuthenticated({ ...result, token: token || undefined, user });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to create your vendor account.");
    } finally {
      setLoading(false);
    }
  }

  if (step === 1) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto">
        <form onSubmit={requestOtp} className="mx-auto grid max-w-md gap-5 p-6 sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold">Register as a Vendor</h2>
            <p className="mt-1 text-sm text-muted-foreground">Start with your email address and we’ll send you a verification code.</p>
          </div>
          <ErrorMessage message={error} />
          {message && <div className="rounded-lg border border-emerald-300/50 bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">{message}</div>}
          <Field label="Email address" required>
            <Input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Field>
          <Button type="submit" disabled={loading} className="w-full gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Send Verification Code
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <button type="button" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400" onClick={onSwitchSignin}>
              Vendor Sign In
            </button>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <form onSubmit={createAccount} className="mx-auto grid max-w-2xl gap-5 p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Complete your vendor profile</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enter the code from your email. It expires after 10 minutes.</p>
          </div>
          <Badge variant="outline">Step 2 of 2</Badge>
        </div>
        <ErrorMessage message={error} />
        {message && <div className="rounded-lg border border-emerald-300/50 bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">{message}</div>}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email address" required>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Field>
          <Field label="Verification code" required>
            <Input inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => setOtp(event.target.value)} />
          </Field>
          <Field label="Password" required>
            <Input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </Field>
          <div className="flex items-end">
            <Button type="button" variant="outline" disabled={loading || cooldown > 0} onClick={() => requestOtp()} className="w-full gap-2">
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </Button>
          </div>
          <Field label="Business name" required>
            <Input value={vendorName} onChange={(event) => setVendorName(event.target.value)} />
          </Field>
          <Field label="Contact name" required>
            <Input value={contactName} onChange={(event) => setContactName(event.target.value)} />
          </Field>
          <Field label="Contact telephone" required>
            <Input type="tel" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} />
          </Field>
          <Field label="Website">
            <Input type="url" placeholder="https://" value={vendorWebsite} onChange={(event) => setVendorWebsite(event.target.value)} />
          </Field>
        </div>
        <Field label="Business description">
          <Textarea value={vendorDescription} onChange={(event) => setVendorDescription(event.target.value)} placeholder="Tell communities what you offer." />
        </Field>
        <Button type="submit" disabled={loading} className="w-full gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Vendor Account
        </Button>
      </form>
    </div>
  );
}

function StatusBanner({ status }: { status: VendorStatus | undefined }) {
  if (status === "active") {
    return <div className="flex items-center gap-2 rounded-lg border border-emerald-300/50 bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"><CheckCircle2 className="h-4 w-4" /> Your vendor account is approved.</div>;
  }
  if (status === "declined") {
    return <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> Your vendor application was declined.</div>;
  }
  return <div className="flex items-start gap-2 rounded-lg border border-amber-300/60 bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><span><strong>Pending approval.</strong> You can update your profile and prepare listings. Redemptions and financial features become available after approval.</span></div>;
}

function DashboardView({
  token,
  user,
  onLogout,
  onClose,
}: {
  token: string | null;
  user: VendorUser;
  onLogout: () => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<DashboardTab>("overview");
  const [profile, setProfile] = useState<Record<string, unknown>>(user);
  const [profileForm, setProfileForm] = useState<Record<string, string>>({
    vendorName: user.vendorName || "",
    vendorDescription: user.vendorDescription || "",
    vendorWebsite: user.vendorWebsite || "",
    vendorAddressLine1: "",
    vendorCity: "",
    vendorPostcode: "",
    vendorCountry: "United Kingdom",
    contactName: user.contactName || "",
    contactPhone: user.contactPhone || "",
  });
  const [listings, setListings] = useState<VendorListing[]>([]);
  const [redemptions, setRedemptions] = useState<VendorListing[]>([]);
  const [statement, setStatement] = useState<Record<string, unknown>>({});
  const [listingForm, setListingForm] = useState<ListingForm>(emptyListingForm);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingListing, setSavingListing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const isApproved = user.status === "active";

  async function loadDashboard() {
    setLoading(true);
    setError("");
    const failures: string[] = [];
    try {
      const profileResult = await apiRequest("/api/vendor/profile", {}, token);
      const nextProfile = asRecord(profileResult?.profile || profileResult);
      setProfile(nextProfile);
      setProfileForm((current) => ({
        ...current,
        ...Object.fromEntries(Object.keys(current).map((key) => [key, displayValue(nextProfile[key], current[key])])),
      }));
    } catch (requestError) {
      failures.push(requestError instanceof Error ? requestError.message : "Unable to load your profile.");
    }
    try {
      const listingsResult = await apiRequest("/api/vendor/listings", {}, token);
      setListings(getCollection(listingsResult, ["listings", "items", "data"]));
    } catch (requestError) {
      failures.push(requestError instanceof Error ? requestError.message : "Unable to load your listings.");
    }
    if (isApproved) {
      try {
        const redemptionsResult = await apiRequest("/api/vendor/redemptions", {}, token);
        setRedemptions(getCollection(redemptionsResult, ["redemptions", "items", "data"]));
      } catch (requestError) {
        failures.push(requestError instanceof Error ? requestError.message : "Unable to load redemptions.");
      }
      try {
        const statementResult = await apiRequest("/api/vendor/statement", {}, token);
        setStatement(asRecord(statementResult?.statement || statementResult));
      } catch (requestError) {
        failures.push(requestError instanceof Error ? requestError.message : "Unable to load your statement.");
      }
    }
    setError(failures[0] || "");
    setLoading(false);
  }

  useEffect(() => {
    void loadDashboard();
  }, [token, user.status]);

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setSavingProfile(true);
    setError("");
    setNotice("");
    try {
      const result = await apiRequest("/api/vendor/profile", {
        method: "PUT",
        body: JSON.stringify(profileForm),
      }, token);
      setProfile(asRecord(result?.profile || result));
      setNotice("Profile saved.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save your profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function saveListing(event: FormEvent) {
    event.preventDefault();
    if (!listingForm.title.trim()) {
      setError("Enter a title for the listing.");
      return;
    }
    setSavingListing(true);
    setError("");
    setNotice("");
    try {
      const body = {
        title: listingForm.title.trim(),
        description: listingForm.description.trim(),
        points: listingForm.points ? Number(listingForm.points) : undefined,
        active: true,
      };
      const path = listingForm.id ? `/api/vendor/listings/${listingForm.id}` : "/api/vendor/listings";
      const result = await apiRequest(path, {
        method: listingForm.id ? "PUT" : "POST",
        body: JSON.stringify(body),
      }, token);
      const saved = (result?.listing || result) as VendorListing;
      setListings((current) => listingForm.id
        ? current.map((listing) => String(listing.id) === listingForm.id ? saved : listing)
        : [saved, ...current]);
      setListingForm(emptyListingForm);
      setNotice(listingForm.id ? "Listing updated." : "Listing created.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save your listing.");
    } finally {
      setSavingListing(false);
    }
  }

  async function deleteListing(id: string | number | undefined) {
    if (id === undefined) return;
    setError("");
    setNotice("");
    try {
      await apiRequest(`/api/vendor/listings/${id}`, { method: "DELETE" }, token);
      setListings((current) => current.filter((listing) => String(listing.id) !== String(id)));
      setNotice("Listing archived.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to archive the listing.");
    }
  }

  const tabs: { id: DashboardTab; label: string; icon: typeof LayoutDashboard; restricted?: boolean }[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: UserRound },
    { id: "listings", label: "Listings", icon: ListChecks },
    { id: "redemptions", label: "Redemptions", icon: ReceiptText, restricted: true },
    { id: "statement", label: "Statement", icon: Coins, restricted: true },
  ];

  function renderOverview() {
    return (
      <div className="grid gap-5">
        <StatusBanner status={user.status} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Business</p><p className="mt-1 font-semibold">{displayValue(profile.vendorName || user.vendorName)}</p></CardContent></Card>
          <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Listings</p><p className="mt-1 text-2xl font-semibold">{listings.length}</p></CardContent></Card>
          <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Account status</p><p className="mt-1 font-semibold">{statusLabel(user.status)}</p></CardContent></Card>
        </div>
        <Card><CardContent className="p-6"><h3 className="text-lg font-semibold">Welcome to your vendor workspace</h3><p className="mt-2 leading-relaxed text-muted-foreground">Keep your business profile current, prepare reward listings, and manage your Social8 vendor activity from one place.</p></CardContent></Card>
      </div>
    );
  }

  function renderProfile() {
    return (
      <form onSubmit={saveProfile} className="grid gap-5">
        <StatusBanner status={user.status} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business name" required><Input value={profileForm.vendorName} onChange={(event) => setProfileForm({ ...profileForm, vendorName: event.target.value })} /></Field>
          <Field label="Website"><Input type="url" value={profileForm.vendorWebsite} onChange={(event) => setProfileForm({ ...profileForm, vendorWebsite: event.target.value })} /></Field>
          <Field label="Contact name" required><Input value={profileForm.contactName} onChange={(event) => setProfileForm({ ...profileForm, contactName: event.target.value })} /></Field>
          <Field label="Contact telephone" required><Input type="tel" value={profileForm.contactPhone} onChange={(event) => setProfileForm({ ...profileForm, contactPhone: event.target.value })} /></Field>
          <Field label="Address"><Input value={profileForm.vendorAddressLine1} onChange={(event) => setProfileForm({ ...profileForm, vendorAddressLine1: event.target.value })} /></Field>
          <Field label="City"><Input value={profileForm.vendorCity} onChange={(event) => setProfileForm({ ...profileForm, vendorCity: event.target.value })} /></Field>
          <Field label="Postcode"><Input value={profileForm.vendorPostcode} onChange={(event) => setProfileForm({ ...profileForm, vendorPostcode: event.target.value })} /></Field>
          <Field label="Country"><Input value={profileForm.vendorCountry} onChange={(event) => setProfileForm({ ...profileForm, vendorCountry: event.target.value })} /></Field>
        </div>
        <Field label="Business description"><Textarea value={profileForm.vendorDescription} onChange={(event) => setProfileForm({ ...profileForm, vendorDescription: event.target.value })} /></Field>
        <Button type="submit" disabled={savingProfile} className="w-fit gap-2">{savingProfile && <Loader2 className="h-4 w-4 animate-spin" />}Save Profile</Button>
      </form>
    );
  }

  function renderListings() {
    return (
      <div className="grid gap-6">
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between gap-3"><h3 className="font-semibold">{listingForm.id ? "Edit listing" : "Add a listing"}</h3>{listingForm.id && <Button type="button" variant="ghost" size="sm" onClick={() => setListingForm(emptyListingForm)}>Cancel edit</Button>}</div>
            <form onSubmit={saveListing} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Listing title" required><Input value={listingForm.title} onChange={(event) => setListingForm({ ...listingForm, title: event.target.value })} /></Field>
                <Field label="Points required"><Input type="number" min="0" value={listingForm.points} onChange={(event) => setListingForm({ ...listingForm, points: event.target.value })} /></Field>
              </div>
              <Field label="Description"><Textarea value={listingForm.description} onChange={(event) => setListingForm({ ...listingForm, description: event.target.value })} /></Field>
              <Button type="submit" disabled={savingListing} className="w-fit gap-2">{savingListing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}{listingForm.id ? "Update Listing" : "Add Listing"}</Button>
            </form>
          </CardContent>
        </Card>
        {listings.length === 0 ? <Card><CardContent className="p-8 text-center text-muted-foreground">No listings yet. Add your first reward offer above.</CardContent></Card> : listings.map((listing, index) => {
          const id = listing.id ?? index;
          const title = listing.title || listing.name || "Untitled listing";
          const points = listing.points ?? listing.pointsCost ?? listing.pricePoints;
          return (
            <Card key={String(id)}>
              <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
                <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{displayValue(listing.description, "No description provided.")}</p><p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">{points !== undefined ? `${points} points` : "Points value not set"}</p></div>
                <div className="flex shrink-0 gap-2"><Button type="button" size="sm" variant="outline" className="gap-2" onClick={() => setListingForm({ id: listing.id ? String(listing.id) : null, title: title === "Untitled listing" ? "" : title, description: displayValue(listing.description, ""), points: points === undefined ? "" : String(points) })}><Pencil className="h-3.5 w-3.5" />Edit</Button><Button type="button" size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive" onClick={() => deleteListing(listing.id)}><Trash2 className="h-3.5 w-3.5" />Archive</Button></div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  function renderRestricted(label: string) {
    return (
      <Card><CardContent className="flex min-h-56 flex-col items-center justify-center p-8 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"><AlertCircle className="h-6 w-6" /></div><h3 className="mt-4 text-lg font-semibold">{label} unavailable while pending</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">Your vendor account is awaiting approval. This feature will become available once Social8 approves your application.</p></CardContent></Card>
    );
  }

  function renderRedemptions() {
    if (!isApproved) return renderRestricted("Redemptions");
    if (redemptions.length === 0) return <Card><CardContent className="p-8 text-center text-muted-foreground">No redemptions yet.</CardContent></Card>;
    return <div className="overflow-x-auto rounded-lg border"><table className="w-full text-left text-sm"><thead className="bg-muted/50"><tr><th className="px-4 py-3 font-medium">Reference</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Points</th><th className="px-4 py-3 font-medium">Date</th></tr></thead><tbody>{redemptions.map((item, index) => { const row = asRecord(item); return <tr key={String(row.id || row.reference || index)} className="border-t"><td className="px-4 py-3">{displayValue(row.reference || row.code || row.id)}</td><td className="px-4 py-3">{displayValue(row.status)}</td><td className="px-4 py-3">{displayValue(row.points || row.pointsEarned)}</td><td className="px-4 py-3">{displayValue(row.redeemedAt || row.createdAt)}</td></tr>; })}</tbody></table></div>;
  }

  function renderStatement() {
    if (!isApproved) return renderRestricted("Statement and financial features");
    const transactionItems = getCollection(statement, ["transactions", "entries", "items"]);
    const balance = statement.balance ?? statement.availableBalance ?? statement.pointsBalance;
    const earned = statement.pointsEarned ?? statement.totalPoints ?? statement.earned;
    const withdrawals = statement.withdrawals ?? statement.totalWithdrawals;
    return <div className="grid gap-5"><div className="grid gap-4 sm:grid-cols-3">{[["Balance", balance], ["Points earned", earned], ["Withdrawals", withdrawals]].map(([label, value]) => <Card key={String(label)}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{String(label)}</p><p className="mt-1 text-2xl font-semibold">{displayValue(value, "0")}</p></CardContent></Card>)}</div>{transactionItems.length > 0 ? <div className="overflow-x-auto rounded-lg border"><table className="w-full text-left text-sm"><thead className="bg-muted/50"><tr><th className="px-4 py-3 font-medium">Description</th><th className="px-4 py-3 font-medium">Points</th><th className="px-4 py-3 font-medium">Status</th></tr></thead><tbody>{transactionItems.map((item, index) => { const row = asRecord(item); return <tr key={String(row.id || index)} className="border-t"><td className="px-4 py-3">{displayValue(row.description || row.type)}</td><td className="px-4 py-3">{displayValue(row.points || row.amount)}</td><td className="px-4 py-3">{displayValue(row.status)}</td></tr>; })}</tbody></table></div> : <Card><CardContent className="p-8 text-center text-muted-foreground">No statement transactions yet.</CardContent></Card>}</div>;
  }

  const content = tab === "overview" ? renderOverview() : tab === "profile" ? renderProfile() : tab === "listings" ? renderListings() : tab === "redemptions" ? renderRedemptions() : renderStatement();

  return (
    <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
      <aside className="shrink-0 border-b bg-muted/20 p-3 sm:w-52 sm:border-b-0 sm:border-r">
        <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendor workspace</div>
        <nav className="flex gap-1 overflow-x-auto sm:grid">
          {tabs.map(({ id, label, icon: Icon, restricted }) => <button key={id} type="button" className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${tab === id ? "bg-emerald-100 font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200" : "text-muted-foreground hover:bg-muted"} ${restricted && !isApproved ? "opacity-60" : ""}`} onClick={() => setTab(id)}><Icon className="h-4 w-4" />{label}</button>)}
        </nav>
        <div className="mt-4 hidden border-t pt-4 sm:block"><Button type="button" variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={onLogout}><LogOut className="h-4 w-4" />Sign out</Button></div>
      </aside>
      <section className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between gap-3 border-b px-5 py-4"><div><h2 className="text-xl font-semibold">{tabs.find((item) => item.id === tab)?.label}</h2><p className="text-sm text-muted-foreground">{displayValue(user.vendorName || user.email)}</p></div><div className="flex gap-2"><Button type="button" variant="outline" size="icon" aria-label="Refresh dashboard" onClick={() => void loadDashboard()}><RefreshCw className="h-4 w-4" /></Button><Button type="button" variant="outline" size="sm" className="gap-2 sm:hidden" onClick={onLogout}><LogOut className="h-4 w-4" />Sign out</Button></div></div>
        <div className="grid gap-4 p-5">
          {error && <ErrorMessage message={error} />}
          {notice && <div className="rounded-lg border border-emerald-300/50 bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">{notice}</div>}
          {loading ? <div className="flex min-h-56 items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Loading vendor workspace…</div> : content}
        </div>
      </section>
    </div>
  );
}

function VendorPlatformModal({
  modal,
  token,
  user,
  onClose,
  onAuthenticated,
  onLogout,
  onSwitch,
}: {
  modal: VendorModal | null;
  token: string | null;
  user: VendorUser | null;
  onClose: () => void;
  onAuthenticated: (result: AuthResult) => void;
  onLogout: () => void;
  onSwitch: (modal: VendorModal) => void;
}) {
  const title = modal === "signin" ? "Vendor Sign In" : modal === "signup" ? "Register as a Vendor" : "Vendor Dashboard";
  const description = modal === "signin" ? "Sign in to manage your vendor account and offers." : modal === "signup" ? "Create your vendor account and start offering rewards to members." : "Manage your vendor profile, listings and member activity.";

  return (
    <Dialog open={Boolean(modal)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-[85vh] max-h-[85vh] w-[calc(100vw-1rem)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:h-[80vh] sm:max-h-[80vh] sm:w-[80vw]" data-testid="dialog-vendor-platform">
        {modal && <ModalHeading modal={modal} title={title} description={description} />}
        {modal === "signin" && <SignInView onAuthenticated={onAuthenticated} onSwitchSignup={() => onSwitch("signup")} />}
        {modal === "signup" && <SignUpView onAuthenticated={onAuthenticated} onSwitchSignin={() => onSwitch("signin")} />}
        {modal === "dashboard" && user && <DashboardView token={token} user={user} onLogout={onLogout} onClose={onClose} />}
        {modal === "dashboard" && !user && <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center"><LockKeyhole className="h-10 w-10 text-emerald-600" /><h2 className="text-xl font-semibold">Sign in to open your dashboard</h2><p className="max-w-sm text-sm text-muted-foreground">Your vendor dashboard is available after you sign in.</p><Button onClick={() => onSwitch("signin")} className="gap-2"><LogIn className="h-4 w-4" />Vendor Sign In</Button></div>}
      </DialogContent>
    </Dialog>
  );
}

export default function VendorsPage() {
  const [activeModal, setActiveModal] = useState<VendorModal | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<VendorUser | null>(null);

  useEffect(() => {
    updatePageSEO({
      title: "Social8 Vendors | Turn Your Products Into Points Rewards",
      description: "Become a Social8 vendor and put your products or services in front of engaged communities as points-based rewards.",
      url: "/vendors",
    });
    const savedToken = window.sessionStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      setToken(savedToken);
      void apiRequest("/api/auth/user", {}, savedToken)
        .then((result) => {
          const currentUser = getUser(result);
          if (currentUser.accountType === "vendor") setUser(currentUser);
          else throw new Error("Not a vendor account");
        })
        .catch(() => {
          window.sessionStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
        });
    }
    return () => resetPageSEO();
  }, []);

  function completeAuthentication(result: AuthResult) {
    const nextUser = result.user || {};
    const nextToken = result.token || null;
    if (nextToken) window.sessionStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUser(nextUser);
    setActiveModal("dashboard");
  }

  async function logout() {
    try {
      await apiRequest("/api/auth/logout", { method: "POST" }, token);
    } finally {
      window.sessionStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
      setActiveModal(null);
    }
  }

  function openModal(modal: VendorModal) {
    if (modal === "dashboard" && !user) {
      setActiveModal("signin");
      return;
    }
    setActiveModal(modal);
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-vendors">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link href="/"><img src={logoPath} alt="Social8 Logo" className="h-10 cursor-pointer object-contain" data-testid="img-vendors-logo" /></Link>
          <div className="flex items-center gap-3"><span className="hidden text-sm text-muted-foreground sm:inline">For vendors</span><Link href="/"><Button variant="ghost" size="sm" className="gap-2" data-testid="button-vendors-back"><ArrowLeft className="h-4 w-4" />Back to Home</Button></Link></div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 py-16 text-white lg:py-24" data-testid="section-vendor-hero">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" /><div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />
          <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200"><Store className="h-4 w-4" />The Social8 Vendor Network</div><h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" data-testid="heading-vendors">Get paid in crypto for the products and services you offer.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-emerald-50/80">Members redeem your offers using Social8 points. Every point you receive is converted into cryptocurrency, which you can convert back into pounds.</p><div className="mt-8 flex flex-wrap gap-3"><Button size="lg" className="gap-2 bg-white text-emerald-900 hover:bg-emerald-50" onClick={() => openModal("signup")} data-testid="button-vendor-sign-up">Become a Vendor<ArrowRight className="h-4 w-4" /></Button><Button size="lg" variant="outline" className="border-emerald-200/50 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={() => openModal("signin")} data-testid="button-vendor-sign-in"><LogIn className="mr-2 h-4 w-4" />Vendor Sign In</Button></div></div>
            <Card className="border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur-sm"><CardContent className="p-6 sm:p-8"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200"><Coins className="h-6 w-6" /></div><p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">How vendor payments work</p><h2 className="mt-3 text-2xl font-semibold">Your Social8 points become crypto you can convert into pounds.</h2><ul className="mt-6 space-y-4 text-sm text-emerald-50/85">{["Members redeem your offers with Social8 points", "The points you receive are converted into cryptocurrency", "Convert your crypto balance back into pounds"].map((item) => <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /><span>{item}</span></li>)}</ul></CardContent></Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 lg:py-24" data-testid="section-vendor-benefits"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Why become a vendor?</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A simple way to connect value with participation.</h2><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Social8 communities reward the actions that keep people involved. Your products and services can become part of that experience — and you get paid for every redemption.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3">{[{ icon: Users, title: "Reach active communities", text: "Connect your brand with members who already value participation, discovery and rewards." }, { icon: Handshake, title: "Build meaningful partnerships", text: "Offer something useful to communities while creating a new channel for your business." }, { icon: PackageCheck, title: "Manage it in one place", text: "Keep your profile and listings current, then manage member redemptions through your workspace." }].map(({ icon: Icon, title, text }) => <Card key={title} className="border-border/70 shadow-sm"><CardContent className="p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{text}</p></CardContent></Card>)}</div></section>

        <section className="border-y bg-muted/30 py-14" data-testid="section-vendor-actions"><div className="container mx-auto px-4"><div className="mx-auto max-w-4xl rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-12"><h2 className="text-3xl font-bold tracking-tight">Already part of the network?</h2><p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Sign in to your vendor account or open your existing workspace. New to Social8? Create your vendor account to get started.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Button variant="outline" className="gap-2" onClick={() => openModal("signin")} data-testid="button-vendor-action-sign-in"><LogIn className="h-4 w-4" />Vendor Sign In</Button><Button variant="outline" className="gap-2" onClick={() => openModal("dashboard")} data-testid="button-vendor-dashboard"><LayoutDashboard className="h-4 w-4" />Vendor Dashboard</Button><Button className="gap-2" onClick={() => openModal("signup")} data-testid="button-vendor-action-sign-up">Become a Vendor<ArrowRight className="h-4 w-4" /></Button></div></div></div></section>
      </main>

      <MarketingFooter />
      <VendorPlatformModal modal={activeModal} token={token} user={user} onClose={() => setActiveModal(null)} onAuthenticated={completeAuthentication} onLogout={() => void logout()} onSwitch={setActiveModal} />
    </div>
  );
}