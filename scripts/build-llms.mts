/**
 * build-llms.mts
 * Generates hierarchical llms.txt structure:
 *   - public/llms.txt (root index → category/topic/tag links)
 *   - public/llms/announcements/llms.txt (announcements index)
 *   - public/llms/sessions/llms.txt (sessions index)
 *   - public/llms/topics/{slug}/llms.txt (topic index)
 *   - public/llms/tags/{slug}/llms.txt (tag index)
 *   - public/llms/{type}/{id}/llms.txt (detail pages)
 */

import path from 'node:path';
import {
  loadContentEntries,
  loadTopics,
  loadTags,
  loadBuildInfo,
  cleanDir,
  writeFile,
} from './lib/content.mjs';
import { resolveDeliveries } from './lib/types.mjs';
import type { ContentEntry, TopicDef, TagDef } from './lib/types.mjs';

const PUBLIC_DIR = path.resolve(import.meta.dirname, '../public');
const buildInfo = loadBuildInfo();
const SITE_BASE = buildInfo.site_base;
const SITE_ORIGIN = 'https://openjny.github.io';

function shouldBuildLlms(entry: ContentEntry): boolean {
  return resolveDeliveries(entry.frontmatter.deliveries).llms;
}

function detailUrl(entry: ContentEntry): string {
  const parts = entry.relativePath.replace(/\.md$/, '').split('/');
  return `${SITE_ORIGIN}${SITE_BASE}/llms/${parts.join('/')}/llms.txt`;
}

function detailRelative(entry: ContentEntry): string {
  const id = entry.frontmatter.id;
  return `${id}/llms.txt`;
}

// ---------------------------------------------------------------------------
// Root index
// ---------------------------------------------------------------------------

function buildRootIndex(
  entries: ContentEntry[],
  topics: TopicDef[],
  tags: TagDef[],
): string {
  const info = buildInfo;
  const llmsEntries = entries.filter(shouldBuildLlms);
  const announcements = llmsEntries.filter(
    (e) => e.frontmatter.content_type === 'announcement',
  );
  const sessions = llmsEntries.filter(
    (e) => e.frontmatter.content_type === 'session',
  );

  const lines: string[] = [
    `# ${info.event}`,
    '',
    `> ${info.event} (${info.dates.start} – ${info.dates.end}, ${info.location}) の情報ハブ。アナウンス、セッション、リソースを集約。`,
    '',
    '## コンテンツ',
    '',
    `- [アナウンス](${SITE_ORIGIN}${SITE_BASE}/llms/announcements/llms.txt) (${announcements.length}件)`,
    `- [セッション](${SITE_ORIGIN}${SITE_BASE}/llms/sessions/llms.txt) (${sessions.length}件)`,
    '',
    '## トピック別',
    '',
  ];

  for (const topic of topics) {
    const count = llmsEntries.filter(
      (e) => e.frontmatter.topic === topic.slug,
    ).length;
    if (count === 0) continue;
    lines.push(
      `- [${topic.name}](${SITE_ORIGIN}${SITE_BASE}/llms/topics/${topic.slug}/llms.txt) (${count}件)`,
    );
  }

  lines.push('');
  lines.push('## タグ別');
  lines.push('');

  for (const tag of tags) {
    const count = llmsEntries.filter((e) =>
      e.frontmatter.tags.includes(tag.slug),
    ).length;
    if (count === 0) continue;
    lines.push(
      `- [${tag.name}](${SITE_ORIGIN}${SITE_BASE}/llms/tags/${tag.slug}/llms.txt) (${count}件)`,
    );
  }

  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Category indexes (announcements / sessions)
// ---------------------------------------------------------------------------

function buildCategoryIndex(
  categoryName: string,
  entries: ContentEntry[],
  topics: TopicDef[],
): string {
  const info = buildInfo;

  const lines: string[] = [
    `# ${info.event} — ${categoryName}`,
    '',
    `> ${categoryName}の一覧（${entries.length}件）`,
    '',
  ];

  for (const topic of topics) {
    const topicEntries = entries.filter(
      (e) => e.frontmatter.topic === topic.slug,
    );
    if (topicEntries.length === 0) continue;

    lines.push(`## ${topic.name}`);
    lines.push('');
    for (const e of topicEntries) {
      lines.push(
        `- [${e.frontmatter.title}](${detailRelative(e)}): ${e.frontmatter.summary.split('\n')[0]}`,
      );
    }
    lines.push('');
  }

  const ungrouped = entries.filter(
    (e) => !topics.some((t) => t.slug === e.frontmatter.topic),
  );
  if (ungrouped.length > 0) {
    lines.push('## その他');
    lines.push('');
    for (const e of ungrouped) {
      lines.push(
        `- [${e.frontmatter.title}](${detailRelative(e)}): ${e.frontmatter.summary.split('\n')[0]}`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Topic indexes
// ---------------------------------------------------------------------------

function buildTopicIndex(
  topic: TopicDef,
  entries: ContentEntry[],
): string {
  const topicEntries = entries.filter(
    (e) => e.frontmatter.topic === topic.slug,
  );
  const announcements = topicEntries.filter(
    (e) => e.frontmatter.content_type === 'announcement',
  );
  const sessions = topicEntries.filter(
    (e) => e.frontmatter.content_type === 'session',
  );

  const lines: string[] = [
    `# ${topic.name}`,
    '',
    `> ${buildInfo.event} — ${topic.name} に関連するコンテンツ（${topicEntries.length}件）`,
    '',
  ];

  if (announcements.length > 0) {
    lines.push('## アナウンス');
    lines.push('');
    for (const e of announcements) {
      lines.push(
        `- [${e.frontmatter.title}](${detailUrl(e)}): ${e.frontmatter.summary.split('\n')[0]}`,
      );
    }
    lines.push('');
  }

  if (sessions.length > 0) {
    lines.push('## セッション');
    lines.push('');
    for (const e of sessions) {
      lines.push(
        `- [${e.frontmatter.title}](${detailUrl(e)}): ${e.frontmatter.summary.split('\n')[0]}`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Tag indexes
// ---------------------------------------------------------------------------

function buildTagIndex(
  tag: TagDef,
  entries: ContentEntry[],
): string {
  const tagEntries = entries.filter((e) =>
    e.frontmatter.tags.includes(tag.slug),
  );
  const announcements = tagEntries.filter(
    (e) => e.frontmatter.content_type === 'announcement',
  );
  const sessions = tagEntries.filter(
    (e) => e.frontmatter.content_type === 'session',
  );

  const lines: string[] = [
    `# ${tag.name}`,
    '',
    `> ${buildInfo.event} — ${tag.name} に関連するコンテンツ（${tagEntries.length}件）`,
    '',
  ];

  if (announcements.length > 0) {
    lines.push('## アナウンス');
    lines.push('');
    for (const e of announcements) {
      lines.push(
        `- [${e.frontmatter.title}](${detailUrl(e)}): ${e.frontmatter.summary.split('\n')[0]}`,
      );
    }
    lines.push('');
  }

  if (sessions.length > 0) {
    lines.push('## セッション');
    lines.push('');
    for (const e of sessions) {
      lines.push(
        `- [${e.frontmatter.title}](${detailUrl(e)}): ${e.frontmatter.summary.split('\n')[0]}`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Detail page (single entry)
// ---------------------------------------------------------------------------

function buildDetail(entry: ContentEntry): string {
  const fm = entry.frontmatter;

  const lines: string[] = [`# ${fm.title}`, '', `> ${fm.summary}`, ''];

  // Extract body sections (## headings)
  const sections = entry.body.split(/^## /m).filter(Boolean);
  for (const section of sections) {
    const [heading, ...rest] = section.split('\n');
    lines.push(`## ${heading.trim()}`);
    lines.push('');
    lines.push(rest.join('\n').trim());
    lines.push('');
  }

  // Official sources
  if (fm.official_sources.length > 0) {
    lines.push('## 公式ソース');
    lines.push('');
    for (const url of fm.official_sources) {
      lines.push(`- [${url}](${url})`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

// --- Main ---

const entries = loadContentEntries();
const topics = loadTopics();
const tags = loadTags();

const llmsEntries = entries.filter(shouldBuildLlms);
const announcements = llmsEntries.filter(
  (e) => e.frontmatter.content_type === 'announcement',
);
const sessions = llmsEntries.filter(
  (e) => e.frontmatter.content_type === 'session',
);

console.log(`[build-llms] ${llmsEntries.length} entries for llms`);

// Clean generated directories
cleanDir(path.join(PUBLIC_DIR, 'llms'));

// 1. Root index
writeFile(
  path.join(PUBLIC_DIR, 'llms.txt'),
  buildRootIndex(entries, topics, tags),
);

// 2. Category indexes
writeFile(
  path.join(PUBLIC_DIR, 'llms', 'announcements', 'llms.txt'),
  buildCategoryIndex('アナウンス', announcements, topics),
);
writeFile(
  path.join(PUBLIC_DIR, 'llms', 'sessions', 'llms.txt'),
  buildCategoryIndex('セッション', sessions, topics),
);

// 3. Topic indexes
for (const topic of topics) {
  const topicEntries = llmsEntries.filter(
    (e) => e.frontmatter.topic === topic.slug,
  );
  if (topicEntries.length === 0) continue;
  writeFile(
    path.join(PUBLIC_DIR, 'llms', 'topics', topic.slug, 'llms.txt'),
    buildTopicIndex(topic, llmsEntries),
  );
}

// 4. Tag indexes
for (const tag of tags) {
  const tagEntries = llmsEntries.filter((e) =>
    e.frontmatter.tags.includes(tag.slug),
  );
  if (tagEntries.length === 0) continue;
  writeFile(
    path.join(PUBLIC_DIR, 'llms', 'tags', tag.slug, 'llms.txt'),
    buildTagIndex(tag, llmsEntries),
  );
}

// 5. Detail pages
for (const entry of llmsEntries) {
  const parts = entry.relativePath.replace(/\.md$/, '').split('/');
  const outPath = path.join(PUBLIC_DIR, 'llms', ...parts, 'llms.txt');
  writeFile(outPath, buildDetail(entry));
}

console.log('[build-llms] Done');
