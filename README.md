# WalletWise Admin

WalletWise Admin is the internal operations dashboard for managing WalletWise
users, administrators, partners, events, tickets, transactions, earnings, KYC,
support requests, roles, permissions, and service configuration.

The application is built with Next.js and communicates with the WalletWise
admin API through an authenticated Axios client.

## Technology stack

- Next.js 15 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- TanStack Query for server state and request caching
- TanStack Table for data tables
- Redux Toolkit for shared client state
- Axios for API requests
- Radix UI-based components
- Framer Motion for transitions
- Sonner for notifications
- Vitest and Testing Library

## Requirements

- Node.js 20 or newer
- npm
- Access to the WalletWise admin API
- A valid admin account

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root:

   ```dotenv
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_BACKEND_BASE_URL=https://your-api.example.com/api/v1
   NEXT_PUBLIC_BACKEND_BASE_URL_SOCKET=https://your-api.example.com
   NEXT_PUBLIC_COOKIE_DOMAIN=
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

Do not commit real access tokens, private API hosts, or production-only
credentials.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | Public URL used for application metadata. |
| `NEXT_PUBLIC_BACKEND_BASE_URL` | Base URL for REST requests. It should include `/api/v1` when required by the backend. |
| `NEXT_PUBLIC_BACKEND_BASE_URL_SOCKET` | Base host used by real-time notification connections. |
| `NEXT_PUBLIC_COOKIE_DOMAIN` | Optional shared cookie domain for deployed environments. |

Authenticated requests read the `walletwiseToken` cookie and send it as a
Bearer token through the Axios request interceptor in
`src/lib/axiosInstance.ts`.

## Available commands

```bash
npm run dev       # Start the local development server
npm run build     # Create a production build
npm run start     # Start the production server
npm run lint      # Run ESLint
npm run test      # Run Vitest
npx tsc --noEmit  # Run TypeScript checks without emitting files
```

Before opening a pull request, run:

```bash
npm run lint
npm run test
npx tsc --noEmit
npm run build
```

## Project structure

```text
src/
├── app/                 # App Router pages and route layouts
├── components/
│   ├── atoms/           # Small reusable UI elements
│   ├── molecules/       # Composed controls and table utilities
│   ├── organisms/       # Larger feature-independent sections
│   ├── templates/       # Page and dashboard layouts
│   └── ui/              # Radix/shadcn-style primitives
├── features/
│   ├── auth/            # Login, verification, and password workflows
│   ├── partners/        # Partner accounts and partner event summaries
│   ├── services/        # Events and financial/service operations
│   ├── tickets/         # Support ticket management
│   └── users/           # Users, admins, referrals, and related records
├── lib/
│   ├── api/             # Shared API functions
│   ├── constants/       # Shared constants
│   ├── helpers/         # Formatting, cookies, errors, and sockets
│   ├── hooks/           # Shared state and request hooks
│   └── types/           # Shared TypeScript contracts
├── store/               # Redux store, provider, and slices
└── styles/              # Global styles
```

Feature folders generally use the following structure:

```text
features/<feature>/
├── api/          # Axios request functions
├── components/   # Feature UI
├── constants/    # Feature constants
├── helpers/      # Feature transformations
├── hooks/        # React Query and UI-state hooks
└── types/        # Feature contracts
```

## Application areas

### Authentication and access

The application supports login, account verification, forgotten-password and
reset-password flows. Protected routes are checked by `src/middleware.ts`.
Role and permission management is available through the Roles and Manage Admin
sections.

### Users and partners

Administrators can inspect users, transactions, referrals, disputes, cards,
sessions, and activity. Partner management supports account creation, status
changes, deletion, partner details, and partner-created events. The Partners
page provides a general **Create Partner Event** action, while each partner row
provides a preselected creation action for that specific partner.

### Events and tickets

The Events section provides:

- Paginated event listing and search
- Partner event creation and event editing
- Full event details and ticket configuration
- Partner- and admin-created event response normalization
- Event approval and decline workflows
- Event deletion
- Event attendees
- Paginated ticket records
- Admin ticket validation

Event actions behave according to the current event status:

| Current status | Available status actions |
| --- | --- |
| `Pending` | Approve and Decline |
| `Approved` | Decline |
| `Declined` | Approve |

Every event action menu also provides View, Edit, and Delete. Event names link
directly to `/services/events/info/:eventId`. Event IDs, partner names and IDs,
and attendee names and user tags also link to their corresponding event,
partner, or user information pages.

#### Creating an event for a partner

Partner events are created at `/services/events/create`. The partner selector
is the first field and loads its options from `GET /partner`, displaying a
skeleton while the partner list is loading. Opening the form from a partner row
adds `?partnerId=:partnerId` and preselects that partner.

The form supports:

- Concert, beauty pageant, sports, conference, religion, and other categories
- Required square thumbnail and optional event-page banner images
- Live thumbnail and event-page previews
- Editable ticket tier names, prices, and capacities
- Optional headliners with images
- Beauty-pageant prizes and contestant registration fields
- Event schedule, venue, service fee, and refund policy

Submission uses `multipart/form-data` and sends the selected partner as
`partner_id` to `POST /partner-event`. Structured values such as ticket types,
headliners, prizes, and form settings are JSON encoded within the multipart
request. After a successful creation, the admin is redirected to the all-events
page at `/services/events`.

The event information query accepts both supported ticket representations:

- Object-based ticket types used by existing admin events
- Array-based `{ type, price, capacity }` ticket types used by partner events

Array-based values are normalized at the API boundary before being consumed by
the event card and edit workflow.

Important event API operations include:

```text
GET    /events
GET    /events/:eventId
PATCH  /events/:eventId
DELETE /events/:eventId
GET    /events/:eventId/attendees
POST   /partner-event
GET    /partner/:eventId/tickets
PATCH  /partner/events/:eventId
POST   /partner/validate-ticket
```

The configured Axios base URL supplies `/api/v1`; request functions should not
repeat that prefix.

Ticket validation sends:

```json
{
  "ticketId": "WALL-3900953"
}
```

Successful event and ticket mutations invalidate their relevant TanStack Query
caches so tables and detail views refresh.

### Transactions and services

The dashboard includes transaction and configuration views for airtime, data,
electricity, cable, education, betting, transfers, savings, gift cards, virtual
cards, event services, commissions, and earnings.

### Operations

Additional areas include KYC review, notifications, support tickets, analytics,
security settings, user tags, profile management, and role/permission
administration.

## Data-fetching conventions

- Put HTTP calls in the relevant `api` module.
- Use feature hooks to connect requests to TanStack Query.
- Include filters, page, limit, and identifiers in query keys.
- Use `enabled` when a request depends on an identifier.
- Normalize inconsistent backend shapes at the API or query-selection boundary.
- Invalidate every affected list and detail query after a mutation.
- Allow Axios errors to reject naturally unless the request layer adds useful
  context or transformation.
- Present API errors through `promiseErrorFunction` and Sonner.

## Tables and pagination

Reusable tables are built around `TableWrapper`, TanStack Table, and
`PaginationComponent`. Server-driven lists should:

- Send the current page and limit to the API.
- Read pagination metadata from the response.
- Reset to page one when changing the page size or filters.
- Keep row actions in a dedicated action-cell component.
- Avoid columns based on inconsistent record structures.

## UI conventions

- Reuse components from `src/components` before creating feature-specific
  alternatives.
- Use `DynamicTabs` for the standard tab/toggle presentation.
- Support light and dark themes.
- Show skeleton loaders while primary data is loading.
- Confirm destructive operations and state-changing administrative actions.
- Use `StatusBubble` for consistent status presentation.

## Adding a feature

1. Add or update the feature contract in its `types` folder.
2. Implement the API request in the feature `api` module.
3. Wrap it with a TanStack Query hook.
4. Build the UI from existing atoms, molecules, tables, and layouts.
5. Add the App Router page under `src/app`.
6. Invalidate affected query keys after mutations.
7. Add tests for reusable logic and critical interactions.
8. Run lint, tests, TypeScript, and a production build.

## Deployment

Create a production build with:

```bash
npm run build
```

Deploy the generated Next.js application to the chosen hosting platform and set
all required environment variables there. Ensure the frontend origin is allowed
by the backend and that cookie-domain and HTTPS settings match the deployment
environment.

## Troubleshooting

### Requests return 401 or 403

Confirm that the admin is signed in, the `walletwiseToken` cookie exists, and
the account has the required permissions.

### Requests use an incorrect URL

Check `NEXT_PUBLIC_BACKEND_BASE_URL`. It should match the backend base path
expected by the Axios request functions, normally ending in `/api/v1`.

### Tables do not refresh after a mutation

Verify that the mutation invalidates the same query-key prefix used by the list
or detail hook.

### Images do not render

Confirm that the remote image host is permitted in `next.config` and that the
API returned a valid image URL.

### Browser and server output differ

Check for browser-only APIs in server components and ensure interactive
components include the `"use client"` directive.
