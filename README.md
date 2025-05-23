#this all below may be wrong minus the folder structure.

# ⚡️ VoltaFull Monorepo

This repository houses both the **client** and **server** applications using a Node.js monorepo layout with npm workspaces.

---

## 🏗 Project Structure

- `client/` – React front-end
- `server/` – Express/Node backend
- `tests/` – Shared or global tests (if applicable)

---

## 🚀 Getting Started

````bash
./setup.sh


Full folder strucutre:

├── .DS_Store
├── .nvmrc
├── README.md
├── client
    ├── .env.example
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── LICENSE.md
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── _redirects
    │   ├── assets
    │   │   ├── icons
    │   │   │   ├── ic_flag_de.svg
    │   │   │   ├── ic_flag_en.svg
    │   │   │   ├── ic_flag_fr.svg
    │   │   │   ├── ic_notification_chat.svg
    │   │   │   ├── ic_notification_mail.svg
    │   │   │   ├── ic_notification_package.svg
    │   │   │   ├── ic_notification_shipping.svg
    │   │   │   ├── navbar
    │   │   │   │   ├── ic_analytics.svg
    │   │   │   │   ├── ic_blog.svg
    │   │   │   │   ├── ic_cart.svg
    │   │   │   │   ├── ic_disabled.svg
    │   │   │   │   ├── ic_lock.svg
    │   │   │   │   └── ic_user.svg
    │   │   │   └── shape-avatar.svg
    │   │   ├── illustrations
    │   │   │   └── illustration_404.svg
    │   │   ├── images
    │   │   │   ├── avatars
    │   │   │   │   ├── avatar_1.jpg
    │   │   │   │   ├── avatar_10.jpg
    │   │   │   │   ├── avatar_11.jpg
    │   │   │   │   ├── avatar_12.jpg
    │   │   │   │   ├── avatar_13.jpg
    │   │   │   │   ├── avatar_14.jpg
    │   │   │   │   ├── avatar_15.jpg
    │   │   │   │   ├── avatar_16.jpg
    │   │   │   │   ├── avatar_17.jpg
    │   │   │   │   ├── avatar_18.jpg
    │   │   │   │   ├── avatar_19.jpg
    │   │   │   │   ├── avatar_2.jpg
    │   │   │   │   ├── avatar_20.jpg
    │   │   │   │   ├── avatar_21.jpg
    │   │   │   │   ├── avatar_22.jpg
    │   │   │   │   ├── avatar_23.jpg
    │   │   │   │   ├── avatar_24.jpg
    │   │   │   │   ├── avatar_3.jpg
    │   │   │   │   ├── avatar_4.jpg
    │   │   │   │   ├── avatar_5.jpg
    │   │   │   │   ├── avatar_6.jpg
    │   │   │   │   ├── avatar_7.jpg
    │   │   │   │   ├── avatar_8.jpg
    │   │   │   │   ├── avatar_9.jpg
    │   │   │   │   └── avatar_default.jpg
    │   │   │   ├── covers
    │   │   │   │   ├── cover.jpg
    │   │   │   │   ├── cover_1.jpg
    │   │   │   │   ├── cover_10.jpg
    │   │   │   │   ├── cover_11.jpg
    │   │   │   │   ├── cover_113.jpg
    │   │   │   │   ├── cover_12.jpg
    │   │   │   │   ├── cover_13.jpg
    │   │   │   │   ├── cover_14.jpg
    │   │   │   │   ├── cover_15.jpg
    │   │   │   │   ├── cover_16.jpg
    │   │   │   │   ├── cover_17.jpg
    │   │   │   │   ├── cover_18.jpg
    │   │   │   │   ├── cover_2.jpg
    │   │   │   │   ├── cover_20.jpg
    │   │   │   │   ├── cover_21.jpg
    │   │   │   │   ├── cover_22.jpg
    │   │   │   │   ├── cover_23.jpg
    │   │   │   │   ├── cover_24.jpg
    │   │   │   │   ├── cover_27.jpg
    │   │   │   │   ├── cover_3.jpg
    │   │   │   │   ├── cover_4.jpg
    │   │   │   │   ├── cover_5.jpg
    │   │   │   │   ├── cover_6.jpg
    │   │   │   │   ├── cover_8.jpg
    │   │   │   │   └── cover_9.jpg
    │   │   │   ├── iconImages
    │   │   │   │   └── logo.png
    │   │   │   └── products
    │   │   │   │   ├── product_1.jpg
    │   │   │   │   ├── product_10.jpg
    │   │   │   │   ├── product_11.jpg
    │   │   │   │   ├── product_12.jpg
    │   │   │   │   ├── product_13.jpg
    │   │   │   │   ├── product_14.jpg
    │   │   │   │   ├── product_15.jpg
    │   │   │   │   ├── product_16.jpg
    │   │   │   │   ├── product_17.jpg
    │   │   │   │   ├── product_18.jpg
    │   │   │   │   ├── product_19.jpg
    │   │   │   │   ├── product_2.jpg
    │   │   │   │   ├── product_20.jpg
    │   │   │   │   ├── product_21.jpg
    │   │   │   │   ├── product_22.jpg
    │   │   │   │   ├── product_23.jpg
    │   │   │   │   ├── product_24.jpg
    │   │   │   │   ├── product_3.jpg
    │   │   │   │   ├── product_4.jpg
    │   │   │   │   ├── product_5.jpg
    │   │   │   │   ├── product_6.jpg
    │   │   │   │   ├── product_7.jpg
    │   │   │   │   ├── product_8.jpg
    │   │   │   │   └── product_9.jpg
    │   │   ├── logo.svg
    │   │   ├── placeholder.svg
    │   │   └── preview.jpg
    │   ├── favicon
    │   │   └── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    ├── src
    │   ├── API
    │   │   └── firebase.js
    │   ├── App.tsx
    │   ├── Styles
    │   │   ├── AddClients.module.css
    │   │   └── Messages.module.css
    │   ├── _mock
    │   │   ├── account.js
    │   │   ├── blog.js
    │   │   ├── products.js
    │   │   └── user.js
    │   ├── apiConfig.ts
    │   ├── components
    │   │   ├── BatteryStepper.js
    │   │   ├── HVACStepper.js
    │   │   ├── InsulationStepper.js
    │   │   ├── MPUStepper.js
    │   │   ├── MainStepper.js
    │   │   ├── QuietCoolStepper.js
    │   │   ├── RoofStepper.js
    │   │   ├── SelectField.jsx
    │   │   ├── ServiceStepper.js
    │   │   ├── add-category
    │   │   │   └── AddCategory.tsx
    │   │   ├── add-lead
    │   │   │   └── AddLead.tsx
    │   │   ├── add-user-form
    │   │   │   ├── AddUser.tsx
    │   │   │   └── AddUserForm.tsx
    │   │   ├── admin-navsection
    │   │   │   ├── AdminNavSection.js
    │   │   │   └── index.js
    │   │   ├── alert
    │   │   │   └── Alert.tsx
    │   │   ├── calendar
    │   │   │   ├── AvailabilityCalender.tsx
    │   │   │   ├── Calendar.tsx
    │   │   │   └── calendar.scss
    │   │   ├── chart
    │   │   │   ├── index.js
    │   │   │   ├── styles.js
    │   │   │   └── useChart.js
    │   │   ├── click-away
    │   │   │   └── ClickAway.tsx
    │   │   ├── color-utils
    │   │   │   ├── ColorMultiPicker.js
    │   │   │   ├── ColorPreview.js
    │   │   │   ├── ColorSinglePicker.js
    │   │   │   ├── Icon.js
    │   │   │   └── index.js
    │   │   ├── csv-table
    │   │   │   └── CsvTable.tsx
    │   │   ├── custom-select-field
    │   │   │   └── CustomSelectField.tsx
    │   │   ├── custom-table
    │   │   │   └── CustomTable.tsx
    │   │   ├── dataGrid
    │   │   │   ├── ActiveRates.jsx
    │   │   │   ├── DealsData.jsx
    │   │   │   ├── DealsDataLeadgen.jsx
    │   │   │   ├── InactiveRates.jsx
    │   │   │   ├── LeadGenPay.jsx
    │   │   │   ├── NewSaleData.jsx
    │   │   │   ├── PayrollData.jsx
    │   │   │   ├── PreviousPayData.jsx
    │   │   │   ├── RookieLeadgens.jsx
    │   │   │   ├── RookiesData.jsx
    │   │   │   └── UpcomingPay.jsx
    │   │   ├── email-user
    │   │   │   └── EmailUser.tsx
    │   │   ├── iconify
    │   │   │   ├── Iconify.js
    │   │   │   └── index.js
    │   │   ├── input
    │   │   │   └── CustomInput.tsx
    │   │   ├── label
    │   │   │   ├── Label.js
    │   │   │   ├── index.js
    │   │   │   └── styles.js
    │   │   ├── logo
    │   │   │   ├── Logo.js
    │   │   │   └── index.js
    │   │   ├── modals
    │   │   │   ├── CustomModal.tsx
    │   │   │   └── Utility.jsx
    │   │   ├── nav-section
    │   │   │   ├── NavSection.js
    │   │   │   ├── index.js
    │   │   │   └── styles.js
    │   │   ├── planner-form
    │   │   │   └── PlannerForm.tsx
    │   │   ├── scroll-to-top
    │   │   │   ├── ScrollToTop.js
    │   │   │   └── index.js
    │   │   ├── scrollbar
    │   │   │   ├── Scrollbar.js
    │   │   │   ├── index.js
    │   │   │   └── styles.js
    │   │   ├── send-letter
    │   │   │   └── SendLetter.jsx
    │   │   ├── svg-color
    │   │   │   ├── SvgColor.js
    │   │   │   └── index.js
    │   │   └── upload-file
    │   │   │   └── CsvUpload.tsx
    │   ├── constants
    │   │   └── styles.js
    │   ├── hooks
    │   │   ├── hooks.ts
    │   │   └── useResponsive.js
    │   ├── index.tsx
    │   ├── layouts
    │   │   ├── AuthenticationLayout.tsx
    │   │   ├── dashboard
    │   │   │   ├── DashboardLayout.js
    │   │   │   ├── header
    │   │   │   │   ├── AccountPopover.js
    │   │   │   │   ├── LanguagePopover.js
    │   │   │   │   ├── NotificationsPopover.js
    │   │   │   │   ├── Searchbar.js
    │   │   │   │   └── index.js
    │   │   │   ├── index.js
    │   │   │   └── nav
    │   │   │   │   ├── AdminConfig.js
    │   │   │   │   ├── config.js
    │   │   │   │   └── index.js
    │   │   └── simple
    │   │   │   ├── SimpleLayout.js
    │   │   │   └── index.js
    │   ├── libs
    │   │   └── client
    │   │   │   └── apiClient.ts
    │   ├── pages
    │   │   ├── Approve.js
    │   │   ├── Assistant.js
    │   │   ├── AvailabilityPlanner.tsx
    │   │   ├── BlogPage.js
    │   │   ├── CompleteRegistration.tsx
    │   │   ├── DashboardAppPage.js
    │   │   ├── DealerRates.jsx
    │   │   ├── DealsPage.js
    │   │   ├── DynamicLead.tsx
    │   │   ├── Exam.jsx
    │   │   ├── LeadDetailPage.jsx
    │   │   ├── Leads.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── NewSales.js
    │   │   ├── NonVerified.js
    │   │   ├── Page404.js
    │   │   ├── PayPage.js
    │   │   ├── Planner.tsx
    │   │   ├── PreviousPay.js
    │   │   ├── ProductsPage.js
    │   │   ├── RegisterPage.tsx
    │   │   ├── ResetPassword.tsx
    │   │   ├── Rookies.js
    │   │   ├── UpcomingPayPge.js
    │   │   ├── UserPage.tsx
    │   │   ├── UtilitySign.jsx
    │   │   ├── VCDash.js
    │   │   ├── VerifyEmail.tsx
    │   │   └── VerifyPage.js
    │   ├── redux
    │   │   ├── middleware
    │   │   │   ├── admin.ts
    │   │   │   ├── authentication.ts
    │   │   │   ├── availability.ts
    │   │   │   ├── category.ts
    │   │   │   ├── lead.ts
    │   │   │   ├── planner.ts
    │   │   │   └── role.ts
    │   │   ├── slice
    │   │   │   ├── adminSlice.ts
    │   │   │   ├── alertSlice.ts
    │   │   │   ├── authSlice.ts
    │   │   │   ├── availabilitySlice.ts
    │   │   │   ├── categorySlice.ts
    │   │   │   ├── leadSlice.ts
    │   │   │   ├── plannerSlice.ts
    │   │   │   └── roleSlice.ts
    │   │   └── store.ts
    │   ├── reportWebVitals.js
    │   ├── routes.js
    │   ├── sections
    │   │   └── @dashboard
    │   │   │   ├── app
    │   │   │       ├── AppConversionRates.js
    │   │   │       ├── AppCurrentSubject.js
    │   │   │       ├── AppCurrentVisits.js
    │   │   │       ├── AppNewsUpdate.js
    │   │   │       ├── AppOrderTimeline.js
    │   │   │       ├── AppTasks.js
    │   │   │       ├── AppTrafficBySite.js
    │   │   │       ├── AppWebsiteVisits.js
    │   │   │       ├── AppWidgetSummary.js
    │   │   │       └── index.js
    │   │   │   ├── blog
    │   │   │       ├── BlogPostCard.js
    │   │   │       ├── BlogPostsSearch.js
    │   │   │       ├── BlogPostsSort.js
    │   │   │       └── index.js
    │   │   │   ├── products
    │   │   │       ├── ProductCard.js
    │   │   │       ├── ProductCartWidget.js
    │   │   │       ├── ProductFilterSidebar.js
    │   │   │       ├── ProductList.js
    │   │   │       ├── ProductSort.js
    │   │   │       └── index.js
    │   │   │   └── user
    │   │   │       ├── UserListHead.tsx
    │   │   │       ├── UserListToolbar.js
    │   │   │       └── index.js
    │   ├── serviceWorker.js
    │   ├── theme.ts
    │   ├── theme
    │   │   ├── customShadows.js
    │   │   ├── globalStyles.js
    │   │   ├── overrides
    │   │   │   ├── Autocomplete.js
    │   │   │   ├── Backdrop.js
    │   │   │   ├── Button.js
    │   │   │   ├── Card.js
    │   │   │   ├── Input.js
    │   │   │   ├── Paper.js
    │   │   │   ├── Table.js
    │   │   │   ├── Tooltip.js
    │   │   │   ├── Typography.js
    │   │   │   └── index.js
    │   │   ├── palette.js
    │   │   ├── shadows.js
    │   │   └── typography.js
    │   ├── types.ts
    │   └── utils
    │   │   ├── createAbortController.ts
    │   │   ├── cssStyles.js
    │   │   ├── formatNumber.js
    │   │   └── formatTime.js
    ├── tsconfig.json
    ├── webpack.config.js
    └── yarn.lock
├── package-lock.json
├── package.json
├── server
    ├── .babelrc
    ├── .barrelsby.json
    ├── .dockerignore
    ├── .env.example
    ├── .eslintignore
    ├── .eslintrc
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── Dockerfile
    ├── README.md
    ├── docker-compose.yml
    ├── jest.config.js
    ├── package-lock.json
    ├── package.json
    ├── processes.config.js
    ├── src
    │   ├── Server.integration.spec.ts
    │   ├── Server.ts
    │   ├── clients
    │   │   └── nodemailer.ts
    │   ├── config
    │   │   ├── envs
    │   │   │   └── index.ts
    │   │   ├── index.ts
    │   │   └── logger
    │   │   │   ├── index.ts
    │   │   │   └── summaryConfig.ts
    │   ├── controllers
    │   │   ├── pages
    │   │   │   ├── IndexController.ts
    │   │   │   └── index.ts
    │   │   └── rest
    │   │   │   ├── AdminController.ts
    │   │   │   ├── AuthenticationController.ts
    │   │   │   ├── AvailabilityController.ts
    │   │   │   ├── CategoryController.ts
    │   │   │   ├── DynamicController.ts
    │   │   │   ├── LeadController.ts
    │   │   │   ├── OrganizationController.ts
    │   │   │   ├── PlannerController.ts
    │   │   │   ├── RoleController.ts
    │   │   │   └── index.ts
    │   ├── cron
    │   │   ├── model.ts
    │   │   └── reminder.ts
    │   ├── examples
    │   │   └── LoggingDemo.ts
    │   ├── helper
    │   │   ├── OpenAIService.ts
    │   │   └── index.ts
    │   ├── index.ts
    │   ├── middleware
    │   │   └── AuthMiddleware.ts
    │   ├── models
    │   │   ├── AdminModel.ts
    │   │   ├── AvailabilityModel.ts
    │   │   ├── CategoryModel.ts
    │   │   ├── LeadsModel.ts
    │   │   ├── OrganizationModel.ts
    │   │   ├── PlannerModel.ts
    │   │   ├── RestModels.ts
    │   │   ├── RoleModel.ts
    │   │   ├── SaleRepModel.ts
    │   │   ├── VerificationModel.ts
    │   │   └── VerifySessionModal.ts
    │   ├── services
    │   │   ├── AdminService.ts
    │   │   ├── AvailabilityService.ts
    │   │   ├── CategoryService.ts
    │   │   ├── LeadsService.ts
    │   │   ├── OrganizationService.ts
    │   │   ├── PlannerService.ts
    │   │   ├── RoleService.ts
    │   │   ├── SaleRepService.ts
    │   │   └── VerificationService.ts
    │   └── util
    │   │   ├── EmojiAppender.ts
    │   │   ├── __tests__
    │   │       ├── emojiAppender.test.ts
    │   │       └── logger.test.ts
    │   │   ├── constants.ts
    │   │   ├── crypto.ts
    │   │   ├── entities.ts
    │   │   ├── errors.ts
    │   │   ├── index.ts
    │   │   ├── logger.ts
    │   │   └── secrets.ts
    ├── tsconfig.compile.json
    ├── tsconfig.json
    ├── types.ts
    ├── views
    │   └── swagger.ejs
    └── webpack.config.js
├── setup.sh
└── tests
    ├── client
        ├── components
        │   └── add-lead
        │   │   └── AddLead.test.tsx
        ├── libs
        │   └── client
        │   │   └── apiClient.test.ts
        └── redux
        │   └── middleware
        │       └── role.test.ts
    └── server
        ├── controllers
            └── rest
            │   └── RoleController.test.ts
        ├── helper
            └── OpenAIService.test.ts
        └── services
            └── RoleService.test.ts


/.DS_Store:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/.DS_Store


--------------------------------------------------------------------------------
/.nvmrc:
--------------------------------------------------------------------------------
1 | 18
2 |


--------------------------------------------------------------------------------
/README.md:
--------------------------------------------------------------------------------
 1 | # ⚡️ VoltaFull Monorepo
 2 |
 3 | This repository houses both the **client** and **server** applications using a Node.js monorepo layout with npm workspaces.
 4 |
 5 | ---
 6 |
 7 | ## 🏗 Project Structure
 8 |
 9 | - `client/` – React front-end
10 | - `server/` – Express/Node backend
11 | - `tests/` – Shared or global tests (if applicable)
12 |
13 | ---
14 |
15 | ## 🚀 Getting Started
16 |
17 | ```bash
18 | ./setup.sh
19 |


--------------------------------------------------------------------------------
/client/.env.example:
--------------------------------------------------------------------------------
1 | REACT_APP_QB_USER_TOKEN=
2 | REACT_APP_QB_DOMAIN=
3 |


--------------------------------------------------------------------------------
/client/.gitignore:
--------------------------------------------------------------------------------
 1 | # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
 2 |
 3 | # dependencies
 4 | /node_modules
 5 | /.pnp
 6 | .pnp.js
 7 |
 8 | # testing
 9 | /coverage
10 |
11 | # production
12 | /build
13 |
14 | # misc
15 | .DS_Store
16 | /.env
17 | /.env.local
18 | /.env.development.local
19 | /.env.test.local
20 | /.env.production.local
21 |
22 | npm-debug.log*
23 | yarn-debug.log*
24 | yarn-error.log*
25 |
26 | .eslintcache
27 |
28 |
29 | *.log
30 | *.DS_Store
31 | *.exported.*
32 |


--------------------------------------------------------------------------------
/client/.prettierignore:
--------------------------------------------------------------------------------
1 | node_modules
2 | *-lock.json
3 | *.lock
4 |


--------------------------------------------------------------------------------
/client/.prettierrc.json:
--------------------------------------------------------------------------------
1 | {
2 |   "semi": true,
3 |   "singleQuote": true,
4 |   "printWidth": 140,
5 |   "tabWidth": 2,
6 |   "trailingComma": "none",
7 |   "arrowParens": "always",
8 |   "endOfLine": "auto"
9 | }


--------------------------------------------------------------------------------
/client/CHANGELOG.md:
--------------------------------------------------------------------------------
 1 | ### v1.6.0
 2 |
 3 | ###### Oct 17, 2022
 4 |
 5 | - Upgrade and restructure the directory.
 6 | - Upgrade some dependencies to the latest versions
 7 |
 8 | ---
 9 |
10 | ### v1.5.0
11 |
12 | ###### Jul 04, 2022
13 |
14 | - Support react 18.
15 | - Upgrade some dependencies to the latest versions
16 |
17 | ---
18 |
19 | ### v1.4.0
20 |
21 | ###### Apr 12, 2022
22 |
23 | - Update `src/components`.
24 | - Update `src/sections`.
25 | - Update `src/pages`.
26 | - Update `src/layouts`.
27 | - Update `src/theme`.
28 | - Upgrade some dependencies to the latest versions
29 |
30 | ---
31 |
32 | ### v1.3.0
33 |
34 | ###### Feb 21, 2022
35 |
36 | - Support react-script v5.0.0
37 | - Source code improvement
38 | - Upgrade some dependencies to the latest versions
39 |
40 | ---
41 |
42 | ### v1.2.0
43 |
44 | ###### Sep 18, 2021
45 |
46 | - Support MIU v5.0.0 official release
47 | - Upgrade some dependencies to the latest versions
48 | - Update `src/theme/typography.js`
49 | - Upgrade some dependencies to the latest versions
50 |
51 | ---
52 |
53 | ### v1.1.0
54 |
55 | ###### Jul 23, 2021
56 |
57 | - Support MUI v5.0.0-beta.1
58 | - Upgrade some dependencies to the latest versions
59 |
60 | ---
61 |
62 | ### v1.0.0
63 |
64 | ###### Jun 28, 2021
65 |
66 | Initial release.
67 |


--------------------------------------------------------------------------------
/client/LICENSE.md:
--------------------------------------------------------------------------------
 1 | MIT License
 2 |
 3 |
 4 | Permission is hereby granted, free of charge, to any person obtaining a copy
 5 | of this software and associated documentation files (the "Software"), to deal
 6 | in the Software without restriction, including without limitation the rights
 7 | to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 8 | copies of the Software, and to permit persons to whom the Software is
 9 | furnished to do so, subject to the following conditions:
10 |
11 | The above copyright notice and this permission notice shall be included in all
12 | copies or substantial portions of the Software.
13 |
14 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
15 | IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
16 | FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
17 | AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
18 | LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
19 | OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
20 | SOFTWARE.
21 |


--------------------------------------------------------------------------------
/client/README.md:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/README.md


--------------------------------------------------------------------------------
/client/public/_redirects:
--------------------------------------------------------------------------------
1 | /*    /index.html   200


--------------------------------------------------------------------------------
/client/public/assets/icons/ic_flag_de.svg:
--------------------------------------------------------------------------------
1 | <svg height="20" viewBox="0 0 28 20" width="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="m0 6.667h28v6.667h-28z"/><filter id="b" height="145%" width="110.7%" x="-5.4%" y="-22.5%"><feMorphology in="SourceAlpha" operator="dilate" radius=".5" result="shadowSpreadOuter1"/><feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1"/><feColorMatrix in="shadowOffsetOuter1" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.06 0"/></filter><path id="c" d="m0 13.333h28v6.667h-28z"/><filter id="d" height="145%" width="110.7%" x="-5.4%" y="-22.5%"><feMorphology in="SourceAlpha" operator="dilate" radius=".5" result="shadowSpreadOuter1"/><feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1"/><feColorMatrix in="shadowOffsetOuter1" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.06 0"/></filter><mask id="e" fill="#fff"><rect fill="#fff" fill-rule="evenodd" height="20" rx="3" width="28"/></mask></defs><g fill="none" fill-rule="evenodd"><path d="m0 0h28v6.667h-28z" fill="#262626" mask="url(#e)"/><g mask="url(#e)"><use fill="#000" filter="url(#b)" xlink:href="#a"/><use fill="#f01515" xlink:href="#a"/></g><g mask="url(#e)"><use fill="#000" filter="url(#d)" xlink:href="#c"/><use fill="#ffd521" xlink:href="#c"/></g></g></svg>


--------------------------------------------------------------------------------
/client/public/assets/icons/ic_flag_en.svg:
--------------------------------------------------------------------------------
1 | <svg height="20" viewBox="0 0 28 20" width="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><rect id="a" height="20" rx="3" width="28"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><use fill="#0a17a7" xlink:href="#a"/><path d="m29.2824692-1.91644623 1.4911811 2.21076686-9.4483006 6.37223314 6.6746503.0001129v6.66666663l-6.6746503-.0007795 9.4483006 6.3731256-1.4911811 2.2107668-11.9501195-8.0608924.0009836 7.4777795h-6.6666666l-.000317-7.4777795-11.9488189 8.0608924-1.49118107-2.2107668 9.448-6.3731256-6.67434973.0007795v-6.66666663l6.67434973-.0001129-9.448-6.37223314 1.49118107-2.21076686 11.9488189 8.06.000317-7.4768871h6.6666666l-.0009836 7.4768871z" fill="#fff" mask="url(#b)"/><g stroke="#db1f35" stroke-linecap="round" stroke-width=".667"><path d="m18.668 6.332 12.665-8.332" mask="url(#b)"/><path d="m20.013 21.35 11.354-7.652" mask="url(#b)" transform="matrix(1 0 0 -1 0 35.048)"/><path d="m8.006 6.31-11.843-7.981" mask="url(#b)"/><path d="m9.29 22.31-13.127-8.705" mask="url(#b)" transform="matrix(1 0 0 -1 0 35.915)"/></g><path d="m0 12h12v8h4v-8h12v-4h-12v-8h-4v8h-12z" fill="#e6273e" mask="url(#b)"/></g></svg>


--------------------------------------------------------------------------------
/client/public/assets/icons/ic_flag_fr.svg:
--------------------------------------------------------------------------------
1 | <svg height="20" viewBox="0 0 28 20" width="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><rect id="a" height="20" rx="3" width="28"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><use fill="#fff" xlink:href="#a"/><path d="m19 0h9v20h-9z" fill="#f44653" mask="url(#b)"/><path d="m0 0h9v20h-9z" fill="#1035bb" mask="url(#b)"/></g></svg>


--------------------------------------------------------------------------------
/client/public/assets/icons/ic_notification_mail.svg:
--------------------------------------------------------------------------------
1 | <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="a" x1="0%" x2="100%" y1="37.93%" y2="62.07%"><stop offset="0" stop-color="#ffa48d"/><stop offset="1" stop-color="#b72136"/></linearGradient><path id="b" d="m2.15609375.29484375h12.00031245c1.1045695 0 2 .8954305 2 2v15.99953125h-16.00031245v-15.99953125c0-1.1045695.8954305-2 2-2z"/><mask id="c" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#b"/></mask></defs><g fill="none" fill-rule="evenodd"><path d="m24 9.585-.703 8.935h-22.594l-.703-8.935 4-2.857h16z" fill="url(#a)"/><g transform="translate(3.844 .719)"><use fill="#d0f2ff" xlink:href="#b"/><path d="m3.21345312 3.02020312h4.74279688c.11045695 0 .2.08954306.2.2v1.00625c0 .11045695-.08954305.2-.2.2h-4.74279688c-.11045694 0-.2-.08954305-.2-.2v-1.00625c0-.11045694.08954306-.2.2-.2zm.00014063 3.42839063h9.88531245c.110457 0 .2.08954305.2.2v1.00625c0 .11045695-.089543.2-.2.2h-9.88531245c-.11045695 0-.2-.08954305-.2-.2v-1.00625c0-.11045695.08954305-.2.2-.2zm0 3.4284375h9.88531245c.110457 0 .2.08954305.2.19999995v1.00625c0 .110457-.089543.2-.2.2h-9.88531245c-.11045695 0-.2-.089543-.2-.2v-1.00625c0-.1104569.08954305-.19999995.2-.19999995z" fill="#74caff" mask="url(#c)"/></g><path d="m24 9.585v13.714l-12-1.115-12 1.115v-13.714l9.6 6.857h4.8z" fill="#ffa48d"/><path d="m24 9.585v13.714l-12-1.115v-5.742h2.4z" fill="#ff4842"/><path d="m24 23.299h-24l12-8.571z" fill="#ff4842"/><path d="m24 23.299h-12v-8.571z" fill="#b72136"/></g></svg>


--------------------------------------------------------------------------------
/client/public/assets/icons/navbar/ic_blog.svg:
--------------------------------------------------------------------------------
1 | <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
2 | <path opacity="0.4" d="M16.9841 2H7C4.25397 2 2 4.25397 2 7.01587V17C2 19.746 4.25397 22 7 22H16.9841C19.746 22 22 19.746 22 16.9841V7.01587C22 4.25397 19.746 2 16.9841 2Z" fill="#637381"/>
3 | <path fill-rule="evenodd" clip-rule="evenodd" d="M14.254 18.1905C16.4286 18.1905 18.2064 16.4445 18.2223 14.2858V11.127L18.1905 10.9683L18.0794 10.7461L17.9048 10.6032C17.8005 10.5267 17.5196 10.5203 17.2101 10.5132C16.813 10.5041 16.3689 10.4939 16.1905 10.3334C15.9837 10.1413 15.9419 9.81166 15.8858 9.3701C15.8817 9.33731 15.8775 9.3039 15.8731 9.26989C15.7801 8.45979 15.6982 8.29413 15.5903 8.07571C15.5693 8.03306 15.5472 7.98841 15.5239 7.93655C14.9842 6.77782 13.4921 5.80957 12.4762 5.80957H9.71433C7.53973 5.80957 5.80957 7.53973 5.80957 9.69846V14.3016C5.80957 16.4604 7.53973 18.1905 9.71433 18.1905H14.254ZM9.7619 8.98413H11.9524C12.381 8.98413 12.7143 9.28572 12.7143 9.69842C12.7143 10.1111 12.3651 10.4127 11.9524 10.4127H9.7619C9.34921 10.4127 9 10.1111 9 9.69842C9 9.28572 9.34921 8.98413 9.7619 8.98413ZM9.7619 13.4286H14.2222C14.6349 13.4286 14.9683 13.8095 14.9683 14.2222C14.9683 14.6349 14.6349 15.0159 14.2222 15.0159H9.7619C9.33333 15.0159 9 14.6349 9 14.2222C9 13.8095 9.34921 13.4286 9.7619 13.4286Z" fill="#637381"/>
4 | </svg>
5 |


--------------------------------------------------------------------------------
/client/public/assets/icons/navbar/ic_cart.svg:
--------------------------------------------------------------------------------
1 | <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
2 | <path d="M17.5505 10.5941C17.6091 10.0083 17.1491 9.5 16.5604 9.5C16.0492 9.5 15.6212 9.88735 15.5703 10.3961L15.2694 13.4059C15.2108 13.9917 15.6708 14.5 16.2595 14.5C16.7707 14.5 17.1987 14.1126 17.2496 13.6039L17.5505 10.5941Z" fill="#637381"/>
3 | <path d="M12.7496 10.3961C12.6987 9.88735 12.2707 9.5 11.7595 9.5C11.1708 9.5 10.7108 10.0083 10.7694 10.5941L11.0703 13.6039C11.1212 14.1126 11.5492 14.5 12.0604 14.5C12.6491 14.5 13.1091 13.9917 13.0505 13.4059L12.7496 10.3961Z" fill="#637381"/>
4 | <path d="M16.6602 19C16.6602 20.6569 18.0033 22 19.6602 22C21.317 22 22.6602 20.6569 22.6602 19C22.6602 17.3432 21.317 16 19.6602 16C18.0033 16 16.6602 17.3432 16.6602 19Z" fill="#637381"/>
5 | <path d="M6.16016 19C6.16016 20.6569 7.50331 22 9.16016 22C10.817 22 12.1602 20.6569 12.1602 19C12.1602 17.3432 10.817 16 9.16016 16C7.50331 16 6.16016 17.3432 6.16016 19Z" fill="#637381"/>
6 | <path opacity="0.4" d="M3.41016 2.00012C2.71981 2.00012 2.16016 2.55977 2.16016 3.25012C2.16016 3.94048 2.71981 4.50012 3.41016 4.50012H4.25251C4.48986 4.50012 4.69436 4.66605 4.74281 4.89837C4.96591 5.96777 5.59766 8.95907 6.10461 11.0001C6.73135 13.5236 7.29935 15.342 7.6574 16.4029C8.09928 16.1467 8.61259 16 9.16016 16C10.446 16 11.5429 16.809 11.9697 17.9457C12.7178 17.9791 13.5912 18.0001 14.6046 18.0001C15.462 18.0001 16.2042 17.9851 16.8452 17.9602C17.2681 16.8159 18.3689 16 19.6602 16C20.2143 16 20.7334 16.1503 21.1789 16.4123C21.5323 15.5226 22.0073 14.0331 22.4102 11.7501C22.6992 10.1123 22.8768 8.88287 22.986 7.99032C23.1201 6.89392 22.2647 6.00012 21.1602 6.00012H7.66016L7.03891 3.51505C6.81631 2.62472 6.01636 2.00012 5.09861 2.00012H3.41016Z" fill="#637381"/>
7 | </svg>
8 |


--------------------------------------------------------------------------------
/client/public/assets/icons/navbar/ic_disabled.svg:
--------------------------------------------------------------------------------
1 | <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
2 | <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5ZM12 18.3C15.4794 18.3 18.3 15.4794 18.3 12C18.3 8.52061 15.4794 5.7 12 5.7C8.52061 5.7 5.7 8.52061 5.7 12C5.7 15.4794 8.52061 18.3 12 18.3Z" fill="#637381"/>
3 | <path d="M18.6028 3.01136C19.2179 2.39628 20.2151 2.39628 20.8302 3.01136C21.4453 3.62643 21.4453 4.62367 20.8302 5.23874L5.2385 20.8304C4.62342 21.4455 3.62619 21.4455 3.01111 20.8304C2.39604 20.2154 2.39604 19.2181 3.01111 18.6031L18.6028 3.01136Z" fill="#637381"/>
4 | </svg>
5 |


--------------------------------------------------------------------------------
/client/public/assets/icons/navbar/ic_lock.svg:
--------------------------------------------------------------------------------
1 | <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
2 | <path opacity="0.4" d="M2.32694 4.28658C2.42248 3.46288 2.9222 2.78287 3.73187 2.60381C4.9948 2.32451 7.44275 2 12 2C16.5573 2 19.0052 2.32451 20.2682 2.60381C21.0778 2.78287 21.5775 3.46288 21.673 4.28658C21.8176 5.5322 22 7.58365 22 10C22 14.5142 19.6175 18.7382 15.6037 20.8039C14.2629 21.494 12.9543 22 12 22C11.0457 22 9.7371 21.494 8.3963 20.8039C4.38247 18.7382 2 14.5142 2 10C2 7.58365 2.18247 5.5322 2.32694 4.28658Z" fill="#637381"/>
3 | <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12105 7.7538C9.1895 6.21355 10.4582 5 12 5C13.5418 5 14.8105 6.21355 14.879 7.7538L14.9386 9.0968L15.0076 9.10265C15.8102 9.172 16.3768 9.7301 16.4377 10.5334C16.4735 11.0057 16.5 11.6444 16.5 12.5C16.5 13.3556 16.4735 13.9943 16.4377 14.4666C16.3768 15.2699 15.8102 15.828 15.0076 15.8974C14.3596 15.9534 13.3997 16 12 16C10.6003 16 9.6404 15.9534 8.9924 15.8974C8.18975 15.828 7.62325 15.2699 7.56235 14.4666C7.52655 13.9943 7.5 13.3556 7.5 12.5C7.5 11.7185 7.519 11.1179 7.54565 10.6598C7.5963 9.79025 8.19675 9.1729 9.0614 9.0959L9.12105 7.7538ZM12.8809 7.8426L12.9327 9.00755C12.6459 9.0027 12.3356 9 12 9C11.6648 9 11.3544 9.0027 11.0673 9.0075L11.1191 7.84265C11.14 7.3713 11.5283 7 12 7C12.4717 7 12.86 7.3713 12.8809 7.8426ZM13 12C13 12.4089 12.7545 12.7605 12.403 12.9155L12.4734 13.5415C12.4908 13.6961 12.4655 13.8652 12.3258 13.9338C12.2501 13.971 12.1446 14 12 14C11.8554 14 11.7499 13.971 11.6742 13.9338C11.5345 13.8652 11.5092 13.6961 11.5266 13.5415L11.597 12.9155C11.2455 12.7605 11 12.4089 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="#637381"/>
4 | </svg>
5 |


--------------------------------------------------------------------------------
/client/public/assets/icons/navbar/ic_user.svg:
--------------------------------------------------------------------------------
1 | <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
2 | <path opacity="0.4" d="M2.28099 19.6575C2.36966 20.5161 2.93261 21.1957 3.77688 21.3755C5.1095 21.6592 7.6216 22 12 22C16.3784 22 18.8905 21.6592 20.2232 21.3755C21.0674 21.1957 21.6303 20.5161 21.719 19.6575C21.8505 18.3844 22 16.0469 22 12C22 7.95305 21.8505 5.6156 21.719 4.34251C21.6303 3.48389 21.0674 2.80424 20.2231 2.62451C18.8905 2.34081 16.3784 2 12 2C7.6216 2 5.1095 2.34081 3.77688 2.62451C2.93261 2.80424 2.36966 3.48389 2.28099 4.34251C2.14952 5.6156 2 7.95305 2 12C2 16.0469 2.14952 18.3844 2.28099 19.6575Z" fill="#637381"/>
3 | <path d="M13.9382 13.8559C15.263 13.1583 16.1663 11.7679 16.1663 10.1666C16.1663 7.8655 14.3008 6 11.9996 6C9.69841 6 7.83291 7.8655 7.83291 10.1666C7.83291 11.768 8.73626 13.1584 10.0612 13.856C8.28691 14.532 6.93216 16.1092 6.51251 18.0529C6.45446 18.3219 6.60246 18.5981 6.87341 18.6471C7.84581 18.8231 9.45616 19 12.0006 19C14.545 19 16.1554 18.8231 17.1278 18.6471C17.3977 18.5983 17.5454 18.3231 17.4876 18.0551C17.0685 16.1103 15.7133 14.5321 13.9382 13.8559Z" fill="#637381"/>
4 | </svg>
5 |


--------------------------------------------------------------------------------
/client/public/assets/icons/shape-avatar.svg:
--------------------------------------------------------------------------------
1 | <svg height="62" viewBox="0 0 144 62" width="144" xmlns="http://www.w3.org/2000/svg"><path d="m111.34 23.88c-10.62-10.46-18.5-23.88-38.74-23.88h-1.2c-20.24 0-28.12 13.42-38.74 23.88-7.72 9.64-19.44 11.74-32.66 12.12v26h144v-26c-13.22-.38-24.94-2.48-32.66-12.12z" fill="#fff" fill-rule="evenodd"/></svg>


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_1.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_1.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_10.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_10.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_11.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_11.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_12.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_12.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_13.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_13.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_14.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_14.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_15.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_15.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_16.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_16.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_17.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_17.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_18.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_18.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_19.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_19.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_2.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_2.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_20.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_20.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_21.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_21.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_22.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_22.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_23.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_23.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_24.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_24.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_3.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_3.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_4.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_4.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_5.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_5.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_6.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_6.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_7.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_7.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_8.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_8.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_9.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_9.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/avatars/avatar_default.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/avatars/avatar_default.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_1.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_1.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_10.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_10.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_11.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_11.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_113.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_113.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_12.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_12.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_13.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_13.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_14.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_14.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_15.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_15.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_16.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_16.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_17.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_17.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_18.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_18.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_2.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_2.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_20.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_20.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_21.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_21.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_22.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_22.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_23.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_23.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_24.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_24.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_27.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_27.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_3.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_3.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_4.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_4.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_5.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_5.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_6.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_6.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_8.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_8.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/covers/cover_9.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/covers/cover_9.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/iconImages/logo.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/iconImages/logo.png


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_1.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_1.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_10.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_10.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_11.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_11.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_12.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_12.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_13.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_13.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_14.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_14.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_15.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_15.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_16.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_16.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_17.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_17.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_18.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_18.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_19.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_19.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_2.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_2.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_20.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_20.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_21.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_21.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_22.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_22.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_23.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_23.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_24.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_24.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_3.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_3.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_4.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_4.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_5.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_5.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_6.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_6.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_7.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_7.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_8.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_8.jpg


--------------------------------------------------------------------------------
/client/public/assets/images/products/product_9.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/images/products/product_9.jpg


--------------------------------------------------------------------------------
/client/public/assets/logo.svg:
--------------------------------------------------------------------------------
1 | <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a" x1="100%" x2="50%" y1="5.663%" y2="50%"><stop offset="0" stop-color="#007b55"/><stop offset="1" stop-color="#00ab55"/></linearGradient><linearGradient id="b" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0" stop-color="#5be584"/><stop offset="1" stop-color="#00ab55"/></linearGradient><g fill="none" fill-rule="evenodd" transform="translate(14 128)"><path d="m92.8065878 83.1065019c44.2888442 22.8889511 46.3079382 23.9345951 46.4006692 23.9799821.012248.008728.642121.333419 44.792743 23.152545-26.071507 48.53952-42.693165 77.265922-49.868472 86.179207-10.758587 13.369926-22.495227 23.492946-36.929824 29.333888-30.3458978 14.261953-68.070062 14.928791-97.201704-2.704011z" fill="url(#a)"/><g fill="url(#b)"><path d="m430.310491 101.726093c-46.270793-80.9559274-94.100378-157.2284394-149.043472-45.3437359-7.516227 14.3833977-12.994566 42.3366008-25.267019 42.3366008v-.1420279c-12.272453 0-17.749057-27.9532032-25.265283-42.3366009-54.94483-111.8847034-102.774415-35.6121915-149.0452076 45.3437359-3.4821132 6.105448-6.8270943 11.9321-9.6895094 16.99601 106.037811-67.1266136 97.11034 135.666494 184 137.277897v.142028c86.891396-1.611403 77.962189-204.4045106 184-137.27965-2.860679-5.062157-6.20566-10.888809-9.689509-16.994257"/><path d="m436 256c26.5088 0 48-21.4912 48-48s-21.4912-48-48-48-48 21.4912-48 48 21.4912 48 48 48"/></g></g></svg>


--------------------------------------------------------------------------------
/client/public/assets/placeholder.svg:
--------------------------------------------------------------------------------
1 | <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><radialGradient id="a" cx="50%" cy="46.801102%" r="95.497112%"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#919eab" stop-opacity=".48"/></radialGradient><path d="m88 86h512v512h-512z" fill="url(#a)" fill-rule="evenodd" transform="translate(-88 -86)"/></svg>


--------------------------------------------------------------------------------
/client/public/assets/preview.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/assets/preview.jpg


--------------------------------------------------------------------------------
/client/public/favicon/favicon.ico:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/dawmthedev/voltaFull/660e5e35e5d607a7f6bc6926670d3dae8e31348c/client/public/favicon/favicon.ico


--------------------------------------------------------------------------------
/client/public/index.html:
--------------------------------------------------------------------------------
 1 | <!DOCTYPE html>
 2 | <html lang="en">
 3 |
 4 | <head>
 5 |   <meta charset="utf-8" />
 6 |   <!-- Favicon -->
 7 |
 8 |   <link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/favicon/apple-touch-icon.png">
 9 |   <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon/favicon-32x32.png">
10 |   <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon/favicon-16x16.png">
11 |
12 |   <meta name="theme-color" content="#000000" />
13 |   <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
14 |   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
15 |
16 |   <!-- Using Google Font -->
17 |   <link rel="preconnect" href="https://fonts.gstatic.com">
18 |   <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
19 |
20 |   <!-- Using Local Font -->
21 |   <link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/fonts/index.css" />
22 |
23 |   <!-- Css simplebar -->
24 |   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simplebar/5.3.9/simplebar.min.css" />
25 |
26 |   <title>VC - CRM</title>
27 |   <meta name="description"
28 |     content="Voltaic Construction Portal" />
29 |   <meta name="keywords" content="realestate,homes,house,sale,forsale,foreclosure,sell" />
30 |   <meta name="author" content="VC LLC" />
31 | </head>
32 |
33 | <body>
34 |   <noscript>You need to enable JavaScript to run this app.</noscript>
35 |   <div id="root"></div>
36 | </body>
37 |
38 | </html>
39 |


--------------------------------------------------------------------------------
/client/public/manifest.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "short_name": "Minimal App",
 3 |   "name": "React Material Minimal UI Kit",
 4 |   "icons": [
 5 |     {
 6 |       "src": "favicon/android-chrome-192x192.png",
 7 |       "sizes": "192x192",
 8 |       "type": "image/png"
 9 |     },
10 |     {
11 |       "src": "favicon/android-chrome-512x512.png",
12 |       "sizes": "512x512",
13 |       "type": "image/png"
14 |     }
15 |   ],
16 |   "start_url": ".",
17 |   "display": "standalone",
18 |   "theme_color": "#000000",
19 |   "background_color": "#ffffff"
20 | }
21 |


--------------------------------------------------------------------------------
/client/src/API/firebase.js:
--------------------------------------------------------------------------------
 1 | // Import the functions you need from the SDKs you need
 2 | import { initializeApp } from "firebase/app";
 3 | import { getAnalytics } from "firebase/analytics";
 4 | import {getStorage} from "firebase/storage";
 5 | import 'firebase/storage'
 6 | // TODO: Add SDKs for Firebase products that you want to use
 7 | // https://firebase.google.com/docs/web/setup#available-libraries
 8 |
 9 | // Your web app's Firebase configuration
10 | // For Firebase JS SDK v7.20.0 and later, measurementId is optional
11 | const firebaseConfig = {
12 |   apiKey: "AIzaSyAYadAxRp0EIbltR-o13_2R6HeA-bYvGZA",
13 |   authDomain: "voltaic-383203.firebaseapp.com",
14 |   projectId: "voltaic-383203",
15 |   storageBucket: "voltaic-383203.appspot.com",
16 |   messagingSenderId: "938802392806",
17 |   appId: "1:938802392806:web:26cae772528577886ed527",
18 |   measurementId: "G-HKW5LYZ76W"
19 | };
20 |
21 | // Initialize Firebase
22 | const app = initializeApp(firebaseConfig);
23 |
24 |
25 |
26 |
27 |
28 | export const storage = getStorage();
29 |
30 |
31 |
32 |


--------------------------------------------------------------------------------
/client/src/App.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import { LicenseInfo } from '@mui/x-license-pro';
 3 | import Router from './routes';
 4 | import ThemeProvider from './theme';
 5 | import ScrollToTop from './components/scroll-to-top';
 6 | import { StyledChart } from './components/chart';
 7 | import Alert from './components/alert/Alert';
 8 |
 9 | LicenseInfo.setLicenseKey('9e17734200a964cd420488accda5490fTz01ODkyOSxFPTE3MDY4NzA0MzEyMTAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');
10 |
11 | export default function App() {
12 |   return (
13 |     <ThemeProvider>
14 |       <Alert open={false} message="" />
15 |       <ScrollToTop />
16 |       <StyledChart />
17 |       <Router />
18 |     </ThemeProvider>
19 |   );
20 | }
21 |


--------------------------------------------------------------------------------
/client/src/Styles/AddClients.module.css:
--------------------------------------------------------------------------------
 1 | .modal{
 2 |     display: flex;
 3 |     justify-content: center;
 4 |     align-items: center;
 5 |     width: 100vw;
 6 |     background-color: rebeccapurple;
 7 |     z-index: 20;
 8 |     height: 100vh;
 9 | }
10 |
11 |
12 | .submitButton{
13 |     /* background-color: rebeccapurple; */
14 |     padding-top: 1em;
15 | }
16 | .formRow{
17 |     display: flex;
18 |     flex-direction: column;
19 |     width: 100%;
20 |     /* background-color: wheat; */
21 | }
22 |
23 | .label{
24 |     /* background-color: rebeccapurple; */
25 |     padding: 5px;
26 | }
27 | .input{
28 |     padding-left: 10px;
29 |     background-color: rgb(236, 236, 236);
30 |     color: black;
31 |     border: none;
32 |     border-radius: 5px;
33 |     width: 80%;
34 |     height: 30px;
35 | }


--------------------------------------------------------------------------------
/client/src/Styles/Messages.module.css:
--------------------------------------------------------------------------------
 1 | .callButton{
 2 |     background-color: #00bfa5;
 3 |     color: white;
 4 |     border: none;
 5 |     border-radius: 5px;
 6 |     padding: 10px;
 7 |     font-size: 1.2rem;
 8 |     cursor: pointer;
 9 |     margin: 10px;
10 |     width: 100%;
11 |     height: 100%;
12 |
13 | }


--------------------------------------------------------------------------------
/client/src/_mock/account.js:
--------------------------------------------------------------------------------
 1 | // ----------------------------------------------------------------------
 2 |
 3 | const account = {
 4 |   displayName: 'Voltaic User',
 5 |   email: 'Voltaic LLC',
 6 |   photoURL: '/assets/images/avatars/avatar_default.jpg'
 7 | };
 8 |
 9 | export default account;
10 |


--------------------------------------------------------------------------------
/client/src/_mock/products.js:
--------------------------------------------------------------------------------
 1 | import { faker } from '@faker-js/faker';
 2 | import { sample } from 'lodash';
 3 |
 4 | // ----------------------------------------------------------------------
 5 |
 6 | const PRODUCT_NAME = [
 7 |   '123 Main St , USA',
 8 |   '456 Park Ave , USA',
 9 |   '789 Elm St , USA',
10 |   '111 Oak Blvd , USA',
11 |   '222 Maple St , USA',
12 |   '333 Pine Ave , USA',
13 |   '444 Cedar St , USA',
14 |   '555 Birch Rd , USA',
15 |   '666 Riverside Dr , USA',
16 |   '777 Lakeview Dr , USA',
17 |   '888 Mountain Rd , USA',
18 |   '999 Ocean Ave , USA',
19 |   '101 North St , USA',
20 |   '202 South St , USA',
21 |   '303 East St , USA',
22 |   '404 West St , USA',
23 |   '505 Central Ave , USA',
24 |   '606 Hillside Dr , USA',
25 |   '707 Sunset Blvd , USA',
26 |   '808 Sunrise Ave , USA',
27 |   '909 Valley Rd , USA',
28 |   '1010 Forest Dr , USA',
29 |   ];
30 | const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];
31 |
32 | // ----------------------------------------------------------------------
33 |
34 | const products = [...Array(24)].map((_, index) => {
35 |   const setIndex = index + 1;
36 |
37 |   return {
38 |     id: faker.datatype.uuid(),
39 |     cover: `/assets/images/products/product_${setIndex}.jpg`,
40 |     name: PRODUCT_NAME[index],
41 |     price: faker.datatype.number({ min: 500000, max: 999999, precision: 0.01 }),
42 |     priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
43 |     colors:
44 |       (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
45 |       (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
46 |       (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
47 |       (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
48 |       (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
49 |       (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
50 |       PRODUCT_COLOR,
51 |     status: sample(['sale', 'new', '', '']),
52 |   };
53 | });
54 |
55 | export default products;
56 |


--------------------------------------------------------------------------------
/client/src/_mock/user.js:
--------------------------------------------------------------------------------
 1 | import { faker } from '@faker-js/faker';
 2 | import { sample } from 'lodash';
 3 |
 4 | // ----------------------------------------------------------------------
 5 |
 6 | const users = [...Array(24)].map((_, index) => ({
 7 |   id: faker.datatype.uuid(),
 8 |   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
 9 |   name: faker.name.fullName(),
10 |   company: faker.company.name(),
11 |   isVerified: faker.datatype.boolean(),
12 |   docs: faker.datatype.boolean(),
13 |   status: sample(['active', 'banned']),
14 |   role: sample([
15 |     'Leader',
16 |     'Hr Manager',
17 |     'UI Designer',
18 |     'UX Designer',
19 |     'UI/UX Designer',
20 |     'Project Manager',
21 |     'Backend Developer',
22 |     'Full Stack Designer',
23 |     'Front End Developer',
24 |     'Full Stack Developer',
25 |   ]),
26 | }));
27 |
28 | export default users;
29 |


--------------------------------------------------------------------------------
/client/src/apiConfig.ts:
--------------------------------------------------------------------------------
1 | export const urls = {
2 |   local: 'http://localhost:4000/rest',
3 |   development: 'http://localhost:4000/rest',
4 |   production: 'https://voltaiccrm-7dd827fb5012.herokuapp.com/rest'
5 | };
6 |


--------------------------------------------------------------------------------
/client/src/components/SelectField.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | export default function SelectField() {
4 |   return <div>Select Field</div>;
5 | }
6 |


--------------------------------------------------------------------------------
/client/src/components/add-category/AddCategory.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface FieldTypes {
 4 |   name: string;
 5 |   type: string;
 6 | }
 7 | export interface CategoryTypes {
 8 |   name: string;
 9 | }
10 | export interface AddCategoryProps {
11 |   fields: FieldTypes[];
12 |   category: CategoryTypes;
13 |   isEdit?: boolean;
14 |   getFieldsData?: (value: string, name: string, index: number) => void;
15 |   addNewField?: () => void;
16 |   removeField?: (index: number) => void;
17 |   setCategory?: React.Dispatch<React.SetStateAction<CategoryTypes>>;
18 | }
19 |
20 | const AddCategory: React.FC<AddCategoryProps> = ({ fields }) => {
21 |   return (
22 |     <div>
23 |       {fields && fields.map((field, idx) => (
24 |         <div key={idx}>{field.name}</div>
25 |       ))}
26 |     </div>
27 |   );
28 | };
29 |
30 | export default AddCategory;
31 |


--------------------------------------------------------------------------------
/client/src/components/add-lead/AddLead.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface LeadField {
 4 |   name: string;
 5 |   type: string;
 6 |   value: string;
 7 | }
 8 |
 9 | export interface AddLeadProps {
10 |   leadValue: LeadField[];
11 |   getAddLeadData: (value: string, name: string, index: number) => void;
12 | }
13 |
14 | const AddLead: React.FC<AddLeadProps> = ({ leadValue, getAddLeadData }) => {
15 |   return (
16 |     <div>
17 |       {leadValue.map((lead, index) => (
18 |         <div key={index}>
19 |           <label>
20 |             {lead.name}
21 |             <input
22 |               value={lead.value}
23 |               name={lead.name}
24 |               onChange={(e) => getAddLeadData(e.target.value, e.target.name, index)}
25 |             />
26 |           </label>
27 |         </div>
28 |       ))}
29 |     </div>
30 |   );
31 | };
32 |
33 | export default AddLead;
34 |


--------------------------------------------------------------------------------
/client/src/components/add-user-form/AddUser.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface AddUserProps {
 4 |   onClose?: () => void;
 5 | }
 6 |
 7 | const AddUser: React.FC<AddUserProps> = () => {
 8 |   return <div>Add User</div>;
 9 | };
10 |
11 | export default AddUser;
12 |


--------------------------------------------------------------------------------
/client/src/components/add-user-form/AddUserForm.tsx:
--------------------------------------------------------------------------------
 1 | import React, { useState } from 'react';
 2 |
 3 | export interface RoleDataTypes {
 4 |   id: string;
 5 |   name: string;
 6 | }
 7 | export interface AddNewUserProps {
 8 |   user: { name: string; role: string; isSuperAdmin: boolean };
 9 |   getUsersData: (value: any, name: string) => void;
10 |   roles: RoleDataTypes[];
11 | }
12 |
13 | const AddUserForm: React.FC<AddNewUserProps> = ({ user, getUsersData, roles }) => {
14 |   const [checked, setChecked] = useState(user.isSuperAdmin);
15 |
16 |   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
17 |     setChecked(e.target.checked);
18 |     getUsersData(e.target.checked, 'isSuperAdmin');
19 |   };
20 |
21 |   return (
22 |     <div>
23 |       <input
24 |         value={user.name}
25 |         name="name"
26 |         onChange={(e) => getUsersData(e.target.value, e.target.name)}
27 |         placeholder="Name"
28 |       />
29 |       <select
30 |         value={user.role}
31 |         name="role"
32 |         onChange={(e) => getUsersData(e.target.value, e.target.name)}
33 |       >
34 |         {roles.map((r) => (
35 |           <option key={r.id} value={r.name}>
36 |             {r.name}
37 |           </option>
38 |         ))}
39 |       </select>
40 |       <label>
41 |         <input type="checkbox" checked={checked} onChange={handleChange} /> Super Admin
42 |       </label>
43 |     </div>
44 |   );
45 | };
46 |
47 | export default AddUserForm;
48 |


--------------------------------------------------------------------------------
/client/src/components/admin-navsection/AdminNavSection.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import { NavLink as RouterLink } from 'react-router-dom';
 4 | // @mui
 5 | //
 6 | import { StyledNavItem, StyledNavItemIcon } from '../nav-section/styles';
 7 | import { authSelector } from '../../redux/slice/authSlice';
 8 | import { useAppSelector } from '../../hooks/hooks';
 9 |
10 | // ----------------------------------------------------------------------
11 | AdminNavSection.propTypes = {
12 |   data: PropTypes.array
13 | };
14 | export function AdminNavSection({ data = [], ...other }) {
15 |   const { data: loginData } = useAppSelector(authSelector);
16 |   return (
17 |     <Box {...other}>
18 |       <List disablePadding sx={{ p: 1 }}>
19 |         {data.map((item) => {
20 |           return <NavItem key={item.title} item={item} />;
21 |         })}
22 |       </List>
23 |     </Box>
24 |   );
25 | }
26 | NavItem.propTypes = {
27 |   item: PropTypes.object
28 | function NavItem({ item }) {
29 |   const { title, path, icon, info } = item;
30 |     <StyledNavItem
31 |       component={RouterLink}
32 |       to={path}
33 |       sx={{
34 |         '&.active': {
35 |           color: 'text.primary',
36 |           bgcolor: 'action.selected',
37 |           fontWeight: 'fontWeightBold'
38 |         }
39 |       }}
40 |     >
41 |       <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
42 |       <ListItemText disableTypography primary={title} />
43 |       {info && info}
44 |     </StyledNavItem>
45 |


--------------------------------------------------------------------------------
/client/src/components/admin-navsection/index.js:
--------------------------------------------------------------------------------
1 | export { default} from './AdminNavSection';


--------------------------------------------------------------------------------
/client/src/components/alert/Alert.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import Snackbar from '@mui/material/Snackbar';
 3 | import MuiAlert from '@mui/material/Alert';
 4 |
 5 | export interface AlertProps {
 6 |   open: boolean;
 7 |   message: string;
 8 |   type?: 'error' | 'warning' | 'info' | 'success';
 9 |   onClose?: () => void;
10 | }
11 |
12 | const AlertComponent: React.FC<AlertProps> = ({ open, message, type = 'info', onClose }) => (
13 |   <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
14 |     <MuiAlert severity={type} variant="filled" onClose={onClose} sx={{ color: 'white', fontWeight: 'bold' }}>
15 |       {message}
16 |     </MuiAlert>
17 |   </Snackbar>
18 | );
19 |
20 | export default AlertComponent;
21 |


--------------------------------------------------------------------------------
/client/src/components/calendar/AvailabilityCalender.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface CalendarProps {
 4 |   value?: string;
 5 |   getActionData?: (value: string, name: string) => void;
 6 | }
 7 |
 8 | const WeekCalendar: React.FC<CalendarProps> = () => {
 9 |   return <div>Availability Calendar</div>;
10 | };
11 |
12 | export default WeekCalendar;
13 |


--------------------------------------------------------------------------------
/client/src/components/calendar/Calendar.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface CalendarProps {
 4 |   value?: string;
 5 |   getActionData?: (value: string, name: string) => void;
 6 | }
 7 |
 8 | const MyCalendar: React.FC<CalendarProps> = () => {
 9 |   return <div>Calendar</div>;
10 | };
11 |
12 | export default MyCalendar;
13 |


--------------------------------------------------------------------------------
/client/src/components/calendar/calendar.scss:
--------------------------------------------------------------------------------
1 | @import 'react-big-calendar/lib/sass/styles';
2 | @import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // if using DnD


--------------------------------------------------------------------------------
/client/src/components/chart/index.js:
--------------------------------------------------------------------------------
 1 | import Chart from 'react-apexcharts';
 2 |
 3 | // ----------------------------------------------------------------------
 4 |
 5 | export { default as StyledChart } from './styles';
 6 |
 7 | export { default as useChart } from './useChart';
 8 |
 9 | export default Chart;
10 |


--------------------------------------------------------------------------------
/client/src/components/chart/styles.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | // @mui
 3 | // utils
 4 | import { bgBlur } from '../../utils/cssStyles';
 5 |
 6 | // ----------------------------------------------------------------------
 7 | export default function StyledChart() {
 8 |   const theme = useTheme();
 9 |   const inputGlobalStyles = (
10 |     <GlobalStyles
11 |       styles={{
12 |         '.apexcharts-canvas': {
13 |           // Tooltip
14 |           '.apexcharts-xaxistooltip': {
15 |             ...bgBlur({ color: theme.palette.background.default }),
16 |             border: 0,
17 |             color: theme.palette.text.primary,
18 |             boxShadow: theme.customShadows.dropdown,
19 |             borderRadius: Number(theme.shape.borderRadius) * 1.5,
20 |             '&:before': { borderBottomColor: 'transparent' },
21 |             '&:after': { borderBottomColor: alpha(theme.palette.background.default, 0.8) },
22 |           },
23 |           '.apexcharts-tooltip.apexcharts-theme-light': {
24 |             '.apexcharts-tooltip-title': {
25 |               border: 0,
26 |               textAlign: 'center',
27 |               fontWeight: theme.typography.fontWeightBold,
28 |               backgroundColor: alpha(theme.palette.grey[500], 0.16),
29 |               color: theme.palette.text[theme.palette.mode === 'light' ? 'secondary' : 'primary'],
30 |             },
31 |           // Legend
32 |           '.apexcharts-legend': {
33 |             padding: 0,
34 |           '.apexcharts-legend-series': {
35 |             display: 'flex !important',
36 |             alignItems: 'center',
37 |           '.apexcharts-legend-marker': {
38 |             marginRight: 8,
39 |           '.apexcharts-legend-text': {
40 |             lineHeight: '18px',
41 |             textTransform: 'capitalize',
42 |         },
43 |       }}
44 |     />
45 |   );
46 |   return inputGlobalStyles;
47 | }
48 |


--------------------------------------------------------------------------------
/client/src/components/click-away/ClickAway.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface ClickAwayProps {
 4 |   children: React.ReactNode;
 5 |   onClickAway?: () => void;
 6 | }
 7 |
 8 | const ClickAway: React.FC<ClickAwayProps> = ({ children }) => {
 9 |   return <div>{children}</div>;
10 | };
11 |
12 | export default ClickAway;
13 |


--------------------------------------------------------------------------------
/client/src/components/color-utils/ColorMultiPicker.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | // @mui
 4 | //
 5 | import Icon from './Icon';
 6 |
 7 | // ----------------------------------------------------------------------
 8 | ColorMultiPicker.propTypes = {
 9 |   sx: PropTypes.object,
10 |   colors: PropTypes.array,
11 |   onChangeColor: PropTypes.func,
12 |   selected: PropTypes.arrayOf(PropTypes.string),
13 | };
14 | export default function ColorMultiPicker({ colors, selected, onChangeColor, sx, ...other }) {
15 |   return (
16 |     <Box sx={sx}>
17 |       {colors.map((color) => {
18 |         const whiteColor = color === '#FFFFFF' || color === 'white';
19 |         return (
20 |           <Checkbox
21 |             key={color}
22 |             size="small"
23 |             value={color}
24 |             color="default"
25 |             checked={selected.includes(color)}
26 |             onChange={() => onChangeColor(color)}
27 |             icon={<Icon whiteColor={whiteColor} />}
28 |             checkedIcon={<Icon checked whiteColor={whiteColor} />}
29 |             sx={{
30 |               color,
31 |               '&:hover': { opacity: 0.72 },
32 |               '& svg': { width: 12, height: 12 },
33 |             }}
34 |             {...other}
35 |           />
36 |         );
37 |       })}
38 |     </Box>
39 |   );
40 | }
41 |


--------------------------------------------------------------------------------
/client/src/components/color-utils/ColorPreview.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | // @mui
 4 |
 5 | // ----------------------------------------------------------------------
 6 | ColorPreview.propTypes = {
 7 |   sx: PropTypes.object,
 8 |   limit: PropTypes.number,
 9 |   colors: PropTypes.arrayOf(PropTypes.string),
10 | };
11 | export default function ColorPreview({ colors, limit = 3, sx }) {
12 |   const showColor = colors.slice(0, limit);
13 |   const moreColor = colors.length - limit;
14 |   return (
15 |     <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
16 |       {showColor.map((color, index) => (
17 |         <Box
18 |           key={color + index}
19 |           sx={{
20 |             ml: -0.75,
21 |             width: 16,
22 |             height: 16,
23 |             borderRadius: '50%',
24 |             border: (theme) => `solid 2px ${theme.palette.background.paper}`,
25 |             boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
26 |             bgcolor: color,
27 |           }}
28 |         />
29 |       ))}
30 |       {colors.length > limit && <Typography variant="subtitle2">{`+${moreColor}`}</Typography>}
31 |     </Stack>
32 |   );
33 | }
34 |


--------------------------------------------------------------------------------
/client/src/components/color-utils/ColorSinglePicker.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import { forwardRef } from 'react';
 4 | // @mui
 5 | //
 6 | import Icon from './Icon';
 7 |
 8 | // ----------------------------------------------------------------------
 9 | const ColorSinglePicker = forwardRef(({ colors, ...other }, ref) => (
10 |   <RadioGroup row ref={ref} {...other}>
11 |     {colors.map((color) => {
12 |       const whiteColor = color === '#FFFFFF' || color === 'white';
13 |       return (
14 |         <Radio
15 |           key={color}
16 |           value={color}
17 |           color="default"
18 |           icon={<Icon whiteColor={whiteColor} />}
19 |           checkedIcon={<Icon checked whiteColor={whiteColor} />}
20 |           sx={{
21 |             color,
22 |             '&:hover': { opacity: 0.72 },
23 |             '& svg': { width: 12, height: 12 },
24 |           }}
25 |         />
26 |       );
27 |     })}
28 |   </RadioGroup>
29 | ));
30 | ColorSinglePicker.propTypes = {
31 |   colors: PropTypes.arrayOf(PropTypes.string),
32 | };
33 | export default ColorSinglePicker;
34 |


--------------------------------------------------------------------------------
/client/src/components/color-utils/Icon.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | // @mui
 4 | //
 5 | import Iconify from '../iconify';
 6 |
 7 | // ----------------------------------------------------------------------
 8 | Icon.propTypes = {
 9 |   sx: PropTypes.object,
10 |   checked: PropTypes.bool,
11 |   whiteColor: PropTypes.bool,
12 | };
13 | export default function Icon({ checked, whiteColor, sx, ...other }) {
14 |   const shadow = (
15 |     <Box
16 |       sx={{
17 |         width: 1,
18 |         height: 1,
19 |         opacity: 0.48,
20 |         borderRadius: '50%',
21 |         position: 'absolute',
22 |         boxShadow: '4px 4px 8px 0 currentColor',
23 |       }}
24 |     />
25 |   );
26 |   const icon = (
27 |     <Iconify
28 |       icon="eva:checkmark-fill"
29 |         opacity: 0,
30 |         ...(checked && {
31 |           opacity: 1,
32 |           color: 'common.white',
33 |           ...(whiteColor && {
34 |             color: 'common.black',
35 |           }),
36 |         }),
37 |   return (
38 |         width: 20,
39 |         height: 20,
40 |         display: 'flex',
41 |         position: 'relative',
42 |         alignItems: 'center',
43 |         justifyContent: 'center',
44 |         bgcolor: 'currentColor',
45 |         transition: (theme) =>
46 |           theme.transitions.create('all', {
47 |             duration: theme.transitions.duration.shortest,
48 |         ...(whiteColor && {
49 |           border: (theme) => `solid 1px ${theme.palette.divider}`,
50 |           boxShadow: (theme) => `4px 4px 8px 0 ${alpha(theme.palette.grey[500], 0.24)}`,
51 |           transform: 'scale(1.4)',
52 |         ...sx,
53 |       {...other}
54 |     >
55 |       {checked && shadow}
56 |       {icon}
57 |     </Box>
58 | }
59 |


--------------------------------------------------------------------------------
/client/src/components/color-utils/index.js:
--------------------------------------------------------------------------------
1 | export { default as ColorPreview } from './ColorPreview';
2 | export { default as ColorMultiPicker } from './ColorMultiPicker';
3 | export { default as ColorSinglePicker } from './ColorSinglePicker';
4 |


--------------------------------------------------------------------------------
/client/src/components/csv-table/CsvTable.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface CsvTableProps {
 4 |   rows: Array<Record<string, string>>;
 5 | }
 6 |
 7 | const CsvTable: React.FC<CsvTableProps> = ({ rows }) => {
 8 |   return (
 9 |     <table>
10 |       <tbody>
11 |         {rows.map((row, idx) => (
12 |           <tr key={idx}>
13 |             {Object.values(row).map((value, i) => (
14 |               <td key={i}>{value}</td>
15 |             ))}
16 |           </tr>
17 |         ))}
18 |       </tbody>
19 |     </table>
20 |   );
21 | };
22 |
23 | export default CsvTable;
24 |


--------------------------------------------------------------------------------
/client/src/components/custom-select-field/CustomSelectField.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface Option {
 4 |   label: string;
 5 |   value: string;
 6 | }
 7 |
 8 | export interface CustomSelectFieldProps {
 9 |   options: Option[];
10 |   value: string;
11 |   onChange?: (value: string) => void;
12 | }
13 |
14 | const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ options, value, onChange }) => {
15 |   return (
16 |     <select value={value} onChange={(e) => onChange && onChange(e.target.value)}>
17 |       {options.map((o) => (
18 |         <option key={o.value} value={o.value}>
19 |           {o.label}
20 |         </option>
21 |       ))}
22 |     </select>
23 |   );
24 | };
25 |
26 | export default CustomSelectField;
27 |


--------------------------------------------------------------------------------
/client/src/components/custom-table/CustomTable.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface Column {
 4 |   key: string;
 5 |   header: string;
 6 | }
 7 |
 8 | export interface CustomTableProps {
 9 |   columns: Column[];
10 |   data: Array<Record<string, any>>;
11 | }
12 |
13 | const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
14 |   return (
15 |     <table>
16 |       <thead>
17 |         <tr>
18 |           {columns.map((c) => (
19 |             <th key={c.key}>{c.header}</th>
20 |           ))}
21 |         </tr>
22 |       </thead>
23 |       <tbody>
24 |         {data.map((row, idx) => (
25 |           <tr key={idx}>
26 |             {columns.map((c) => (
27 |               <td key={c.key}>{row[c.key]}</td>
28 |             ))}
29 |           </tr>
30 |         ))}
31 |       </tbody>
32 |     </table>
33 |   );
34 | };
35 |
36 | export default CustomTable;
37 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/ActiveRates.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/DealsData.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/DealsDataLeadgen.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/InactiveRates.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/LeadGenPay.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/NewSaleData.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/PayrollData.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/PreviousPayData.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/RookieLeadgens.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/RookiesData.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/dataGrid/UpcomingPay.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const PlaceholderTable = () => {
4 |   return <div>DataGrid Placeholder</div>;
5 | };
6 |
7 | export default PlaceholderTable;
8 |


--------------------------------------------------------------------------------
/client/src/components/email-user/EmailUser.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | const EmailUserForm: React.FC = () => {
 4 |   return (
 5 |     <form>
 6 |       <input placeholder="Subject" />
 7 |       <textarea placeholder="Message" />
 8 |       <button type="submit">Send</button>
 9 |     </form>
10 |   );
11 | };
12 |
13 | export default EmailUserForm;
14 |


--------------------------------------------------------------------------------
/client/src/components/iconify/Iconify.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import { forwardRef } from 'react';
 4 | // icons
 5 | import { Icon } from '@iconify/react';
 6 | // @mui
 7 |
 8 | // ----------------------------------------------------------------------
 9 | const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
10 |   <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
11 | ));
12 | Iconify.propTypes = {
13 |   sx: PropTypes.object,
14 |   width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
15 |   icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
16 | };
17 | export default Iconify;
18 |


--------------------------------------------------------------------------------
/client/src/components/iconify/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './Iconify';
2 |


--------------------------------------------------------------------------------
/client/src/components/input/CustomInput.tsx:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import React from 'react';
 3 |
 4 | interface CustomInputProps {
 5 |   value: string;
 6 |   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 7 |   name: string;
 8 |   label: string;
 9 |   type?: 'text' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'search';
10 |   size?: 'small' | 'medium';
11 |   error?: string;
12 | }
13 | const CustomInput = ({ type = 'text', value, name, label, size = 'medium', error, onChange }: CustomInputProps) => {
14 |   return (
15 |     <Box>
16 |       <TextField
17 |         type={type}
18 |         value={value}
19 |         onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
20 |         name={name}
21 |         label={label}
22 |         fullWidth={true}
23 |         sx={{ my: error ? 0 : 1 }}
24 |         size={size}
25 |       />
26 |       {error && <Typography color={'darkorange'}>{error}</Typography>}
27 |     </Box>
28 |   );
29 | };
30 | export default CustomInput;
31 |


--------------------------------------------------------------------------------
/client/src/components/label/Label.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import { forwardRef } from 'react';
 4 | // @mui
 5 | //
 6 | import { StyledLabel } from './styles';
 7 |
 8 | // ----------------------------------------------------------------------
 9 | const Label = forwardRef(({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }, ref) => {
10 |   const theme = useTheme();
11 |   const iconStyle = {
12 |     width: 16,
13 |     height: 16,
14 |     '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
15 |   };
16 |   return (
17 |     <StyledLabel
18 |       ref={ref}
19 |       component="span"
20 |       ownerState={{ color, variant }}
21 |       sx={{
22 |         ...(startIcon && { pl: 0.75 }),
23 |         ...(endIcon && { pr: 0.75 }),
24 |         ...sx,
25 |       }}
26 |       theme={theme}
27 |       {...other}
28 |     >
29 |       {startIcon && <Box sx={{ mr: 0.75, ...iconStyle }}> {startIcon} </Box>}
30 |       {children}
31 |       {endIcon && <Box sx={{ ml: 0.75, ...iconStyle }}> {endIcon} </Box>}
32 |     </StyledLabel>
33 |   );
34 | });
35 | Label.propTypes = {
36 |   sx: PropTypes.object,
37 |   endIcon: PropTypes.node,
38 |   children: PropTypes.node,
39 |   startIcon: PropTypes.node,
40 |   variant: PropTypes.oneOf(['filled', 'outlined', 'ghost', 'soft']),
41 |   color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
42 | };
43 | export default Label;
44 |


--------------------------------------------------------------------------------
/client/src/components/label/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './Label';
2 |


--------------------------------------------------------------------------------
/client/src/components/logo/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './Logo';
2 |


--------------------------------------------------------------------------------
/client/src/components/modals/CustomModal.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface CustomModalProps {
 4 |   open: boolean;
 5 |   setOpen: (open: boolean) => void;
 6 |   title?: string;
 7 |   children?: React.ReactNode;
 8 |   size?: string;
 9 |   handleSubmit?: () => void;
10 | }
11 |
12 | const CustomModal: React.FC<CustomModalProps> = ({ open, setOpen, title, children, handleSubmit }) => {
13 |   if (!open) return null;
14 |   return (
15 |     <div>
16 |       <h3>{title}</h3>
17 |       <div>{children}</div>
18 |       <button onClick={() => setOpen(false)}>Close</button>
19 |       {handleSubmit && <button onClick={handleSubmit}>Submit</button>}
20 |     </div>
21 |   );
22 | };
23 |
24 | export default CustomModal;
25 |


--------------------------------------------------------------------------------
/client/src/components/modals/Utility.jsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | const UtilityBillUploadModal = ({ open, setOpen }) => {
 4 |   if (!open) return null;
 5 |   return (
 6 |     <div>
 7 |       <p>Upload Utility Bill</p>
 8 |       <button onClick={() => setOpen(false)}>Close</button>
 9 |     </div>
10 |   );
11 | };
12 |
13 | export default UtilityBillUploadModal;
14 |


--------------------------------------------------------------------------------
/client/src/components/nav-section/NavSection.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import { NavLink as RouterLink } from 'react-router-dom';
 4 | import { StyledNavItem, StyledNavItemIcon } from './styles';
 5 | import { authSelector } from '../../redux/slice/authSlice';
 6 | import { useAppSelector } from '../../hooks/hooks';
 7 |
 8 | NavSection.propTypes = {
 9 |   data: PropTypes.array
10 | };
11 | export default function NavSection({ data = [], ...other }) {
12 |   const { data: loginData } = useAppSelector(authSelector);
13 |   return (
14 |     <Box {...other}>
15 |       <List disablePadding sx={{ p: 1 }}>
16 |         {data.map((item) => {
17 |           if (item.isSuperAdmin && !loginData?.isSuperAdmin) return null;
18 |           return <NavItem key={item.title} item={item} />;
19 |         })}
20 |       </List>
21 |     </Box>
22 |   );
23 | }
24 | NavItem.propTypes = {
25 |   item: PropTypes.object
26 | function NavItem({ item }) {
27 |   const { title, path, icon, info } = item;
28 |     <StyledNavItem
29 |       component={RouterLink}
30 |       to={path}
31 |       sx={{
32 |         '&.active': {
33 |           color: 'text.primary',
34 |           bgcolor: 'action.selected',
35 |           fontWeight: 'fontWeightBold'
36 |         }
37 |       }}
38 |     >
39 |       <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
40 |       <ListItemText disableTypography primary={title} />
41 |       {info && info}
42 |     </StyledNavItem>
43 |


--------------------------------------------------------------------------------
/client/src/components/nav-section/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './NavSection';
2 |


--------------------------------------------------------------------------------
/client/src/components/nav-section/styles.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | // @mui
 3 |
 4 | // ----------------------------------------------------------------------
 5 | export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
 6 |   ...theme.typography.body2,
 7 |   height: 48,
 8 |   position: 'relative',
 9 |   textTransform: 'capitalize',
10 |   color: theme.palette.text.secondary,
11 |   borderRadius: theme.shape.borderRadius,
12 | }));
13 | export const StyledNavItemIcon = styled(ListItemIcon)({
14 |   width: 22,
15 |   height: 22,
16 |   color: 'inherit',
17 |   display: 'flex',
18 |   alignItems: 'center',
19 |   justifyContent: 'center',
20 | });
21 |


--------------------------------------------------------------------------------
/client/src/components/planner-form/PlannerForm.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface PlannerFormProps {
 4 |   state: Record<string, any>;
 5 |   categories?: any[];
 6 |   getFormData?: ({ name, value }: { name: string; value: any }) => void;
 7 |   error?: Record<string, string>;
 8 | }
 9 |
10 | const PlannerForm: React.FC<PlannerFormProps> = ({ children }) => {
11 |   return <div>{children}</div>;
12 | };
13 |
14 | export default PlannerForm;
15 |


--------------------------------------------------------------------------------
/client/src/components/scroll-to-top/ScrollToTop.js:
--------------------------------------------------------------------------------
 1 | import { useEffect } from 'react';
 2 | import { useLocation } from 'react-router-dom';
 3 |
 4 | // ----------------------------------------------------------------------
 5 |
 6 | export default function ScrollToTop() {
 7 |   const { pathname } = useLocation();
 8 |
 9 |   useEffect(() => {
10 |     window.scrollTo(0, 0);
11 |   }, [pathname]);
12 |
13 |   return null;
14 | }
15 |


--------------------------------------------------------------------------------
/client/src/components/scroll-to-top/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './ScrollToTop';
2 |


--------------------------------------------------------------------------------
/client/src/components/scrollbar/Scrollbar.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import { memo } from 'react';
 4 | // @mui
 5 | //
 6 | import { StyledRootScrollbar, StyledScrollbar } from './styles';
 7 |
 8 | // ----------------------------------------------------------------------
 9 | Scrollbar.propTypes = {
10 |   sx: PropTypes.object,
11 |   children: PropTypes.node,
12 | };
13 | function Scrollbar({ children, sx, ...other }) {
14 |   const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
15 |   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
16 |   if (isMobile) {
17 |     return (
18 |       <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
19 |         {children}
20 |       </Box>
21 |     );
22 |   }
23 |   return (
24 |     <StyledRootScrollbar>
25 |       <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
26 |       </StyledScrollbar>
27 |     </StyledRootScrollbar>
28 |   );
29 | }
30 | export default memo(Scrollbar);
31 |


--------------------------------------------------------------------------------
/client/src/components/scrollbar/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './Scrollbar';
2 |


--------------------------------------------------------------------------------
/client/src/components/scrollbar/styles.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import SimpleBar from 'simplebar-react';
 3 | // @mui
 4 |
 5 | // ----------------------------------------------------------------------
 6 | export const StyledRootScrollbar = styled('div')(() => ({
 7 |   flexGrow: 1,
 8 |   height: '100%',
 9 |   overflow: 'hidden',
10 | }));
11 | export const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
12 |   maxHeight: '100%',
13 |   '& .simplebar-scrollbar': {
14 |     '&:before': {
15 |       backgroundColor: alpha(theme.palette.grey[600], 0.48),
16 |     },
17 |     '&.simplebar-visible:before': {
18 |       opacity: 1,
19 |   },
20 |   '& .simplebar-track.simplebar-vertical': {
21 |     width: 10,
22 |   '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
23 |     height: 6,
24 |   '& .simplebar-mask': {
25 |     zIndex: 'inherit',
26 |


--------------------------------------------------------------------------------
/client/src/components/svg-color/SvgColor.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import { forwardRef } from 'react';
 4 | // @mui
 5 |
 6 | // ----------------------------------------------------------------------
 7 | const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
 8 |   <Box
 9 |     component="span"
10 |     className="svg-color"
11 |     ref={ref}
12 |     sx={{
13 |       width: 24,
14 |       height: 24,
15 |       display: 'inline-block',
16 |       bgcolor: 'currentColor',
17 |       mask: `url(${src}) no-repeat center / contain`,
18 |       WebkitMask: `url(${src}) no-repeat center / contain`,
19 |       ...sx,
20 |     }}
21 |     {...other}
22 |   />
23 | ));
24 | SvgColor.propTypes = {
25 |   src: PropTypes.string,
26 |   sx: PropTypes.object,
27 | };
28 | export default SvgColor;
29 |


--------------------------------------------------------------------------------
/client/src/components/svg-color/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './SvgColor';
2 |


--------------------------------------------------------------------------------
/client/src/components/upload-file/CsvUpload.tsx:
--------------------------------------------------------------------------------
 1 | import React, { useState } from 'react';
 2 |
 3 | import Papa from 'papaparse';
 4 |
 5 | // const CsvUpload = (props) => {
 6 | interface CsvUploadProps {
 7 |   handleCsvData: (data: any) => void;
 8 | }
 9 |
10 | function CsvUpload({ handleCsvData }: CsvUploadProps) {
11 |   const [data, setData] = useState(null);
12 |   const [loading, setLoading] = useState(false);
13 |
14 |   const [formData, setFormData] = useState({
15 |     firstName: '',
16 |     lastName: '',
17 |     email: '',
18 |     phone: ''
19 |   });
20 |
21 |   const handleChange = (event) => {
22 |     setFormData({
23 |       ...formData,
24 |       [event.target.name]: event.target.value
25 |     });
26 |   };
27 |
28 |   const handleLeadSubmit = (e) => {
29 |     e.preventDefault();
30 |   };
31 |
32 |   const handleFileUpload = (event) => {
33 |     //  alert('File uploaded!');
34 |     const file = event.target.files[0];
35 |     setLoading(true);
36 |     Papa.parse(file, {
37 |       header: true,
38 |       complete: (results) => {
39 |         setData(results.data);
40 |         setLoading(false);
41 |         handleCsvData(results.data);
42 |       }
43 |     });
44 |   };
45 |
46 |   const handleUpload = () => {
47 |     setLoading(true);
48 |
49 |     // Check Uploaded EALERTS
50 |
51 |     data.forEach((lead) => {
52 |     });
53 |     alert('File uploaded!');
54 |
55 |     setLoading(false);
56 |   };
57 |
58 |   return (
59 |     <div>
60 |       <input type="file" onChange={handleFileUpload} />
61 |       {loading && <p>Loading...</p>}
62 |       {data && <button onClick={handleFileUpload}>Upload</button>}
63 |     </div>
64 |   );
65 | }
66 |
67 | export default CsvUpload;
68 |


--------------------------------------------------------------------------------
/client/src/constants/styles.js:
--------------------------------------------------------------------------------
 1 | export const gridStyles = {
 2 |     root: {
 3 |       '& .MuiDataGrid-root': {
 4 |         backgroundColor: '#fff',
 5 |         border: '1px solid #ddd',
 6 |       },
 7 |       '& .MuiDataGrid-columnsContainer': {
 8 |         backgroundColor: '#f5f5f5',
 9 |         borderBottom: '1px solid #ddd',
10 |       },
11 |       '& .MuiDataGrid-columnHeader': {
12 |         fontWeight: 'bold',
13 |         color: '#333',
14 |       },
15 |       '& .MuiDataGrid-cell': {
16 |         borderBottom: '1px solid rgba(224, 224, 224, 1)',
17 |       },
18 |       '& .MuiDataGrid-cell:nth-of-type(even)': {
19 |         backgroundColor: 'rgba(0, 0, 0, 0.04)',
20 |       },
21 |       '& .MuiDataGrid-cell:last-child': {
22 |         borderRight: 'none',
23 |       },
24 |       '& .MuiDataGrid-cellEditable': {
25 |         backgroundColor: '#fff',
26 |         '& input': {
27 |           color: '#333',
28 |         },
29 |       },
30 |       '& .MuiDataGrid-cell--textLeft': {
31 |         textAlign: 'left',
32 |       },
33 |       '& .MuiDataGrid-cell--textCenter': {
34 |         textAlign: 'center',
35 |       },
36 |       '& .MuiDataGrid-cell--textRight': {
37 |         textAlign: 'right',
38 |       },
39 |     },
40 |    };
41 |
42 |
43 |


--------------------------------------------------------------------------------
/client/src/hooks/hooks.ts:
--------------------------------------------------------------------------------
1 | import { useDispatch, useSelector } from 'react-redux';
2 | import type { TypedUseSelectorHook } from 'react-redux';
3 | import type { RootState, AppDispatch } from '../redux/store';
4 |
5 | // Use throughout your app instead of plain `useDispatch` and `useSelector`
6 | export const useAppDispatch: () => AppDispatch = useDispatch;
7 | export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
8 |


--------------------------------------------------------------------------------
/client/src/hooks/useResponsive.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | // @mui
 3 |
 4 | // ----------------------------------------------------------------------
 5 | export default function useResponsive(query, start, end) {
 6 |   const theme = useTheme();
 7 |   const mediaUp = useMediaQuery(theme.breakpoints.up(start));
 8 |   const mediaDown = useMediaQuery(theme.breakpoints.down(start));
 9 |   const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));
10 |   const mediaOnly = useMediaQuery(theme.breakpoints.only(start));
11 |   if (query === 'up') {
12 |     return mediaUp;
13 |   }
14 |   if (query === 'down') {
15 |     return mediaDown;
16 |   if (query === 'between') {
17 |     return mediaBetween;
18 |   return mediaOnly;
19 | }
20 | export function useWidth() {
21 |   const keys = [...theme.breakpoints.keys].reverse();
22 |   return (
23 |     keys.reduce((output, key) => {
24 |       // eslint-disable-next-line react-hooks/rules-of-hooks
25 |       const matches = useMediaQuery(theme.breakpoints.up(key));
26 |       return !output && matches ? key : output;
27 |     }, null) || 'xs'
28 |   );
29 |


--------------------------------------------------------------------------------
/client/src/layouts/AuthenticationLayout.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface AuthLayoutProps {
 4 |   title: string;
 5 |   link?: { text: string; to: string };
 6 |   children: React.ReactNode;
 7 | }
 8 |
 9 | const AuthenticationLayout: React.FC<AuthLayoutProps> = ({ title, link, children }) => {
10 |   return (
11 |     <div>
12 |       <h2>{title}</h2>
13 |       {link && <a href={link.to}>{link.text}</a>}
14 |       <div>{children}</div>
15 |     </div>
16 |   );
17 | };
18 |
19 | export default AuthenticationLayout;
20 |


--------------------------------------------------------------------------------
/client/src/layouts/dashboard/DashboardLayout.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import { useState } from 'react';
 3 | import { Outlet } from 'react-router-dom';
 4 | // @mui
 5 |
 6 | import Header from './header';
 7 | import Nav from './nav';
 8 | // ----------------------------------------------------------------------
 9 | const APP_BAR_MOBILE = 64;
10 | const APP_BAR_DESKTOP = 92;
11 | const StyledRoot = styled('div')({
12 |   display: 'flex',
13 |   minHeight: '100%',
14 |   overflow: 'hidden',
15 | });
16 | const Main = styled('div')(({ theme }) => ({
17 |   flexGrow: 1,
18 |   overflow: 'auto',
19 |   backgroundColor: '#D2C5B4',
20 |   color: 'white',
21 |   paddingTop: APP_BAR_MOBILE + 24,
22 |   paddingBottom: theme.spacing(10),
23 |   [theme.breakpoints.up('lg')]: {
24 |     paddingTop: APP_BAR_DESKTOP + 24,
25 |     paddingLeft: theme.spacing(2),
26 |     paddingRight: theme.spacing(2),
27 |   },
28 | }));
29 | export default function DashboardLayout() {
30 |   const [open, setOpen] = useState(false);
31 |   return (
32 |     <StyledRoot>
33 |       <Header onOpenNav={() => setOpen(true)} />
34 |       <Nav openNav={open} onCloseNav={() => setOpen(false)} />
35 |       <Main>
36 |         <Outlet />
37 |       </Main>
38 |     </StyledRoot>
39 |   );
40 | }
41 |


--------------------------------------------------------------------------------
/client/src/layouts/dashboard/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './DashboardLayout';
2 |


--------------------------------------------------------------------------------
/client/src/layouts/dashboard/nav/AdminConfig.js:
--------------------------------------------------------------------------------
 1 | // component
 2 | import SvgColor from '../../../components/svg-color';
 3 |
 4 | // ----------------------------------------------------------------------
 5 |
 6 | const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
 7 |
 8 | const AdminConfig = [
 9 |   {
10 |     title: 'Dashboard',
11 |     path: '/dashboard/app',
12 |     icon: icon('ic_homet')
13 |   },
14 |
15 |   {
16 |     title: 'Projects',
17 |     path: '/dashboard/deals',
18 |     icon: icon('ic_cart')
19 |   },
20 |
21 |   {
22 |     title: 'Pay',
23 |     path: '/dashboard/pay',
24 |     icon: icon('ic_user')
25 |   },
26 |   // {
27 |   //   title: 'Users',
28 |   //   path: '/dashboard/user',
29 |   //   icon: icon('ic_user')
30 |   // },
31 |   {
32 |     title: 'Resources',
33 |     path: '/dashboard/blog',
34 |     icon: icon('ic_blog')
35 |   },
36 |
37 |   {
38 |     title: 'Rookies',
39 |     path: '/dashboard/Q',
40 |     icon: icon('ic_cart')
41 |   },
42 |   // {
43 |   //   title: 'Listings',
44 |   //   path: '/dashboard/products',
45 |   //   icon: icon('ic_cart')
46 |   // },
47 |   // {
48 |   //   title: 'blog',
49 |   //   path: '/dashboard/blog',
50 |   //   icon: icon('ic_blog')
51 |   // },
52 |   // {
53 |   //   title: 'login',
54 |   //   path: '/login',
55 |   //   icon: icon('ic_lock')
56 |   // },
57 |   // {
58 |   //   title: 'Leads',
59 |   //   path: '/dashboard/leads',
60 |   //   icon: icon('ic_blog')
61 |   // },
62 |   // {
63 |   //   title: 'Dynamic-Leads',
64 |   //   path: '/dashboard/dynamic-leads',
65 |   //   icon: icon('ic_analytics')
66 |   // },
67 |   // {
68 |   //   title: 'Not found',
69 |   //   path: '/404',
70 |   //   icon: icon('ic_disabled')
71 |   // }
72 | ];
73 |
74 | export default AdminConfig;
75 |


--------------------------------------------------------------------------------
/client/src/layouts/simple/SimpleLayout.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import { Outlet } from 'react-router-dom';
 3 | // @mui
 4 | // components
 5 | import Logo from '../../components/logo';
 6 |
 7 | // ----------------------------------------------------------------------
 8 | const StyledHeader = styled('header')(({ theme }) => ({
 9 |   top: 0,
10 |   left: 0,
11 |   lineHeight: 0,
12 |   width: '100%',
13 |   position: 'absolute',
14 |   padding: theme.spacing(3, 3, 0),
15 |   [theme.breakpoints.up('sm')]: {
16 |     padding: theme.spacing(5, 5, 0),
17 |   },
18 | }));
19 | export default function SimpleLayout() {
20 |   return (
21 |     <>
22 |       <StyledHeader>
23 |         {/* <Logo /> */}
24 |         <Box sx={{ px: 2.5, py: 3, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
25 |     <img
26 |       src={`${process.env.PUBLIC_URL}/assets/images/iconImages/logo.png`}
27 |       alt="Voltaic CRM Logo"
28 |       style={{
29 |         maxWidth: '150px',
30 |         maxHeight: '150px',
31 |         width: 'auto',
32 |         height: 'auto',
33 |         objectFit: 'contain'
34 |       }}
35 |     />
36 |   </Box>
37 |       </StyledHeader>
38 |       <Outlet />
39 |     </>
40 |   );
41 | }
42 |


--------------------------------------------------------------------------------
/client/src/layouts/simple/index.js:
--------------------------------------------------------------------------------
1 | export { default } from './SimpleLayout';
2 |


--------------------------------------------------------------------------------
/client/src/libs/client/apiClient.ts:
--------------------------------------------------------------------------------
 1 | import axios from 'axios';
 2 | import { urls } from '../../apiConfig';
 3 |
 4 | const env = process.env.REACT_APP_STAGE || 'production';
 5 | export const baseURL = urls[env] || 'https://voltaiccrm-7dd827fb5012.herokuapp.com'
 6 |
 7 |
 8 | //https://vccrm-473bc49906bc.herokuapp.com/rest
 9 | //'https://recrm-dd33eadabf10.herokuapp.com/
10 | const apiClient = axios.create({
11 |   baseURL: baseURL,
12 |   timeout: 30000,
13 |   withCredentials: true
14 |   // headers: {
15 |   //   'Content-Type': 'application/json',
16 |   //   Authorization: authToken
17 |   // }
18 | });
19 |
20 | // Request interceptor
21 | apiClient.interceptors.request.use(
22 |   (config) => {
23 |     // Modify the request config here (e.g., add headers, authentication tokens)
24 |     const accessToken = localStorage.getItem('authToken');
25 |
26 |     // ** If token is present add it to request's Authorization Header
27 |     if (accessToken) {
28 |       if (config.headers) config.headers.Authorization = accessToken;
29 |     }
30 |     return config;
31 |   },
32 |   (error) => {
33 |     // Handle request errors here
34 |
35 |     return Promise.reject(error);
36 |   }
37 | );
38 |
39 | export const { get, post, put, delete: destroy } = apiClient;
40 | export default apiClient;
41 |


--------------------------------------------------------------------------------
/client/src/pages/AvailabilityPlanner.tsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const AvailabilityPlanner: React.FC = () => {
4 |   return <div>Availability Planner</div>;
5 | };
6 |
7 | export default AvailabilityPlanner;
8 |


--------------------------------------------------------------------------------
/client/src/pages/BlogPage.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import { Helmet } from 'react-helmet-async';
 3 | // @mui
 4 | // components
 5 | import Iconify from '../components/iconify';
 6 | import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
 7 | // mock
 8 | import POSTS from '../_mock/blog';
 9 |
10 | // ----------------------------------------------------------------------
11 | const SORT_OPTIONS = [
12 |   { value: 'latest', label: 'Latest' },
13 |   { value: 'popular', label: 'Popular' },
14 |   { value: 'oldest', label: 'Oldest' }
15 | ];
16 | export default function BlogPage() {
17 |   return (
18 |     <>
19 |       <Helmet>
20 |         <title> Dashboard </title>
21 |       </Helmet>
22 |       <Container>
23 |         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
24 |           <Typography variant="h4" gutterBottom>
25 |             Resources
26 |           </Typography>
27 |           {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
28 |             New Lead
29 |           </Button> */}
30 |         </Stack>
31 |         {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
32 |           <BlogPostsSearch posts={POSTS} />
33 |           <BlogPostsSort options={SORT_OPTIONS} />
34 |         </Stack> */}
35 |         <Grid container spacing={3}>
36 |           {POSTS.map((post, index) => (
37 |             <BlogPostCard key={post.id} post={post} index={index} link={post.link} />
38 |           ))}
39 |         </Grid>
40 |       </Container>
41 |     </>
42 |   );
43 | }
44 |


--------------------------------------------------------------------------------
/client/src/pages/CompleteRegistration.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import AuthenticationLayout from '../layouts/AuthenticationLayout';
 3 |
 4 | const CompleteRegistration: React.FC = () => {
 5 |   return (
 6 |     <AuthenticationLayout title="Complete Registration" link={{ text: 'Login', to: '/login' }}>
 7 |       <div>Complete Registration</div>
 8 |     </AuthenticationLayout>
 9 |   );
10 | };
11 |
12 | export default CompleteRegistration;
13 |


--------------------------------------------------------------------------------
/client/src/pages/DealerRates.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | export default function DealerRates() {
4 |   return <div>Dealer Rates</div>;
5 | }
6 |


--------------------------------------------------------------------------------
/client/src/pages/DynamicLead.tsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const DynamicLead: React.FC = () => {
4 |   return <div>Dynamic Lead</div>;
5 | };
6 |
7 | export default DynamicLead;
8 |


--------------------------------------------------------------------------------
/client/src/pages/Exam.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | export default function Exam() {
4 |   return <div>Exam Page</div>;
5 | }
6 |


--------------------------------------------------------------------------------
/client/src/pages/LeadDetailPage.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | export default function LeadDetailPage() {
4 |   return <div>Lead Detail Page</div>;
5 | }
6 |


--------------------------------------------------------------------------------
/client/src/pages/Leads.tsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const Leads: React.FC = () => {
4 |   return <div>Leads Page</div>;
5 | };
6 |
7 | export default Leads;
8 |


--------------------------------------------------------------------------------
/client/src/pages/LoginPage.tsx:
--------------------------------------------------------------------------------
 1 | import React, { useState } from 'react';
 2 | import AuthenticationLayout from '../layouts/AuthenticationLayout';
 3 |
 4 | const LoginPage: React.FC = () => {
 5 |   const [email, setEmail] = useState('');
 6 |   const [password, setPassword] = useState('');
 7 |
 8 |   const handleSubmit = (e: React.FormEvent) => {
 9 |     e.preventDefault();
10 |     // placeholder
11 |   };
12 |
13 |   return (
14 |     <AuthenticationLayout title="Login" link={{ text: 'Register', to: '/register' }}>
15 |       <form onSubmit={handleSubmit}>
16 |         <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
17 |         <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
18 |         <button type="submit">Login</button>
19 |       </form>
20 |     </AuthenticationLayout>
21 |   );
22 | };
23 |
24 | export default LoginPage;
25 |


--------------------------------------------------------------------------------
/client/src/pages/NewSales.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import * as React from 'react';
 3 | import { Helmet } from 'react-helmet-async';
 4 | import PayrollData from '../components/dataGrid/PayrollData';
 5 | import NewSalelData from '../components/dataGrid/NewSaleData'
 6 | import LeadGenPay from '../components/dataGrid/LeadGenPay';
 7 | import { useAppSelector } from '../hooks/hooks';
 8 | import { authSelector } from '../redux/slice/authSlice';
 9 | import { Fragment } from 'react';
10 |
11 | export default function NewSalePage() {
12 |   const { data } = useAppSelector(authSelector);
13 |   const recordId = data?.recordID;
14 |   return (
15 |     <Fragment>
16 |       <Helmet>
17 |         <title>New Sales</title>
18 |       </Helmet>
19 |       <Container>
20 |         <h2>New Sales </h2>
21 |         <Card sx={{ p: '1rem' }}>
22 |           <NewSalelData recordUserId={recordId} />
23 |         </Card>
24 |
25 |         {/* <h1>Lead generation Commissions</h1>
26 |           <LeadGenPay recordUserId={recordId} /> */}
27 |       </Container>
28 |     </Fragment>
29 |   );
30 | }
31 |


--------------------------------------------------------------------------------
/client/src/pages/NonVerified.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import { Helmet } from 'react-helmet-async';
 3 | import { Link as RouterLink } from 'react-router-dom';
 4 | // @mui
 5 |
 6 | // ----------------------------------------------------------------------
 7 | const StyledContent = styled('div')(({ theme }) => ({
 8 |   maxWidth: 480,
 9 |   margin: 'auto',
10 |   minHeight: '100vh',
11 |   display: 'flex',
12 |   justifyContent: 'center',
13 |   flexDirection: 'column',
14 |   padding: theme.spacing(12, 0),
15 | }));
16 | export default function NonVerifiedPage() {
17 |   return (
18 |     <>
19 |       <Helmet>
20 |         <title> Verify | VC - CRM </title>
21 |       </Helmet>
22 |       <Container>
23 |         <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
24 |           <Typography variant="h3" paragraph>
25 |             Please verify your email
26 |           </Typography>
27 |           <Typography sx={{ color: 'text.secondary' }}>
28 |             We appreciate your cooperation in verifying your email address. Please click the button below to verify your email address.
29 |           <Box
30 |             component="img"
31 |             src="/assets/Images/iconImages/emailVerify.png"
32 |             sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
33 |           />
34 |           {/* <Button to="/" size="large" variant="contained" component={RouterLink}>
35 |             Verify
36 |           </Button> */}
37 |         </StyledContent>
38 |       </Container>
39 |     </>
40 |   );
41 | }
42 |


--------------------------------------------------------------------------------
/client/src/pages/Page404.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import { Helmet } from 'react-helmet-async';
 3 | import { Link as RouterLink } from 'react-router-dom';
 4 | // @mui
 5 |
 6 | // ----------------------------------------------------------------------
 7 | const StyledContent = styled('div')(({ theme }) => ({
 8 |   maxWidth: 480,
 9 |   margin: 'auto',
10 |   minHeight: '100vh',
11 |   display: 'flex',
12 |   justifyContent: 'center',
13 |   flexDirection: 'column',
14 |   padding: theme.spacing(12, 0),
15 | }));
16 | export default function Page404() {
17 |   return (
18 |     <>
19 |       <Helmet>
20 |         <title> 404 Page Not Found | Minimal UI </title>
21 |       </Helmet>
22 |       <Container>
23 |         <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
24 |           <Typography variant="h3" paragraph>
25 |             Sorry, page not found!
26 |           </Typography>
27 |           <Typography sx={{ color: 'text.secondary' }}>
28 |             Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
29 |             spelling.
30 |           <Box
31 |             component="img"
32 |             src="/assets/illustrations/illustration_404.svg"
33 |             sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
34 |           />
35 |           <Button to="/" size="large" variant="contained" component={RouterLink}>
36 |             Go to Home
37 |           </Button>
38 |         </StyledContent>
39 |       </Container>
40 |     </>
41 |   );
42 | }
43 |


--------------------------------------------------------------------------------
/client/src/pages/Planner.tsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const Planner: React.FC = () => {
4 |   return <div>Planner</div>;
5 | };
6 |
7 | export default Planner;
8 |


--------------------------------------------------------------------------------
/client/src/pages/ProductsPage.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import { Helmet } from 'react-helmet-async';
 3 | import { useState } from 'react';
 4 | // @mui
 5 | // components
 6 | import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
 7 | // mock
 8 | import PRODUCTS from '../_mock/products';
 9 |
10 | // ----------------------------------------------------------------------
11 | export default function ProductsPage() {
12 |   const [openFilter, setOpenFilter] = useState(false);
13 |   const handleOpenFilter = () => {
14 |     setOpenFilter(true);
15 |   };
16 |   const handleCloseFilter = () => {
17 |     setOpenFilter(false);
18 |   return (
19 |     <>
20 |       <Helmet>
21 |         <title> Dashboard: Products | Minimal UI </title>
22 |       </Helmet>
23 |       <Container>
24 |         <Typography variant="h4" sx={{ mb: 5 }}>
25 |           Products
26 |         </Typography>
27 |         <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
28 |           <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
29 |             <ProductFilterSidebar
30 |               openFilter={openFilter}
31 |               onOpenFilter={handleOpenFilter}
32 |               onCloseFilter={handleCloseFilter}
33 |             />
34 |             <ProductSort />
35 |           </Stack>
36 |         </Stack>
37 |         <ProductList products={PRODUCTS} />
38 |         <ProductCartWidget />
39 |       </Container>
40 |     </>
41 |   );
42 | }
43 |


--------------------------------------------------------------------------------
/client/src/pages/RegisterPage.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import AuthenticationLayout from '../layouts/AuthenticationLayout';
 3 |
 4 | const RegisterPage: React.FC = () => {
 5 |   return (
 6 |     <AuthenticationLayout title="Register" link={{ text: 'Login', to: '/login' }}>
 7 |       <div>Register Form</div>
 8 |     </AuthenticationLayout>
 9 |   );
10 | };
11 |
12 | export default RegisterPage;
13 |


--------------------------------------------------------------------------------
/client/src/pages/ResetPassword.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import AuthenticationLayout from '../layouts/AuthenticationLayout';
 3 |
 4 | const ResetPasswordPage: React.FC = () => {
 5 |   return (
 6 |     <AuthenticationLayout title="Reset Password" link={{ text: 'Login', to: '/login' }}>
 7 |       <div>Reset Password</div>
 8 |     </AuthenticationLayout>
 9 |   );
10 | };
11 |
12 | export default ResetPasswordPage;
13 |


--------------------------------------------------------------------------------
/client/src/pages/Rookies.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import * as React from 'react';
 3 | import { Helmet } from 'react-helmet-async';
 4 |
 5 | import RookieData from '../components/dataGrid/RookiesData';
 6 | import RookieDataLead from '../components/dataGrid/RookieLeadgens';
 7 | import { useAppSelector } from '../hooks/hooks';
 8 | import { authSelector } from '../redux/slice/authSlice';
 9 | import DealsDataLeadgen from '../components/dataGrid/DealsDataLeadgen';
10 | export default function Rookies() {
11 |
12 |   const { data } = useAppSelector(authSelector);
13 |   const recordId = data?.recordID;
14 |   return (
15 |     <Box
16 |       sx={{
17 |         height: '100vh',
18 |         display: 'flex',
19 |         flexDirection: 'column',
20 |         justifyContent: 'center',
21 |         alignContent: 'center',
22 |         backgroundColor: 'rgba(145, 158, 171, 0.16)',
23 |        width: '100%',
24 |         overflow: 'auto',
25 |         overflowX: 'hidden'
26 |       }}
27 |     >
28 |       <Helmet>
29 |         <title> Deals </title>
30 |       </Helmet>
31 |       <Box
32 |         sx={{
33 |           width: '100vw',
34 |           paddingX: {
35 |             md: '40px',
36 |             xs: '2px',
37 |           },
38 |
39 |         }}
40 |       >
41 |      <Box sx={{width: '100%', height: 'fit-content', overflow: 'auto', paddingTop: '1em', paddingLeft: '1em'}}>
42 |
43 |           {/* <DataGridProCSV /> */}
44 |           <h4>Rookie Sales Deals</h4>
45 |           <RookieData recordUserId={recordId}/>
46 |           <h4>Rookie Leadgen Deals</h4>
47 |           <RookieDataLead recordUserId={recordId}/>
48 |         </Box>
49 |       </Box>
50 |     </Box>
51 |   );
52 | }
53 |


--------------------------------------------------------------------------------
/client/src/pages/UserPage.tsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | const UserPage: React.FC = () => {
4 |   return <div>User Page</div>;
5 | };
6 |
7 | export default UserPage;
8 |


--------------------------------------------------------------------------------
/client/src/pages/UtilitySign.jsx:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 |
3 | export default function UtilitySign() {
4 |   return <div>Utility Sign</div>;
5 | }
6 |


--------------------------------------------------------------------------------
/client/src/pages/VerifyEmail.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import AuthenticationLayout from '../layouts/AuthenticationLayout';
 3 |
 4 | const VerifyEmail: React.FC = () => {
 5 |   return (
 6 |     <AuthenticationLayout title="Verify Email">
 7 |       <div>Verify Email</div>
 8 |     </AuthenticationLayout>
 9 |   );
10 | };
11 |
12 | export default VerifyEmail;
13 |


--------------------------------------------------------------------------------
/client/src/pages/VerifyPage.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import { Helmet } from 'react-helmet-async';
 3 | import { Link as RouterLink } from 'react-router-dom';
 4 | // @mui
 5 |
 6 | // ----------------------------------------------------------------------
 7 | const StyledContent = styled('div')(({ theme }) => ({
 8 |   maxWidth: 480,
 9 |   margin: 'auto',
10 |   minHeight: '100vh',
11 |   display: 'flex',
12 |   justifyContent: 'center',
13 |   flexDirection: 'column',
14 |   padding: theme.spacing(12, 0),
15 | }));
16 | export default function VerifyPage() {
17 |   return (
18 |     <>
19 |       <Helmet>
20 |         <title> Verify | VC - CRM </title>
21 |       </Helmet>
22 |       <Container>
23 |         <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
24 |           <Typography variant="h3" paragraph>
25 |             Please verify your email
26 |           </Typography>
27 |           <Typography sx={{ color: 'text.secondary' }}>
28 |             We appreciate your cooperation in verifying your email address. Please click the button below to verify your email address.
29 |           <Box
30 |             component="img"
31 |             src="/assets/Images/covers/cover_3.jpg"
32 |             sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
33 |           />
34 |           <Button to="/" size="large" variant="contained" component={RouterLink}>
35 |             Verify
36 |           </Button>
37 |         </StyledContent>
38 |       </Container>
39 |     </>
40 |   );
41 | }
42 |


--------------------------------------------------------------------------------
/client/src/redux/middleware/admin.ts:
--------------------------------------------------------------------------------
 1 | import { createAsyncThunk } from '@reduxjs/toolkit';
 2 | import { get, put } from '../../libs/client/apiClient';
 3 | import { setAlert } from '../slice/alertSlice';
 4 |
 5 | const getUsers = createAsyncThunk('users/get', async ({ signal }: { signal: AbortSignal }, { dispatch }) => {
 6 |   try {
 7 |     const { data } = await get('/admin', { signal });
 8 |     return data.data;
 9 |   } catch (error) {
10 |     const { message } = error.response.data;
11 |     dispatch(setAlert({ message, type: 'error' }));
12 |     throw error;
13 |   }
14 | });
15 |
16 | const updateAdmin = createAsyncThunk(
17 |   'users/update',
18 |   async ({ id, name, role, isSuperAdmin, docs }: { id: string; name: string; role: string; isSuperAdmin: boolean; docs: string}, { dispatch }) => {
19 |     try {
20 |       const { data } = await put('/admin', { id, name, role, isSuperAdmin, docs });
21 |       dispatch(setAlert({ message: 'User updated successfully', type: 'success' }));
22 |       return data.data;
23 |     } catch (error) {
24 |       const { message } = error.response.data;
25 |       dispatch(setAlert({ message, type: 'error' }));
26 |       throw error;
27 |     }
28 |   }
29 | );
30 |
31 | export { getUsers, updateAdmin };
32 |


--------------------------------------------------------------------------------
/client/src/redux/middleware/availability.ts:
--------------------------------------------------------------------------------
 1 | import { createAsyncThunk } from '@reduxjs/toolkit';
 2 | import { destroy, get, post } from '../../libs/client/apiClient';
 3 | import { AvailabilityDataTypes } from '../../types';
 4 | import { setAlert } from '../slice/alertSlice';
 5 |
 6 | const getAvailability = createAsyncThunk('availability/get', async ({ signal }: { signal: AbortSignal }, { dispatch }) => {
 7 |   try {
 8 |     const { data } = await get('/availability', { signal });
 9 |     return data.data;
10 |   } catch (error) {
11 |     const { message } = error.response.data;
12 |     dispatch(setAlert({ message, type: 'error' }));
13 |     throw error;
14 |   }
15 | });
16 |
17 | const createAvailability = createAsyncThunk(
18 |   'availability/post',
19 |   async ({ availability }: { availability: AvailabilityDataTypes }, { dispatch }) => {
20 |     try {
21 |       const { data } = await post('/availability', availability);
22 |       dispatch(setAlert({ message: 'Unavailability scheduled successfully', type: 'success' }));
23 |       return data.data;
24 |     } catch (error) {
25 |       const { message } = error.response.data;
26 |       dispatch(setAlert({ message, type: 'error' }));
27 |       throw error;
28 |     }
29 |   }
30 | );
31 |
32 | const deleteAvailability = createAsyncThunk('availability/delete', async ({ id }: { id: string }, { dispatch }) => {
33 |   try {
34 |     const { data } = await destroy(`/availability/${id}`);
35 |     dispatch(setAlert({ message: data.data.message, type: 'success' }));
36 |     return data.data;
37 |   } catch (error) {
38 |     const { message } = error.response.data;
39 |     dispatch(setAlert({ message, type: 'error' }));
40 |     throw error;
41 |   }
42 | });
43 |
44 | export { getAvailability, createAvailability, deleteAvailability };
45 |


--------------------------------------------------------------------------------
/client/src/redux/middleware/planner.ts:
--------------------------------------------------------------------------------
 1 | import { createAsyncThunk } from '@reduxjs/toolkit';
 2 | import { get, post } from '../../libs/client/apiClient';
 3 | import { PlannerDataTypes } from '../../types';
 4 | import { setAlert } from '../slice/alertSlice';
 5 |
 6 | const getPlanners = createAsyncThunk('planner/get', async ({ signal }: { signal: AbortSignal }, { dispatch }) => {
 7 |   try {
 8 |     const { data } = await get('/planner', { signal });
 9 |     return data.data;
10 |   } catch (error) {
11 |     const { message } = error.response.data;
12 |     dispatch(setAlert({ message, type: 'error' }));
13 |     throw error;
14 |   }
15 | });
16 |
17 | const createPlanner = createAsyncThunk('planner/create', async ({ planner }: { planner: PlannerDataTypes }, { dispatch }) => {
18 |   try {
19 |     const { data } = await post('/planner', planner);
20 |     dispatch(setAlert({ message: 'Planner created successfully', type: 'success' }));
21 |     return data.data;
22 |   } catch (error) {
23 |     const { message } = error.response.data;
24 |     dispatch(setAlert({ message, type: 'error' }));
25 |     throw error;
26 |   }
27 | });
28 |
29 | export { getPlanners, createPlanner };
30 |


--------------------------------------------------------------------------------
/client/src/redux/middleware/role.ts:
--------------------------------------------------------------------------------
 1 | import { createAsyncThunk } from '@reduxjs/toolkit';
 2 | import { get, post, put, destroy } from '../../libs/client/apiClient';
 3 | import { RoleDataTypes } from '../../types';
 4 | import { setAlert } from '../slice/alertSlice';
 5 |
 6 | const getRoles = createAsyncThunk('role/get', async ({ signal }: { signal: AbortSignal }, {dispatch}) => {
 7 |   try {
 8 |     const { data } = await get('/role', { signal });
 9 |     return data.data;
10 |   } catch (error) {
11 |     const { message } = error.response.data;
12 |       dispatch(setAlert({ message, type: 'error' }));
13 |     throw error;
14 |   }
15 | });
16 |
17 | const createRole = createAsyncThunk('role/create', async ({ role }: { role: string }, {dispatch}) => {
18 |   try {
19 |     const { data } = await post('/role', {name : role});
20 |     dispatch(setAlert({ message: 'Role created successfully', type: 'success' }));
21 |     return data.data;
22 |   } catch (error) {
23 |     const { message } = error.response.data;
24 |       dispatch(setAlert({ message, type: 'error' }));
25 |     throw error;
26 |   }
27 | });
28 |
29 |
30 | export { getRoles, createRole  };
31 |


--------------------------------------------------------------------------------
/client/src/redux/slice/adminSlice.ts:
--------------------------------------------------------------------------------
 1 | import { createSlice } from '@reduxjs/toolkit';
 2 | import { getUsers, updateAdmin } from '../middleware/admin';
 3 |
 4 | const initialState = {
 5 |   loading: false,
 6 |   data: [],
 7 |   error: null
 8 | };
 9 |
10 | const adminSlice = createSlice({
11 |   name: 'adminSlice',
12 |   initialState,
13 |   reducers: {
14 |     getUsers: (state, action) => {
15 |       state.loading = true;
16 |     }
17 |   },
18 |   extraReducers: (builder) => {
19 |     builder.addCase(getUsers.pending, (state) => {
20 |       state.loading = true;
21 |     });
22 |     builder.addCase(getUsers.fulfilled, (state, action) => {
23 |       state.loading = false;
24 |       state.data = action.payload;
25 |     });
26 |     builder.addCase(getUsers.rejected, (state, action) => {
27 |       state.loading = false;
28 |       state.error = action.payload;
29 |     });
30 |
31 |     //update user
32 |     builder.addCase(updateAdmin.pending, (state) => {
33 |       state.loading = true;
34 |     });
35 |     builder.addCase(updateAdmin.fulfilled, (state, action) => {
36 |       state.loading = false;
37 |     });
38 |     builder.addCase(updateAdmin.rejected, (state, action) => {
39 |       state.loading = false;
40 |     });
41 |   }
42 | });
43 |
44 | export default adminSlice.reducer;
45 | export const adminSelector = (state) => state.admin.data;
46 | export const loadingAdmin = (state) => state.admin.loading;
47 |


--------------------------------------------------------------------------------
/client/src/redux/slice/alertSlice.ts:
--------------------------------------------------------------------------------
 1 | import { createSlice } from '@reduxjs/toolkit';
 2 |
 3 | // error slice
 4 | type ErrorState = {
 5 |   message: string;
 6 |   type: 'error' | 'warning' | 'info' | 'success' | null;
 7 |   open: boolean;
 8 | };
 9 | const initialState: ErrorState = {
10 |   message: '',
11 |   type: null,
12 |   open: false
13 | };
14 |
15 | const alertSlice = createSlice({
16 |   name: 'alert',
17 |   initialState,
18 |   reducers: {
19 |     setAlert: (state, action) => {
20 |       state.message = action.payload.message;
21 |       state.type = action.payload.type;
22 |       state.open = true;
23 |     },
24 |     closeAlert: (state) => {
25 |       state.message = '';
26 |       state.open = false;
27 |     }
28 |   }
29 | });
30 |
31 | export const { setAlert, closeAlert } = alertSlice.actions;
32 | export default alertSlice.reducer;
33 |
34 | export const selectAlert = (state: { alert: ErrorState }) => state.alert;
35 |


--------------------------------------------------------------------------------
/client/src/redux/slice/plannerSlice.ts:
--------------------------------------------------------------------------------
 1 | import { createSlice } from '@reduxjs/toolkit';
 2 | import { PlannerResponseTypes } from '../../types';
 3 | import { createPlanner, getPlanners } from '../middleware/planner';
 4 |
 5 | const initialState: { data: PlannerResponseTypes[]; events: { title: string; start: Date; end: Date }[]; loading: boolean; error: any } = {
 6 |   loading: false,
 7 |   data: [],
 8 |   events: [],
 9 |   error: null
10 | };
11 |
12 | const plannerSlice = createSlice({
13 |   name: 'plannerSlice',
14 |   initialState,
15 |   reducers: {},
16 |   extraReducers: (builder) => {
17 |     // Get Planners
18 |     builder.addCase(getPlanners.pending, (state) => {
19 |       state.loading = true;
20 |     });
21 |     builder.addCase(getPlanners.fulfilled, (state, action) => {
22 |       state.data = action.payload;
23 |       state.events = action.payload.items.map((planner) => {
24 |         return {
25 |           title: planner.title,
26 |           start: new Date(planner.startDate),
27 |           end: new Date(Number(planner.timeOfExecution))
28 |         };
29 |       });
30 |     });
31 |     builder.addCase(getPlanners.rejected, (state, action) => {
32 |       state.error = action.error;
33 |     });
34 |
35 |     // Create Planner
36 |     builder.addCase(createPlanner.pending, (state) => {
37 |       state.loading = true;
38 |     });
39 |     builder.addCase(createPlanner.fulfilled, (state, action) => {
40 |       state.data = action.payload;
41 |     });
42 |     builder.addCase(createPlanner.rejected, (state, action) => {
43 |       state.error = action.error;
44 |     });
45 |   }
46 | });
47 |
48 | export default plannerSlice.reducer;
49 | export const plannerSelector = (state) => state.planner;
50 | export const plannerLoading = (state) => state.planner.loading;
51 |


--------------------------------------------------------------------------------
/client/src/redux/slice/roleSlice.ts:
--------------------------------------------------------------------------------
 1 | import { createReducer, createSlice } from '@reduxjs/toolkit';
 2 | import { createRole, getRoles  } from '../middleware/role';
 3 | import { RoleDataTypes } from '../../types';
 4 |
 5 | const initialState = {
 6 |   loading: false,
 7 |   data: [],
 8 |   error: null
 9 | };
10 |
11 | const roleSlice = createSlice({
12 |   name: 'roleSlice',
13 |   initialState,
14 |   reducers: {
15 |     getRoles: (state, action) => {
16 |       state.loading = true;
17 |     },
18 |     createRole: (state, action) => {
19 |       state.loading = true;
20 |     }
21 |   },
22 |   extraReducers: (builder) => {
23 |     builder.addCase(getRoles.pending, (state) => {
24 |       state.loading = true;
25 |     });
26 |     builder.addCase(getRoles.fulfilled, (state, action) => {
27 |       state.data = action.payload;
28 |       state.loading = false;
29 |     });
30 |     builder.addCase(getRoles.rejected, (state, action) => {
31 |       state.error = action.payload;
32 |       state.loading = false;
33 |     });
34 |     //create role
35 |     builder.addCase(createRole.pending, (state) => {
36 |       state.loading = true;
37 |     });
38 |     builder.addCase(createRole.fulfilled, (state, action) => {
39 |       state.data = action.payload;
40 |       state.loading = false;
41 |     });
42 |     builder.addCase(createRole.rejected, (state, action) => {
43 |       state.error = action.payload;
44 |       state.loading = false;
45 |     });
46 |
47 |   }
48 | });
49 |
50 | export default roleSlice.reducer;
51 | export const roleList = (state: { role: { data: RoleDataTypes[] } }) => state.role.data;
52 | export const loadingRole = (state) => state.role.loading;
53 |
54 |


--------------------------------------------------------------------------------
/client/src/redux/store.ts:
--------------------------------------------------------------------------------
 1 | import { combineReducers, configureStore } from '@reduxjs/toolkit';
 2 | import { persistStore, persistReducer } from 'redux-persist';
 3 | import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
 4 | import categorySlice from './slice/categorySlice';
 5 | import leadSlice from './slice/leadSlice';
 6 | import authSlice from './slice/authSlice';
 7 | import adminSlice from './slice/adminSlice';
 8 | import alertSlice from './slice/alertSlice';
 9 | import plannerSlice from './slice/plannerSlice';
10 | import roleSlice from './slice/roleSlice';
11 | import availabilitySlice from './slice/availabilitySlice';
12 |
13 | const rootReducer = combineReducers({
14 |   auth: authSlice,
15 |   admin: adminSlice,
16 |   lead: leadSlice,
17 |   category: categorySlice,
18 |   alert: alertSlice,
19 |   planner: plannerSlice,
20 |   role: roleSlice,
21 |   availability: availabilitySlice
22 | });
23 |
24 | const persistConfig = {
25 |   key: 'root',
26 |   storage,
27 |   // Optionally, you can specify which reducers to persist or blacklist specific reducers
28 |   whitelist: ['auth'],
29 |   blacklist: ['lead', 'category', 'admin', 'error', 'alert', 'planner', 'role']
30 | };
31 |
32 | const persistedReducer = persistReducer(persistConfig, rootReducer);
33 |
34 | export const store = configureStore({
35 |   reducer: persistedReducer
36 | });
37 |
38 | export const persistor = persistStore(store);
39 |
40 | // Infer the `RootState` and `AppDispatch` types from the store itself
41 | export type RootState = ReturnType<typeof store.getState>;
42 | // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
43 | export type AppDispatch = typeof store.dispatch;
44 |


--------------------------------------------------------------------------------
/client/src/reportWebVitals.js:
--------------------------------------------------------------------------------
 1 | const reportWebVitals = (onPerfEntry) => {
 2 |   if (onPerfEntry && onPerfEntry instanceof Function) {
 3 |     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
 4 |       getCLS(onPerfEntry);
 5 |       getFID(onPerfEntry);
 6 |       getFCP(onPerfEntry);
 7 |       getLCP(onPerfEntry);
 8 |       getTTFB(onPerfEntry);
 9 |     });
10 |   }
11 | };
12 |
13 | export default reportWebVitals;
14 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/app/AppConversionRates.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import ReactApexChart from 'react-apexcharts';
 4 | // @mui
 5 | // utils
 6 | import { fNumber } from '../../../utils/formatNumber';
 7 | // components
 8 | import { useChart } from '../../../components/chart';
 9 |
10 | // ----------------------------------------------------------------------
11 | AppConversionRates.propTypes = {
12 |   title: PropTypes.string,
13 |   subheader: PropTypes.string,
14 |   chartData: PropTypes.array.isRequired,
15 | };
16 | export default function AppConversionRates({ title, subheader, chartData, ...other }) {
17 |   const chartLabels = chartData.map((i) => i.label);
18 |   const chartSeries = chartData.map((i) => i.value);
19 |   const chartOptions = useChart({
20 |     tooltip: {
21 |       marker: { show: false },
22 |       y: {
23 |         formatter: (seriesName) => fNumber(seriesName),
24 |         title: {
25 |           formatter: () => '',
26 |         },
27 |       },
28 |     },
29 |     plotOptions: {
30 |       bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
31 |     xaxis: {
32 |       categories: chartLabels,
33 |   });
34 |   return (
35 |     <Card {...other}>
36 |       <CardHeader title={title} subheader={subheader} />
37 |       <Box sx={{ mx: 3 }} dir="ltr">
38 |         <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
39 |       </Box>
40 |     </Card>
41 |   );
42 | }
43 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/app/AppTrafficBySite.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | // @mui
 3 | import PropTypes from 'prop-types';
 4 | // utils
 5 | import { fShortenNumber } from '../../../utils/formatNumber';
 6 |
 7 | // ----------------------------------------------------------------------
 8 | AppTrafficBySite.propTypes = {
 9 |   title: PropTypes.string,
10 |   subheader: PropTypes.string,
11 |   list: PropTypes.array.isRequired,
12 | };
13 | export default function AppTrafficBySite({ title, subheader, list, ...other }) {
14 |   return (
15 |     <Card {...other}>
16 |       <CardHeader title={title} subheader={subheader} />
17 |       <CardContent>
18 |         <Box
19 |           sx={{
20 |             display: 'grid',
21 |             gap: 2,
22 |             gridTemplateColumns: 'repeat(2, 1fr)',
23 |           }}
24 |         >
25 |           {list.map((site) => (
26 |             <Paper key={site.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
27 |               <Box sx={{ mb: 0.5 }}>{site.icon}</Box>
28 |               <Typography variant="h6">{fShortenNumber(site.value)}</Typography>
29 |               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
30 |                 {site.name}
31 |               </Typography>
32 |             </Paper>
33 |           ))}
34 |         </Box>
35 |       </CardContent>
36 |     </Card>
37 |   );
38 | }
39 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/app/AppWebsiteVisits.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | import ReactApexChart from 'react-apexcharts';
 4 | // @mui
 5 | // components
 6 | import { useChart } from '../../../components/chart';
 7 |
 8 | // ----------------------------------------------------------------------
 9 | AppWebsiteVisits.propTypes = {
10 |   title: PropTypes.string,
11 |   subheader: PropTypes.string,
12 |   chartData: PropTypes.array.isRequired,
13 |   chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
14 | };
15 | export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
16 |   const chartOptions = useChart({
17 |     plotOptions: { bar: { columnWidth: '16%' } },
18 |     fill: { type: chartData.map((i) => i.fill) },
19 |     labels: chartLabels,
20 |     xaxis: { type: 'datetime' },
21 |     tooltip: {
22 |       shared: true,
23 |       intersect: false,
24 |       y: {
25 |         formatter: (y) => {
26 |           if (typeof y !== 'undefined') {
27 |             return `${y.toFixed(0)} deals`;
28 |           }
29 |           return y;
30 |         },
31 |       },
32 |     },
33 |   });
34 |   return (
35 |     <Card {...other}>
36 |       <CardHeader title={title} subheader={subheader} />
37 |       <Box sx={{ p: 3, pb: 1 }} dir="ltr">
38 |         <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
39 |       </Box>
40 |     </Card>
41 |   );
42 | }
43 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/app/AppWidgetSummary.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | // @mui
 3 | import PropTypes from 'prop-types';
 4 | // utils
 5 | import { fShortenNumber } from '../../../utils/formatNumber';
 6 | // components
 7 | import Iconify from '../../../components/iconify';
 8 |
 9 | // ----------------------------------------------------------------------
10 | const StyledIcon = styled('div')(({ theme }) => ({
11 |   margin: 'auto',
12 |   display: 'flex',
13 |   borderRadius: '50%',
14 |   alignItems: 'center',
15 |   width: theme.spacing(8),
16 |   height: theme.spacing(8),
17 |   justifyContent: 'center',
18 |   marginBottom: theme.spacing(3),
19 | }));
20 | AppWidgetSummary.propTypes = {
21 |   color: PropTypes.string,
22 |   icon: PropTypes.string,
23 |   title: PropTypes.string.isRequired,
24 |   total: PropTypes.number.isRequired,
25 |   sx: PropTypes.object,
26 | };
27 | export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
28 |   return (
29 |     <Card
30 |       sx={{
31 |         py: 5,
32 |         boxShadow: 0,
33 |         textAlign: 'center',
34 |         color: (theme) => theme.palette[color].darker,
35 |         bgcolor: (theme) => theme.palette[color].lighter,
36 |         ...sx,
37 |       }}
38 |       {...other}
39 |     >
40 |       <StyledIcon
41 |         sx={{
42 |           color: (theme) => theme.palette[color].dark,
43 |           backgroundImage: (theme) =>
44 |             `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
45 |               theme.palette[color].dark,
46 |               0.24
47 |             )} 100%)`,
48 |         }}
49 |       >
50 |         <Iconify icon={icon} width={24} height={24} />
51 |       </StyledIcon>
52 |       <Typography variant="h3">{fShortenNumber(total)}</Typography>
53 |       <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
54 |         {title}
55 |       </Typography>
56 |     </Card>
57 |   );
58 | }
59 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/app/index.js:
--------------------------------------------------------------------------------
 1 | export { default as AppTasks } from './AppTasks';
 2 | export { default as AppNewsUpdate } from './AppNewsUpdate';
 3 | export { default as AppCurrentVisits } from './AppCurrentVisits';
 4 | export { default as AppOrderTimeline } from './AppOrderTimeline';
 5 | export { default as AppTrafficBySite } from './AppTrafficBySite';
 6 | export { default as AppWebsiteVisits } from './AppWebsiteVisits';
 7 | export { default as AppWidgetSummary } from './AppWidgetSummary';
 8 | export { default as AppCurrentSubject } from './AppCurrentSubject';
 9 | export { default as AppConversionRates } from './AppConversionRates';
10 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/blog/BlogPostsSearch.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 |
 4 | // @mui
 5 | // components
 6 | import Iconify from '../../../components/iconify';
 7 | // ----------------------------------------------------------------------
 8 | const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
 9 |   width: '280px !important',
10 | });
11 | BlogPostsSearch.propTypes = {
12 |   posts: PropTypes.array.isRequired,
13 | };
14 | export default function BlogPostsSearch({ posts }) {
15 |   return (
16 |     <Autocomplete
17 |       sx={{ width: 280 }}
18 |       autoHighlight
19 |       popupIcon={null}
20 |       PopperComponent={StyledPopper}
21 |       options={posts}
22 |       getOptionLabel={(post) => post.title}
23 |       isOptionEqualToValue={(option, value) => option.id === value.id}
24 |       renderInput={(params) => (
25 |         <TextField
26 |           {...params}
27 |           placeholder="Search post..."
28 |           InputProps={{
29 |             ...params.InputProps,
30 |             startAdornment: (
31 |               <InputAdornment position="start">
32 |                 <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
33 |               </InputAdornment>
34 |             ),
35 |           }}
36 |         />
37 |       )}
38 |     />
39 |   );
40 | }
41 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/blog/BlogPostsSort.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | // @mui
 4 |
 5 | // ----------------------------------------------------------------------
 6 | BlogPostsSort.propTypes = {
 7 |   options: PropTypes.array,
 8 |   onSort: PropTypes.func,
 9 | };
10 | export default function BlogPostsSort({ options, onSort }) {
11 |   return (
12 |     <TextField select size="small" value="latest" onChange={onSort}>
13 |       {options.map((option) => (
14 |         <MenuItem key={option.value} value={option.value}>
15 |           {option.label}
16 |         </MenuItem>
17 |       ))}
18 |     </TextField>
19 |   );
20 | }
21 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/blog/index.js:
--------------------------------------------------------------------------------
1 | export { default as BlogPostCard } from './BlogPostCard';
2 | export { default as BlogPostsSearch } from './BlogPostsSearch';
3 | export { default as BlogPostsSort } from './BlogPostsSort';
4 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/products/ProductCartWidget.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | // @mui
 3 | // component
 4 | import Iconify from '../../../components/iconify';
 5 |
 6 | // ----------------------------------------------------------------------
 7 | const StyledRoot = styled('div')(({ theme }) => ({
 8 |   zIndex: 999,
 9 |   right: 0,
10 |   display: 'flex',
11 |   cursor: 'pointer',
12 |   position: 'fixed',
13 |   alignItems: 'center',
14 |   top: theme.spacing(16),
15 |   height: theme.spacing(5),
16 |   paddingLeft: theme.spacing(2),
17 |   paddingRight: theme.spacing(2),
18 |   paddingTop: theme.spacing(1.25),
19 |   boxShadow: theme.customShadows.z20,
20 |   color: theme.palette.text.primary,
21 |   backgroundColor: theme.palette.background.paper,
22 |   borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
23 |   borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
24 |   transition: theme.transitions.create('opacity'),
25 |   '&:hover': { opacity: 0.72 },
26 | }));
27 | export default function CartWidget() {
28 |   return (
29 |     <StyledRoot>
30 |       <Badge showZero badgeContent={0} color="error" max={99}>
31 |         <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
32 |       </Badge>
33 |     </StyledRoot>
34 |   );
35 | }
36 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/products/ProductList.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import PropTypes from 'prop-types';
 3 | // @mui
 4 | import ShopProductCard from './ProductCard';
 5 |
 6 | // ----------------------------------------------------------------------
 7 | ProductList.propTypes = {
 8 |   products: PropTypes.array.isRequired,
 9 | };
10 | export default function ProductList({ products, ...other }) {
11 |   return (
12 |     <Grid container spacing={3} {...other}>
13 |       {products.map((product) => (
14 |         <Grid key={product.id} item xs={12} sm={6} md={3}>
15 |           <ShopProductCard product={product} />
16 |         </Grid>
17 |       ))}
18 |     </Grid>
19 |   );
20 | }
21 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/products/ProductSort.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | import { useState } from 'react';
 3 | // @mui
 4 | // component
 5 | import Iconify from '../../../components/iconify';
 6 |
 7 | // ----------------------------------------------------------------------
 8 | const SORT_BY_OPTIONS = [
 9 |   { value: 'featured', label: 'Featured' },
10 |   { value: 'newest', label: 'Newest' },
11 |   { value: 'priceDesc', label: 'Price: High-Low' },
12 |   { value: 'priceAsc', label: 'Price: Low-High' },
13 | ];
14 | export default function ShopProductSort() {
15 |   const [open, setOpen] = useState(null);
16 |   const handleOpen = (event) => {
17 |     setOpen(event.currentTarget);
18 |   };
19 |   const handleClose = () => {
20 |     setOpen(null);
21 |   return (
22 |     <>
23 |       <Button
24 |         color="inherit"
25 |         disableRipple
26 |         onClick={handleOpen}
27 |         endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
28 |       >
29 |         Sort By:&nbsp;
30 |         <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
31 |           Newest
32 |         </Typography>
33 |       </Button>
34 |       <Menu
35 |         keepMounted
36 |         anchorEl={open}
37 |         open={Boolean(open)}
38 |         onClose={handleClose}
39 |         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
40 |         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
41 |         {SORT_BY_OPTIONS.map((option) => (
42 |           <MenuItem
43 |             key={option.value}
44 |             selected={option.value === 'newest'}
45 |             onClick={handleClose}
46 |             sx={{ typography: 'body2' }}
47 |           >
48 |             {option.label}
49 |           </MenuItem>
50 |         ))}
51 |       </Menu>
52 |     </>
53 |   );
54 | }
55 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/products/index.js:
--------------------------------------------------------------------------------
1 | export { default as ProductCard } from './ProductCard';
2 | export { default as ProductList } from './ProductList';
3 | export { default as ProductSort } from './ProductSort';
4 | export { default as ProductCartWidget } from './ProductCartWidget';
5 | export { default as ProductFilterSidebar } from './ProductFilterSidebar';
6 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/user/UserListHead.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 |
 3 | export interface HeadCell {
 4 |   id: string;
 5 |   name: string;
 6 |   alignRight?: boolean;
 7 | }
 8 |
 9 | export interface UserListHeadProps {
10 |   headLabel: HeadCell[];
11 | }
12 |
13 | export default function UserListHead({ headLabel }: UserListHeadProps) {
14 |   return (
15 |     <thead>
16 |       <tr>
17 |         {headLabel.map((h) => (
18 |           <th key={h.id}>{h.name}</th>
19 |         ))}
20 |       </tr>
21 |     </thead>
22 |   );
23 | }
24 |


--------------------------------------------------------------------------------
/client/src/sections/@dashboard/user/index.js:
--------------------------------------------------------------------------------
1 | export { default as UserListHead } from './UserListHead';
2 | export { default as UserListToolbar } from './UserListToolbar';
3 |


--------------------------------------------------------------------------------
/client/src/theme.ts:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react';
 3 |
 4 | export const theme = extendTheme({
 5 |   colors: {
 6 |     ...baseTheme.colors,
 7 |     sand: {
 8 |       50: '#fdf7f0',
 9 |       100: '#f9e8d2',
10 |       200: '#f2d1a6',
11 |       300: '#e9ba79',
12 |       400: '#e1a44d',
13 |       500: '#c88a33',
14 |       600: '#9d6d26',
15 |       700: '#725019',
16 |       800: '#47330c',
17 |       900: '#1f1600'
18 |     }
19 |   },
20 |   space: {
21 |     px: '1px',
22 |     1: '4px',
23 |     2: '8px',
24 |     3: '12px',
25 |     4: '16px',
26 |     5: '20px',
27 |     6: '24px'
28 |   },
29 |   radii: {
30 |     ...baseTheme.radii,
31 |     '2xl': '1rem'
32 |   },
33 |   shadows: {
34 |     ...baseTheme.shadows,
35 |     soft: '0 2px 4px rgba(0,0,0,0.08)'
36 |   }
37 | });
38 |
39 | export default function ThemeProvider({ children }: { children: React.ReactNode }) {
40 |   return React.createElement(ChakraProvider, { theme }, children);
41 | }
42 |


--------------------------------------------------------------------------------
/client/src/theme/customShadows.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | // @mui
 3 | //
 4 | import palette from './palette';
 5 |
 6 | // ----------------------------------------------------------------------
 7 | const color = palette.grey[500];
 8 | export default function customShadows() {
 9 |   const transparent = alpha(color, 0.16);
10 |   return {
11 |     z1: `0 1px 2px 0 ${transparent}`,
12 |     z4: `0 4px 8px 0 ${transparent}`,
13 |     z8: `0 8px 16px 0 ${transparent}`,
14 |     z12: `0 12px 24px -4px ${transparent}`,
15 |     z16: `0 16px 32px -4px ${transparent}`,
16 |     z20: `0 20px 40px -4px ${transparent}`,
17 |     z24: `0 24px 48px 0 ${transparent}`,
18 |     //
19 |     primary: `0 8px 16px 0 ${alpha(palette.primary.main, 0.24)}`,
20 |     info: `0 8px 16px 0 ${alpha(palette.info.main, 0.24)}`,
21 |     secondary: `0 8px 16px 0 ${alpha(palette.secondary.main, 0.24)}`,
22 |     success: `0 8px 16px 0 ${alpha(palette.success.main, 0.24)}`,
23 |     warning: `0 8px 16px 0 ${alpha(palette.warning.main, 0.24)}`,
24 |     error: `0 8px 16px 0 ${alpha(palette.error.main, 0.24)}`,
25 |     card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
26 |     dialog: `-40px 40px 80px -8px ${alpha(color, 0.24)}`,
27 |     dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
28 |   };
29 | }
30 |


--------------------------------------------------------------------------------
/client/src/theme/globalStyles.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 | // @mui
 3 |
 4 | // ----------------------------------------------------------------------
 5 | export default function GlobalStyles() {
 6 |   const inputGlobalStyles = (
 7 |     <MUIGlobalStyles
 8 |       styles={{
 9 |         '*': {
10 |           boxSizing: 'border-box',
11 |         },
12 |         html: {
13 |           margin: 0,
14 |           padding: 0,
15 |           width: '100%',
16 |           height: '100%',
17 |           WebkitOverflowScrolling: 'touch',
18 |         body: {
19 |         '#root': {
20 |         input: {
21 |           '&[type=number]': {
22 |             MozAppearance: 'textfield',
23 |             '&::-webkit-outer-spin-button': {
24 |               margin: 0,
25 |               WebkitAppearance: 'none',
26 |             },
27 |             '&::-webkit-inner-spin-button': {
28 |           },
29 |         img: {
30 |           display: 'block',
31 |           maxWidth: '100%',
32 |         ul: {
33 |       }}
34 |     />
35 |   );
36 |   return inputGlobalStyles;
37 | }
38 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Autocomplete.js:
--------------------------------------------------------------------------------
 1 | // ----------------------------------------------------------------------
 2 |
 3 | export default function Autocomplete(theme) {
 4 |   return {
 5 |     MuiAutocomplete: {
 6 |       styleOverrides: {
 7 |         paper: {
 8 |           boxShadow: theme.customShadows.z20,
 9 |         },
10 |       },
11 |     },
12 |   };
13 | }
14 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Backdrop.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 |
 3 | // ----------------------------------------------------------------------
 4 | export default function Backdrop(theme) {
 5 |   return {
 6 |     MuiBackdrop: {
 7 |       styleOverrides: {
 8 |         root: {
 9 |           backgroundColor: alpha(theme.palette.grey[800], 0.8),
10 |         },
11 |         invisible: {
12 |           background: 'transparent',
13 |       },
14 |     },
15 |   };
16 | }
17 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Button.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 |
 3 | // ----------------------------------------------------------------------
 4 | export default function Button(theme) {
 5 |   return {
 6 |     MuiButton: {
 7 |       styleOverrides: {
 8 |         root: {
 9 |           '&:hover': {
10 |             boxShadow: 'none',
11 |           },
12 |         },
13 |         sizeLarge: {
14 |           height: 48,
15 |         containedInherit: {
16 |           color: theme.palette.grey[800],
17 |           boxShadow: theme.customShadows.z8,
18 |             backgroundColor: theme.palette.grey[400],
19 |         containedPrimary: {
20 |           boxShadow: theme.customShadows.primary,
21 |         containedSecondary: {
22 |           boxShadow: theme.customShadows.secondary,
23 |         outlinedInherit: {
24 |           border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
25 |             backgroundColor: theme.palette.action.hover,
26 |         textInherit: {
27 |       },
28 |     },
29 |   };
30 | }
31 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Card.js:
--------------------------------------------------------------------------------
 1 | // ----------------------------------------------------------------------
 2 |
 3 | export default function Card(theme) {
 4 |   return {
 5 |     MuiCard: {
 6 |       styleOverrides: {
 7 |         root: {
 8 |           boxShadow: theme.customShadows.card,
 9 |           borderRadius: Number(theme.shape.borderRadius) * 2,
10 |           position: 'relative',
11 |           zIndex: 0, // Fix Safari overflow: hidden with border radius
12 |         },
13 |       },
14 |     },
15 |     MuiCardHeader: {
16 |       defaultProps: {
17 |         titleTypographyProps: { variant: 'h6' },
18 |         subheaderTypographyProps: { variant: 'body2' },
19 |       },
20 |       styleOverrides: {
21 |         root: {
22 |           padding: theme.spacing(3, 3, 0),
23 |         },
24 |       },
25 |     },
26 |     MuiCardContent: {
27 |       styleOverrides: {
28 |         root: {
29 |           padding: theme.spacing(3),
30 |         },
31 |       },
32 |     },
33 |   };
34 | }
35 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Input.js:
--------------------------------------------------------------------------------
 1 | import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
 2 |
 3 | // ----------------------------------------------------------------------
 4 | export default function Input(theme) {
 5 |   return {
 6 |     MuiInputBase: {
 7 |       styleOverrides: {
 8 |         root: {
 9 |           '&.Mui-disabled': {
10 |             '& svg': { color: theme.palette.text.disabled },
11 |           },
12 |         },
13 |         input: {
14 |           '&::placeholder': {
15 |             opacity: 1,
16 |             color: theme.palette.text.disabled,
17 |       },
18 |     },
19 |     MuiInput: {
20 |         underline: {
21 |           '&:before': {
22 |             borderBottomColor: alpha(theme.palette.grey[500], 0.56),
23 |     MuiFilledInput: {
24 |           backgroundColor: alpha(theme.palette.grey[500], 0.12),
25 |           '&:hover': {
26 |             backgroundColor: alpha(theme.palette.grey[500], 0.16),
27 |           '&.Mui-focused': {
28 |             backgroundColor: theme.palette.action.focus,
29 |             backgroundColor: theme.palette.action.disabledBackground,
30 |     MuiOutlinedInput: {
31 |           '& .MuiOutlinedInput-notchedOutline': {
32 |             borderColor: alpha(theme.palette.grey[500], 0.32),
33 |             '& .MuiOutlinedInput-notchedOutline': {
34 |               borderColor: theme.palette.action.disabledBackground,
35 |             },
36 |   };
37 | }
38 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Paper.js:
--------------------------------------------------------------------------------
 1 | // ----------------------------------------------------------------------
 2 |
 3 | export default function Paper() {
 4 |   return {
 5 |     MuiPaper: {
 6 |       defaultProps: {
 7 |         elevation: 0,
 8 |       },
 9 |       styleOverrides: {
10 |         root: {
11 |           backgroundImage: 'none',
12 |         },
13 |       },
14 |     },
15 |   };
16 | }
17 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Table.js:
--------------------------------------------------------------------------------
 1 | // ----------------------------------------------------------------------
 2 |
 3 | export default function Table(theme) {
 4 |   return {
 5 |     MuiTableCell: {
 6 |       styleOverrides: {
 7 |         head: {
 8 |           color: theme.palette.text.secondary,
 9 |           backgroundColor: theme.palette.background.neutral,
10 |         },
11 |       },
12 |     },
13 |   };
14 | }
15 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Tooltip.js:
--------------------------------------------------------------------------------
 1 | // ----------------------------------------------------------------------
 2 |
 3 | export default function Tooltip(theme) {
 4 |   return {
 5 |     MuiTooltip: {
 6 |       styleOverrides: {
 7 |         tooltip: {
 8 |           backgroundColor: theme.palette.grey[800],
 9 |         },
10 |         arrow: {
11 |           color: theme.palette.grey[800],
12 |         },
13 |       },
14 |     },
15 |   };
16 | }
17 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/Typography.js:
--------------------------------------------------------------------------------
 1 | // ----------------------------------------------------------------------
 2 |
 3 | export default function Typography(theme) {
 4 |   return {
 5 |     MuiTypography: {
 6 |       styleOverrides: {
 7 |         paragraph: {
 8 |           marginBottom: theme.spacing(2),
 9 |         },
10 |         gutterBottom: {
11 |           marginBottom: theme.spacing(1),
12 |         },
13 |       },
14 |     },
15 |   };
16 | }
17 |


--------------------------------------------------------------------------------
/client/src/theme/overrides/index.js:
--------------------------------------------------------------------------------
 1 | //
 2 | import Card from './Card';
 3 | import Paper from './Paper';
 4 | import Input from './Input';
 5 | import Table from './Table';
 6 | import Button from './Button';
 7 | import Tooltip from './Tooltip';
 8 | import Backdrop from './Backdrop';
 9 | import Typography from './Typography';
10 | import Autocomplete from './Autocomplete';
11 |
12 | // ----------------------------------------------------------------------
13 |
14 | export default function ComponentsOverrides(theme) {
15 |   return Object.assign(
16 |     Card(theme),
17 |     Table(theme),
18 |     Input(theme),
19 |     Paper(theme),
20 |     Button(theme),
21 |     Tooltip(theme),
22 |     Backdrop(theme),
23 |     Typography(theme),
24 |     Autocomplete(theme)
25 |   );
26 | }
27 |


--------------------------------------------------------------------------------
/client/src/utils/createAbortController.ts:
--------------------------------------------------------------------------------
1 | const createAbortController = () => {
2 |   const abortController = new AbortController();
3 |   const { signal } = abortController;
4 |
5 |   return { signal, abort: () => abortController.abort() };
6 | };
7 |
8 | export default createAbortController;
9 |


--------------------------------------------------------------------------------
/client/src/utils/formatNumber.js:
--------------------------------------------------------------------------------
 1 | import numeral from 'numeral';
 2 |
 3 | // ----------------------------------------------------------------------
 4 |
 5 | export function fNumber(number) {
 6 |   return numeral(number).format();
 7 | }
 8 |
 9 | export function fCurrency(number) {
10 |   const format = number ? numeral(number).format('$0,0.00') : '';
11 |
12 |   return result(format, '.00');
13 | }
14 |
15 | export function fPercent(number) {
16 |   const format = number ? numeral(Number(number) / 100).format('0.0%') : '';
17 |
18 |   return result(format, '.0');
19 | }
20 |
21 | export function fShortenNumber(number) {
22 |   const format = number ? numeral(number).format('0.00a') : '';
23 |
24 |   return result(format, '.00');
25 | }
26 |
27 | export function fData(number) {
28 |   const format = number ? numeral(number).format('0.0 b') : '';
29 |
30 |   return result(format, '.0');
31 | }
32 |
33 | function result(format, key = '.00') {
34 |   const isInteger = format.includes(key);
35 |
36 |   return isInteger ? format.replace(key, '') : format;
37 | }
38 |


--------------------------------------------------------------------------------
/client/src/utils/formatTime.js:
--------------------------------------------------------------------------------
 1 | import { format, getTime, formatDistanceToNow } from 'date-fns';
 2 |
 3 | // ----------------------------------------------------------------------
 4 |
 5 | export function fDate(date, newFormat) {
 6 |   const fm = newFormat || 'dd MMM yyyy';
 7 |
 8 |   return date ? format(new Date(date), fm) : '';
 9 | }
10 |
11 | export function fDateTime(date, newFormat) {
12 |   const fm = newFormat || 'dd MMM yyyy p';
13 |
14 |   return date ? format(new Date(date), fm) : '';
15 | }
16 |
17 | export function fTimestamp(date) {
18 |   return date ? getTime(new Date(date)) : '';
19 | }
20 |
21 | export function fToNow(date) {
22 |   return date
23 |     ? formatDistanceToNow(new Date(date), {
24 |         addSuffix: true,
25 |       })
26 |     : '';
27 | }
28 |


--------------------------------------------------------------------------------
/client/webpack.config.js:
--------------------------------------------------------------------------------
1 | module.exports = {
2 |   resolve: {
3 |     extensions: [".ts", ".tsx", ".js", ".jsx"]
4 |   }
5 | };
6 |


--------------------------------------------------------------------------------
/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "Volta-Fullstack",
 3 |   "private": true,
 4 |   "workspaces": [
 5 |     "server",
 6 |     "client"
 7 |   ],
 8 |   "scripts": {
 9 |     "start": "concurrently \"npm run start:server\" \"npm run start:client\"",
10 |     "start:server": "cross-env PORT=4000 npm --workspace server start",
11 |     "start:client": "cross-env PORT=3000 npm --workspace client start",
12 |     "test": "npm test --workspaces"
13 |   },
14 |   "devDependencies": {
15 |     "concurrently": "^7.6.0",
16 |     "cross-env": "^7.0.3"
17 |   },
18 |   "volta": {
19 |     "node": "18.20.8",
20 |     "npm": "10.9.2"
21 |   }
22 | }
23 |


--------------------------------------------------------------------------------
/server/.babelrc:
--------------------------------------------------------------------------------
 1 | {
 2 |   "presets": [
 3 |     ["@babel/env", {"targets": {"node": true}}],
 4 |     "@babel/typescript"
 5 |    ],
 6 |   "plugins": [
 7 |     "babel-plugin-transform-typescript-metadata",
 8 |     ["@babel/plugin-proposal-decorators", { "legacy": true }],
 9 |     ["@babel/plugin-proposal-class-properties", { "loose": true }],
10 |     "@babel/proposal-object-rest-spread"
11 |   ]
12 | }


--------------------------------------------------------------------------------
/server/.barrelsby.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "directory": ["./src/controllers/rest","./src/controllers/pages"],
 3 |   "exclude": [
 4 |     "__mock__",
 5 |     "__mocks__",
 6 |     ".spec.ts"
 7 |   ],
 8 |   "delete": true
 9 | }
10 |


--------------------------------------------------------------------------------
/server/.dockerignore:
--------------------------------------------------------------------------------
1 | node_modules
2 | Dockerfile
3 | .env.local
4 | .env.development
5 |


--------------------------------------------------------------------------------
/server/.env.example:
--------------------------------------------------------------------------------
 1 | DATABASE_URL=
 2 | PORT=4000
 3 | NODE_ENV=development
 4 | ENCRYPTION_KEY=
 5 | EMAIL=
 6 | PASSWORD=
 7 | SUPER_USER_EMAIL=
 8 | OPENAI_API_KEY=
 9 | REACT_APP_STAGE=development
10 | QUICKBASE_API_BASE_URL=
11 | OPENAI_COMPLETION_URL=
12 |


--------------------------------------------------------------------------------
/server/.eslintignore:
--------------------------------------------------------------------------------
1 | dist
2 |


--------------------------------------------------------------------------------
/server/.eslintrc:
--------------------------------------------------------------------------------
 1 | {
 2 |   "parser": "@typescript-eslint/parser",
 3 |   "extends": [
 4 |     "prettier",
 5 |     "plugin:@typescript-eslint/recommended"
 6 |   ],
 7 |   "plugins": ["@typescript-eslint"],
 8 |   "parserOptions": {
 9 |     "ecmaVersion": 2018,
10 |     "sourceType": "module",
11 |     "project": "./tsconfig.json"
12 |   },
13 |   "env": {
14 |    "node": true,
15 |    "es6": true
16 |   },
17 |   "rules": {
18 |     "@typescript-eslint/no-inferrable-types": 0,
19 |     "@typescript-eslint/no-unused-vars": 2,
20 |     "@typescript-eslint/no-var-requires": 0
21 |   }
22 | }
23 |


--------------------------------------------------------------------------------
/server/.gitignore:
--------------------------------------------------------------------------------
 1 | ### Node template
 2 | .DS_Store
 3 | # Logs
 4 | logs
 5 | *.log
 6 | npm-debug.log*
 7 |
 8 | # Runtime data
 9 | pids
10 | *.pid
11 | *.seed
12 |
13 | # Directory for instrumented libs generated by jscoverage/JSCover
14 | lib-cov
15 |
16 |
17 | # Coverage directory used by tools like istanbul
18 | coverage
19 |
20 | # Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
21 | .grunt
22 |
23 | # node-waf configuration
24 | .lock-wscript
25 |
26 | # Compiled binary addons (http://nodejs.org/api/addons.html)
27 | build/Release
28 |
29 | # Dependency directory
30 | # https://docs.npmjs.com/misc/faq#should-i-check-my-node-modules-folder-into-git
31 | node_modules
32 | .npmrc
33 | *.log
34 |
35 | # Typings
36 | typings/
37 |
38 | # Typescript
39 | src/**/*.js
40 | src/**/*.js.map
41 | test/**/*.js
42 | test/**/*.js.map
43 |
44 | # Test
45 | /.tmp
46 | /.nyc_output
47 |
48 | # IDE
49 | .vscode
50 | .idea
51 |
52 | # Project
53 | /public
54 | /dist
55 |
56 | #env
57 | .env.local
58 | .env.development
59 | .env
60 |


--------------------------------------------------------------------------------
/server/.prettierignore:
--------------------------------------------------------------------------------
1 | dist
2 | docs
3 | node_modules
4 | *-lock.json
5 | *.lock
6 |


--------------------------------------------------------------------------------
/server/.prettierrc:
--------------------------------------------------------------------------------
 1 | {
 2 |   "printWidth": 140,
 3 |   "singleQuote": false,
 4 |   "jsxSingleQuote": true,
 5 |   "semi": true,
 6 |   "tabWidth": 2,
 7 |   "bracketSpacing": true,
 8 |   "arrowParens": "always",
 9 |   "trailingComma": "none"
10 | }
11 |


--------------------------------------------------------------------------------
/server/README.md:
--------------------------------------------------------------------------------
 1 | <p style="text-align: center" align="center">
 2 |   <a href="https://tsed.io" target="_blank"><img src="https://tsed.io/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
 3 | </p>
 4 |
 5 | <div align="center">
 6 |   <h1>Ts.ED - crm-server-v2</h1>
 7 |   <br />
 8 |   <div align="center">
 9 |     <a href="https://cli.tsed.io/">Website</a>
10 |     <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
11 |     <a href="https://cli.tsed.io/getting-started.html">Getting started</a>
12 |     <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
13 |     <a href="https://api.tsed.io/rest/slack/tsedio/tsed">Slack</a>
14 |     <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
15 |     <a href="https://twitter.com/TsED_io">Twitter</a>
16 |   </div>
17 |   <hr />
18 | </div>
19 |
20 | > An awesome project based on Ts.ED framework
21 |
22 | ## Getting started
23 |
24 | > **Important!** Ts.ED requires Node >= 14, Express >= 4 and TypeScript >= 4.
25 |
26 | ```batch
27 | # install dependencies
28 | $ yarn install
29 |
30 | # serve
31 | $ yarn start
32 |
33 | # build for production
34 | $ yarn build
35 | $ yarn start:prod
36 | ```
37 |
38 | ## Docker
39 |
40 | ```
41 | # build docker image
42 | docker compose build
43 |
44 | # start docker image
45 | docker compose up
46 | ```
47 |
48 | ## Barrelsby
49 |
50 | This project uses [barrelsby](https://www.npmjs.com/package/barrelsby) to generate index files to import the controllers.
51 |
52 | Edit `.barreslby.json` to customize it:
53 |
54 | ```json
55 | {
56 |   "directory": [
57 |     "./src/controllers/rest",
58 |     "./src/controllers/pages"
59 |   ],
60 |   "exclude": [
61 |     "__mock__",
62 |     "__mocks__",
63 |     ".spec.ts"
64 |   ],
65 |   "delete": true
66 | }
67 | ```
68 |


--------------------------------------------------------------------------------
/server/docker-compose.yml:
--------------------------------------------------------------------------------
 1 | version: '3.5'
 2 | services:
 3 |   server:
 4 |     build:
 5 |       context: .
 6 |       dockerfile: ./Dockerfile
 7 |       args:
 8 |         - http_proxy
 9 |         - https_proxy
10 |         - no_proxy
11 |     image: crm-server-v2/server:latest
12 |     ports:
13 |       - '8081:8081'
14 |   mongodb:
15 |     image: mongo:5.0.8
16 |     ports:
17 |       - '27017:27017'
18 |


--------------------------------------------------------------------------------
/server/jest.config.js:
--------------------------------------------------------------------------------
 1 | // For a detailed explanation regarding each configuration property, visit:
 2 | // https://jestjs.io/docs/en/configuration.html
 3 |
 4 | module.exports = {
 5 |   // Automatically clear mock calls and instances between every test
 6 |   clearMocks: true,
 7 |
 8 |   // Indicates whether the coverage information should be collected while executing the test
 9 |   collectCoverage: true,
10 |
11 |   // An array of glob patterns indicating a set of files for which coverage information should be collected
12 |   // collectCoverageFrom: undefined,
13 |
14 |   // The directory where Jest should output its coverage files
15 |   coverageDirectory: 'coverage',
16 |
17 |   // An array of regexp pattern strings used to skip coverage collection
18 |   coveragePathIgnorePatterns: [
19 |     'index.ts',
20 |     '/node_modules/'
21 |   ],
22 |
23 |   // An object that configures minimum threshold enforcement for coverage results
24 |   coverageThreshold: {
25 |     global: {
26 |       'branches': 70,
27 |       'functions': 70,
28 |       'lines': 70,
29 |       'statements': 70
30 |     }
31 |   },
32 |
33 |   // An array of file extensions your modules use
34 |   moduleFileExtensions: [
35 |     'js',
36 |     'json',
37 |     'jsx',
38 |     'ts',
39 |     'tsx',
40 |     'node'
41 |   ],
42 |
43 |   // The test environment that will be used for testing
44 |   testEnvironment: 'node',
45 |
46 |   // The glob patterns Jest uses to detect test files
47 |   testMatch: [
48 |     '**/src/**/__tests__/**/*.[jt]s?(x)',
49 |     '**/src/**/?(*.)+(spec|test).[tj]s?(x)',
50 |     '**/tests/**/?(*.)+(spec|test).[tj]s?(x)'
51 |
52 |   ],
53 |   // A map from regular expressions to paths to transformers
54 |   transform: {
55 |     '\\.(ts)
#39;: 'ts-jest'
56 |   }
57 | }
58 |


--------------------------------------------------------------------------------
/server/processes.config.js:
--------------------------------------------------------------------------------
 1 | 'use strict'
 2 |
 3 | const path = require('path')
 4 | const defaultLogFile = path.join(__dirname, '/logs/project-server.log')
 5 |
 6 | module.exports = {
 7 |   'apps': [
 8 |     {
 9 |       name: "api",
10 |       'script': `${process.env.WORKDIR}/dist/index.js`,
11 |       'cwd': process.env.WORKDIR,
12 |       node_args: process.env.NODE_ARGS || "--max_old_space_size=1800",
13 |       exec_mode: "cluster",
14 |       instances: process.env.NODE_ENV === "test" ? 1 : process.env.NB_INSTANCES || 2,
15 |       autorestart: true,
16 |       max_memory_restart: process.env.MAX_MEMORY_RESTART || "750M",
17 |       'out_file': defaultLogFile,
18 |       'error_file': defaultLogFile,
19 |       'merge_logs': true,
20 |       'kill_timeout': 30000,
21 |     }
22 |   ]
23 | }
24 |


--------------------------------------------------------------------------------
/server/src/Server.integration.spec.ts:
--------------------------------------------------------------------------------
 1 | import { PlatformTest } from "@tsed/common";
 2 | import SuperTest from "supertest";
 3 | import { Server } from "./Server";
 4 |
 5 | describe("Server", () => {
 6 |   let request: SuperTest.SuperTest<SuperTest.Test>;
 7 |
 8 |   beforeEach(PlatformTest.bootstrap(Server));
 9 |   beforeEach(() => {
10 |     request = SuperTest(PlatformTest.callback());
11 |   });
12 |
13 |   afterEach(PlatformTest.reset);
14 |
15 |   it("should call GET /rest", async () => {
16 |      const response = await request.get("/rest").expect(404);
17 |
18 |      expect(response.body).toEqual({
19 |        errors: [],
20 |        message: 'Resource "/rest" not found',
21 |        name: "NOT_FOUND",
22 |        status: 404,
23 |      });
24 |   });
25 | });
26 |


--------------------------------------------------------------------------------
/server/src/clients/nodemailer.ts:
--------------------------------------------------------------------------------
 1 | import axios from "axios";
 2 | import { NodeMailerTypes } from "types";
 3 | import logger from "../util/logger";
 4 |
 5 | const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/8338143/2j3d5rt/";
 6 |
 7 | async function postToZapier(payload: Record<string, unknown>) {
 8 |   logger.request("Posting payload to Zapier", payload);
 9 |   try {
10 |     const response = await axios.post(ZAPIER_WEBHOOK_URL, payload);
11 |     logger.success(
12 |       `Zapier responded with status ${response.status}`,
13 |       response.data
14 |     );
15 |     if (response.status !== 200) {
16 |       throw new Error(`Failed to send webhook: ${response.statusText}`);
17 |     }
18 |     return "Email sent successfully";
19 |   } catch (error) {
20 |     logger.error("Error posting to Zapier", error);
21 |     throw error;
22 |   }
23 | }
24 |
25 | export class NodemailerClient {
26 |   ///
27 |   public static async sendVerificationEmail({ title = "Email", email, code }: NodeMailerTypes) {
28 |     return postToZapier({ type: "verification", title, email, code });
29 |   }
30 |
31 |   public static async sendCompleteRegistrationEmail({ email }: { email: string }) {
32 |     return postToZapier({ type: "completeRegistration", email });
33 |   }
34 |
35 |   public static async sendEmailToPlanner({
36 |     email,
37 |     title,
38 |     description,
39 |     action
40 |   }: {
41 |     email: string;
42 |     title: string;
43 |     description: string;
44 |     action: string;
45 |   }) {
46 |     return postToZapier({ type: "planner", email, title, description, action });
47 |   }
48 | }
49 |


--------------------------------------------------------------------------------
/server/src/config/envs/index.ts:
--------------------------------------------------------------------------------
1 | import dotenv from "dotenv"
2 |
3 | export const envs = {
4 |   ...process.env,
5 |   ...dotenv.config().parsed
6 | };
7 | export const isProduction = process.env.NODE_ENV === "production";
8 |


--------------------------------------------------------------------------------
/server/src/config/index.ts:
--------------------------------------------------------------------------------
 1 | import { readFileSync } from "fs";
 2 | import { envs } from "./envs/index";
 3 | import loggerConfig from "./logger/index";
 4 |
 5 | const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));
 6 |
 7 | export const config: Partial<TsED.Configuration> = {
 8 |   version: pkg.version,
 9 |   envs,
10 |   logger: loggerConfig
11 |
12 |   // additional shared configuration
13 | };
14 |


--------------------------------------------------------------------------------
/server/src/config/logger/index.ts:
--------------------------------------------------------------------------------
 1 | import {$log, PlatformLoggerSettings} from "@tsed/common";
 2 | import { EmojiAppender } from "../../util/EmojiAppender";
 3 |
 4 | // Replace Ts.ED's default appenders with our concise emoji logger.
 5 | $log.appenders.clear();
 6 | $log.appenders.set("emoji", { type: EmojiAppender });
 7 |
 8 | // Only emit error level logs from Ts.ED. Informational messages will
 9 | // be handled through our custom logger utility.
10 | $log.level = "error";
11 |
12 | export default <PlatformLoggerSettings>{
13 |   disableRoutesSummary: true
14 | };
15 |


--------------------------------------------------------------------------------
/server/src/config/logger/summaryConfig.ts:
--------------------------------------------------------------------------------
1 | export const summaryConfig: Record<string, string[]> = {
2 |   user: ["id", "email"],
3 |   deals: ["error", "code"],
4 |   error: ["code", "message"]
5 | };
6 |
7 |


--------------------------------------------------------------------------------
/server/src/controllers/pages/IndexController.ts:
--------------------------------------------------------------------------------
 1 | import {Constant, Controller} from "@tsed/di";
 2 | import {HeaderParams} from "@tsed/platform-params";
 3 | import {View} from "@tsed/platform-views";
 4 | import {SwaggerSettings} from "@tsed/swagger";
 5 | import {Hidden, Get, Returns} from "@tsed/schema";
 6 |
 7 | @Hidden()
 8 | @Controller("/")
 9 | export class IndexController {
10 |   @Constant("swagger", [])
11 |   private swagger: SwaggerSettings[];
12 |
13 |   @Get("/")
14 |   @View("swagger.ejs")
15 |   @(Returns(200, String).ContentType("text/html"))
16 |   get(@HeaderParams("x-forwarded-proto") protocol: string, @HeaderParams("host") host: string) {
17 |     const hostUrl = `${protocol || "http"}://${host}`;
18 |
19 |     return {
20 |       BASE_URL: hostUrl,
21 |       docs: this.swagger.map((conf) => {
22 |         return {
23 |           url: hostUrl + conf.path,
24 |           ...conf
25 |         };
26 |       })
27 |     };
28 |   }
29 | }
30 |


--------------------------------------------------------------------------------
/server/src/controllers/pages/index.ts:
--------------------------------------------------------------------------------
1 | /**
2 |  * @file Automatically generated by barrelsby.
3 |  */
4 |
5 | export * from "./IndexController";
6 |


--------------------------------------------------------------------------------
/server/src/controllers/rest/LeadController.ts:
--------------------------------------------------------------------------------
 1 | import { Controller, Inject } from "@tsed/di";
 2 | import { Property, Required } from "@tsed/schema";
 3 | import { AdminService } from "../../services/AdminService";
 4 | import { LeadService } from "../../services/LeadsService";
 5 |
 6 | class LeadBodyParam {
 7 |   @Required() public firstName: string;
 8 |   @Property() public lastName: string;
 9 |   @Required() public email: string;
10 |   @Required() public phone: string;
11 |   @Required() public categoryId: string;
12 | }
13 |
14 | @Controller("/lead")
15 | export class LeadController {
16 |   @Inject()
17 |   private adminService: AdminService;
18 |   @Inject()
19 |   private leadService: LeadService;
20 |
21 | }
22 |


--------------------------------------------------------------------------------
/server/src/controllers/rest/OrganizationController.ts:
--------------------------------------------------------------------------------
 1 | import { Controller, Inject } from "@tsed/di";
 2 | import { BodyParams, Context, QueryParams } from "@tsed/platform-params";
 3 | import { Get, Post, Required, Returns } from "@tsed/schema";
 4 | import { AdminService } from "../../services/AdminService";
 5 | import { OrganizationResultModel } from "../../models/RestModels";
 6 | import { OrganizationService } from "../../services/OrganizationService";
 7 | import { SuccessArrayResult, SuccessResult } from "../../util/entities";
 8 | import { ADMIN } from "../../util/constants";
 9 |
10 | @Controller("/org")
11 | export class OrganizationController {
12 |   @Inject()
13 |   private organizationService: OrganizationService;
14 |
15 |   @Inject()
16 |   private adminService: AdminService;
17 |
18 |   @Get("/")
19 |   @Returns(200, SuccessArrayResult).Of(OrganizationResultModel)
20 |   public async getOrgs(@QueryParams() query: { id?: string }, @Context() context: Context) {
21 |     const user = context.get("user");
22 |     const { orgId } = await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
23 |     const orgs = await this.organizationService.findOrganizations();
24 |     const response = {
25 |       orgs: orgs.map((org) => {
26 |         return {
27 |           id: org.id,
28 |           name: org.name,
29 |           email: org.email,
30 |           createdAt: org.createdAt,
31 |           updatedAt: org.updatedAt
32 |         };
33 |       })
34 |     };
35 |     return new SuccessArrayResult(response.orgs, OrganizationResultModel);
36 |   }
37 |
38 |   @Get("/id")
39 |   @Returns(200, SuccessResult).Of(OrganizationResultModel)
40 |   public async getOrg(@Required() query: { id: string }, @Context() context: Context) {
41 |     const { orgId } = await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
42 |     const org = await this.organizationService.findOrganizationById(orgId);
43 |     return new SuccessResult(org, Object);
44 |   }
45 | }
46 |


--------------------------------------------------------------------------------
/server/src/controllers/rest/RoleController.ts:
--------------------------------------------------------------------------------
 1 | import { Controller, Inject } from "@tsed/di";
 2 | import { BodyParams, Context } from "@tsed/platform-params";
 3 | import { Get, Post, Required, Returns } from "@tsed/schema";
 4 | import { RoleResultModel } from "../../models/RestModels";
 5 | import { RoleService } from "../../services/RoleService";
 6 | import { AdminService } from "../../services/AdminService";
 7 | import { ADMIN, MANAGER } from "../../util/constants";
 8 | import { SuccessArrayResult, SuccessResult } from "../../util/entities";
 9 | import { BadRequest } from "@tsed/exceptions";
10 | import { ROLE_EXISTS } from "../../util/errors";
11 | import { normalizeData } from "../../helper";
12 |
13 | class RoleParams {
14 |   @Required() public readonly name: string;
15 | }
16 |
17 | @Controller("/role")
18 | export class RoleController {
19 |   @Inject()
20 |   private adminService: AdminService;
21 |   @Inject()
22 |   private roleService: RoleService;
23 |
24 |   @Get()
25 |   @Returns(200, SuccessArrayResult).Of(RoleResultModel)
26 |   public async getRoles(@Context() context: Context) {
27 |     await this.adminService.checkPermissions({ hasRole: [ADMIN, MANAGER] }, context.get("user"));
28 |     const roles = await this.roleService.findRoles();
29 |     return new SuccessArrayResult(normalizeData(roles), RoleResultModel);
30 |   }
31 |
32 |   @Post()
33 |   @Returns(200, SuccessResult).Of(RoleResultModel)
34 |   public async createRole(@BodyParams() body: RoleParams, @Context() context: Context) {
35 |     await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
36 |     const { name } = body;
37 |     let role = await this.roleService.findRoleById(name);
38 |     if (role) throw new BadRequest(ROLE_EXISTS);
39 |     const response = await this.roleService.createRole({ name });
40 |     const result = {
41 |       _id: response._id,
42 |       name: response.name
43 |     };
44 |     return new SuccessResult(result, RoleResultModel);
45 |   }
46 | }
47 |


--------------------------------------------------------------------------------
/server/src/controllers/rest/index.ts:
--------------------------------------------------------------------------------
 1 | /**
 2 |  * @file Automatically generated by barrelsby.
 3 |  */
 4 |
 5 | export * from "./DynamicController";
 6 | export * from "./OrganizationController";
 7 | export * from "./AuthenticationController";
 8 | export * from "./CategoryController";
 9 | export * from "./LeadController";
10 | export * from "./AdminController";
11 | export * from "./PlannerController";
12 | export * from "./RoleController";
13 | export * from "./AvailabilityController";
14 |


--------------------------------------------------------------------------------
/server/src/cron/model.ts:
--------------------------------------------------------------------------------
 1 | import { Schema } from "@tsed/mongoose";
 2 | import { createSchema } from "../helper";
 3 |
 4 | export const plannerModel = createSchema({
 5 |   tableName: "planners",
 6 |   columns: [
 7 |     { name: "title", type: "string" },
 8 |     { name: "action", type: "string" },
 9 |     { name: "description", type: "string" },
10 |     { name: "timeOfExecution", type: "string" },
11 |     { name: "startDate", type: "string" },
12 |     { name: "orgId", type: "string" },
13 |     { name: "adminId", type: "string" },
14 |     { name: "source", type: "string" },
15 |     { name: "categoryId", type: "string" }
16 |   ]
17 | });
18 |
19 | export const categoryModel = createSchema({
20 |   tableName: "categories",
21 |   columns: [
22 |     { name: "name", type: "string" },
23 |     { name: "description", type: "string" },
24 |     { name: "fields", type: "array" },
25 |     { name: "adminId", type: "string" },
26 |     { name: "orgId", type: "string" }
27 |   ]
28 | });
29 |


--------------------------------------------------------------------------------
/server/src/examples/LoggingDemo.ts:
--------------------------------------------------------------------------------
1 | import logger from "../util/logger";
2 |
3 | // Demonstrates the emoji logger output
4 | logger.success("Server Started");
5 | logger.request("Testing Login...");
6 | logger.error(new Error("Something went wrong"));
7 |


--------------------------------------------------------------------------------
/server/src/index.ts:
--------------------------------------------------------------------------------
 1 | import express from "express";
 2 | import { PlatformBuilder } from "@tsed/common";
 3 | import logger from "./util/logger";
 4 | import { PlatformExpress } from "@tsed/platform-express";
 5 | import { Server } from "./Server";
 6 | import mongoose from "mongoose";
 7 | import { Secrets } from "./util/secrets";
 8 |
 9 | import cron from "node-cron";
10 | import { notifyLeads, runJob } from "./cron/reminder";
11 |
12 | // Schedule the cron job to run every 5 minutes
13 | // cron.schedule("*/15 * * * *", async () => {
14 | //   const planners = await runJob();
15 | //   for (let i = 0; i < planners.length; i++) {
16 | //     const planner = planners[i];
17 | //     const { title, description, action } = planner;
18 | //   }
19 | // });
20 |
21 |
22 |
23 | // cron.schedule("*/15 * * * *", async () => {
24 | //   await notifyLeads();
25 | // });
26 |
27 | export class Application {
28 |   private app: express.Application;
29 |   private platform: PlatformBuilder;
30 |   public databaseConnection: any;
31 |
32 |   public async initializeServer() {
33 |     await Secrets.initialize();
34 |     // establish database connection with mongoose.connect()
35 |     this.databaseConnection = await mongoose.connect(process.env.DATABASE_URL || "");
36 |
37 |     try {
38 |       this.app = express();
39 |       this.platform = await PlatformExpress.bootstrap(Server, {
40 |         express: { app: this.app }
41 |       });
42 |     } catch (error) {
43 |       logger.error(error);
44 |     }
45 |   }
46 |
47 |   public async startServer() {
48 |     try {
49 |       await this.platform.listen();
50 |       logger.success("Server started...");
51 |     } catch (error) {
52 |       logger.error(error);
53 |     }
54 |   }
55 | }
56 |
57 | (async () => {
58 |   const application = new Application();
59 |   await application.initializeServer();
60 |   await application.startServer();
61 | })();
62 |


--------------------------------------------------------------------------------
/server/src/middleware/AuthMiddleware.ts:
--------------------------------------------------------------------------------
 1 | import { Context, Inject, Middleware, Req } from "@tsed/common";
 2 | import { OrganizationService } from "../services/OrganizationService";
 3 | import { AdminService } from "../services/AdminService";
 4 | import { Forbidden } from "@tsed/exceptions";
 5 | import { ORG_NOT_FOUND } from "../util/errors";
 6 |
 7 | /**
 8 |  * Authenticates users based on the Authorization header
 9 |  */
10 | @Middleware()
11 | export class AuthMiddleware {
12 |   @Inject()
13 |   public adminService: AdminService;
14 |   @Inject()
15 |   public organizationService: OrganizationService;
16 |
17 |   public async use(@Req() req: Req, @Context() ctx: Context) {
18 |     const isPublicRoute =
19 |       ctx.request.url.startsWith("/docs") || ctx.request.url.startsWith("/rest/auth") || ctx.request.url.startsWith("/rest/dynamic/webhook/");
20 |     const adminToken = req?.headers?.authorization || req.headers.cookie?.split("session=")[1];
21 |     if (adminToken && !isPublicRoute) {
22 |       const admin = await this.adminService.getActiveAdmin(adminToken);
23 |       if (!admin.orgId) throw new Forbidden(ORG_NOT_FOUND);
24 |       const org = await this.organizationService.findOrganizationById(admin.orgId);
25 |       if (!org) throw new Forbidden(ORG_NOT_FOUND);
26 |       const _admin = { ...admin.toObject(), company: org.name, id: admin._id };
27 |       ctx.set("user", _admin);
28 |       return;
29 |     }
30 |
31 |     if (ctx.has("user") || isPublicRoute) {
32 |       return;
33 |     }
34 |   }
35 | }
36 |


--------------------------------------------------------------------------------
/server/src/models/AvailabilityModel.ts:
--------------------------------------------------------------------------------
 1 | import { Model, ObjectID, Ref } from "@tsed/mongoose";
 2 | import { CollectionOf, Default, Property, Required } from "@tsed/schema";
 3 | import { AdminModel } from "./AdminModel";
 4 | import { SaleRepModel } from "./SaleRepModel";
 5 |
 6 | @Model({ name: "availability" })
 7 | export class AvailabilityModel {
 8 |   @ObjectID("id")
 9 |   _id: string;
10 |
11 |   @Required()
12 |   startDate: number;
13 |
14 |   @Required()
15 |   endDate: number;
16 |
17 |   @Property()
18 |   adminId: string;
19 |
20 |   @Property()
21 |   @Default(new Date())
22 |   createdAt: Date;
23 |
24 |   @Property()
25 |   @Default(new Date())
26 |   updatedAt: Date;
27 |
28 |   @Ref(() => AdminModel)
29 |   admin: Ref<AdminModel>;
30 |
31 |   @Ref(() => SaleRepModel)
32 |   @CollectionOf(() => SaleRepModel)
33 |   saleRep: Ref<SaleRepModel>[];
34 | }
35 |


--------------------------------------------------------------------------------
/server/src/models/CategoryModel.ts:
--------------------------------------------------------------------------------
 1 | import { ArrayOf, CollectionOf, Default, Property } from "@tsed/schema";
 2 | import { Model, ObjectID, Ref } from "@tsed/mongoose";
 3 | import { AdminModel } from "./AdminModel";
 4 | import { OrganizationModel } from "./OrganizationModel";
 5 | import { PlannerModel } from "./PlannerModel";
 6 |
 7 | export type CategoryFieldType = {
 8 |   name: string;
 9 |   type: string;
10 | };
11 |
12 | @Model({ name: "category" })
13 | export class CategoryModel {
14 |   @ObjectID("id")
15 |   _id: string;
16 |
17 |   @Property()
18 |   name: string;
19 |
20 |   @Property()
21 |   description: string;
22 |
23 |   @ArrayOf(Object)
24 |   fields: CategoryFieldType[];
25 |
26 |   @Property()
27 |   adminId: string;
28 |
29 |   @Property()
30 |   orgId: string;
31 |
32 |   @Property()
33 |   @Default(new Date())
34 |   createdAt: Date;
35 |
36 |   @Property()
37 |   @Default(new Date())
38 |   updatedAt: Date;
39 |
40 |   @Ref(() => AdminModel)
41 |   admin: Ref<AdminModel>;
42 |
43 |   @Ref(() => OrganizationModel)
44 |   org: Ref<OrganizationModel>;
45 |
46 |   @Ref(() => PlannerModel)
47 |   @CollectionOf(() => PlannerModel)
48 |   planners: Ref<PlannerModel>[];
49 | }
50 |


--------------------------------------------------------------------------------
/server/src/models/LeadsModel.ts:
--------------------------------------------------------------------------------
 1 | import { Default, Property, Enum } from "@tsed/schema";
 2 | import { Model, ObjectID, Ref } from "@tsed/mongoose";
 3 | import { OrganizationModel } from "./OrganizationModel";
 4 | import { CategoryModel } from "./CategoryModel";
 5 | import { AdminModel } from "./AdminModel";
 6 | import { LeadStatusEnum } from "../../types";
 7 | import { SaleRepModel } from "./SaleRepModel";
 8 |
 9 | @Model({ name: "leads" })
10 | export class LeadModel {
11 |   @ObjectID("id")
12 |   _id: string;
13 |
14 |   @Property()
15 |   source: string;
16 |
17 |   @Property()
18 |   @Enum(LeadStatusEnum)
19 |   status: LeadStatusEnum;
20 |
21 |   @Property()
22 |   leadId: string;
23 |
24 |   @Property()
25 |   categoryId: string;
26 |
27 |   @Property()
28 |   adminId: string;
29 |
30 |   @Property()
31 |   @Default(new Date())
32 |   createdAt: Date;
33 |
34 |   @Property()
35 |   @Default(new Date())
36 |   updatedAt: Date;
37 |
38 |   @Ref(() => CategoryModel)
39 |   category: Ref<CategoryModel>;
40 |
41 |   @Ref(() => OrganizationModel)
42 |   org: Ref<OrganizationModel>;
43 |
44 |   @Ref(() => AdminModel)
45 |   admin: Ref<AdminModel>;
46 |
47 |   @Ref(() => SaleRepModel)
48 |   lead: Ref<SaleRepModel>;
49 | }
50 |


--------------------------------------------------------------------------------
/server/src/models/OrganizationModel.ts:
--------------------------------------------------------------------------------
 1 | import { CollectionOf, Default, Property, Required } from "@tsed/schema";
 2 | import { Model, ObjectID, Ref, Unique } from "@tsed/mongoose";
 3 | import { AdminModel } from "./AdminModel";
 4 | import { CategoryModel } from "./CategoryModel";
 5 | import { LeadModel } from "./LeadsModel";
 6 | import { PlannerModel } from "./PlannerModel";
 7 |
 8 | @Model({ name: "org" })
 9 | export class OrganizationModel {
10 |   @ObjectID("id")
11 |   _id: string;
12 |
13 |   @Unique()
14 |   @Required()
15 |   name: string;
16 |
17 |   @Unique()
18 |   @Required()
19 |   email: string;
20 |
21 |   @Property()
22 |   @Default(new Date())
23 |   createdAt: Date;
24 |
25 |   @Property()
26 |   @Default(new Date())
27 |   updatedAt: Date;
28 |
29 |   @Ref(() => AdminModel)
30 |   @CollectionOf(() => AdminModel)
31 |   admins: Ref<AdminModel>[];
32 |
33 |   @Ref(() => CategoryModel)
34 |   @CollectionOf(() => CategoryModel)
35 |   categories: Ref<CategoryModel>[];
36 |
37 |   @Ref(() => LeadModel)
38 |   @CollectionOf(() => LeadModel)
39 |   leads: Ref<LeadModel>[];
40 |
41 |   @Ref(() => PlannerModel)
42 |   @CollectionOf(() => PlannerModel)
43 |   planners: Ref<PlannerModel>[];
44 | }
45 |


--------------------------------------------------------------------------------
/server/src/models/PlannerModel.ts:
--------------------------------------------------------------------------------
 1 | import { Model, ObjectID, Ref } from "@tsed/mongoose";
 2 | import { Default, Property, Required } from "@tsed/schema";
 3 | import { SocialAction } from "../../types";
 4 | import { AdminModel } from "./AdminModel";
 5 | import { OrganizationModel } from "./OrganizationModel";
 6 | import { CategoryModel } from "./CategoryModel";
 7 |
 8 | @Model({ name: "planner" })
 9 | export class PlannerModel {
10 |   @ObjectID("id")
11 |   _id: string;
12 |
13 |   @Required()
14 |   title: string;
15 |
16 |   @Property()
17 |   action: SocialAction;
18 |
19 |   @Property()
20 |   description: string;
21 |
22 |   @Property()
23 |   categoryId: string;
24 |
25 |   @Required()
26 |   timeOfExecution: string;
27 |
28 |   @Required()
29 |   startDate: Date;
30 |
31 |   @Property()
32 |   orgId: string;
33 |
34 |   @Property()
35 |   adminId: string;
36 |
37 |   @Property()
38 |   @Default(new Date())
39 |   createdAt: Date;
40 |
41 |   @Property()
42 |   @Default(new Date())
43 |   updatedAt: Date;
44 |
45 |   @Ref(() => OrganizationModel)
46 |   organization: Ref<OrganizationModel>;
47 |
48 |   @Ref(() => AdminModel)
49 |   admin: Ref<AdminModel>;
50 |
51 |   @Ref(() => CategoryModel)
52 |   category: Ref<CategoryModel>;
53 | }
54 |


--------------------------------------------------------------------------------
/server/src/models/RoleModel.ts:
--------------------------------------------------------------------------------
 1 | import { Model, ObjectID, Ref } from "@tsed/mongoose";
 2 | import { Default, Property, Required } from "@tsed/schema";
 3 |
 4 | @Model({ name: "role" })
 5 | export class RoleModel {
 6 |   @ObjectID("id")
 7 |   _id: string;
 8 |
 9 |   @Required()
10 |   name: string;
11 |
12 |   @Property()
13 |   @Default(new Date())
14 |   createdAt: Date;
15 |
16 |   @Property()
17 |   @Default(new Date())
18 |   updatedAt: Date;
19 | }
20 |


--------------------------------------------------------------------------------
/server/src/models/SaleRepModel.ts:
--------------------------------------------------------------------------------
 1 | import { Model, ObjectID, Ref } from "@tsed/mongoose";
 2 | import { CollectionOf, Default, Property } from "@tsed/schema";
 3 | import { AdminModel } from "./AdminModel";
 4 | import { AvailabilityModel } from "./AvailabilityModel";
 5 | import { LeadModel } from "./LeadsModel";
 6 |
 7 | @Model({ name: "saleRep" })
 8 | export class SaleRepModel {
 9 |   @ObjectID("id")
10 |   _id: string;
11 |
12 |   @Property()
13 |   score: number;
14 |
15 |   @Property()
16 |   offerTime: number;
17 |
18 |   @Property()
19 |   availabilityStatus: boolean;
20 |
21 |   @Property()
22 |   availabilityId: string;
23 |
24 |   @Property()
25 |   adminId: string;
26 |
27 |   @Property()
28 |   leads: string[];
29 |
30 |   @Property()
31 |   @Default(new Date())
32 |   createdAt: Date;
33 |
34 |   @Property()
35 |   @Default(new Date())
36 |   updatedAt: Date;
37 |
38 |   @Ref(() => AdminModel)
39 |   admin: Ref<AdminModel>;
40 |
41 |   @Ref(() => AvailabilityModel)
42 |   @CollectionOf(() => AvailabilityModel)
43 |   availability: Ref<AvailabilityModel>[];
44 |
45 |   @Ref(() => LeadModel)
46 |   @CollectionOf(() => LeadModel)
47 |   lead: Ref<LeadModel>[];
48 | }
49 |


--------------------------------------------------------------------------------
/server/src/models/VerificationModel.ts:
--------------------------------------------------------------------------------
 1 | import { Model, ObjectID } from "@tsed/mongoose";
 2 | import { Default, Enum, Property } from "@tsed/schema";
 3 |
 4 | enum TypeEnum {
 5 |   EMAIL = "email",
 6 |   PASSWORD = "password"
 7 | }
 8 |
 9 | @Model({ name: "verification" })
10 | export class VerificationModel {
11 |   @ObjectID("id")
12 |   _id: string;
13 |
14 |   @Property()
15 |   email: string;
16 |
17 |   @Property()
18 |   @Default(false)
19 |   verified: boolean;
20 |
21 |   @Property()
22 |   code: string;
23 |
24 |   @Property()
25 |   expiry: Date;
26 |
27 |   @Enum(TypeEnum)
28 |   type: TypeEnum;
29 |
30 |   @Property()
31 |   @Default(new Date())
32 |   createdAt: Date;
33 |
34 |   @Property()
35 |   @Default(new Date())
36 |   updatedAt: Date;
37 | }
38 |


--------------------------------------------------------------------------------
/server/src/models/VerifySessionModal.ts:
--------------------------------------------------------------------------------
 1 | import { Model, ObjectID, Ref } from "@tsed/mongoose";
 2 | import { Default, Property } from "@tsed/schema";
 3 | import { AdminModel } from "./AdminModel";
 4 |
 5 | @Model({ name: "verification-session" })
 6 | export class VerifySessionModal {
 7 |   @ObjectID("id")
 8 |   _id: string;
 9 |
10 |   @Property()
11 |   token: string;
12 |
13 |   @Property()
14 |   @Default(false)
15 |   logout: boolean;
16 |
17 |   @Property()
18 |   adminId: string;
19 |
20 |   @Property()
21 |   logoutAt: Date;
22 |
23 |   @Property()
24 |   loginAt: Date;
25 |
26 |   @Property()
27 |   @Default(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
28 |   expiry: Date;
29 |
30 |   @Property()
31 |   @Default(new Date())
32 |   createdAt: Date;
33 |
34 |   @Property()
35 |   @Default(new Date())
36 |   updatedAt: Date;
37 |
38 |   @Property()
39 |   @Default(false)
40 |   verified: boolean;
41 |
42 |   @Ref(() => AdminModel)
43 |   admin: Ref<AdminModel>;
44 | }
45 |


--------------------------------------------------------------------------------
/server/src/services/AvailabilityService.ts:
--------------------------------------------------------------------------------
 1 | import { Inject, Injectable } from "@tsed/di";
 2 | import { MongooseModel } from "@tsed/mongoose";
 3 | import { AvailabilityDataTypes } from "../../types";
 4 | import { AvailabilityModel } from "../models/AvailabilityModel";
 5 | import { SaleRepModel } from "../models/SaleRepModel";
 6 |
 7 | @Injectable()
 8 | export class AvailabilityService {
 9 |   // constructor(@Inject(PlannerModel) private planner: MongooseModel<PlannerModel>) {}
10 |   @Inject(AvailabilityModel) private availability: MongooseModel<AvailabilityModel>;
11 |   @Inject(SaleRepModel) private saleRep: MongooseModel<SaleRepModel>;
12 |
13 |   public async findAvailability() {
14 |     return await this.availability.find();
15 |   }
16 |
17 |   public async findAvailabilityById(id: string) {
18 |     return await this.availability.findById({ _id: id });
19 |   }
20 |
21 |   public async createAvailability({ startDate, endDate, adminId }: AvailabilityDataTypes) {
22 |     return await this.availability.create({
23 |       startDate,
24 |       endDate,
25 |       adminId
26 |     });
27 |   }
28 |   public async deleteAvailability(id: string) {
29 |     return await this.availability.deleteOne({ _id: id });
30 |   }
31 |
32 |   public async findAvailabilityByAdminId(adminId: string) {
33 |     return await this.availability.find({ adminId });
34 |   }
35 |
36 |   // find availability that does not greater than the current date
37 |   public async findAvailabilityByDateAndRep(repId: string) {
38 |     const currentDate = new Date().getTime();
39 |     const availability = await this.availability.find({
40 |       startDate: { $lte: currentDate },
41 |       endDate: { $gte: currentDate },
42 |       adminId: repId
43 |     });
44 |     if (availability.length) return false;
45 |     return true;
46 |   }
47 | }
48 |


--------------------------------------------------------------------------------
/server/src/services/OrganizationService.ts:
--------------------------------------------------------------------------------
 1 | import { Inject, Injectable } from "@tsed/di";
 2 | import { MongooseModel } from "@tsed/mongoose";
 3 | import { OrganizationModel } from "../models/OrganizationModel";
 4 |
 5 | @Injectable()
 6 | export class OrganizationService {
 7 |   constructor(@Inject(OrganizationModel) private orgModel: MongooseModel<OrganizationModel>) {}
 8 |
 9 |   public async createOrganization({ name, email }: { name: string; email: string }) {
10 |     const model = await this.orgModel.create({
11 |       name,
12 |       email
13 |     });
14 |     return model;
15 |   }
16 |
17 |   public async findOrganizations() {
18 |     return await this.orgModel.find();
19 |   }
20 |
21 |   public async findOrganizationByName(name: string) {
22 |     return await this.orgModel.findOne({ name });
23 |   }
24 |
25 |   public async findOrganizationById(id: string) {
26 |     return await this.orgModel.findById({ _id: id });
27 |   }
28 |
29 |   public async findOrganization() {
30 |     return await this.orgModel.findOne();
31 |   }
32 | }
33 |


--------------------------------------------------------------------------------
/server/src/services/PlannerService.ts:
--------------------------------------------------------------------------------
 1 | import { Inject, Injectable } from "@tsed/di";
 2 | import { MongooseModel } from "@tsed/mongoose";
 3 | import { PlannerDataTypes } from "../../types";
 4 | import { PlannerModel } from "../models/PlannerModel";
 5 |
 6 | @Injectable()
 7 | export class PlannerService {
 8 |   // constructor(@Inject(PlannerModel) private planner: MongooseModel<PlannerModel>) {}
 9 |   @Inject(PlannerModel) private planner: MongooseModel<PlannerModel>;
10 |
11 |   public async findPlanner() {
12 |     return await this.planner.find();
13 |   }
14 |
15 |   public async findPlannerById(id: string) {
16 |     return await this.planner.findById({ _id: id });
17 |   }
18 |
19 |   public async createPlanner({ title, action, description, startDate, timeOfExecution, orgId, adminId, categoryId }: PlannerDataTypes) {
20 |     return await this.planner.create({
21 |       title,
22 |       action,
23 |       description,
24 |       startDate: new Date(startDate),
25 |       timeOfExecution,
26 |       orgId,
27 |       adminId,
28 |       categoryId
29 |     });
30 |   }
31 | }
32 |


--------------------------------------------------------------------------------
/server/src/services/RoleService.ts:
--------------------------------------------------------------------------------
 1 | import { Inject, Injectable } from "@tsed/di";
 2 | import { RoleModel } from "../models/RoleModel";
 3 | import { CategoryBodyTypes, FieldTypes, RoleBodyTypes } from "types";
 4 | import { MongooseModel } from "@tsed/mongoose";
 5 |
 6 | @Injectable()
 7 | export class RoleService {
 8 |   constructor(
 9 |     @Inject(RoleModel) private role: MongooseModel<RoleModel>,
10 |   ) {}
11 |
12 |   public async findRoles() {
13 |     return await this.role.find();
14 |   }
15 |
16 |   public async findRoleById(name: string) {
17 |     return await this.role.findOne({name});
18 |   }
19 |
20 |   public async createRole({name}: RoleBodyTypes) {
21 |     return await this.role.create({ name: name });
22 |   }
23 |
24 |   public async updateRole({ _id, name}: RoleBodyTypes & { _id: string }) {
25 |     return await this.role.findByIdAndUpdate(_id, { name});
26 |   }
27 |
28 |   public async findRole() {
29 |     return await this.role.findOne();
30 |   }
31 |
32 | }
33 |


--------------------------------------------------------------------------------
/server/src/util/EmojiAppender.ts:
--------------------------------------------------------------------------------
 1 | import {Appender, BaseAppender, LogEvent} from "@tsed/logger";
 2 | import { summaryConfig } from "../config/logger/summaryConfig";
 3 | import { formatArg } from "./logger";
 4 |
 5 | const RED = "\x1b[31m";
 6 | const RESET = "\x1b[0m";
 7 |
 8 | /**
 9 |  * EmojiAppender formats Ts.ED log events into single-line messages
10 |  * prefixed with emojis. Only error messages are colored in red and
11 |  * the remaining log data is printed on subsequent lines.
12 |  */
13 | @Appender({name: "emoji"})
14 | export class EmojiAppender extends BaseAppender {
15 |   write(event: LogEvent): void {
16 |     let [first, ...rest] = event.data || [];
17 |     let category: string | undefined;
18 |     const last = rest[rest.length - 1];
19 |     if (typeof last === "string" && summaryConfig[last]) {
20 |       category = last;
21 |       rest = rest.slice(0, -1);
22 |     }
23 |     const message = first instanceof Error ? first.message : formatArg(first, category);
24 |
25 |     switch (event.level.toString().toLowerCase()) {
26 |       case "error":
27 |         process.stdout.write(`❌ ${RED}${message}${RESET}\n`);
28 |         if (first instanceof Error) {
29 |           const clone: any = {...first};
30 |           delete clone.message;
31 |           if (Object.keys(clone).length) {
32 |             process.stdout.write(formatArg(clone, category) + "\n");
33 |           }
34 |           if (first.stack) {
35 |             process.stdout.write(first.stack + "\n");
36 |           }
37 |         } else if (rest.length) {
38 |           process.stdout.write(rest.map(r => formatArg(r, category)).join(" ") + "\n");
39 |         }
40 |         break;
41 |       case "warn":
42 |         process.stdout.write(`⚠️ ${message}\n`);
43 |         break;
44 |       default:
45 |         // info/debug
46 |         process.stdout.write(`➡️ ${message}\n`);
47 |         break;
48 |     }
49 |   }
50 | }
51 |


--------------------------------------------------------------------------------
/server/src/util/__tests__/emojiAppender.test.ts:
--------------------------------------------------------------------------------
 1 | import "../../config/logger";
 2 | import { $log } from "@tsed/common";
 3 |
 4 | describe("EmojiAppender", () => {
 5 |   it("summarizes object info logs", () => {
 6 |     const spy = jest.spyOn(process.stdout, "write").mockImplementation(() => true as any);
 7 |     $log.info({ b: 1, a: 2, d: 3, c: 4 });
 8 |     expect(spy).toHaveBeenCalledWith(`➡️ {\"a\":2,\"b\":1,\"c\":4}\n`);
 9 |     spy.mockRestore();
10 |   });
11 |
12 |   it("summarizes object error logs with category", () => {
13 |     const spy = jest.spyOn(process.stdout, "write").mockImplementation(() => true as any);
14 |     $log.error({ code: 1, message: "bad", extra: true }, "error");
15 |     expect(spy).toHaveBeenCalledWith(`❌ \x1b[31m{\"code\":1,\"message\":\"bad\"}\x1b[0m\n`);
16 |     spy.mockRestore();
17 |   });
18 | });
19 |


--------------------------------------------------------------------------------
/server/src/util/__tests__/logger.test.ts:
--------------------------------------------------------------------------------
 1 | import logger, { emoji } from '../logger';
 2 |
 3 | describe('logger', () => {
 4 |   it('prints success with emoji', () => {
 5 |     const spy = jest.spyOn(console, 'log').mockImplementation();
 6 |     logger.success('ok');
 7 |     expect(spy).toHaveBeenCalledWith(emoji.success, 'ok');
 8 |     spy.mockRestore();
 9 |   });
10 |
11 |   it('prints error in red', () => {
12 |     const spy = jest.spyOn(console, 'error').mockImplementation();
13 |     logger.error(new Error('fail'));
14 |     expect(spy.mock.calls[0][0]).toBe(emoji.error);
15 |     expect(spy.mock.calls[0][1]).toContain('\x1b[31mfail\x1b[0m');
16 |     spy.mockRestore();
17 |   });
18 |
19 |   it('summarizes object arguments with category', () => {
20 |     const spy = jest.spyOn(console, 'log').mockImplementation();
21 |     logger.request('Loaded user', { id: '1', email: 'a', role: 'b' }, 'user');
22 |     expect(spy).toHaveBeenCalledWith(
23 |       emoji.request,
24 |       'Loaded user',
25 |       '{"id":"1","email":"a"}'
26 |     );
27 |     spy.mockRestore();
28 |   });
29 |
30 |   it('summarizes object arguments by default', () => {
31 |     const spy = jest.spyOn(console, 'log').mockImplementation();
32 |     logger.request({ b: 1, a: 2, d: 3, c: 4 });
33 |     expect(spy).toHaveBeenCalledWith(
34 |       emoji.request,
35 |       '{"a":2,"b":1,"c":4}'
36 |     );
37 |     spy.mockRestore();
38 |   });
39 | });
40 |


--------------------------------------------------------------------------------
/server/src/util/constants.ts:
--------------------------------------------------------------------------------
1 | export const ADMIN = "CRM System Administrator";
2 | export const MANAGER = "manager";
3 | export const SALESREP = "salesrep";
4 | export const ORGANIZATION = "organization";
5 | export const EMAIL = "email";
6 | export const PASSWORD = "password";
7 |


--------------------------------------------------------------------------------
/server/src/util/crypto.ts:
--------------------------------------------------------------------------------
 1 | import CryptoJS from "crypto-js";
 2 |
 3 | const { ENCRYPTION_KEY } = process.env;
 4 |
 5 | const secretKey = ENCRYPTION_KEY;
 6 | const IV = "16";
 7 |
 8 | // Function to encrypt a message
 9 | export const encrypt = (dataToEncrypt: string): string => {
10 |   if (!secretKey) throw new Error("ENCRYPTION_KEY not set");
11 |   const cipherText = CryptoJS.AES.encrypt(dataToEncrypt, secretKey, {
12 |     iv: CryptoJS.enc.Utf8.parse(IV),
13 |     mode: CryptoJS.mode.CBC,
14 |     padding: CryptoJS.pad.Pkcs7
15 |   });
16 |   return cipherText.toString();
17 | };
18 |
19 | // Function to decrypt an encrypted message
20 | export const decrypt = (dataToDecrypt: string): string => {
21 |   if (!secretKey) throw new Error("ENCRYPTION_KEY not set");
22 |   const bytes = CryptoJS.AES.decrypt(dataToDecrypt, secretKey, {
23 |     iv: CryptoJS.enc.Utf8.parse(IV),
24 |     mode: CryptoJS.mode.CBC,
25 |     padding: CryptoJS.pad.Pkcs7
26 |   });
27 |   return bytes.toString(CryptoJS.enc.Utf8);
28 | };
29 |


--------------------------------------------------------------------------------
/server/src/util/entities.ts:
--------------------------------------------------------------------------------
 1 | import { OnSerialize, serialize } from "@tsed/json-mapper";
 2 | import { Property, Required, Generics, CollectionOf } from "@tsed/schema";
 3 |
 4 | // @tsed/json-mapper isn't able to process generics for serialization
 5 | // so this hack keeps generics data for serialization
 6 | const serializationMap = new WeakMap<any, any>();
 7 |
 8 | @Generics("T")
 9 | export class SuccessResult<T> {
10 |   @Required() @Property() public success: boolean;
11 |   @OnSerialize((v) => serialize(v, { type: serializationMap.get(v) }))
12 |   @Property("T")
13 |   public data: T;
14 |
15 |   public constructor(data: T, clazz: { new (...args: any[]): T }) {
16 |     this.success = true;
17 |     this.data = data;
18 |     serializationMap.set(data, clazz);
19 |   }
20 | }
21 |
22 | @Generics("T")
23 | export class SuccessArrayResult<T> {
24 |   @Required() @Property() public success: boolean;
25 |   @OnSerialize((v) => serialize(v, { type: serializationMap.get(v) }))
26 |   @Property("T")
27 |   public data: T[];
28 |
29 |   public constructor(data: T[], clazz: { new (...args: any[]): T }) {
30 |     this.success = true;
31 |     this.data = data;
32 |     serializationMap.set(data, clazz);
33 |   }
34 | }
35 |
36 | @Generics("T")
37 | export class Pagination<T> {
38 |   @OnSerialize((v) => serialize(v, { type: serializationMap.get(v) }))
39 |   @CollectionOf("T")
40 |   public items: T[];
41 |   @Property() public total: number;
42 |
43 |   public constructor(items: T[], total: number, clazz: { new (...args: any[]): T }) {
44 |     this.items = items;
45 |     this.total = total;
46 |     serializationMap.set(items, clazz);
47 |   }
48 | }
49 |


--------------------------------------------------------------------------------
/server/src/util/secrets.ts:
--------------------------------------------------------------------------------
 1 | // import { promisify } from "util";
 2 | // import { readFile } from "fs";
 3 |
 4 | // const readFilePromise = promisify(readFile);
 5 |
 6 | export class Secrets {
 7 |   public static encryptionKey: string;
 8 |
 9 |   public static async initialize() {
10 |     Secrets.encryptionKey = process.env.ENCRYPTION_KEY!;
11 |   }
12 | }
13 |


--------------------------------------------------------------------------------
/server/tsconfig.compile.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "./tsconfig.json",
 3 |   "compilerOptions": {
 4 |     "baseUrl": ".",
 5 |     "outDir": "./dist",
 6 |     "moduleResolution": "node",
 7 |     "declaration": true,
 8 |     "noResolve": false,
 9 |     "preserveConstEnums": true,
10 |     "sourceMap": true,
11 |     "noEmit": false,
12 |     "emitDeclarationOnly": true,
13 |     "inlineSources": true
14 |   }
15 | }
16 |


--------------------------------------------------------------------------------
/server/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "compilerOptions": {
 3 |     "baseUrl": ".",
 4 |     "sourceRoot": "src",
 5 |     "module": "commonjs",
 6 |     "target": "esnext",
 7 |     "sourceMap": true,
 8 |     "declaration": false,
 9 |     "experimentalDecorators": true,
10 |     "emitDecoratorMetadata": true,
11 |     "moduleResolution": "node",
12 |     "isolatedModules": false,
13 |     "suppressImplicitAnyIndexErrors": false,
14 |     "noImplicitAny": true,
15 |     "strictNullChecks": true,
16 |     "noUnusedLocals": false,
17 |     "noUnusedParameters": false,
18 |     "allowSyntheticDefaultImports": true,
19 |     "importHelpers": true,
20 |     "newLine": "LF",
21 |     "noEmit": true,
22 |     "esModuleInterop": true,
23 |     "resolveJsonModule": true,
24 |     "lib": [
25 |       "es7",
26 |       "dom",
27 |       "ESNext.AsyncIterable"
28 |     ],
29 |     "typeRoots": [
30 |       "./node_modules/@types"
31 |     ]
32 |   },
33 |   "include": [
34 |     "src"
35 |   ],
36 |   "linterOptions": {
37 |     "exclude": []
38 |   }
39 | }
40 |


--------------------------------------------------------------------------------
/server/webpack.config.js:
--------------------------------------------------------------------------------
 1 | const webpack = require('webpack')
 2 | const path = require('path')
 3 |
 4 | const { NODE_ENV = 'development' } = process.env
 5 | const isProduction = NODE_ENV !== 'development'
 6 | const packages = require('./package.json')
 7 |
 8 | module.exports = {
 9 |   target: 'node',
10 |   devtool: false,
11 |
12 |   externals: [
13 |     ...Object.keys(packages.dependencies || {})
14 |   ],
15 |
16 |   plugins: [
17 |     new webpack.EnvironmentPlugin({
18 |       NODE_ENV,
19 |       WEBPACK_ENV: true
20 |     }),
21 |     !isProduction && new webpack.HotModuleReplacementPlugin()
22 |   ].filter(Boolean),
23 |
24 |   entry: [
25 |     !isProduction && 'webpack/hot/poll?1000',
26 |     path.resolve(path.join(__dirname, './src/index'))
27 |   ].filter(Boolean),
28 |
29 |   output: {
30 |     path: path.resolve(__dirname, 'dist'),
31 |     filename: 'app.bundle.js',
32 |     libraryTarget: 'commonjs2'
33 |   },
34 |
35 |   resolve: {
36 |     extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
37 |     modules: [
38 |       path.join(__dirname, '..', 'src'),
39 |       'node_modules'
40 |     ]
41 |   },
42 |
43 |   module: {
44 |     rules: [
45 |       {
46 |         // Include ts, tsx, js, and jsx files.
47 |         test: /\.(ts|js)x?$/,
48 |         exclude: /node_modules/,
49 |         loader: 'babel-loader',
50 |         options: {
51 |           babelrc: true,
52 |           cacheDirectory: true
53 |         }
54 |       }
55 |     ]
56 |   },
57 |
58 |   node: {
59 |     global: false,
60 |     __filename: false,
61 |     __dirname: false
62 |   }
63 | }
64 |
65 |
66 |


--------------------------------------------------------------------------------
/setup.sh:
--------------------------------------------------------------------------------
 1 | #!/usr/bin/env bash
 2 | set -euo pipefail
 3 |
 4 | # ─── 1) Detect Node manager or fall back ────────────────────────────────────────
 5 | if command -v volta >/dev/null 2>&1; then
 6 |   echo "🔧  Detected Volta — using the pin in package.json (volta key)"
 7 | elif [ -s "$HOME/.nvm/nvm.sh" ]; then
 8 |   echo "🔧  Loading nvm..."
 9 |   # shellcheck source=/dev/null
10 |   source "$HOME/.nvm/nvm.sh"
11 |   echo "🔧  Installing & using Node $(cat .nvmrc)..."
12 |   nvm install
13 |   nvm use
14 | elif command -v nvm >/dev/null 2>&1; then
15 |   echo "🔧  nvm in PATH — installing & using Node $(cat .nvmrc)..."
16 |   nvm install
17 |   nvm use
18 | else
19 |   echo "⚠️  No Volta or nvm found — falling back to system Node"
20 | fi
21 |
22 | # ─── 2) Report versions ─────────────────────────────────────────────────────────
23 | echo "📦  Node: $(node -v)   npm: $(npm -v)"
24 | echo "🔍  (If your package.json 'engines' field still complains, you can loosen it to \"node\": \">=18 <=20\".)"
25 |
26 | # ─── 3) Server: install deps ───────────────────────────────────────────────────
27 | echo "🔧  Installing server dependencies..."
28 | ( cd server && npm install )
29 |
30 | # ─── 4) Client: fix peer-deps & install ────────────────────────────────────────
31 | echo "🔧  Preparing client for install..."
32 | ( cd client && \
33 |     # bump date-fns so @date-io/date-fns@3.0.0 is happy
34 |     npm install date-fns@^3.6.0 && \
35 |     npm install
36 | )
37 |
38 | echo "✅  Setup complete!"
39 |


--------------------------------------------------------------------------------
/tests/client/components/add-lead/AddLead.test.tsx:
--------------------------------------------------------------------------------
 1 | import { render, screen, fireEvent } from '@testing-library/react';
 2 | import AddLead from '../../../../client/src/components/add-lead/AddLead';
 3 |
 4 | const sampleLeadValue = [
 5 |   { name: 'First Name', type: 'text', value: '' },
 6 | ];
 7 |
 8 | describe('AddLead component', () => {
 9 |   it('invokes callback on input change', () => {
10 |     const getAddLeadData = jest.fn();
11 |     render(<AddLead leadValue={sampleLeadValue} getAddLeadData={getAddLeadData} />);
12 |     const input = screen.getByLabelText('First Name');
13 |     fireEvent.change(input, { target: { value: 'John' } });
14 |     expect(getAddLeadData).toHaveBeenCalledWith('John', 'First Name', 0);
15 |   });
16 | });
17 |


--------------------------------------------------------------------------------
/tests/client/libs/client/apiClient.test.ts:
--------------------------------------------------------------------------------
 1 | import axios from 'axios';
 2 |
 3 | jest.mock('axios');
 4 |
 5 | // path to the module under test
 6 | const modulePath = '../../../../client/src/libs/client/apiClient';
 7 |
 8 | describe('apiClient', () => {
 9 |   beforeEach(() => {
10 |     jest.resetModules();
11 |     (axios.create as jest.Mock).mockClear();
12 |     delete (global as any).localStorage;
13 |   });
14 |
15 |   it('configures axios with the correct baseURL', () => {
16 |     const mockInstance = { interceptors: { request: { use: jest.fn() } } } as any;
17 |     (axios.create as jest.Mock).mockReturnValue(mockInstance);
18 |     const { baseURL } = require(modulePath);
19 |     const { default: client } = require(modulePath);
20 |
21 |     expect(axios.create).toHaveBeenCalledWith({
22 |       baseURL,
23 |       timeout: 30000,
24 |       withCredentials: true,
25 |     });
26 |     expect(client).toBe(mockInstance);
27 |   });
28 |
29 |   it('adds Authorization header from localStorage', () => {
30 |     const use = jest.fn();
31 |     (axios.create as jest.Mock).mockReturnValue({
32 |       interceptors: { request: { use } },
33 |     } as any);
34 |
35 |     (global as any).localStorage = {
36 |       getItem: jest.fn(() => 'token123'),
37 |       setItem: jest.fn(),
38 |       removeItem: jest.fn(),
39 |       clear: jest.fn(),
40 |     };
41 |
42 |     require(modulePath);
43 |
44 |     expect(use).toHaveBeenCalled();
45 |     const interceptor = use.mock.calls[0][0];
46 |     const config: any = { headers: {} };
47 |     interceptor(config);
48 |     expect(config.headers.Authorization).toBe('token123');
49 |   });
50 | });
51 |


--------------------------------------------------------------------------------
/tests/server/services/RoleService.test.ts:
--------------------------------------------------------------------------------
 1 | import { RoleService } from '../../../server/src/services/RoleService';
 2 |
 3 | describe('RoleService', () => {
 4 |   let roleModel: any;
 5 |   let service: RoleService;
 6 |
 7 |   beforeEach(() => {
 8 |     roleModel = {
 9 |       find: jest.fn(),
10 |       create: jest.fn(),
11 |       findByIdAndUpdate: jest.fn()
12 |     };
13 |     // cast as any to satisfy constructor
14 |     service = new RoleService(roleModel as any);
15 |   });
16 |
17 |   describe('findRoles', () => {
18 |     it('returns all roles from the model', async () => {
19 |       const roles = [{ name: 'admin' }, { name: 'user' }];
20 |       roleModel.find.mockResolvedValue(roles);
21 |
22 |       const result = await service.findRoles();
23 |
24 |       expect(roleModel.find).toHaveBeenCalled();
25 |       expect(result).toBe(roles);
26 |     });
27 |   });
28 |
29 |   describe('createRole', () => {
30 |     it('passes the role data to the model', async () => {
31 |       const payload = { name: 'manager' };
32 |       const created = { _id: '1', name: 'manager' };
33 |       roleModel.create.mockResolvedValue(created);
34 |
35 |       const result = await service.createRole(payload);
36 |
37 |       expect(roleModel.create).toHaveBeenCalledWith({ name: payload.name });
38 |       expect(result).toBe(created);
39 |     });
40 |   });
41 |
42 |   describe('updateRole', () => {
43 |     it('updates the role by id', async () => {
44 |       const payload = { _id: '1', name: 'salesrep' };
45 |       const updated = { _id: '1', name: 'salesrep' };
46 |       roleModel.findByIdAndUpdate.mockResolvedValue(updated);
47 |
48 |       const result = await service.updateRole(payload);
49 |
50 |       expect(roleModel.findByIdAndUpdate).toHaveBeenCalledWith(payload._id, { name: payload.name });
51 |       expect(result).toBe(updated);
52 |     });
53 |   });
54 | });
55 |


--------------------------------------------------------------------------------
````
