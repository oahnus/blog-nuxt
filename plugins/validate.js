/**
 * Created by hasee on 2017/7/31.
 */
export default {
  isBlank (str) {
    if (!str) {
      return true
    }
    if (str === null) {
      return true
    }
    return str === '' || str.trim() === ''
  }
}
