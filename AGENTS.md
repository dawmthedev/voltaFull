# AGENTS.MD - Volta-Fullstack CRM SaaS Development Blueprint

**Project Goal:** To develop the most successful contractor operations app of 2026.
**Purpose of this Document:** A living blueprint for "teaching myself how to build myself." It outlines all required features, tracks progress, defines design paradigms, and ensures architectural consistency for Volta-Fullstack.

**Current Development Focus Marker:** 🌟

---

## 📌 Project Summary: Volta-Fullstack CRM SaaS (Recap)

- **What:** A CRM SaaS platform for operational teams (solar, HVAC, home renovation) managing deals, technicians, events, and homeowner projects.
- **Vision:** End-to-end experience, multi-role, multi-module, scalable multi-tenant SaaS solution.

---

## 🎯 Guiding Principles (Our DNA)

- 🧠 **Thoughtful UX over Bloated Dashboards:** Clean, responsive, intuitive.
- 🎨 **Focused UI Color Theme:** Modern, gentle sand-toned base, improved for contrast, clarity, spacing. (Strictly Tailwind UI).
- ❌ **Minimal Bloat:** Remove unneeded buttons/features. Focus on core value.
- 📈 **Modular Growth:** Infrastructure and design must support adding SaaS orgs without rewrites.
- 🛠️ **1–2 File Changes Per Task:** Maintain dev velocity and review sanity (applies to focused development sprints).
- 📱 **Mobile-First for Field Operations:** Technicians are key users; their experience must be seamless on mobile.
- 🤖 **Automation Where It Counts:** Streamline repetitive tasks for ops teams and field techs.

---

## ⚙️ Architecture Overview (Recap)

- **Monorepo Design:** npm workspaces (`client/`, `server/`).
- **Frontend:** React (TS), Express Server, Tailwind UI, Redux Toolkit, Axios.
- **Backend:** Ts.ED (Express with decorators), MongoDB (Mongoose), ZAPIER_EMAILER_CATCH_WEBHOOK, Swagger.
- **Database:** MongoDB.

---

## ✨ Core Modules & Features

This section details the features of Volta-Fullstack. We'll mark current focus and status.

**Status Legend:**

- ✅ **Implemented & Stable:** Feature is complete and tested.
- 🚧 **In Progress:** Actively being developed.
- 💡 **Planned:** Slated for development.
- 🌟 **Current Focus:** The feature/module currently being prioritized.
- 🔧 **Needs Refinement:** Implemented but requires UI/UX polish or bug fixing.
- ❓ **To Be Defined (TBD):** Concept exists, details need fleshing out.

---

### Module 1: User & Access Management (Foundation)

- **Feature:** User Authentication (Login/Register)

  - **Description:** Secure login and registration for all user roles.
  - **Status:** ✅
  - **UI/UX Notes:** Clean, simple forms. Clear error messaging. Password strength indicators.
  - **Key Tech:** Axios interceptors for token management.
  - **AI Assist:** Anomaly detection for login attempts.

- **Feature:** Role-Based Access Control (RBAC)

  - **Description:** Define and manage roles (Admin, Sales Rep, Technician, Foreman, Homeowner - future). Ensure users only see relevant data/features.
  - **Status:** ✅ (Admin, Sales Rep, Technician roles defined)
  - **UI/UX Notes:** Admin panel for role assignment. Views dynamically adapt to user role.
  - **Key Tech:** Backend middleware, frontend conditional rendering.

- **Feature:** User Profile Management
  - **Description:** Users can manage their own profile information (name, contact, password change).
  - **Status:** 💡
  - **UI/UX Notes:** Simple, intuitive interface. Clear separation of editable fields.
  - **AI Assist:** Profile completion suggestions.

---

### Module 2: CRM & Project Lifecycle Management

- **Feature:** Lead & Deal Management

  - **Description:** Database to drop leads. Track deals from inception to close. Convert leads to projects.
  - **Status:** 🚧 (Basic lead dropping exists)
  - **UI/UX Notes:** Kanban board view for deal stages, list view with filters. Quick add lead form.
  - **Key Tech:** MongoDB collections for Leads, Deals.
  - **AI Assist:** Lead scoring, automated follow-up suggestions.

- **Feature:** Project Creation & Details

  - **Description:** Comprehensive project view including homeowner info, associated sales rep, scope of work, documents, financial details.
  - **Status:** 🚧
  - **UI/UX Notes:** Tabbed interface for project details (Overview, Tasks, Documents, Financials, Communication). Clear visual hierarchy.
  - **Key Tech:** MongoDB Project model.

- **Feature:** Project Status & Workflow Management

  - **Description:** Define and manage project statuses (e.g., New, Site Survey, Design, Permitting, Installation, QA, Completed). Visual timeline.
  - **Status:** 💡
  - **UI/UX Notes:** Clear visual indicators for status. Easy status transitions (potentially drag-and-drop on a board).
  - **AI Assist:** Predictive task duration, bottleneck identification.

- **Feature:** Document Management (Per Project)
  - **Description:** Upload, store, and manage project-related documents (contracts, permits, photos, designs).
  - **Status:** 💡
  - **UI/UX Notes:** File explorer-like interface within a project. Version control (basic). Preview capabilities.
  - **AI Assist:** Document type recognition, OCR for data extraction from permits/contracts.

---

### Module 3: Field Operations & Scheduling

- **Feature:** Technician Management & Assignment

  - **Description:** Manage technician profiles, skills, availability. Assign technicians to projects and tasks.
  - **Status:** ✅ (Basic assignment for payroll exists)
  - **UI/UX Notes:** Admin view for technician roster. Drag-and-drop assignment on a calendar/schedule view.
  - **Key Tech:** Links User (Technician) and Project models.

- **Feature:** Event & Task Scheduling (Project-Specific) 🌟

  - **Description:** Create, manage, and assign tasks/events for each project (e.g., Site Survey, Installation Day 1, QA Check). Each product assigned to a project has 1-5 predefined tasks.
  - **Status:** 🚧 (CSV import done, manual creation & assignment focus)
  - **UI/UX Notes:** Calendar view (daily, weekly, monthly) filterable by technician/project. Task list view within projects. Clear depiction of product-specific task sets.
  - **Key Tech:** Event model, potential calendar library integration.
  - **AI Assist:** Optimal task scheduling based on technician availability and travel.

- **Feature:** Technician Portal & Daily Workflow

  - **Description:** Dedicated portal for technicians to view their daily/weekly schedule, task details, project information, report progress, and communicate.
  - **Status:** 💡
  - **UI/UX Notes:** Mobile-first design. Simple navigation. "Start/Complete Task" buttons. Ability to upload photos/notes from the field. Offline capabilities.
  - **Key Tech:** Responsive React components, potentially PWA features.
  - **AI Assist:** Route optimization for daily tasks.

- **Feature:** Route Optimization for Technicians
  - **Description:** Algorithm to calculate the most efficient routes for technicians based on their assigned tasks, locations, and preferred start/end points.
  - **Status:** 💡
  - **UI/UX Notes:** Visual map display of route. Turn-by-turn directions (integration). Ability for techs to see optimized route vs. manually adjust.
  - **Key Tech:** Geocoding, mapping APIs (e.g., Google Maps, Mapbox), routing algorithms.
  - **AI Assist:** Real-time traffic adjustments, dynamic re-routing.

---

### Module 4: Financials & Reporting

- **Feature:** Accounts Payable & Technician Pay Tracking

  - **Description:** Track technician pay based on completed tasks, hours, or project milestones. UI for AP management and financial exports.
  - **Status:** ✅
  - **UI/UX Notes:** Clear dashboard for AP. Easy export to CSV/Excel. Detailed breakdown of pay calculations.
  - **Key Tech:** Secure financial data handling.

- **Feature:** Project Economics Dashboard (For Contractor Mgmt)

  - **Description:** Dashboard displaying key financial metrics for projects: budget vs. actual, material costs, labor costs, profitability per project/product type.
  - **Status:** 💡
  - **UI/UX Notes:** Visually appealing charts and graphs. Customizable widgets. Date range filters.
  - **Key Tech:** Data aggregation and visualization libraries.
  - **AI Assist:** Profitability forecasting, cost overrun alerts.

- **Feature:** Admin Dashboard & KPIs
  - **Description:** High-level operational stats: project statuses, technician workload, bottleneck KPIs, lead conversion rates, team performance.
  - **Status:** 💡
  - **UI/UX Notes:** Customizable dashboard. Drill-down capabilities from high-level stats to specific data points. Graphs and charts.
  - **Key Tech:** Data aggregation, chart libraries.
  - **AI Assist:** Anomaly detection in KPIs, predictive insights.

---

### Module 5: Communication & Automation

- **Feature:** Internal Messaging & Project Chat

  - **Description:** Internal chat system for team members, contextualized to specific projects.
  - **Status:** 💡
  - **UI/UX Notes:** Slack-like interface. Channels per project. @mentions and notifications.
  - **Key Tech:** WebSocket for real-time communication.

- **Feature:** Automated Reminders & Notifications

  - **Description:** System for sending automated reminders (e.g., upcoming tasks, overdue items) and notifications (e.g., project status changes, new assignments).
  - **Status:** 💡 (Cron triggers for ZAPIER_EMAILER_CATCH_WEBHOOK exist)
  - **UI/UX Notes:** User-configurable notification preferences. In-app notification center and email/SMS options.
  - **Key Tech:** Job schedulers (cron), integration with email/SMS services.
  - **AI Assist:** Smart notifications (e.g., notifying only when necessary, predicting potential delays).

- **Feature:** Workflow Automation Engine
  - **Description:** Select bucket of users/projects -> trigger automation workflow (e.g., when project status changes to 'Permitting', auto-assign task to permit specialist and notify them).
  - **Status:** ❓ (Concept stage)
  - **UI/UX Notes:** Visual workflow builder (low-code/no-code if possible). Library of triggers and actions.
  - **Key Tech:** Business Process Management (BPM) concepts.
  - **AI Assist:** Suggesting common automation workflows based on usage patterns.

---

## 🎨 UI/UX Design Philosophy & Style Guide

- **Base Theme:** Modern, gentle sand-tones (e.g., `bg-amber-50`, `border-amber-200`).
- **Contrast & Clarity:**
  - Use pure white or very light gray (`bg-white`, `bg-slate-50`) for content cards/modals on top of the sand-toned background.
  - Ensure sufficient contrast for text (e.g., `text-slate-700` or darker on light backgrounds).
  - Utilize shadows (`shadow-md`, `shadow-lg`) for elevation and separation (e.g., sidebar vs. main content, modals).
- **Typography:** Clean, sans-serif font (Tailwind default is good). Consistent heading hierarchy and text sizes.
- **Spacing:** Generous padding and margins for readability and a less cluttered feel (Tailwind spacing scale).
- **Buttons:** Uniform button styles (primary, secondary, tertiary). Consistent sizing and spacing around buttons.
  - Primary Action: A distinct, solid color (e.g., `bg-blue-600 text-white`).
  - Secondary Action: Outlined or lighter shade (e.g., `border-blue-600 text-blue-600` or `bg-blue-100 text-blue-700`).
- **Forms:** Clearly labeled fields, proper input types, inline validation messages.
- **Responsiveness:** Mobile-first approach. Test across various screen sizes. Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) are key.
- **Icons:** Use a consistent icon set (e.g., Heroicons via Tailwind UI).
- **Minimalism:** If a feature/button isn't essential or doesn't add significant value, question its existence (e.g., "Upload Bill" button was removed).
- **Layout:**
  - **Main Layout:** Left sidebar for navigation, top bar for user profile/notifications (optional), main content area.
  - **Sidebar:** Clear visual separation from content. Icons and text for navigation items. Collapsible on smaller screens.
  - **Tables/Grids:** Clean, readable data presentation. Sufficient padding in cells. Sorting and filtering options. Alternating row colors for readability if needed (`even:bg-amber-50/50`).

---

## 🔮 Future Enhancements / Brainstorming (Post-MVP / V2+)

- Multi-tenancy for SaaS organizations.
- Customer Portal (for Homeowners to track project status).
- Inventory Management (for materials/equipment).
- Quoting & Invoicing.
- Advanced Reporting & Analytics (custom report builder).
- Third-Party Integrations (QuickBooks, Google Calendar, specialized supplier APIs).
- Full PWA capabilities for offline field work.
- Compliance & Permitting Tracking modules.
- Gamification for technician performance/engagement.

---
