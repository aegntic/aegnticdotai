export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  // Route don.aegntic.ai (and don-bot.aegntic.ai) to /don-bot/* static assets
  if (host === 'don.aegntic.ai' || host === 'don-bot.aegntic.ai' || host.startsWith('don.')) {
    const path = url.pathname;
    const asset = (p: string) =>
      context.env.ASSETS.fetch(new Request(new URL(p, url.origin).toString(), context.request));

    if (path === '/' || path === '/index.html') {
      const target = new URL('/don-bot/', url.origin);
      target.search = url.search;
      return context.env.ASSETS.fetch(new Request(target.toString(), context.request));
    }
    if (path.startsWith('/cards/')) return asset(`/don-bot${path}`);
    if (path === '/favicon.ico') return asset('/don-bot/favicon.ico');
    if (path === '/favicon.png' || path === '/apple-touch-icon.png') return asset('/don-bot/apple-touch-icon.png');

    // Any other page route belongs to the main site, not the Don subdomain.
    const isPageRoute = !/\.[a-z0-9]+$/i.test(path);
    const isDonOrApi = path.startsWith('/don-bot/') || path.startsWith('/api/');
    if (isPageRoute && !isDonOrApi) {
      return Response.redirect(`https://aegntic.ai${path}${url.search}`, 301);
    }
  }

  return context.next();
};
