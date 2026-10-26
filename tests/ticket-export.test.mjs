import test from 'node:test';
import assert from 'node:assert/strict';
import { toTicketExportRecord, buildTicketExport, calculateProgress } from '../components/src/actions/ticket-export.ts';

// Ausschließlich synthetisch; kein echter Rechtsbezug, Kunde oder Mitarbeiter.
const action = () => ({
  id: 'synthetic-action-1', workspaceId: 'synthetic-workspace', questionId: 'synthetic-question',
  title: 'Synthetische Prozessprüfung', description: 'Beispielhinweis fachlich prüfen.',
  priority: 'high', status: 'open', owner: 'Synthetische Rolle',
  sourceCategories: ['org_hr', 'qm_process'],
  legalReferences: [{ instrument: 'SYNTHETIC', provision: 'EXAMPLE', jurisdiction: 'EU', url: 'https://example.invalid' }],
});

test('Export erhält Herkunft, Verantwortliche und Zielprojekt', () => {
  const record = toTicketExportRecord(action(), 'generic_csv', 'SYNTHETIC');
  assert.equal(record.actionId, 'synthetic-action-1');
  assert.equal(record.target, 'generic_csv');
  assert.equal(record.externalProject, 'SYNTHETIC');
  assert.equal(record.owner, 'Synthetische Rolle');
  assert.equal(record.summary, action().title);
  assert.equal(record.status, 'open');
  assert.deepEqual(record.metadata, { workspaceId: 'synthetic-workspace', questionId: 'synthetic-question', sourceCategories: 'org_hr,qm_process' });
  assert.match(record.description, /SYNTHETIC EXAMPLE/);
  assert.match(record.description, /synthetic-question/);
});

test('Alle vier Prioritäten werden in Exportlabels abgebildet', () => {
  for (const [priority, expected] of Object.entries({ critical: 'Highest', high: 'High', medium: 'Medium', low: 'Low' })) {
    const result = toTicketExportRecord({ ...action(), priority }, 'jira');
    assert.equal(result.priority, expected);
    assert.deepEqual(result.labels, ['lotse', 'nis2', `priority-${priority}`]);
  }
});

test('Fehlende optionale Felder und leere Referenzen bleiben erlaubt', () => {
  const result = toTicketExportRecord({ ...action(), owner: undefined, legalReferences: [], sourceCategories: [] }, 'generic_csv');
  assert.equal(result.owner, undefined);
  assert.equal(result.externalProject, undefined);
  assert.equal(result.metadata.sourceCategories, '');
});

test('Batchexport erhält Reihenfolge ohne die Eingabe zu verändern', () => {
  const input = [action(), { ...action(), id: 'synthetic-action-2', status: 'blocked' }];
  const before = structuredClone(input);
  const output = buildTicketExport(input, 'asana');
  assert.deepEqual(output.map(item => item.actionId), ['synthetic-action-1', 'synthetic-action-2']);
  assert.deepEqual(input, before);
  assert.equal(output[1].status, 'blocked');
});

test('Leere Eingabe erzeugt weder Tickets noch Fortschritt', () => {
  assert.deepEqual(buildTicketExport([], 'generic_csv'), []);
  assert.deepEqual(calculateProgress([]), { total: 0, open: 0, inProgress: 0, blocked: 0, done: 0, completionPercent: 0 });
});

test('Fortschritt zählt Status und gewichtet in_progress zur Hälfte', () => {
  const input = ['open', 'in_progress', 'blocked', 'done'].map(status => ({ ...action(), status }));
  assert.deepEqual(calculateProgress(input), { total: 4, open: 1, inProgress: 1, blocked: 1, done: 1, completionPercent: 38 });
  assert.equal(calculateProgress([{ ...action(), status: 'done' }]).completionPercent, 100);
});

test('Bekannte Grenze: done wird ohne Nachweis- oder Freigabeprüfung gezählt', () => {
  const unreviewed = { ...action(), status: 'done' };
  assert.equal(calculateProgress([unreviewed]).completionPercent, 100);
  assert.equal(toTicketExportRecord(unreviewed, 'jira').status, 'done');
  // Charakterisierung einer Grenze, keine Zusicherung eines Review-Gates.
});

test('Exportziel ist ein Datenfeld, keine bestätigte Live-Integration', () => {
  for (const target of ['jira', 'azure_devops', 'asana', 'service_now', 'generic_csv']) {
    assert.equal(toTicketExportRecord(action(), target).target, target);
  }
});
