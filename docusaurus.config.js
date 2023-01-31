// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/okaidia');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenGOAL',
  tagline: 'Reviving the Language that Brought us the Jak and Daxter Series',
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
  markdown: {
    mermaid: true,
  },
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.74/dist/shoelace.js',
      type: "module",
    }
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&family=Roboto+Mono:wght@400;700&display=swap',
    'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.74/dist/themes/dark.css',
    "https://fonts.googleapis.com/icon?family=Material+Icons"
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
          path: 'blog',
          blogSidebarCount: 0,
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
      announcementBar: {
        id: 'announcementBar-0', // Increment on change
        content: `<a href="/blog/progress-report-jan-2023">Check out the Latest Progress Report Here!</a>`,
      },
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
      image: 'img/logo.png',
      metadata: [{ name: 'twitter:card', content: 'summary' }],
      navbar: {
        title: 'OpenGOAL',
        logo: {
          alt: 'OpenGOAL Logo',
          src: 'img/logo.png',
        },
        items: [
          { to: 'blog', label: 'Blog', position: 'left' },
          {
            to: '/progress/milestones', label: 'Progress', position: 'left',
            items: [
              {
                label: 'Major Milestones',
                to: '/progress/milestones',
              },
              {
                label: 'Jak and Daxter - Decompilation',
                to: '/progress/jak1',
              },
              {
                label: 'Jak II - Decompilation',
                to: '/progress/jak2',
              }
            ]
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          { to: '/docs/faq', label: 'FAQ', position: 'left' },
          {
            label: 'Galleries', position: 'left',
            items: [
              {
                label: 'Jak and Daxter: The Precursor Legacy',
                to: '/gallery/jak1',
              },
              {
                label: 'Jak II',
                to: '/gallery/jak2',
              }
            ]
          },
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
        copyright: `
        Copyright © ${new Date().getFullYear()} OpenGOAL. Built with Docusaurus.
        <br>
        <br>
        <span class="trademark-disclaimer">All third party trademarks (including but not limited to: logos and icons) referenced by OpenGOAL remain the property of their respective owners. Unless specifically identified as such, OpenGOAL's use of third party trademarks does not indicate any relationship, sponsorship, or endorsment between OpenGOAL and the owners of these trademarks.  Any references to the aforementioned trademarks are for informative purposes and should be considered nominative fair use.</span>`,
      },
      prism: {
        theme: darkCodeTheme,
        lightTheme: lightCodeTheme,
        additionalLanguages: ['lisp', 'clojure']
      },
    }),
};

module.exports = config;
