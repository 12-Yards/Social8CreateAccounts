import { z } from "zod";

export const regionalPartnerSubmissionSchema = z.object({
  organisation: z.string().trim().max(200).optional().default(""),
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  mobile: z.string().trim().max(50).optional().default(""),
  territory: z.string().trim().min(1).max(500),
  network: z.string().trim().min(1).max(5000),
  communityTypes: z.string().trim().min(1).max(5000),
  firstTenApproach: z.string().trim().min(1).max(5000),
  notes: z.string().trim().max(5000).optional().default(""),
});

export type RegionalPartnerSubmission = z.infer<typeof regionalPartnerSubmissionSchema>;

export const regionalPartnerApplicationDataSchema = z.object({
  territory: z.string(),
  network: z.string(),
  communityTypes: z.string(),
  firstTenApproach: z.string(),
  additionalNotes: z.string().nullable(),
});

export type RegionalPartnerApplicationData = z.infer<typeof regionalPartnerApplicationDataSchema>;

const REGIONAL_PARTNER_V2_PREFIX = "Regional Partner Application v2\n";
export const REGIONAL_PARTNER_RESERVED_PREFIX = "Regional Partner Application";

export function serializeRegionalPartnerApplication(data: RegionalPartnerApplicationData): string {
  return `${REGIONAL_PARTNER_V2_PREFIX}${JSON.stringify(data)}`;
}

function parseLegacyValue(notes: string, startLabel: string, nextLabel?: string): string | null {
  const startIndex = notes.indexOf(startLabel);
  if (startIndex === -1) {
    return null;
  }

  const valueStart = startIndex + startLabel.length;
  const valueEnd = nextLabel
    ? notes.indexOf(`\n\n${nextLabel}`, valueStart)
    : notes.length;
  const value = notes.slice(valueStart, valueEnd === -1 ? notes.length : valueEnd).trim();
  return value || null;
}

export function parseRegionalPartnerApplication(notes: string | null): RegionalPartnerApplicationData | null {
  if (!notes?.startsWith(REGIONAL_PARTNER_RESERVED_PREFIX)) {
    return null;
  }

  if (notes.startsWith(REGIONAL_PARTNER_V2_PREFIX)) {
    try {
      const parsed = regionalPartnerApplicationDataSchema.safeParse(
        JSON.parse(notes.slice(REGIONAL_PARTNER_V2_PREFIX.length)),
      );
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }

  return {
    territory: parseLegacyValue(notes, "Region or territory:", "Existing network or relationships:") || "",
    network: parseLegacyValue(notes, "Existing network or relationships:", "Community types to target:") || "",
    communityTypes: parseLegacyValue(notes, "Community types to target:", "Approach to first 10 communities:") || "",
    firstTenApproach: parseLegacyValue(notes, "Approach to first 10 communities:", "Additional notes:") || "",
    additionalNotes: parseLegacyValue(notes, "Additional notes:"),
  };
}