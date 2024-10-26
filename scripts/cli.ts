import { writeFileSync, mkdirSync, writeFile } from "fs";
import cac from "cac";
import chalk from "chalk";

const cli = cac();

const getDate = () => {
  return `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
};

cli
  .command(
    "new project <name>",
    "Create a new project file project file in src/content/projects and in public directory for assets"
  )
  .alias("np")
  .action(async (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    // create a .mdx file in src/content/projects
    writeFileSync(
      `./src/content/projects/${slug}.mdx`,
      `---
title: ${name.split("-").join(" ")}
description: description
image: /static/project/${slug}/og.png
link: https://${name}.vercel.app/?ref=personalwebsite
github: https://github.com/lalit2005/${name}
date: '${getDate()}'
---
`,
      {}
    );

    // create a public directory for the project
    mkdirSync(`./public/static/project/${slug}/`);

    // open the file in vscode
    require("child_process").exec(`code ./src/content/projects/${slug}.mdx -r`);
    console.log(chalk.green(`Successfully opened file in VSCode`));
  });

// build the same thing for blogs
cli
  .command(
    "new blog <name>",
    "Create a new blog file blog file in src/content/posts and in public directory for assets"
  )
  .alias("nb")
  .action((name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    // create a .mdx file in src/content/blogs
    writeFileSync(
      `./src/content/posts/${slug}.mdx`,
      `---
title: ${name.split("-").join(" ")}
description: description
date: '${getDate()}'
image: '/static/blog/${slug}/og.png'
---
`
    );
    console.log(chalk.green(`Created blog post markdown file ${name}`));

    // create a public directory for the blog
    mkdirSync(`./public/static/blog/${slug}/`);
    console.log(chalk.green(`Successfully created blog post assets directory`));

    // open the file in vscode
    require("child_process").exec(`code ./src/content/posts/${slug}.mdx -r`);
    console.log(chalk.green(`Successfully opened file in VSCode`));
  });

cli.help();
cli.parse();
