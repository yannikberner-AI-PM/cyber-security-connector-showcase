import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const root = new URL('../', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root));
test('three actual screenshots have PNG dimensions and matching provenance', () => {
  const p = JSON.parse(read('PROVENANCE.json'));
  assert.equal(p.screenshots.length, 3);
  assert.equal(p.capture.data_classification, 'synthetic');
  assert.equal(p.capture.live_integrations, false);
  assert.equal(p.capture.evidence_storage, false);
  for (const s of p.screenshots) {
    assert.match(s.path, /^docs\/screenshots\/0[123]-[a-z-]+\.png$/);
    const data = read(s.path);
    assert.equal(data.subarray(0,8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(data.readUInt32BE(16), 1440);
    assert.ok(data.readUInt32BE(20) >= 1100);
    assert.equal(crypto.createHash('sha256').update(data).digest('hex'), s.sha256);
    assert.ok(read('README.md').toString().includes(s.path));
  }
});
test('capture exercised actual demo APIs without external requests or browser errors', () => {
  const r = JSON.parse(read('docs/screenshots/capture-report.json'));
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.blocked, []);
  assert.equal(r.session, 'cyber-screens');
  assert.equal(r.measureCount, 13);
  assert.deepEqual(r.postResponses.map(x => [x.status,x.mode]), [[200,'demo'],[200,'demo'],[200,'demo']]);
  assert.deepEqual(r.postResponses.map(x => x.path), ['/api/onboarding/complete','/api/tickets/create-all','/api/webhooks/jira']);
});
test('manifest covers every public file and verifies exact bytes', () => {
  const lines=read('MANIFEST.sha256').toString().trim().split('\n');
  const paths=lines.map(line => {
    const match=line.match(/^([a-f0-9]{64})  (.+)$/); assert.ok(match);
    assert.ok(!match[2].includes('..') && !match[2].startsWith('/'));
    assert.equal(crypto.createHash('sha256').update(read(match[2])).digest('hex'),match[1],match[2]);
    return match[2];
  });
  const walk = dir => fs.readdirSync(new URL(dir, root), {withFileTypes:true}).flatMap(e => {
    if(e.name === '.git') return [];
    assert.ok(!e.isSymbolicLink());
    const p=dir+e.name;
    return e.isDirectory()?walk(p+'/'):[p];
  });
  assert.deepEqual(paths.sort(),walk('').filter(p => p!=='MANIFEST.sha256').sort());
});
test('German documentation avoids long dash punctuation and local file links resolve', () => {
  for(const file of ['README.md','docs/SCREENSHOTS.md','docs/VERIFICATION.md']) {
    const text=read(file).toString(); assert.ok(!/[\u2013\u2014]/.test(text),file);
    for(const m of text.matchAll(/\]\(([^)]+)\)/g)) {
      if(/^(https?:|#)/.test(m[1])) continue;
      assert.ok(fs.existsSync(new URL(m[1].split('#')[0],new URL(file,root))),m[1]);
    }
  }
});
