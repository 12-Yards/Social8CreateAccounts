# Regional Partner Integration API

The Social8 tenant platform can retrieve Regional Partner applications through this read-only endpoint:

```text
GET /api/integrations/regional-partners
```

Use the Social8 marketing site base URL for the request. The endpoint is intended for server-to-server requests only.

## Authentication

Send the dedicated integration key as a bearer token:

```http
Authorization: Bearer YOUR_REGIONAL_PARTNER_API_KEY
```

The key must be configured as the `REGIONAL_PARTNER_API_KEY` secret in the Social8 marketing site environment. Do not use the admin username, admin password, or browser session cookie.

## Pagination

The endpoint uses 1-based page pagination:

```text
GET /api/integrations/regional-partners?page=1&limit=50
```

- `page` is optional and defaults to `1`.
- `limit` is optional and defaults to `50`.
- `limit` must be between `1` and `100`.
- Results are ordered newest first by submission date.

## Response

```json
{
  "applications": [
    {
      "id": 123,
      "organisation": "Example Organisation",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "mobile": "+44 7000 000000",
      "regionOrTerritory": "North West England",
      "existingNetworkOrRelationships": "Local sports and business relationships",
      "communityTypesToTarget": "Sports clubs and charities",
      "firstTenApproach": "I will approach existing contacts and local networks",
      "additionalNotes": "Available for an introductory call",
      "isRead": false,
      "submittedAt": "2026-08-28T09:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

Only submissions created through the Regional Partner application form are returned. The `id` field is the stable application identifier.

## Errors

| Status | Meaning |
|---|---|
| `400` | Invalid pagination values |
| `401` | Missing or invalid bearer token |
| `503` | The `REGIONAL_PARTNER_API_KEY` secret is not configured |
| `500` | The application store could not be queried |

Responses never include contact data for failed authentication or configuration checks.