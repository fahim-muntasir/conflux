// import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
 
export const appRouter = createTRPCRouter({
  health: baseProcedure.query(async () => {
    // throw new Error('Health check failed');
    return { status: 'ok' };
  }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;