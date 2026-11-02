import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = file => readFileSync(new URL(file, root), 'utf8');
const targets = text => [...text.matchAll(/\]\(([^)]+)\)|src="([^"]+)"/g)].map(m => m[1] || m[2]);

test('English and German README entry points link to each other', () => {
  assert.ok(read('README.md').includes('**English** | [Deutsch](README.de.md)'));
  assert.ok(read('README.de.md').includes('[English](README.md) | **Deutsch**'));
});

test('both README languages retain the same evidence and documentation links', () => {
  const evidence = file => [...new Set(targets(read(file)).filter(p => !/^README(?:\.de)?\.md$/.test(p)))].sort();
  assert.deepEqual(evidence('README.md'), evidence('README.de.md'));
  for (const file of ['README.md', 'README.de.md']) {
    for (const link of targets(read(file))) {
      if (/^(https?:|mailto:|#)/.test(link)) continue;
      const url = new URL(link.split('#')[0], root);
      assert.ok(url.href.startsWith(root.href), `${file}: outside repository`);
      assert.ok(existsSync(url), `${file}: missing ${link}`);
    }
  }
});

test('English README identifies untranslated UI and German supporting documentation', () => {
  const text = read('README.md');
  assert.ok(text.includes('application UI remains'));
  assert.ok(text.includes('in German'));
  assert.ok(!/[\u2013\u2014]/.test(text));
});
