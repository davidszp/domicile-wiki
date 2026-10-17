// The Worker in front of the static site (web/, see wrangler.jsonc): www.domicile.wiki redirects
// permanently to domicile.wiki, so search engines see one address; everything else is the site itself.
export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.domicile.wiki") {
      url.hostname = "domicile.wiki";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
