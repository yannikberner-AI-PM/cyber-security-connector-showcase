import type { AssessmentAction, ProgressSummary, TicketExportRecord, TicketTarget } from '../compliance/types';

const PRIORITY_LABELS = {
  critical: 'Highest',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
} as const;

export function toTicketExportRecord(
  action: AssessmentAction,
  target: TicketTarget,
  externalProject?: string
): TicketExportRecord {
  return {
    actionId: action.id,
    target,
    externalProject,
    summary: action.title,
    description: [
      action.description,
      '',
      `NIS-2-Prüffrage: ${action.questionId}`,
      `Rechtsbezug: ${action.legalReferences.map((ref) => `${ref.instrument} ${ref.provision}`).join(', ')}`,
    ].join('\n'),
    priority: PRIORITY_LABELS[action.priority],
    status: action.status,
    owner: action.owner,
    labels: ['lotse', 'nis2', `priority-${action.priority}`],
    metadata: {
      workspaceId: action.workspaceId,
      questionId: action.questionId,
      sourceCategories: action.sourceCategories.join(','),
    },
  };
}

export function buildTicketExport(
  actions: AssessmentAction[],
  target: TicketTarget,
  externalProject?: string
): TicketExportRecord[] {
  return actions.map((action) => toTicketExportRecord(action, target, externalProject));
}

export function calculateProgress(actions: AssessmentAction[]): ProgressSummary {
  const total = actions.length;
  const done = actions.filter((action) => action.status === 'done').length;
  const inProgress = actions.filter((action) => action.status === 'in_progress').length;
  const blocked = actions.filter((action) => action.status === 'blocked').length;
  const open = actions.filter((action) => action.status === 'open').length;
  return {
    total,
    open,
    inProgress,
    blocked,
    done,
    completionPercent: total ? Math.round(((done + inProgress * 0.5) / total) * 100) : 0,
  };
}
