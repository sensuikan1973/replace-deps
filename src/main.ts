import * as core from '@actions/core';
import * as fs from 'fs';
import * as glob from 'glob';

async function run(): Promise<void> {
  try {
    const regex = new RegExp(core.getInput('regex'), 'g');
    const replacement = core.getInput('replacement');
    glob(`**/*.${core.getInput('extension')}`, (err, files) => {
      if (err != null) return core.setFailed(err);
      files.forEach((file) => {
        const content = fs.readFileSync(file, 'utf-8');
        const result = content.replace(regex, replacement);
        fs.writeFileSync(file, result, 'utf-8');
      });
    });
  } catch (err) {
    core.setFailed(err);
  }
}

run();
