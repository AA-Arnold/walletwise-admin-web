export const RESTRICTED_EVENT_ADMIN_ID =
  "c52a1864-9823-4828-9ca4-1b626462c3f5";

export const RESTRICTED_EVENT_ID = "63b36981-b5b5-4b41-8b4f-c99f811b4b39";

export const RESTRICTED_EVENT_PATH =
  `/services/events/info/${RESTRICTED_EVENT_ID}`;

export const isRestrictedEventAdmin = (userId?: string | null) =>
  userId === RESTRICTED_EVENT_ADMIN_ID;
