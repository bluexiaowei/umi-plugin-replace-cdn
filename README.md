# umi-plugin-replace-cdn

## Install

```bash
npm install umi-plugin-replace-cdn -D
```

## Usage

Configure in `.umirc.js`,

```js

const options = {
  externals: [
    { name: 'axios', var: 'window.axios', params: { version: '0.19.0-beta.1' } },
    {
      name: 'lodash',
      var: 'window._',
      script: { async: true },
      template: '${origin}/${name}.js/${version}/${name}.min.js',
      params: { version: '4.17.15' },
    },
  ],
  template: '${origin}/${name}/${version}/${name}.min.js',
  params: { origin: 'https://cdn.bootcss.com' }
}

export default {
  plugins: [
    ['umi-plugin-replace-cdn', options],
  ],
}
```

## Options

```typescript
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
```

## build

```html
<head>

  <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
  <script async="true" src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
</head>
```

## LICENSE

MIT
