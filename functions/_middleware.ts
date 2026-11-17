export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  // Route don.aegntic.ai (and don-bot.aegntic.ai) to /don-bot/* static assets
  if (host === 'don.aegntic.ai' || host === 'don-bot.aegntic.ai' || host.startsWith('don.')) {
    const path = url.pathname;
    if (path === '/' || path === '/index.html') {
      const targetUrl = new URL('/don-bot/index.html', url.origin);
      targetUrl.search = url.search;
      return context.env.ASSETS.fetch(new Request(targetUrl.toString(), context.request));
    }
    if (path.startsWith('/cards/')) {
      const targetUrl = new URL(`/don-bot${path}`, url.origin);
      return context.env.ASSETS.fetch(new Request(targetUrl.toString(), context.request));
    }
  }

  return context.next();
};
