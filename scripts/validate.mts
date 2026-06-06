#!/usr/bin/env tsx
/**
 * validate.mts
 * Standalone validation runner. Exits with code 1 on any validation error.
 * Used by pre-commit hook and CI.
 */

import {
  loadContentEntries,
  loadTags,
  loadTopics,
  loadAllowedDomains,
} from './lib/content.mjs';
import { validateAllEntries } from './lib/validate.mjs';

const entries = loadContentEntries();
const tags = loadTags();
const topics = loadTopics();
const domains = loadAllowedDomains();

try {
  const warnings = validateAllEntries(entries, tags, topics, domains);
  if (warnings.length > 0) {
    console.warn(`[validate] ${warnings.length} body-depth warnings:`);
    for (const w of warnings) {
      console.warn(`  ⚠ ${w}`);
    }
  }
  console.log(`[validate] ${entries.length} entries — frontmatter OK`);
} catch (err: unknown) {
  console.error((err as Error).message);
  process.exit(1);
}
