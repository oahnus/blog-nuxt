/**
 * Created by hasee on 2017/8/3.
 */
let isProdMode = Object.is(process.env.NODE_ENV, 'production')

// export default {
//   baseUrl: isProdMode ? 'http://139.129.49.14:10706/blog/' : 'http://localhost:10706/blog/'
// }
module.exports = {
  baseUrl: isProdMode ? 'http://139.129.49.14:10706/blog/' : 'http://localhost:10706/blog/'
}
