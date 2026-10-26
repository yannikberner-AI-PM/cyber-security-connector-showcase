import type {
  ConnectorCategory,
  MeasurePriority,
  MeasureStatus,
  NormalizedRecord,
} from '../types';

export type AssessmentAnswerValue = 'yes' | 'partial' | 'no' | 'unknown' | 'not_applicable';
export type AnswerOrigin = 'manual' | 'connector' | 'ai_assisted' | 'partner_reviewed';
export type CatalogSourceKind = 'licensed' | 'internally_curated' | 'ai_assisted';

export interface LegalReference {
  jurisdiction: 'DE' | 'EU';
  instrument: string;
  provision: string;
  url: string;
}

export interface EvidenceRule {
  connectorCategories?: ConnectorCategory[];
  recordTypes?: NormalizedRecord['recordType'][];
  keywords: string[];
  minimumMatches?: number;
  confidence: number;
}

export interface QuestionDefinition {
  id: string;
  section: string;
  prompt: string;
  rationale: string;
  evidenceRequest: string;
  legalReferences: LegalReference[];
  evidenceRules: EvidenceRule[];
  actionTemplate: {
    title: string;
    description: string;
    priority: MeasurePriority;
  };
}

export interface QuestionnaireCatalog {
  id: string;
  version: string;
  title: string;
  sourceKind: CatalogSourceKind;
  reviewedAt: string;
  disclaimer: string;
  questions: QuestionDefinition[];
}

export interface ManualAssessmentAnswer {
  questionId: string;
  value: AssessmentAnswerValue;
  note?: string;
  evidenceRecordIds?: string[];
  reviewedByPartner?: boolean;
}

export interface AssessmentContext {
  workspaceId: string;
  companyName: string;
  sector: string;
  companySize: string;
  records: NormalizedRecord[];
  manualAnswers?: ManualAssessmentAnswer[];
}

export interface AssessmentEvidence {
  recordId: string;
  connectorId: string;
  label: string;
  capturedAt?: string;
}

export interface AssessmentAnswer {
  questionId: string;
  value: AssessmentAnswerValue;
  origin: AnswerOrigin;
  confidence: number;
  note: string;
  evidence: AssessmentEvidence[];
  requiresReview: boolean;
}

export interface AssessmentAction {
  id: string;
  workspaceId: string;
  questionId: string;
  title: string;
  description: string;
  priority: MeasurePriority;
  status: MeasureStatus;
  owner?: string;
  sourceCategories: ConnectorCategory[];
  legalReferences: LegalReference[];
}

export interface AssessmentRun {
  id: string;
  workspaceId: string;
  catalogId: string;
  catalogVersion: string;
  startedAt: string;
  completedAt: string;
  score: number | null;
  answers: AssessmentAnswer[];
  actions: AssessmentAction[];
}

export type TicketTarget = 'jira' | 'azure_devops' | 'asana' | 'service_now' | 'generic_csv';

export interface TicketExportRecord {
  actionId: string;
  target: TicketTarget;
  externalProject?: string;
  summary: string;
  description: string;
  priority: string;
  status: MeasureStatus;
  owner?: string;
  labels: string[];
  metadata: Record<string, string>;
}

export interface ProgressSummary {
  total: number;
  open: number;
  inProgress: number;
  blocked: number;
  done: number;
  completionPercent: number;
}

export interface ManagementReportModel {
  title: string;
  generatedAt: string;
  companyName: string;
  assessmentScore: number | null;
  progress: ProgressSummary;
  keyGaps: Array<{ title: string; priority: MeasurePriority; status: MeasureStatus }>;
  managementDuties: string[];
  decisionsRequired: string[];
}

export interface AuditPackageModel {
  title: string;
  generatedAt: string;
  companyName: string;
  catalog: { id: string; version: string; sourceKind: CatalogSourceKind };
  scope: { sector: string; companySize: string };
  answers: AssessmentAnswer[];
  evidenceIndex: AssessmentEvidence[];
  actions: AssessmentAction[];
  unresolvedQuestions: string[];
}
