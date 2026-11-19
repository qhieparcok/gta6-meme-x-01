// gta6-meme-x-01 entry: the WAITED meme.
// A skeleton waits 13 years for GTA VI at 99% while the make.fun ghost earns
// instead. The post lives on X; this program hands its address to the grader.
//
// It reads POST.json, checks the address is a real X post URL, and copies it
// to /output/POST.json, where the gate reads it. Nothing this program writes
// about the post is judged; the post itself is the entry.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILE = join(BOT_DIR, 'POST.json');

// The post must be a public X status URL, or the gate cannot read it.
const post = JSON.parse(readFileSync(POST_FILE, 'utf8')) as { url?: unknown };
if (typeof post.url !== 'string' || !/^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+/.test(post.url)) {
  console.error(`POST.json does not name an X post URL: ${String(post.url)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(POST_FILE, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
console.log(`Entry post: ${post.url}`);
