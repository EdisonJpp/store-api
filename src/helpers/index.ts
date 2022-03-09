export const SALT_ROUNDS = 14;

export const isAuthenticated =(ctx: any) => {
  if (!!ctx.isAuthenticated) throw Error("Unauthenticated");
}

export const generateSlug = (initialValue: string) => (
    initialValue.toLocaleLowerCase().split(" ").join("-") +
    "-" +
    new Date().getTime())
