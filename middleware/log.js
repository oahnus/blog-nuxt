/**
 * Created by hasee on 2017/8/9.
 */
export default function ({route, store}, next) {
  console.info('[path]', route.path)
  next()
}
