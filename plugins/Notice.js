/**
 * Created by hasee on 2017/10/15.
 */
import {Message} from 'element-ui'

const Notice = {
  success (msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'success'
    })
  },
  warning (msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'warning'
    })
  },
  error (msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'error'
    })
  }
}
export default Notice
