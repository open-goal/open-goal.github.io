// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenGOAL',
  tagline: 'Reviving the Language that Brought us the Jak & Daxter Series',
  url: 'https://open-goal.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'open-goal', // Usually your GitHub org/user name.
  projectName: 'open-goal.github.io', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.74/dist/shoelace.js',
      type: "module",
    }
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&family=Roboto+Mono:wght@400;700&display=swap',
    'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.74/dist/themes/dark.css'
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "documentation",
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/open-goal/open-goal.github.io/tree/master/'
        },
        blog: {
          showReadingTime: true,
          editUrl:
          'https://github.com/open-goal/open-goal.github.io/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: 'YAP33BKRCA',
        // Public API key: it is safe to commit it
        apiKey: '7d68c3181a134366b669225073fed1cb',
        indexName: 'open-goal',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
        //... other Algolia params
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'OpenGOAL',
        logo: {
          alt: 'OpenGOAL Logo',
          src: 'img/logo.png',
        },
        items: [
          {to: '/progress', label: 'Progress', position: 'left'},
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          // {to: '/gallery', label: 'Gallery', position: 'left'},
          {
            href: 'https://github.com/open-goal',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} OpenGOAL. Built with Docusaurus.`,
      },
      prism: {
        theme: darkCodeTheme,
        lightTheme: lightCodeTheme,
        additionalLanguages: ['lisp', 'clojure']
      },
    }),
};

module.exports = config;
