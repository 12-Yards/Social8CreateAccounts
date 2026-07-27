import { useState, useEffect } from "react";
import { updatePageSEO, resetPageSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import logoPath from "@assets/S8Final1_clean.png";
import { apiRequest } from "@/lib/queryClient";

export default function ContactPage() {
  useEffect(() => {
    updatePageSEO({
      title: "Contact Us | Social8",
      description: "Get in touch with the Social8 team. We'd love to hear from you about our community management platform.",
      url: "/contact",
    });
    return () => resetPageSEO();
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [organisation, setOrganisation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/contacts", {
        organisation,
        name,
        email,
        mobile,
        notes,
      });
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
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold" data-testid="heading-contact">Contact Us</CardTitle>
            <CardDescription>Get in touch with our team</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-cyan-600 mb-2" data-testid="text-submitted">Thank You</h3>
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
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
                <div className="text-center">
                  <Link href="/">
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
    </div>
  );
}
