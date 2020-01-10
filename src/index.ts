import { IApi } from "umi-types";

interface External {
  name: string;
  var: string;
  script?: object;
  template?: string;
  params?: object;
}

interface Options {
  externals: External[];
  script?: object;
  template?: string;
  params?: object;
}

export default function(api: IApi, options: Options) {
  if (options && Array.isArray(options.externals)) {
    api.chainWebpackConfig(memo => {
      options.externals.forEach(item => {
        memo.externals[item.name] = item.var;
      });

      return memo;
    });

    options.externals.map(item => {
      const params = { ...options.params, ...item.params, name: item.name };
      const template = item.template || options.template || "/${name}.js";

      api.addHTMLHeadScript({
        ...options.script,
        ...item.script,
        src: render(template, params)
      });
    });
  }
}

function render(template: string, context: object) {
  return template.replace(
    /\$\{(.*?)\}/g,
    (match, key) => context[key.trim()] || key
  );
}
