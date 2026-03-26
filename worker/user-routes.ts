import { Hono } from "hono";
import type { Env } from './core-utils';
import { AppEntity, RequestEntity, LicenseEntity, ActivityEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import { MOCK_APPS, MOCK_REQUESTS, MOCK_LICENSES, MOCK_ACTIVITIES } from '@shared/mock-data';
import type { UpdateStatusInput } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // APPS
  app.get('/api/apps', async (c) => {
    const result = await AppEntity.list(c.env, null, 100);
    if (result.items.length === 0) {
      await AppEntity.ensureSeed(c.env);
      const freshResult = await AppEntity.list(c.env, null, 100);
      return ok(c, freshResult.items.length > 0 ? freshResult.items : MOCK_APPS);
    }
    return ok(c, result.items);
  });
  // REQUESTS
  app.get('/api/requests', async (c) => {
    const result = await RequestEntity.list(c.env, null, 100);
    if (result.items.length === 0) {
      await RequestEntity.ensureSeed(c.env);
      const freshResult = await RequestEntity.list(c.env, null, 100);
      return ok(c, freshResult.items.length > 0 ? freshResult.items : MOCK_REQUESTS);
    }
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
    if (result.items.length === 0) {
      await LicenseEntity.ensureSeed(c.env);
      const freshResult = await LicenseEntity.list(c.env, null, 100);
      return ok(c, freshResult.items.length > 0 ? freshResult.items : MOCK_LICENSES);
    }
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
  // ACTIVITIES
  app.get('/api/activities', async (c) => {
    const result = await ActivityEntity.list(c.env, null, 100);
    if (result.items.length === 0) {
      await ActivityEntity.ensureSeed(c.env);
      const freshResult = await ActivityEntity.list(c.env, null, 100);
      return ok(c, freshResult.items.length > 0 ? freshResult.items : MOCK_ACTIVITIES);
    }
    return ok(c, result.items);
  });
}