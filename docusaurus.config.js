// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenGOAL',
  tagline: ' Reviving the Language that Brought us the Jak & Daxter Series',
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false, // TODO disabling the switch makes the localstorage value not set
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
