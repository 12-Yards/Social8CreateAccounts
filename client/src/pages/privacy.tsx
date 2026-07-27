import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import logoPath from "@assets/Social8LogoFinal_trimmed.png";
import { updatePageSEO, resetPageSEO } from "@/lib/seo";

export default function PrivacyPage() {
  useEffect(() => {
    updatePageSEO({
      title: "Privacy Policy | Social8",
      description: "Learn how Social8 collects, uses, and protects your personal data. Our privacy policy covers UK GDPR compliance, cookies, data retention, and your rights.",
      url: "/privacy",
    });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-privacy">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          <Link href="/">
            <img src={logoPath} alt="Social8 Logo" className="h-10 object-contain cursor-pointer" data-testid="img-privacy-logo" />
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-privacy-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2" data-testid="heading-privacy">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8" data-testid="text-privacy-updated">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6" data-testid="content-privacy">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Social8 ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our community management platform and website. Please read this policy carefully. By using the Service, you consent to the data practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">We may collect the following types of information:</p>
            <h3 className="text-lg font-medium mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-3">
              <li>Name and contact details (email address, phone number)</li>
              <li>Organisation or community name</li>
              <li>Account credentials (username, encrypted password)</li>
              <li>Billing and payment information</li>
              <li>Domain and subdomain preferences</li>
            </ul>
            <h3 className="text-lg font-medium mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on the Service</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process account registrations and manage your account</li>
              <li>Send transactional communications (e.g., account confirmations, service updates)</li>
              <li>Respond to your enquiries and provide customer support</li>
              <li>Monitor and analyse usage patterns and trends</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Legal Basis for Processing</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Under the UK GDPR, we process your personal data on the following legal bases:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong>Contract:</strong> Processing necessary for the performance of our contract with you</li>
              <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests, such as improving the Service</li>
              <li><strong>Consent:</strong> Where you have given us specific consent (e.g., marketing communications)</li>
              <li><strong>Legal Obligation:</strong> Processing necessary to comply with our legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device. We use essential cookies for the operation of the Service, and analytical cookies to understand how visitors interact with our website. You can manage your cookie preferences through our cookie consent banner or your browser settings. For more information, please see our cookie consent notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">We do not sell your personal data. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong>Service Providers:</strong> Third-party companies that assist us in operating the Service (e.g., hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you have given explicit permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. When your data is no longer required, we will securely delete or anonymise it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Under the UK GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              To exercise any of these rights, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. International Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and maintained on servers located outside of the United Kingdom. We ensure that any such transfers are subject to appropriate safeguards as required by data protection law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is not directed to individuals under the age of 16. We do not knowingly collect personal data from children under 16. If we become aware that we have collected personal data from a child under 16, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated revision date. Your continued use of the Service after any changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
