import { useState, useEffect } from "react";
import { updatePageSEO, resetPageSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import MarketingFooter from "@/components/marketing-footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import logoPath from "@assets/s8logov2_clean.png";
import { apiRequest } from "@/lib/queryClient";

export default function ContactPage() {
  const isRegionalPartner = new URLSearchParams(window.location.search).get("type") === "regional-partner";

  useEffect(() => {
    updatePageSEO({
      title: isRegionalPartner ? "Apply to Become a Social8 Regional Partner" : "Contact Us | Social8",
      description: isRegionalPartner
        ? "Tell Social8 about the region, relationships and communities you would like to develop as a Regional Partner."
        : "Get in touch with the Social8 team. We'd love to hear from you about our community management platform.",
      url: "/contact",
    });
    return () => resetPageSEO();
  }, [isRegionalPartner]);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [organisation, setOrganisation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [territory, setTerritory] = useState("");
  const [network, setNetwork] = useState("");
  const [communityTypes, setCommunityTypes] = useState("");
  const [firstTenApproach, setFirstTenApproach] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isRegionalPartner) {
        await apiRequest("POST", "/api/regional-partner-applications", {
          organisation,
          name,
          email,
          mobile,
          territory,
          network,
          communityTypes,
          firstTenApproach,
          notes,
        });
      } else {
        await apiRequest("POST", "/api/contacts", {
          organisation,
          name,
          email,
          mobile,
          notes,
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background flex flex-col" data-testid="page-contact">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <img 
              src={logoPath} 
              alt="Social8 Logo" 
              className="h-10 object-contain"
            />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className={`w-full ${isRegionalPartner ? "max-w-2xl" : "max-w-md"}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold" data-testid="heading-contact">
              {isRegionalPartner ? "Apply to Become a Regional Partner" : "Contact Us"}
            </CardTitle>
            <CardDescription>
              {isRegionalPartner ? "Tell us about the region and community network you would like to develop." : "Get in touch with our team"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-emerald-600 mb-2" data-testid="text-submitted">Thank You</h3>
                <p className="text-muted-foreground">We've received your message and will be in touch shortly.</p>
                <Link href="/">
                  <Button variant="outline" className="mt-4" data-testid="button-back-home">
                    Back to Home
                  </Button>
                </Link>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="organisation">Organisation</Label>
                  <Input 
                    id="organisation" 
                    type="text" 
                    placeholder="Enter your organisation name"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    data-testid="input-organisation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input 
                    id="mobile" 
                    type="tel" 
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    data-testid="input-mobile"
                  />
                </div>
                {isRegionalPartner && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="territory">Which region or territory would you like to develop?</Label>
                      <Input
                        id="territory"
                        type="text"
                        placeholder="For example: North West England"
                        value={territory}
                        onChange={(e) => setTerritory(e.target.value)}
                        required
                        data-testid="input-territory"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="network">What existing network or relationships do you have?</Label>
                      <Textarea
                        id="network"
                        placeholder="Tell us about your local, professional or sector relationships"
                        value={network}
                        onChange={(e) => setNetwork(e.target.value)}
                        required
                        data-testid="input-existing-network"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="community-types">Which types of communities would you target?</Label>
                      <Textarea
                        id="community-types"
                        placeholder="Sports clubs, charities, businesses, membership organisations..."
                        value={communityTypes}
                        onChange={(e) => setCommunityTypes(e.target.value)}
                        required
                        data-testid="input-community-types"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="first-ten-approach">How would you approach your first 10 potential communities?</Label>
                      <Textarea
                        id="first-ten-approach"
                        placeholder="Outline how you would identify and approach your first communities"
                        value={firstTenApproach}
                        onChange={(e) => setFirstTenApproach(e.target.value)}
                        required
                        data-testid="input-first-ten-approach"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Enter any additional information"
                    className="min-h-[100px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    data-testid="input-notes"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting} data-testid="button-contact-submit">
                  {submitting ? "Submitting..." : isRegionalPartner ? "Submit Application" : "Submit"}
                </Button>
                <div className="text-center">
                  <Link href={isRegionalPartner ? "/regional-partner" : "/"}>
                    <Button variant="outline" className="w-full" data-testid="button-back">
                      Back
                    </Button>
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      <MarketingFooter />
    </div>
  );
}
