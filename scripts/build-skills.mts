/**
 * build-skills.mts
 * Transforms content/ → skills/msbuild-2026/ (SKILL.md hub + references)
 * Also generates plugin.json at the repo root
 */

import path from 'node:path';
import {
  loadContentEntries,
  loadTopics,
  loadBuildInfo,
  cleanDir,
  writeFile,
} from './lib/content.mjs';
import { resolveDeliveries } from './lib/types.mjs';
import type { ContentEntry, TopicDef } from './lib/types.mjs';

const SKILLS_DIR = path.resolve(import.meta.dirname, '../skills');
const ROOT_DIR = path.resolve(import.meta.dirname, '..');

function shouldBuildSkills(entry: ContentEntry): boolean {
  return resolveDeliveries(entry.frontmatter.deliveries).skills;
}

/** Build the hub SKILL.md */
function buildSkillHub(entries: ContentEntry[], topics: TopicDef[]): string {
  const skillEntries = entries.filter(shouldBuildSkills);
  const info = loadBuildInfo();
  const startDate = info.dates.start.replace(/-/g, '/');
  const endDate = info.dates.end.split('-')[2];
  const eventDesc = `${info.event} (${startDate}-${endDate}, ${info.location.split(',')[0]})`;

  const announcementCount = skillEntries.filter(
    (e) => e.frontmatter.content_type === 'announcement',
  ).length;
  const sessionCount = skillEntries.filter(
    (e) => e.frontmatter.content_type === 'session',
  ).length;

  const lines: string[] = [
    '---',
    'name: msbuild-2026',
    "description: 'Microsoft Build 2026 でのアナウンス、セッション情報や関連リソース情報を提供するスキル。Triggers: Build 2026, アナウンス, セッション, 新機能, GA, Preview'",
    '---',
    '',
    '# Microsoft Build 2026 Info Hub',
    '',
    `${eventDesc} の発表情報を集約したスキル。`,
    'アナウンス、セッション要約、リソースリンクを提供する。',
    '',
    '## 公式ページ・まとめ',
    '',
    `- [Build 2026 ホームページ](${info.urls.homepage})`,
    `- [Build 2026 ニュースハブ](${info.urls.news})`,
    '- [Build 2026 recap: vision, launches, and top sessions](https://developer.microsoft.com/blog/build-recap)',
    "- [AI alone won't change your business. The system running it will.](https://blogs.microsoft.com/blog/2026/06/02/ai-alone-wont-change-your-business-the-system-running-it-will/)",
    '- [Build 2026 next steps](https://aka.ms/build26-next-steps)',
    '- [Build 2026 全セッション playlist (YouTube)](https://www.youtube.com/playlist?list=PLlrxD0HtieHicIn65R7Oi_1nFXQr4SbtU)',
    `- [セッションカタログ](${info.urls.sessionCatalog})`,
    '',
    '## コンテンツインデックス',
    '',
    `- [アナウンス一覧](references/announcements.md) (${announcementCount} 件)`,
    `- [セッション一覧](references/sessions.md) (${sessionCount} 件)`,
    '',
    '各エントリの詳細は references/announcements/ および references/sessions/ 配下を参照。',
    '',
  ];

  return lines.join('\n');
}

/** Build the announcements index */
function buildAnnouncementsIndex(
  entries: ContentEntry[],
  topics: TopicDef[],
): string {
  const announcements = entries.filter(
    (e) => shouldBuildSkills(e) && e.frontmatter.content_type === 'announcement',
  );

  const lines: string[] = [
    '# アナウンス一覧',
    '',
    `Microsoft Build 2026 で発表された ${announcements.length} 件のアナウンス。`,
    '',
  ];

  for (const topic of topics) {
    const topicEntries = announcements.filter(
      (e) => e.frontmatter.topic === topic.slug,
    );
    if (topicEntries.length === 0) continue;

    lines.push(`## ${topic.name}`);
    lines.push('');
    for (const e of topicEntries) {
      const refPath = `announcements/${e.frontmatter.id}.md`;
      lines.push(
        `- [${e.frontmatter.title}](${refPath}): ${e.frontmatter.summary.split('\n')[0]}`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

/** Build the sessions index */
function buildSessionsIndex(
  entries: ContentEntry[],
  topics: TopicDef[],
): string {
  const sessions = entries.filter(
    (e) => shouldBuildSkills(e) && e.frontmatter.content_type === 'session',
  );

  const lines: string[] = [
    '# セッション一覧',
    '',
    `Microsoft Build 2026 の ${sessions.length} 件のセッション要約。`,
    '',
  ];

  for (const topic of topics) {
    const topicEntries = sessions.filter(
      (e) => e.frontmatter.topic === topic.slug,
    );
    if (topicEntries.length === 0) continue;

    lines.push(`## ${topic.name}`);
    lines.push('');
    for (const e of topicEntries) {
      const refPath = `sessions/${e.frontmatter.id}.md`;
      lines.push(
        `- [${e.frontmatter.title}](${refPath}): ${e.frontmatter.summary.split('\n')[0]}`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

/** Build a reference file for a single entry (strips ## 参考リンク to avoid duplication with ## 公式ソース) */
function buildReference(entry: ContentEntry): string {
  const fm = entry.frontmatter;

  const lines: string[] = [`# ${fm.title}`, '', fm.summary, ''];

  // Strip ## 参考リンク section from body to avoid duplication with 公式ソース
  if (entry.body) {
    const body = entry.body.replace(/## 参考リンク[\s\S]*$/, '').trim();
    if (body) {
      lines.push(body);
      lines.push('');
    }
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

/** Generate plugin.json */
function buildPluginJson(): string {
  const plugin = {
    name: 'msbuild-2026',
    description:
      'Microsoft Build 2026 の発表情報・セッション・リソースを提供するスキルプラグイン',
    version: '0.1.0',
    author: { name: 'openjny' },
    license: 'CC-BY-4.0',
    skills: ['skills/msbuild-2026/'],
  };
  return JSON.stringify(plugin, null, 2) + '\n';
}

// --- Main ---

const entries = loadContentEntries();
const topics = loadTopics();

console.log(
  `[build-skills] ${entries.filter(shouldBuildSkills).length} entries for skills`,
);

// Clean generated references directory
cleanDir(path.join(SKILLS_DIR, 'msbuild-2026', 'references'));

// SKILL.md hub
writeFile(
  path.join(SKILLS_DIR, 'msbuild-2026', 'SKILL.md'),
  buildSkillHub(entries, topics),
);

// Announcements index
writeFile(
  path.join(SKILLS_DIR, 'msbuild-2026', 'references', 'announcements.md'),
  buildAnnouncementsIndex(entries, topics),
);

// Sessions index
writeFile(
  path.join(SKILLS_DIR, 'msbuild-2026', 'references', 'sessions.md'),
  buildSessionsIndex(entries, topics),
);

// References
for (const entry of entries) {
  if (!shouldBuildSkills(entry)) continue;
  const outPath = path.join(
    SKILLS_DIR,
    'msbuild-2026',
    'references',
    entry.relativePath,
  );
  writeFile(outPath, buildReference(entry));
}

// plugin.json (at repo root for /plugin install compatibility)
writeFile(path.join(ROOT_DIR, 'plugin.json'), buildPluginJson());

console.log('[build-skills] Done');
