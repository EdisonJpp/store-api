export const SALT_ROUNDS = 14;

export function isAuthenticated(ctx: any): boolean {
  if (ctx.is_authenticated) return true;
  throw Error("Unauthenticated");
}
