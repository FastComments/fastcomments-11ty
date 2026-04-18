#!/usr/bin/env node
// Builds the 11ty showcase example. BUILD_DEMO=1 toggles .eleventy.js to
// set pathPrefix: '/commenting-system-for-11ty/' for the URL filter.
import { execSync } from 'node:child_process';
import { rmSync, renameSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const EXAMPLE = resolve(ROOT, 'example');
const OUT = resolve(ROOT, 'demo-dist');

const sh = (cmd, cwd = ROOT, env = {}) => {
    console.log('$', cmd, `(${cwd})`);
    execSync(cmd, { stdio: 'inherit', cwd, env: { ...process.env, ...env } });
};

// Install root first so the lib's `prepare` hook (tsc) has its devDeps;
// then example, which links to the built parent via file:..
sh('npm ci', ROOT);
sh('npm ci', EXAMPLE);
sh('./node_modules/.bin/eleventy', EXAMPLE, { BUILD_DEMO: '1' });

rmSync(OUT, { recursive: true, force: true });
renameSync(resolve(EXAMPLE, 'dist'), OUT);
console.log('Built fastcomments-11ty demo at', OUT);
