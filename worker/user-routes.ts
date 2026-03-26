import { Hono } from "hono";
import type { Env } from './core-utils';
import { AppEntity, RequestEntity, LicenseEntity, UserEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { MOCK_APPS, MOCK_REQUESTS } from '@shared/mock-data';
import type { RequestStatus, UpdateStatusInput } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // APPS
  app.get('/api/apps', async (c) => {
    console.log('GET /api/apps hit');
    await AppEntity.ensureSeed(c.env);
    let result = await AppEntity.list(c.env, null, 100);
    console.log(`after ensureSeed: ${result.items.length} items`);
    if(result.items.length === 0) {
      console.log(`extra seeding triggered, seeding ${MOCK_APPS.length} items`);
      return ok(c, MOCK_APPS);
    }
    console.log(`final result.items.length: ${result.items.length}`);
    return ok(c, result.items);
  });
  // REQUESTS
  app.get('/api/requests', async (c) => {
    console.log('GET /api/requests hit');
    await RequestEntity.ensureSeed(c.env);
    let result = await RequestEntity.list(c.env, null, 100);
    console.log(`after ensureSeed: ${result.items.length} items`);
    if(result.items.length === 0) {
      console.log(`extra seeding triggered, seeding ${MOCK_REQUESTS.length} items`);
      return ok(c, MOCK_REQUESTS);
    }
    console.log(`final result.items.length: ${result.items.length}`);
    return ok(c, result.items);
  });
  app.post('/api/requests', async (c) => {
    const data = await c.req.json();
    if (!data.appId || !data.userId) return bad(c, 'Missing required fields');
    const request = await RequestEntity.create(c.env, {
      ...data,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    });
    return ok(c, request);
  });
  app.patch('/api/requests/:id', async (c) => {
    const id = c.req.param('id');
    const { status } = (await c.req.json()) as UpdateStatusInput;
    const entity = new RequestEntity(c.env, id);
    if (!(await entity.exists())) return notFound(c, 'Request not found');
    const updated = await entity.mutate(s => ({
      ...s,
      status,
      updatedAt: new Date().toISOString().split('T')[0]
    }));
    return ok(c, updated);
  });
  // LICENSES
  app.get('/api/licenses', async (c) => {
    console.log('GET /api/licenses hit');
    await LicenseEntity.ensureSeed(c.env);
    let result = await LicenseEntity.list(c.env, null, 100);
    console.log(`after ensureSeed: ${result.items.length} items`);
    if(result.items.length === 0) {
      console.log(`extra seeding triggered for licenses`);
      // Note: No MOCK_LICENSES imported, fallback to empty
      return ok(c, []);
    }
    console.log(`final result.items.length: ${result.items.length}`);
    return ok(c, result.items);
  });
  app.post('/api/licenses', async (c) => {
    const data = await c.req.json();
    const license = await LicenseEntity.create(c.env, {
      ...data,
      id: crypto.randomUUID(),
      status: 'active',
      grantedAt: new Date().toISOString().split('T')[0]
    });
    return ok(c, license);
  });
  app.delete('/api/licenses/:id', async (c) => {
    const id = c.req.param('id');
    const success = await LicenseEntity.delete(c.env, id);
    return ok(c, { success });
  });
}