export type WorkspaceType = 'partner' | 'customer' | 'kmu';

export interface Workspace {
  id: string;
  name: string;
  type: WorkspaceType;
  parent_id: string | null;
  onboarding: OnboardingData;
  jira_access_token: string | null;
  jira_refresh_token: string | null;
  jira_cloud_id: string | null;
  jira_site_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface OnboardingData {
  sector?: string;
  companySize?: string;
  tools?: string[];
  jiraConnected?: boolean;
  connectorIds?: string[];
}

// ---------------------------------------------------------------------------
// Connector framework (v2) — the core mechanism of the product.
//
// KMU side: org_hr + qm_process supply the raw material for the partner's
// Maßnahmenplan; ticketing is a deliberately secondary, optional category
// (createTicket? / onStatusChange? below).
//
// Partner side: partner_crm pulls the partner's own CRM accounts/companies
// into Lotse so Kundenanlage needs no manual re-entry (B2B2B intake).
// ---------------------------------------------------------------------------

export type ConnectorCategory = 'org_hr' | 'qm_process' | 'ticketing' | 'partner_crm';

/** Categories shown when connecting a KMU customer's tools. */
export const KMU_CONNECTOR_CATEGORIES: ConnectorCategory[] = [
  'org_hr',
  'qm_process',
  'ticketing',
];

/** Categories shown when a Cyber-Security partner onboards their clients. */
export const PARTNER_CONNECTOR_CATEGORIES: ConnectorCategory[] = ['partner_crm'];

export type ConnectorAuthMethod = 'oauth2' | 'api_key' | 'csv_import';

/** Lifecycle/availability state surfaced in the Connector Marketplace UI. */
export type ConnectorAvailability = 'available' | 'beta' | 'coming_soon';

export interface ConnectionHandle {
  connectorId: string;
  workspaceId: string;
  /** Opaque reference to stored credentials — never the raw secret itself. */
  credentialsRef: string;
  connectedAt: string;
  meta?: Record<string, unknown>;
}

export type NormalizedRecordType =
  | 'employee'
  | 'department'
  | 'role'
  | 'process'
  | 'document'
  | 'customer'
  | 'company'
  | 'generic';

/** A single fact pulled from a connector, normalized enough for the
 * Maßnahmenplan engine to reason about regardless of its source system. */
export interface NormalizedRecord {
  id: string;
  connectorId: string;
  category: ConnectorCategory;
  recordType: NormalizedRecordType;
  label: string;
  data: Record<string, unknown>;
}

export interface TicketRef {
  externalId: string;
  url: string;
  status: string;
}

export interface StatusUpdate {
  externalId: string;
  status: string;
  timestamp: string;
}

export interface Connector {
  /** Stable slug, e.g. "personio", "csv_qm", "jira". */
  id: string;
  category: ConnectorCategory;
  displayName: string;
  description: string;
  authMethod: ConnectorAuthMethod;
  availability: ConnectorAvailability;
  connect(credentials: unknown): Promise<ConnectionHandle>;
  pull(handle: ConnectionHandle): Promise<NormalizedRecord[]>;
  /** Ticketing-only: turn a generated measure into an external ticket. */
  createTicket?(handle: ConnectionHandle, measure: Measure): Promise<TicketRef>;
  /** Ticketing-only: subscribe to status changes (webhook/poll-backed). */
  onStatusChange?(handle: ConnectionHandle, cb: (update: StatusUpdate) => void): void;
}

/** Marketplace-facing metadata for connectors that don't have a working
 * adapter yet ("Bald verfügbar" slots) — keeps every category slot visible.
 * partner_crm slots belong on the partner (B2B2B) surface, not KMU onboarding. */
export interface ConnectorCatalogEntry {
  id: string;
  category: ConnectorCategory;
  displayName: string;
  description: string;
  authMethod: ConnectorAuthMethod;
  availability: ConnectorAvailability;
}

export type MeasureStatus = 'open' | 'in_progress' | 'done' | 'blocked';
export type MeasurePriority = 'critical' | 'high' | 'medium' | 'low';

export interface Measure {
  id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  priority: MeasurePriority;
  status: MeasureStatus;
  category: string | null;
  iso_control: string | null;
  sort_order: number;
  /** Person/role responsible, typically resolved from an org_hr connector. */
  owner: string | null;
  /** Which connector categories contributed data to this measure. */
  sourceCategories: ConnectorCategory[];
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  measure_id: string;
  workspace_id: string;
  jira_issue_key: string | null;
  jira_issue_id: string | null;
  jira_status: string | null;
  jira_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface StatusHistoryEntry {
  id: string;
  ticket_id: string;
  measure_id: string;
  old_status: string | null;
  new_status: string;
  jira_issue_key: string | null;
  source: string;
  created_at: string;
}

export interface JiraWebhookPayload {
  webhookEvent: string;
  issue: {
    id: string;
    key: string;
    self: string;
    fields: {
      status: { name: string };
      summary: string;
    };
  };
  changelog?: {
    items: Array<{
      field: string;
      fromString: string | null;
      toString: string | null;
    }>;
  };
}

export interface CreateTicketResult {
  ticket: Ticket;
  jiraIssueKey: string;
  jiraUrl: string;
}

export interface OnboardingAnswers {
  sector: string;
  companySize: string;
  tools: string[];
}

export interface GeneratedMeasure {
  title: string;
  description: string;
  priority: MeasurePriority;
  category: string;
  iso_control: string;
  owner?: string;
  sourceCategories?: ConnectorCategory[];
}
