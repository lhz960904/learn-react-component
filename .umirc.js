// 配置文件
export default {
  // 具体配置项
  title: 'component',
  favicon: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  resolve: {
    includes: ['components']
  },
  publicPath:  process.env.NODE_ENV === 'production' ? '/learn-react-component/' : '/',
  outputPath: 'docs',
  styles: [`
    .__dumi-default-menu-list ul {
      display: none;
    }
  `],
};