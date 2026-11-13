// DeepSeek Harness plugin entry for the one-line-prototype skill.
//
// The skill itself is the plain folder skills/one-line-prototype/ and still works
// when that folder is copied into any skill directory. This entry only lets
// `dsh plugin add` install it: when the plugin loads, it reads SKILL.md once and
// registers the skill on the skill registry. Relative paths in the skill body,
// such as references/ and assets/, resolve against the skill folder.
//
// It does not touch the network, write files, or read anything outside the
// skill folder.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SKILL_DIR = fileURLToPath(new URL('../skills/one-line-prototype/', import.meta.url));
const SKILL_FILE = SKILL_DIR + 'SKILL.md';

export const name = 'one-line-prototype';
export const inject = ['skills'];

// Split SKILL.md into its frontmatter fields and its Markdown body.
// The frontmatter here only uses single-line `key: value` pairs.
function readSkill() {
  const text = readFileSync(SKILL_FILE, 'utf8').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) throw new Error('one-line-prototype: SKILL.md has no frontmatter');
  const fields = {};
  for (const line of match[1].split('\n')) {
    const at = line.indexOf(':');
    if (at > 0) fields[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  if (!fields.name || !fields.description) {
    throw new Error('one-line-prototype: SKILL.md frontmatter needs name and description');
  }
  return { name: fields.name, description: fields.description, content: text.slice(match[0].length) };
}

export function apply(ctx) {
  const skills = ctx.get('skills');
  if (!skills || typeof skills.register !== 'function') return;
  const skill = readSkill();
  skills.register({
    name: skill.name,
    description: skill.description,
    content: skill.content,
    source: 'bundled',
    path: SKILL_FILE,
    resourceBase: { kind: 'directory', path: SKILL_DIR }
  });
}
