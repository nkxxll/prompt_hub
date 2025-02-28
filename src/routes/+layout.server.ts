import type { PageServerLoad, RequestEvent } from "./$types";

export const load: PageServerLoad = (event: RequestEvent) => {
  return { user: event.locals.user };
}
