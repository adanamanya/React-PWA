/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import ShareImg72 from './resources/img/icon-72x72.png';
import ShareImg96 from './resources/img/icon-96x96.png';
import ShareImg128 from './resources/img/icon-128x128.png';
import ShareImg144 from './resources/img/icon-144x144.png';
import ShareImg152 from './resources/img/icon-152x152.png';
import ShareImg192 from './resources/img/icon-192x192.png';
import ShareImg384 from './resources/img/icon-384x384.png';
import ShareImg512 from './resources/img/icon-512x512.png';
import SocialShareImg from './resources/img/Social-Share-Image.png';

export default class Routes {
  apply(routeHandler) {
    const routes = [
      {
        path: '/',
        exact: true,
        component: import('./app/pages/Home'),
      },
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
      routeHandler.setPwaSchema({
        name: 'ReactPWA',
        short_name: 'PWA',
        dir: 'ltr',
        lang: 'en-US',
        orientation: 'any',
        start_url: '/',
        background_color: '#111',
        theme_color: '#111',
        display: 'standalone',
        description: 'Material UI implementation using ReactPWA',
        icons: [
          {
            src: ShareImg72,
            sizes: '72x72',
          },
          {
            src: ShareImg96,
            sizes: '96x96',
          },
          {
            src: ShareImg128,
            sizes: '128x128',
          },
          {
            src: ShareImg144,
            sizes: '144x144',
          },
          {
            src: ShareImg152,
            sizes: '152x152',
          },
          {
            src: ShareImg192,
            sizes: '192x192',
          },
          {
            src: ShareImg384,
            sizes: '384x384',
          },
          {
            src: ShareImg512,
            sizes: '512x512',
          },
        ],
      });
      // eslint-disable-next-line
      routeHandler.getDefaultSeoSchema = () => ({
        title: 'ReactPWA',
        name: 'ReactPWA',
        site_name: 'ReactPWA',
        image: SocialShareImg,
      });
    });
  }
}
