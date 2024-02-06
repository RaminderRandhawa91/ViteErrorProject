import type { Plugin, UserConfig, ResolvedConfig } from "vite";
import path from "path";
import shell from "shelljs";
import fs from "fs";
export default function buildSanitize(): Plugin {
  let resolvedConfig: UserConfig;

  return {
    name: "vit-plugin-build-sanitize",
    enforce: "post",
    config(config) {
      resolvedConfig =  config;
    },
    transformIndexHtml(html) {
      return html.replace(
        /(\..\/)+/g,
        ''
      );
    },
    closeBundle() {
      const root = resolvedConfig.root || process.cwd();
      const dest =
        (resolvedConfig.build && resolvedConfig.build.outDir) || "dist";
      const resolve = (p: string) => path.resolve(root, p);

      //  1. remove all *.html at dest root
      shell.rm("-rf", resolve(`${dest}/*.html`));

      //  2. rename all xxx.html to index.html if needed
      shell.ls(resolve(`${dest}/*/*.html`)).forEach((html) => {
        let lastFolder = path
          .basename(path.dirname(html))
          .toLowerCase();
        shell.mv(html, resolve(`${dest}/${lastFolder}.html`));
        fs.rmdirSync(path.dirname(html));
      });
    }
  };
}
