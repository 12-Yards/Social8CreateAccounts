import { useState, useRef, useEffect, useCallback } from "react";
import { jsPDF } from "jspdf";
import { apiRequest } from "@/lib/queryClient";
import { updatePageSEO, resetPageSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import logoPath from "@assets/image_1785138412166.png";
import {
  CheckCircle,
  Users,
  Calendar,
  Globe,
  ArrowRight,
  ArrowLeft,
  Settings,
  Copy,
  ExternalLink,
  AlertCircle,
  Download,
} from "lucide-react";

type OnboardingStep = "register" | "identity" | "terms";

export default function CreateAccountPage() {
  const { toast } = useToast();

  useEffect(() => {
    updatePageSEO({
      title: "Create Your Community Platform | Social8",
      description: "Set up your community management platform in minutes. Create your Social8 account and start managing members, events, and content today.",
      url: "/create-account",
    });
    return () => resetPageSEO();
  }, []);

  const [step, setStep] = useState<OnboardingStep>("register");
  const [orgName, setOrgName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [hasDomain, setHasDomain] = useState<boolean | null>(null);
  const [domainName, setDomainName] = useState("");
  const [subdomain, setSubdomain] = useState("platform");
  const [editingSubdomain, setEditingSubdomain] = useState(false);
  const [noDomainPrefix, setNoDomainPrefix] = useState("");
  const [editingNoDomainPrefix, setEditingNoDomainPrefix] = useState(false);

  const generateRandomPrefix = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [primaryColor, setPrimaryColor] = useState("#0ea5e9");
  const [secondaryColor, setSecondaryColor] = useState("#22c55e");
  const [showComplete, setShowComplete] = useState(false);

  const showValidationErrors = (errors: string[]) => {
    setValidationErrors(errors);
    toast({
      variant: "destructive",
      title: "Please fix the following",
      description: (
        <ul className="list-disc pl-4 space-y-1 mt-1">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      ),
    });
  };

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const isValidDomain = (val: string) =>
    /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/.test(val);

  const [checkingEmail, setCheckingEmail] = useState(false);

  const handleRegisterSubmit = async () => {
    const errors: string[] = [];

    if (!orgName.trim()) errors.push("Community name is required");
    if (!userName.trim()) errors.push("Your name is required");
    if (!email.trim()) {
      errors.push("Email address is required");
    } else if (!isValidEmail(email)) {
      errors.push("Please enter a valid email address");
    }
    if (!password) {
      errors.push("Password is required");
    } else if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setStep("identity");
  };

  const [checkingDomain, setCheckingDomain] = useState(false);

  const handleIdentityNext = async () => {
    const errors: string[] = [];

    if (hasDomain === null) {
      errors.push("Please select whether you have a domain");
    } else if (hasDomain === true) {
      if (!domainName.trim()) {
        errors.push("Please enter your domain name");
      } else if (!isValidDomain(domainName.trim())) {
        errors.push("Please enter a valid domain name (e.g. yourgolfclub.com)");
      }
    } else if (hasDomain === false) {
      if (!noDomainPrefix.trim()) {
        errors.push("Subdomain prefix cannot be empty");
      } else if (noDomainPrefix.length < 3) {
        errors.push("Subdomain prefix must be at least 3 characters");
      }
    }

    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    const domainToCheck = hasDomain ? domainName.trim().toLowerCase() : noDomainPrefix.trim().toLowerCase();
    setCheckingDomain(true);
    try {
      const res = await fetch("/api/check-domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainName: domainToCheck }),
      });
      const data = await res.json();
      if (data.exists) {
        showValidationErrors([
          hasDomain
            ? "This domain is already in use. Please enter a different domain."
            : "This subdomain prefix is already in use. Please choose a different one."
        ]);
        setCheckingDomain(false);
        return;
      }
    } catch {
      showValidationErrors(["Unable to verify domain availability. Please try again."]);
      setCheckingDomain(false);
      return;
    }
    setCheckingDomain(false);

    setValidationErrors([]);
    setStep("terms");
  };

  const [submitting, setSubmitting] = useState(false);
  const [creatingPlatform, setCreatingPlatform] = useState(false);
  const [tenantError, setTenantError] = useState<string | null>(null);
  const [dnsRecords, setDnsRecords] = useState<any[] | null>(null);

  const handleCompleteSetup = async () => {
    setSubmitting(true);
    setTenantError(null);
    try {
      setCreatingPlatform(true);
      startTimeRef.current = Date.now();

      const tenantResponse = await fetch("/api/onboarding/create-tenant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orgName,
          domainName: hasDomain ? domainName : undefined,
          subDomain: hasDomain ? undefined : noDomainPrefix,
          adminEmail: email,
          adminPassword: password,
          adminName: userName,
        }),
      });

      const tenantData = await tenantResponse.json();

      if (tenantResponse.ok && tenantData.success) {
        await apiRequest("POST", "/api/registrations", {
          orgName,
          userName,
          email,
          hasDomain: hasDomain === true ? "yes" : hasDomain === false ? "no" : null,
          domainName: domainName || null,
          subdomain: subdomain || null,
          noDomainPrefix: noDomainPrefix || null,
          primaryColor,
          secondaryColor,
        });

        if (hasDomain && domainName) {
          try {
            const dnsResponse = await fetch("/api/onboarding/custom-domain-dns", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ domainName }),
            });
            const dnsData = await dnsResponse.json();
            if (dnsResponse.ok) {
              const records = dnsData.dnsEntries || dnsData.dnsRecords || dnsData.records || (Array.isArray(dnsData) ? dnsData : null);
              if (records) {
                setDnsRecords(records);
              }
            }
          } catch (dnsErr) {
            console.error("Failed to fetch DNS records:", dnsErr);
          }
        }

        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, 15000 - elapsed);
        timerRef.current = setTimeout(() => {
          setCreatingPlatform(false);
          setShowComplete(true);
        }, remaining);
      } else {
        setCreatingPlatform(false);
        setTenantError(tenantData.error || tenantData.message || "Failed to create platform. Please try again.");
      }
    } catch (err) {
      console.error("Failed to submit registration:", err);
      setCreatingPlatform(false);
      setTenantError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getPlatformUrl = () => {
    if (hasDomain && domainName) {
      return domainName;
    }
    return `${noDomainPrefix}.social8.app`;
  };

  const getAdminUrl = () => {
    return `${getPlatformUrl()}/admin`;
  };

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 25;

    doc.setFillColor(5, 150, 105);
    doc.rect(margin, y, contentWidth, 1.5, "F");
    y += 10;

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 150, 105);
    doc.text(orgName, margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text("Platform Setup Details", margin, y);
    y += 15;

    const drawCard = (x: number, w: number, label: string, value: string, labelColor: [number, number, number]) => {
      doc.setFillColor(249, 250, 251);
      doc.setDrawColor(229, 231, 235);
      doc.roundedRect(x, y, w, 22, 2, 2, "FD");

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...labelColor);
      doc.text(label.toUpperCase(), x + 6, y + 7);

      doc.setFontSize(11);
      doc.setFont("courier", "bold");
      doc.setTextColor(31, 41, 55);
      doc.text(value, x + 6, y + 16, { maxWidth: w - 12 });
    };

    const halfWidth = (contentWidth - 6) / 2;

    drawCard(margin, halfWidth, "Admin URL", getAdminUrl(), [5, 150, 105]);
    drawCard(margin + halfWidth + 6, halfWidth, "Platform URL", getPlatformUrl(), [2, 132, 199]);
    y += 28;

    drawCard(margin, halfWidth, "Username", email, [107, 114, 128]);
    drawCard(margin + halfWidth + 6, halfWidth, "Password", password, [107, 114, 128]);
    y += 32;

    if (dnsRecords && dnsRecords.length > 0) {
      doc.setFillColor(5, 150, 105);
      doc.circle(margin + 3, y + 2, 1.5, "F");
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 41, 55);
      doc.text("DNS Configuration", margin + 9, y + 4);
      y += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(107, 114, 128);
      const descLines = doc.splitTextToSize(`Add the following records to your domain ${domainName} with your DNS provider:`, contentWidth);
      doc.text(descLines, margin, y);
      y += descLines.length * 5 + 6;

      const colWidths = [25, 35, contentWidth - 60];
      const headers = ["TYPE", "NAME", "VALUE"];

      doc.setFillColor(243, 244, 246);
      doc.setDrawColor(229, 231, 235);
      doc.roundedRect(margin, y, contentWidth, 9, 1, 1, "FD");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(107, 114, 128);
      let hx = margin + 5;
      headers.forEach((h, i) => {
        doc.text(h, hx, y + 6);
        hx += colWidths[i];
      });
      y += 10;

      doc.setFontSize(9);
      doc.setFont("courier", "normal");
      doc.setTextColor(55, 65, 81);
      dnsRecords.forEach((record: any) => {
        doc.setDrawColor(243, 244, 246);
        doc.line(margin, y + 5, margin + contentWidth, y + 5);
        let rx = margin + 5;
        const vals = [
          record.type || "-",
          record.name || record.host || record.hostname || "-",
          record.value || record.data || record.target || record.content || "-",
        ];
        vals.forEach((v, i) => {
          const lines = doc.splitTextToSize(v, colWidths[i] - 5);
          doc.text(lines, rx, y + 4);
          rx += colWidths[i];
        });
        y += 8;
      });
      y += 6;

      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(156, 163, 175);
      doc.text("DNS changes can take up to 24-48 hours to propagate.", margin, y);
      y += 12;
    }

    if (hasDomain && domainName) {
      doc.setFillColor(240, 249, 255);
      doc.setDrawColor(186, 230, 253);
      doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "FD");

      doc.setFillColor(14, 165, 233);
      doc.circle(margin + 7, y + 7, 1.5, "F");

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 41, 55);
      doc.text("Check Domain Status", margin + 13, y + 8);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 85, 99);
      doc.text("Visit: ", margin + 7, y + 15);
      doc.setTextColor(2, 132, 199);
      doc.setFont("helvetica", "bold");
      doc.textWithLink("checkdomainstatus.social8.app", margin + 18, y + 15, { url: "https://checkdomainstatus.social8.app/" });
    }

    doc.save(`${orgName.replace(/[^a-zA-Z0-9]/g, "_")}_Platform_Details.pdf`);
  };

  const benefits = [
    { icon: Users, text: "Unlimited members and groups" },
    { icon: Calendar, text: "Events & competition management" },
    { icon: Globe, text: "Reciprocal play network access" },
  ];

  const stepTitles: Record<OnboardingStep, { title: string; subtitle: string }> = {
    register: {
      title: "Create your Community Platform",
      subtitle: "Get started with your free account today",
    },
    identity: {
      title: "Step 1 - Identity",
      subtitle: `Confirm the details where users will access the ${orgName || "your"} platform.`,
    },
    terms: {
      title: "Step 2 - Terms & Conditions",
      subtitle: "Please review and accept the terms and conditions to complete your setup.",
    },
  };

  const leftPanelContent: Record<OnboardingStep, { heading: string; description: string }> = {
    register: {
      heading: "Launch Your Community",
      description:
        "Your community could be fully onboarded and live within 24 hours. No technical skills needed, just a simple process will open your platform to your full community.",
    },
    identity: {
      heading: "Set Up Your Platform",
      description:
        "Configure how your members will access your community. Choose your domain and make it yours.",
    },
    terms: {
      heading: "One Last Step",
      description:
        "Review and accept our terms and conditions to get your community up and running.",
    },
  };

  const currentStepInfo = stepTitles[step];
  const currentLeftPanel = leftPanelContent[step];

  const allSteps: { key: OnboardingStep; label: number }[] = [
    { key: "register", label: 0 },
    { key: "identity", label: 1 },
    { key: "terms", label: 2 },
  ];
  const currentStepIndex = allSteps.findIndex((s) => s.key === step);

  const stepIndicator = (
    <div className="flex items-center gap-2 mb-6">
      {allSteps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
              currentStepIndex === i
                ? "bg-cyan-600 text-white"
                : currentStepIndex > i
                  ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600"
                  : "bg-muted text-muted-foreground"
            }`}
            data-testid={`step-indicator-${i}`}
          >
            {currentStepIndex > i ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              s.label
            )}
          </div>
          {i < allSteps.length - 1 && (
            <div
              className={`w-6 h-0.5 ${
                currentStepIndex > i
                  ? "bg-cyan-400"
                  : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-cyan-50 via-green-50 to-background dark:from-cyan-950/20 dark:via-green-950/20 dark:to-background flex flex-col"
      data-testid="page-create-account"
    >
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <img src={logoPath} alt="Social8 Logo" className="h-10 object-contain" /><span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">social<span className="text-cyan-600">8</span></span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        {(creatingPlatform || showComplete) ? (
          <Card className="w-full max-w-2xl overflow-hidden">
            <CardContent className="p-8 md:p-10">
              {creatingPlatform ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <Settings className="w-20 h-20 text-cyan-600 animate-spin" style={{ animationDuration: "3s" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-600 mb-2" data-testid="text-creating-message">
                    Creating your platform
                  </h3>
                  <p className="text-muted-foreground">
                    Please wait while we set everything up for you...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-cyan-600" data-testid="text-setup-message">
                      All ready!
                    </h3>
                    <p className="text-muted-foreground mt-1">Your platform has been created successfully.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Admin URL</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://${getAdminUrl()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm font-semibold text-cyan-600 hover:underline flex items-center gap-1 truncate"
                          data-testid="link-admin-url"
                        >
                          {getAdminUrl()}
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                        </a>
                        <button
                          onClick={() => navigator.clipboard.writeText(`https://${getAdminUrl()}`)}
                          className="text-muted-foreground hover:text-foreground flex-shrink-0"
                          data-testid="button-copy-admin-url"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Platform</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://${getPlatformUrl()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm font-semibold text-green-600 hover:underline flex items-center gap-1 truncate"
                          data-testid="link-platform-url"
                        >
                          {getPlatformUrl()}
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                        </a>
                        <button
                          onClick={() => navigator.clipboard.writeText(`https://${getPlatformUrl()}`)}
                          className="text-muted-foreground hover:text-foreground flex-shrink-0"
                          data-testid="button-copy-platform-url"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Username</p>
                      <p className="font-mono text-sm font-semibold" data-testid="text-username">{email}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Password</p>
                      <p className="font-mono text-sm font-semibold" data-testid="text-password">{password}</p>
                    </div>
                  </div>

                  {dnsRecords && dnsRecords.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5 mb-6" data-testid="dns-records-section">
                      <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-amber-800 dark:text-amber-300">DNS Configuration Required</p>
                          <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                            Add the following DNS records to your domain <span className="font-mono font-semibold">{domainName}</span> to point it to your platform:
                          </p>
                        </div>
                      </div>
                      <div className="overflow-x-auto bg-white dark:bg-background rounded-md border border-amber-200 dark:border-amber-700">
                        <table className="w-full text-sm border-collapse" data-testid="dns-records-table">
                          <thead>
                            <tr className="border-b border-amber-200 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30">
                              <th className="text-left py-2.5 px-3 font-semibold text-amber-800 dark:text-amber-300">Type</th>
                              <th className="text-left py-2.5 px-3 font-semibold text-amber-800 dark:text-amber-300">Name</th>
                              <th className="text-left py-2.5 px-3 font-semibold text-amber-800 dark:text-amber-300">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dnsRecords.map((record: any, i: number) => (
                              <tr key={i} className="border-b last:border-b-0 border-amber-100 dark:border-amber-800/50" data-testid={`dns-record-${i}`}>
                                <td className="py-2.5 px-3 font-mono text-xs font-semibold">{record.type}</td>
                                <td className="py-2.5 px-3 font-mono text-xs">{record.name || record.host || record.hostname || "-"}</td>
                                <td className="py-2.5 px-3 font-mono text-xs break-all">
                                  <div className="flex items-center gap-1.5">
                                    <span>{record.value || record.data || record.target || record.content || "-"}</span>
                                    <button
                                      onClick={() => navigator.clipboard.writeText(record.value || record.data || record.target || record.content || "")}
                                      className="text-amber-600 hover:text-amber-800 flex-shrink-0"
                                      data-testid={`button-copy-dns-${i}`}
                                    >
                                      <Copy className="w-3 h-3" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-amber-600 dark:text-amber-500 mt-3">
                        DNS changes can take up to 24-48 hours to propagate. Your platform will be available once the records are active.
                      </p>
                    </div>
                  )}

                  {hasDomain && domainName && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5 mb-6" data-testid="domain-status-section">
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-800 dark:text-green-300">Check Domain Status</p>
                          <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                            To check the status of your domain, visit:
                          </p>
                          <a
                            href="https://checkdomainstatus.social8.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-green-600 hover:underline"
                            data-testid="link-check-domain-status"
                          >
                            checkdomainstatus.social8.app
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={handleDownloadPDF}
                      data-testid="button-download-pdf"
                    >
                      <Download className="w-4 h-4" />
                      Download as PDF
                    </Button>
                    <Link href="/">
                      <Button variant="outline" data-testid="button-back-home">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
        <Card className="w-full max-w-4xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-cyan-600 to-green-600 p-8 md:p-10 text-white flex flex-col justify-start">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{currentLeftPanel.heading}</h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">{currentLeftPanel.description}</p>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white/90">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <CardContent className="p-8 md:p-10">
                <>
                  {step !== "register" && stepIndicator}
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2" data-testid="heading-create-account">
                      {currentStepInfo.title}
                    </h1>
                    <p className="text-muted-foreground" data-testid="text-create-account-subtext">
                      {currentStepInfo.subtitle}
                    </p>
                  </div>

                  {step === "register" && (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="organisation">Community Name</Label>
                        <Input
                          id="organisation"
                          type="text"
                          placeholder="Enter your community name"
                          className="h-11"
                          value={orgName}
                          onChange={(e) => { setOrgName(e.target.value); setValidationErrors([]); }}
                          data-testid="input-organisation"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          className="h-11"
                          value={userName}
                          onChange={(e) => { setUserName(e.target.value); setValidationErrors([]); }}
                          data-testid="input-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="h-11"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setValidationErrors([]); }}
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          className="h-11"
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setValidationErrors([]); }}
                          data-testid="input-password"
                        />
                      </div>
                      {validationErrors.length > 0 && step === "register" && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4" data-testid="validation-errors">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">Please fix the following:</p>
                              <ul className="list-disc pl-4 space-y-0.5 text-sm text-red-700 dark:text-red-400">
                                {validationErrors.map((err, i) => (
                                  <li key={i}>{err}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                      <Button
                        type="button"
                        className="w-full h-11 gap-2"
                        onClick={handleRegisterSubmit}
                        disabled={checkingEmail}
                        data-testid="button-create-account-submit"
                      >
                        {checkingEmail ? "Checking..." : "Create Account"}
                        {!checkingEmail && <ArrowRight className="w-4 h-4" />}
                      </Button>
                      <div className="text-center pt-2">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-back">
                          Back to Home
                        </Link>
                      </div>
                    </div>
                  )}

                  {step === "identity" && (
                    <div className="space-y-5">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Do you already have your domain?</Label>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant={hasDomain === true ? "default" : "outline"}
                            className="flex-1 h-11 toggle-elevate"
                            onClick={() => {
                              setHasDomain(true);
                            }}
                            data-testid="button-has-domain-yes"
                          >
                            Yes
                          </Button>
                          <Button
                            type="button"
                            variant={hasDomain === false ? "default" : "outline"}
                            className="flex-1 h-11 toggle-elevate"
                            onClick={() => {
                              setHasDomain(false);
                              if (!noDomainPrefix) {
                                setNoDomainPrefix(generateRandomPrefix());
                              }
                            }}
                            data-testid="button-has-domain-no"
                          >
                            No
                          </Button>
                        </div>
                      </div>

                      {hasDomain === false && (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            You can use the Social8.io domain (and change later).
                          </p>
                          <div className="bg-muted/50 rounded-md p-4 border border-border/50">
                            <p className="text-sm text-muted-foreground mb-2">
                              Your website will show as:
                            </p>
                            <div className="flex items-center gap-1">
                              {editingNoDomainPrefix ? (
                                <Input
                                  value={noDomainPrefix}
                                  onChange={(e) => setNoDomainPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                                  className="h-9 w-28 text-sm font-mono"
                                  autoFocus
                                  onBlur={() => setEditingNoDomainPrefix(false)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") setEditingNoDomainPrefix(false);
                                  }}
                                  data-testid="input-no-domain-prefix"
                                />
                              ) : (
                                <span className="font-mono font-semibold text-cyan-600" data-testid="text-no-domain-prefix">
                                  {noDomainPrefix}
                                </span>
                              )}
                              <span className="font-mono font-semibold" data-testid="text-no-domain-suffix">
                                .social8.app
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">
                              Do you want to change the prefix?
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingNoDomainPrefix(true)}
                              data-testid="button-change-no-domain-prefix"
                            >
                              Change
                            </Button>
                          </div>
                        </div>
                      )}

                      {hasDomain === true && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="domain">Enter your domain name</Label>
                            <Input
                              id="domain"
                              type="text"
                              placeholder="e.g. yourgolfclub.com"
                              className="h-11"
                              value={domainName}
                              onChange={(e) => setDomainName(e.target.value)}
                              data-testid="input-domain"
                            />
                          </div>

                        </div>
                      )}

                      {validationErrors.length > 0 && step === "identity" && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4" data-testid="validation-errors-identity">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">Please fix the following:</p>
                              <ul className="list-disc pl-4 space-y-0.5 text-sm text-red-700 dark:text-red-400">
                                {validationErrors.map((err, i) => (
                                  <li key={i}>{err}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 h-11 gap-2"
                          onClick={() => { setValidationErrors([]); setStep("register"); }}
                          data-testid="button-identity-back"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          className="flex-1 h-11 gap-2"
                          onClick={handleIdentityNext}
                          disabled={checkingDomain || hasDomain === null || (hasDomain === true && !domainName.trim())}
                          data-testid="button-identity-next"
                        >
                          {checkingDomain ? "Checking..." : "Next"}
                          {!checkingDomain && <ArrowRight className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === "terms" && (
                    <div className="space-y-5">
                      <div className="border border-border rounded-md p-4 max-h-[340px] overflow-y-auto text-sm text-muted-foreground space-y-4" data-testid="terms-content">
                        <h3 className="font-bold text-foreground text-base">Social8 Platform Terms & Conditions</h3>
                        <p className="font-semibold text-foreground">1. Acceptance of Terms</p>
                        <p>By creating an account and using the Social8 platform, you agree to be bound by these Terms and Conditions. If you do not agree, please do not proceed with account creation.</p>
                        <p className="font-semibold text-foreground">2. Platform Usage</p>
                        <p>The Social8 platform is provided as a Software-as-a-Service (SaaS) solution for managing communities, clubs, and related organisations. You agree to use the platform only for its intended purpose and in compliance with all applicable laws.</p>
                        <p className="font-semibold text-foreground">3. Account Responsibilities</p>
                        <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify Social8 immediately of any unauthorised use of your account. You are responsible for all activities that occur under your account.</p>
                        <p className="font-semibold text-foreground">4. Data Protection</p>
                        <p>We take data protection seriously. Your personal data and the data of your community members will be processed in accordance with our Privacy Policy and applicable data protection legislation including GDPR.</p>
                        <p className="font-semibold text-foreground">5. Content</p>
                        <p>You retain ownership of all content you upload to the platform. By uploading content, you grant Social8 a licence to host and display that content as part of the service. You must not upload content that is unlawful, offensive, or infringes on third-party rights.</p>
                        <p className="font-semibold text-foreground">6. Subscription & Billing</p>
                        <p>Access to certain features may require a paid subscription. Pricing details are available on our website. We reserve the right to modify pricing with reasonable notice. Free trial periods may be offered at our discretion.</p>
                        <p className="font-semibold text-foreground">7. Termination</p>
                        <p>Either party may terminate the agreement at any time. Upon termination, your access to the platform will be suspended and your data may be deleted after a reasonable retention period.</p>
                        <p className="font-semibold text-foreground">8. Limitation of Liability</p>
                        <p>Social8 shall not be liable for any indirect, incidental, or consequential damages arising from the use of the platform. Our total liability shall not exceed the fees paid by you in the preceding 12 months.</p>
                        <p className="font-semibold text-foreground">9. Changes to Terms</p>
                        <p>We may update these terms from time to time. Continued use of the platform following any changes constitutes acceptance of the revised terms.</p>
                      </div>
                      {tenantError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 text-sm text-red-700 dark:text-red-400" data-testid="text-tenant-error">
                          {tenantError}
                        </div>
                      )}
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 h-11 gap-2"
                          onClick={() => setStep("identity")}
                          data-testid="button-terms-back"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          className="flex-1 h-11 gap-2"
                          onClick={handleCompleteSetup}
                          disabled={submitting}
                          data-testid="button-complete-setup"
                        >
                          {submitting ? "Setting up..." : "Accept Terms & Complete Setup"}
                          {!submitting && <ArrowRight className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  )}
                </>
            </CardContent>
          </div>
        </Card>
        )}
      </div>
    </div>
  );
}
