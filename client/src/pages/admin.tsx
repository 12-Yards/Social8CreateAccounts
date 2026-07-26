import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Users,
  Mail,
  ChevronLeft,
  Circle,
  Trash2,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Registration, ContactSubmission } from "@shared/schema";

type Tab = "registrations" | "contacts";

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<Tab>("registrations");
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDeleteRegistration = async (id: number) => {
    setDeleting(true);
    try {
      await apiRequest("DELETE", `/api/admin/registrations/${id}`);
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/registrations"] });
      setSelectedReg(null);
      setDeleteConfirm(null);
    } catch {
    } finally {
      setDeleting(false);
    }
  };

  const { data: authCheck, isLoading: authLoading } = useQuery<{ isAdmin: boolean } | null>({
    queryKey: ["/api/admin/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const { data: registrations = [], isLoading: regsLoading } = useQuery<Registration[]>({
    queryKey: ["/api/admin/registrations"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!authCheck?.isAdmin,
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!authCheck?.isAdmin,
  });

  useEffect(() => {
    if (!authLoading && !authCheck?.isAdmin) {
      setLocation("/admin/login");
    }
  }, [authCheck, authLoading, setLocation]);

  const handleLogout = async () => {
    await apiRequest("POST", "/api/admin/logout", {});
    queryClient.clear();
    setLocation("/admin/login");
  };

  const handleSelectReg = async (reg: Registration) => {
    setSelectedReg(reg);
    if (!reg.isRead) {
      try {
        await apiRequest("PATCH", `/api/admin/registrations/${reg.id}/read`, {});
        queryClient.invalidateQueries({ queryKey: ["/api/admin/registrations"] });
      } catch {}
    }
  };

  const handleSelectContact = async (contact: ContactSubmission) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      try {
        await apiRequest("PATCH", `/api/admin/contacts/${contact.id}/read`, {});
        queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      } catch {}
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    try {
      await apiRequest("DELETE", `/api/admin/contacts/${id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      setSelectedContact(null);
    } catch {}
  };


  const newRegsCount = registrations.filter((r: Registration) => !r.isRead).length;
  const newContactsCount = contacts.filter((c: ContactSubmission) => !c.isRead).length;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!authCheck?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30" data-testid="page-admin">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
          <h1 className="text-lg font-bold" data-testid="heading-admin">Social8 Admin</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-admin-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <Button
            variant={tab === "registrations" ? "default" : "outline"}
            onClick={() => { setTab("registrations"); setSelectedReg(null); }}
            data-testid="tab-registrations"
          >
            <Users className="w-4 h-4 mr-2" />
            Registrations
            {newRegsCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs" data-testid="badge-new-regs">{newRegsCount}</Badge>
            )}
          </Button>
          <Button
            variant={tab === "contacts" ? "default" : "outline"}
            onClick={() => { setTab("contacts"); setSelectedContact(null); }}
            data-testid="tab-contacts"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Submissions
            {newContactsCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs" data-testid="badge-new-contacts">{newContactsCount}</Badge>
            )}
          </Button>
        </div>

        {tab === "registrations" && !selectedReg && (
          <Card>
            <CardHeader>
              <CardTitle data-testid="heading-registrations">Account Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              {regsLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : registrations.length === 0 ? (
                <p className="text-muted-foreground" data-testid="text-no-registrations">No registrations yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 pr-4 font-medium">Organisation</th>
                        <th className="pb-2 pr-4 font-medium">Name</th>
                        <th className="pb-2 pr-4 font-medium">Email</th>
                        <th className="pb-2 pr-4 font-medium">Domain</th>
                        <th className="pb-2 pr-4 font-medium">Date</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(registrations as Registration[]).map((reg) => (
                        <tr key={reg.id} className={`border-b last:border-0 ${!reg.isRead ? "bg-green-50 dark:bg-green-950/20" : ""}`}>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              {!reg.isRead && <Circle className="w-2.5 h-2.5 fill-green-500 text-green-500 flex-shrink-0" data-testid={`icon-new-reg-${reg.id}`} />}
                              {reg.orgName}
                            </div>
                          </td>
                          <td className="py-3 pr-4">{reg.userName}</td>
                          <td className="py-3 pr-4">{reg.email}</td>
                          <td className="py-3 pr-4">
                            {reg.hasDomain === "yes" ? reg.domainName : reg.noDomainPrefix ? `${reg.noDomainPrefix}.social8.app` : "-"}
                          </td>
                          <td className="py-3 pr-4">
                            {reg.createdAt ? new Date(reg.createdAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSelectReg(reg)}
                              data-testid={`button-view-reg-${reg.id}`}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {tab === "registrations" && selectedReg && (
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedReg(null)}
              data-testid="button-back-to-list"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to list
            </Button>
            <Card>
              <CardHeader>
                <CardTitle data-testid="heading-reg-detail">{selectedReg.orgName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Organisation Name</Label>
                    <p className="font-medium" data-testid="text-reg-org">{selectedReg.orgName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Contact Name</Label>
                    <p className="font-medium" data-testid="text-reg-name">{selectedReg.userName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Email</Label>
                    <p className="font-medium" data-testid="text-reg-email">{selectedReg.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Has Domain</Label>
                    <p className="font-medium" data-testid="text-reg-domain">{selectedReg.hasDomain === "yes" ? "Yes" : "No"}</p>
                  </div>
                  {selectedReg.hasDomain === "yes" && (
                    <>
                      <div>
                        <Label className="text-muted-foreground text-xs">Domain Name</Label>
                        <p className="font-medium">{selectedReg.domainName}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs">Subdomain</Label>
                        <p className="font-medium">{selectedReg.subdomain}.{selectedReg.domainName}</p>
                      </div>
                    </>
                  )}
                  {selectedReg.hasDomain === "no" && selectedReg.noDomainPrefix && (
                    <div>
                      <Label className="text-muted-foreground text-xs">Subdomain</Label>
                      <p className="font-medium">{selectedReg.noDomainPrefix}.social8.app</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-muted-foreground text-xs">Registration Date</Label>
                    <p className="font-medium">
                      {selectedReg.createdAt ? new Date(selectedReg.createdAt).toLocaleString() : "-"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-end">
                  {deleteConfirm === selectedReg.id ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Are you sure?</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteRegistration(selectedReg.id)}
                        disabled={deleting}
                        data-testid="button-confirm-delete-reg"
                      >
                        {deleting ? "Deleting..." : "Yes, Delete"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteConfirm(null)}
                        data-testid="button-cancel-delete-reg"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                      onClick={() => setDeleteConfirm(selectedReg.id)}
                      data-testid="button-delete-reg"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete Registration
                    </Button>
                  )}
                </div>

              </CardContent>
            </Card>
          </div>
        )}

        {tab === "contacts" && !selectedContact && (
          <Card>
            <CardHeader>
              <CardTitle data-testid="heading-contacts">Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {contactsLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : contacts.length === 0 ? (
                <p className="text-muted-foreground" data-testid="text-no-contacts">No contact submissions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 pr-4 font-medium">Organisation</th>
                        <th className="pb-2 pr-4 font-medium">Name</th>
                        <th className="pb-2 pr-4 font-medium">Email</th>
                        <th className="pb-2 pr-4 font-medium">Mobile</th>
                        <th className="pb-2 pr-4 font-medium">Date</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(contacts as ContactSubmission[]).map((contact) => (
                        <tr key={contact.id} className={`border-b last:border-0 ${!contact.isRead ? "bg-green-50 dark:bg-green-950/20" : ""}`}>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              {!contact.isRead && <Circle className="w-2.5 h-2.5 fill-green-500 text-green-500 flex-shrink-0" data-testid={`icon-new-contact-${contact.id}`} />}
                              {contact.organisation || "-"}
                            </div>
                          </td>
                          <td className="py-3 pr-4">{contact.name}</td>
                          <td className="py-3 pr-4">{contact.email}</td>
                          <td className="py-3 pr-4">{contact.mobile || "-"}</td>
                          <td className="py-3 pr-4">
                            {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSelectContact(contact)}
                                data-testid={`button-view-contact-${contact.id}`}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteContact(contact.id)}
                                data-testid={`button-delete-contact-${contact.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {tab === "contacts" && selectedContact && (
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedContact(null)}
              data-testid="button-back-to-contacts"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to list
            </Button>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle data-testid="heading-contact-detail">Contact from {selectedContact.name}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteContact(selectedContact.id)}
                    data-testid="button-delete-contact-detail"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Organisation</Label>
                    <p className="font-medium" data-testid="text-contact-org">{selectedContact.organisation || "-"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Name</Label>
                    <p className="font-medium" data-testid="text-contact-name">{selectedContact.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Email</Label>
                    <p className="font-medium" data-testid="text-contact-email">{selectedContact.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Mobile</Label>
                    <p className="font-medium" data-testid="text-contact-mobile">{selectedContact.mobile || "-"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground text-xs">Notes</Label>
                    <p className="font-medium whitespace-pre-wrap" data-testid="text-contact-notes">{selectedContact.notes || "-"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Date Submitted</Label>
                    <p className="font-medium">
                      {selectedContact.createdAt ? new Date(selectedContact.createdAt).toLocaleString() : "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
