import { Hono } from "hono";
import type { Env } from './core-utils';
import { AppEntity, RequestEntity, LicenseEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import { MOCK_APPS, MOCK_REQUESTS } from '@shared/mock-data';
import type { UpdateStatusInput } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // APPS
  app.get('/api/apps', async (c) => {
    // Robust seeding for Phase 4: ensure the index is populated with the expanded catalog
    await AppEntity.ensureSeed(c.env);
    const result = await AppEntity.list(c.env, null, 100);
    // Always return full MOCK_APPS if store is empty or for initial sync to ensure consistency
    if (result.items.length < MOCK_APPS.length) {
      console.log(`Synchronizing app entities... (${result.items.length}/${MOCK_APPS.length})`);
      // Update entities that might be missing or need updates from expanded mock data
      await Promise.all(MOCK_APPS.map(app => new AppEntity(c.env, app.id).save(app)));
      return ok(c, MOCK_APPS);
    }
    return ok(c, result.items);
  });
  // REQUESTS
  app.get('/api/requests', async (c) => {
    await RequestEntity.ensureSeed(c.env);
    const result = await RequestEntity.list(c.env, null, 100);
    // Fallback if seeding hasn't hit Durable Object yet
    if (result.items.length === 0) return ok(c, MOCK_REQUESTS);
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
    const result = await LicenseEntity.list(c.env, null, 100);
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