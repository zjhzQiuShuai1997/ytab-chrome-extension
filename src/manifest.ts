const manifest = {
  manifest_version: 3,
  homepage_url: 'https://demo.xxx.com',
  name: 'lTab新标签页',
  description:
    'lTab 组件式图标自定义您的浏览器的标签页，精美日历、炫酷天气、每日头条、海量壁纸、常用网址随心订制',
  version: '1.0.0',
  icons: {
    '16': 'icon/icon-16.png',
    '32': 'icon/icon-32.png',
    '48': 'icon/icon-48.png',
    '64': 'icon/icon-64.png',
    '128': 'icon/icon-128.png'
  },
  action: {
    default_title: 'chrome demo',
    default_popup: './index.html',
    default_icon: {
      '16': 'icon/icon-16.png',
      '32': 'icon/icon-32.png',
      '48': 'icon/icon-48.png',
      '64': 'icon/icon-64.png',
      '128': 'icon/icon-128.png'
    }
  },
  /* externally_connectable: {
    matches: ['*://*.example.com/*', '*://localhost/*'],
    ids: ['*']
  }, */
  content_security_policy: {
    extension_pages:
      "script-src 'self'; object-src 'self'; frame-ancestors 'none';"
  },
  externally_connectable: {
    ids: ['*']
  },
  permissions: ['storage', 'activeTab', 'scripting', 'tabs'],
  background: {
    service_worker: './background.ts',
    type: 'module'
  },
  // content_scripts: [
  //  {
  //  matches: ['http://*/*', 'https://*/*', '<all_urls>'],
  // js: ['background.ts']
  // css: ['content.styles.css']
  //  }
  // ],
  commands: {
    _execute_action: {
      suggested_key: {
        windows: 'Alt+Shift+N',
        mac: 'Alt+Shift+N',
        chromeos: 'Alt+Shift+N',
        linux: 'Alt+Shift+N'
      }
    }
  },
  options_page: './options.html'
  // devtools_page: 'http://localhost:30/index.html'
};

export default manifest;
