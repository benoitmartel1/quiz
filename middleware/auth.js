export default function(ctx) {
  if (ctx.route.fullPath === "/" || ctx.route.fullPath === "/login") return;

  //If no session logged, go to login page
  if (ctx.$db.auth.session() == null) {
    return ctx.redirect("/login");
  }
}
