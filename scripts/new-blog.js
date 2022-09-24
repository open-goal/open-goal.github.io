var fs = require('fs');

let date = new Date().toISOString().split('T')[0];
fs.mkdirSync(`./blog/${date}-TODONAME/img`, { recursive: true });

// Add a stub of a markdown file

contents = `---
title: TODO TITLE
description: TODO DESCRIPTION
slug: todo-slug
authors:
  - name: TODO Author
    url: https://github.com/TODO-USERNAME
    image_url: https://github.com/TODO-USERNAME.png
tags: [jak2,progress-report]
image: TODO some image
hide_table_of_contents: false
---
`;

fs.writeFileSync(`./blog/${date}-TODONAME/index.md`, contents);
