import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import logoPath from "@assets/image_1785138412166.png";
import { updatePageSEO, resetPageSEO } from "@/lib/seo";

export default function TermsPage() {
  useEffect(() => {
    updatePageSEO({
      title: "Terms of Service | Social8",
      description: "Read the Social8 Terms of Service. Understand your rights and responsibilities when using our community management platform.",
      url: "/terms",
    });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-terms">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          <Link href="/">
            <img src={logoPath} alt="Social8 Logo" className="h-10 object-contain cursor-pointer" data-testid="img-terms-logo" /><span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">social<span className="text-cyan-600">8</span></span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-terms-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2" data-testid="heading-terms">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8" data-testid="text-terms-updated">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6" data-testid="content-terms">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the Social8 platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Social8 provides a community management platform that enables organisations, clubs, and communities to manage members, events, competitions, content, and communications. The Service includes web-based tools, APIs, and related support services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
            <p className="text-muted-foreground leading-relaxed">
              To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful, threatening, abusive, or otherwise objectionable content</li>
              <li>Attempt to gain unauthorised access to the Service or its related systems</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Collect or store personal data about other users without their consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and its original content, features, and functionality are owned by Social8 and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You retain ownership of any content you submit to the Service, but grant Social8 a licence to use, display, and distribute such content in connection with the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Pricing and Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              Access to certain features may require a paid subscription. Pricing details are available on our website. We reserve the right to modify pricing with reasonable notice. Free trial periods may be offered at our discretion. All fees are non-refundable unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              We process personal data in accordance with our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and applicable data protection legislation, including the UK GDPR and Data Protection Act 2018. You are responsible for ensuring that your use of the Service complies with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              Either party may terminate the agreement at any time. We may suspend or terminate your access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. Upon termination, your right to use the Service will cease immediately and your data may be deleted after a reasonable retention period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, Social8 shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses. Our total liability shall not exceed the fees paid by you in the preceding 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided on an "as is" and "as available" basis. Social8 makes no warranties, expressed or implied, and hereby disclaims all warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. Continued use of the Service following any changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
