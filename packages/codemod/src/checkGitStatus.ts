/* eslint-disable no-console */
import { execSync } from 'child_process';

export function checkGitStatus(dir: string): void {
  try {
    // Check if the directory is a git repository
    execSync('git rev-parse --git-dir', { cwd: dir, stdio: 'pipe' });

    // Check if there are any uncommitted changes
    const status = execSync('git status --porcelain', {
      cwd: dir,
      encoding: 'utf8',
    });

    if (status.trim()) {
      console.error('❌ Git working directory not clean. Commit or stash your changes before running the codemod.');
      console.error('Uncommitted changes:');
      console.error(status);
      process.exit(1);
    }

    console.log('✅ Git repository is clean');
  } catch {
    // If git rev-parse fails, the directory is not a git repository
    console.log('⚠️  Directory is not a git repository. Proceeding without git status check.');
  }
}
