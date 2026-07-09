# EMS Employee Portal — Master Project

This is the shared shell (Sidebar + Topbar + Routing) that all 12 modules plug into.

## How to run it
```
npm install
npm run dev
```
Open the link shown in the terminal (usually http://localhost:5173).

## How integration works

Every module has a placeholder file already in `src/pages/`:
- Dashboard.jsx
- Profile.jsx
- Attendance.jsx
- Leave.jsx
- Payroll.jsx
- Tasks.jsx
- Performance.jsx
- Chat.jsx
- Notifications.jsx
- Training.jsx
- Documents.jsx
- Settings.jsx

Clicking any sidebar link automatically shows that page — the Sidebar and Topbar
stay the same on every page, only the content in the middle changes.

### To add someone's finished module:

1. Open their branch and find their component code (NOT their whole App.jsx/index.html —
   just the actual content: the JSX + logic for their module).
2. Open the matching placeholder file in `src/pages/` (e.g. `src/pages/Chat.jsx`).
3. Replace the placeholder content with their code.
4. If their code uses colors, spacing, or a background color of its own — remove
   those, since the Layout already provides the page background and spacing.
   Their component should just be the content, not a full page.
5. If they used any npm packages we don't have yet, run:
   ```
   npm install <package-name>
   ```
6. Run `npm run dev` and click their module's nav link to check it looks right.
7. Commit and push to `main`.

### Colors available to use inside any page (CSS variables, already set up in index.css)
- `var(--bg-card)` — card background
- `var(--border-color)` — card border
- `var(--accent-blue)` — buttons, active states
- `var(--text-primary)` / `var(--text-secondary)` / `var(--text-muted)` — text colors
- `.badge-green` / `.badge-red` / `.badge-yellow` / `.badge-blue` / `.badge-purple` — status tag classes
- `.btn-primary` — standard button style
- `.card` — standard card style

Use these instead of hardcoding new colors, so every module matches.
