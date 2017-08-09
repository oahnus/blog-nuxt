/**
 * Created by hasee on 2017/7/31.
 */
import axios from 'axios'

let HOST = 'http://localhost:10706/blog'

export default {
  addComment (comment, success, error) {
    let url = HOST + '/v1/comment'
    axios.post(url,
      comment
    ).then(resp => success(resp.data), resp => error(resp.data))
  }

}
