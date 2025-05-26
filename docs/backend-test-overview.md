# Backend Test Overview

This document summarizes test coverage for the server routes and service modules.

## /auth

### POST /auth/login
- [tests/server/integration/auth.integration.test.ts](../tests/server/integration/auth.integration.test.ts)

### POST /auth/verify
- [tests/server/integration/auth.integration.test.ts](../tests/server/integration/auth.integration.test.ts)

### POST /auth/register
- [tests/server/integration/auth.integration.test.ts](../tests/server/integration/auth.integration.test.ts)

## /admin

### GET /admin/me
- [tests/server/controllers/AdminController.test.ts](../tests/server/controllers/AdminController.test.ts)

## /org

_No tests currently cover the organization routes._

## Service Module Coverage

Unit tests exercise the following service modules:
- **AdminService** - [tests/server/services/AdminService.test.ts](../tests/server/services/AdminService.test.ts)
- **RoleService** - [tests/server/services/RoleService.test.ts](../tests/server/services/RoleService.test.ts)
- **VerificationService** - [tests/server/services/VerificationService.test.ts](../tests/server/services/VerificationService.test.ts)

