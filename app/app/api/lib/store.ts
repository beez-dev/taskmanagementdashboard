import type { Task, TaskPriority, TaskStatus } from "./types";

const STORE_KEY = Symbol.for("app.mock.taskStore");

type GlobalWithStore = typeof globalThis & {
  [STORE_KEY]?: Map<string, Task>;
};

const g = globalThis as GlobalWithStore;

const TITLES = [
  "Draft Q3 roadmap", "Update onboarding flow", "Fix login redirect bug",
  "Migrate legacy auth", "Write API integration tests", "Ship dashboard v1",
  "Refactor data layer", "Add dark mode support", "Improve search performance",
  "Set up CI pipeline", "Update dependencies", "Write unit tests for auth",
  "Design new landing page", "Fix memory leak in worker", "Add pagination to task list",
  "Implement email notifications", "Audit accessibility issues", "Add rate limiting",
  "Document REST API", "Improve error messages", "Build export to CSV feature",
  "Integrate Stripe billing", "Set up staging environment", "Add 2FA support",
  "Create admin dashboard", "Optimize database queries", "Add file upload support",
  "Implement webhooks", "Write E2E tests", "Add analytics tracking",
  "Fix mobile layout issues", "Improve loading states", "Add keyboard shortcuts",
  "Implement drag and drop", "Set up error monitoring", "Add activity log",
  "Build notification center", "Implement team permissions", "Add comment threads",
  "Create onboarding checklist", "Fix date timezone bug", "Add bulk task actions",
  "Improve API response times", "Set up CDN for assets", "Add multi-language support",
  "Build reporting module", "Implement audit trail", "Add custom fields",
  "Create mobile app", "Fix CORS issues", "Add SSO integration",
  "Implement caching layer", "Write migration scripts", "Add task templates",
  "Build calendar view", "Improve search indexing", "Add time tracking",
  "Implement recurring tasks", "Fix Safari rendering bug", "Add guest access",
  "Build Slack integration", "Implement task dependencies", "Add status history",
  "Create data export tool", "Fix race condition in sync", "Add label system",
  "Build GitHub integration", "Improve onboarding UX", "Add task sharing",
  "Implement data retention", "Fix password reset flow", "Add custom themes",
  "Build sprint planning view", "Implement burndown chart", "Add velocity tracking",
  "Create release notes flow", "Fix email delivery issues", "Add mention support",
  "Implement live collaboration", "Write security audit", "Add IP allowlist",
  "Build roadmap timeline", "Fix chart rendering", "Add filter presets",
  "Implement task scoring", "Create feedback widget", "Add changelog page",
  "Build API usage dashboard", "Fix scroll position bug", "Add quick create menu",
  "Implement undo/redo", "Write deployment runbook", "Add task watchers",
  "Build status page", "Fix cookie expiry bug", "Add batch import",
  "Implement GraphQL API", "Create style guide", "Add context menu",
  "Build integration marketplace", "Fix long title overflow", "Add workspace settings",
];

const DESCRIPTIONS = [
  "Collect priorities from each squad lead and consolidate into a unified plan.",
  "Redesign the first-run experience based on latest user research findings.",
  "Users are being redirected to a blank page after OAuth callback — investigate and fix.",
  "Remove custom middleware and adopt the shared authentication SDK.",
  "Cover all CRUD endpoints with integration tests including edge cases.",
  "Implement kanban board, summary cards, and real-time updates.",
  "Extract data access logic into a dedicated repository pattern.",
  "Add system-wide dark mode toggle with user preference persistence.",
  "Optimize full-text search queries — currently timing out on large datasets.",
  "Configure GitHub Actions for linting, testing, and deployment.",
  "Audit and update all packages to latest stable versions.",
  "Write comprehensive unit tests for the authentication module.",
  "Collaborate with design team on new marketing landing page layout.",
  "Profiler shows unbounded memory growth in the background worker process.",
  "Implement cursor-based pagination for the task list API endpoint.",
  "Send email digests for task assignments, due date reminders, and completions.",
  "Run Axe audit and fix all critical and serious accessibility violations.",
  "Add per-user and per-IP rate limiting to prevent API abuse.",
  "Write OpenAPI specification and publish developer documentation.",
  "Replace generic error codes with user-friendly, actionable messages.",
  "Allow users to export their task list to CSV with custom column selection.",
  "Set up Stripe subscription billing with plan management and invoicing.",
  "Provision staging environment mirroring production configuration.",
  "Implement TOTP-based two-factor authentication with backup codes.",
  "Build internal admin panel for user management and system health overview.",
  "Profile slow queries and add indexes to bring p99 latency under 100ms.",
  "Support image and document uploads with virus scanning and CDN delivery.",
  "Implement outgoing webhooks so external systems can subscribe to task events.",
  "Write Playwright end-to-end tests covering the critical user journeys.",
  "Integrate PostHog for product analytics and funnel tracking.",
  "Fix broken layouts on screens narrower than 375px across all pages.",
  "Add skeleton screens and optimistic updates to improve perceived performance.",
  "Implement global keyboard shortcuts for power users — document in help panel.",
  "Enable drag-and-drop task reordering and column movement.",
  "Integrate Sentry for real-time error tracking and alerting.",
  "Record all user actions in an immutable activity log with timestamps.",
  "Build a notification center with read/unread state and filtering.",
  "Implement role-based access control for team members.",
  "Add threaded comments to tasks with @mentions and reactions.",
  "Create a step-by-step onboarding checklist for new users.",
  "Tasks created in UTC are displaying in wrong local time — fix timezone handling.",
  "Allow users to select and update multiple tasks at once.",
  "Identify and resolve the three slowest API endpoints in production.",
  "Move static assets to CloudFront and configure cache headers.",
  "Add i18n support starting with English, Spanish, and French.",
  "Generate weekly and monthly reports on task completion and team velocity.",
  "Log all data changes with before/after values for compliance purposes.",
  "Allow users to define custom fields with different data types per project.",
  "Build React Native app targeting iOS and Android from shared codebase.",
  "Fix CORS preflight failures affecting API clients on certain domains.",
  "Integrate with Okta and Azure AD for enterprise SSO.",
  "Add Redis caching layer to reduce database load on hot endpoints.",
  "Write and test database migration scripts for the schema changes in v2.",
  "Allow users to save task configurations as reusable templates.",
  "Add a monthly/weekly calendar view for due-date based task visualization.",
  "Switch from LIKE queries to full-text search index for better relevance.",
  "Implement time tracking per task with start/stop timer and manual entry.",
  "Support tasks that automatically recur on configurable schedules.",
  "Fix rendering artifacts in Safari 16 on the board view.",
  "Allow external stakeholders to view tasks without creating an account.",
  "Post task updates to Slack channels with configurable notification rules.",
  "Block task completion when required predecessor tasks are still open.",
  "Show a full history of status changes with timestamps for each task.",
];

const STATUSES: TaskStatus[] = ["todo", "pending", "testing", "completed"];
const PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

function seed(): Map<string, Task> {
  const now = new Date();
  const iso = (offsetDays: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString();
  };

  const tasks: Task[] = Array.from({ length: 410 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: TITLES[i % TITLES.length] + (i >= TITLES.length ? ` (${Math.floor(i / TITLES.length) + 1})` : ""),
    description: DESCRIPTIONS[i % DESCRIPTIONS.length],
    status: STATUSES[i % STATUSES.length],
    priority: PRIORITIES[i % PRIORITIES.length],
    dueDate: iso((i % 30) - 10),
    createdAt: iso(-(i % 20)),
    updatedAt: iso(-(i % 5)),
  }));

  return new Map(tasks.map((t) => [t.id, t]));
}

export function taskStore(): Map<string, Task> {
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = seed();
  }

  return g[STORE_KEY];
}
