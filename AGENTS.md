# Readmify — Agent Guidelines & Workflow Rules

## Repository & Git Rules
1. **GitHub Synchronization**:
   - Always commit and push changes to the remote repository `origin` (`MinaSaadallah/Readmify`) on branch `main` at the completion of every task, feature update, or milestone.
   - Use clear, conventional commit messages (e.g. `feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`).

2. **Bundle Integrity**:
   - Whenever any JavaScript files in `js/` are modified, always execute `node scripts/build.js` and verify with `node -c js/readmify.bundle.js` before committing.
   - The project must always remain 100% offline-compatible and functional directly via `file:///` and GitHub Pages.

3. **Strict Ignore Policy**:
   - Maintain and respect the root `.gitignore`. Never commit temporary files, logs, environment variables, secrets, or IDE configs.

4. **Code Quality & Testing**:
   - Validate JavaScript syntax and test markdown generation output before pushing to ensure zero regressions in badge rendering, license agreements, and image customizers.
