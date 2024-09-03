/**
 * index 文件发送消息到 lucky.js 文件
 * @param {string} type custom 类型
 * @param {any} data 数据
 */
const indexSendMessageToLucky = async (type, data) => {
  window.dispatchEvent(new CustomEvent('custom-index-type', { detail: { type, data } }))
  return new Promise((res) => {
    function handleResponse(e) {
      const detail = e.detail
      if (detail.type == type) {
        window.removeEventListener('custom-lucky-type', handleResponse)
        return res(detail.data)
      }
    }
    window.addEventListener('custom-lucky-type', handleResponse)
  })
}

/**
 * 发送消息
 */
const sendMessage = () => {
  function getMyBolg() {
    return window.MyBlog
  }
  indexSendMessageToLucky('run-index-fun', {
    function: getMyBolg.toString()
  }).then((res) => {
    console.log('res-->', res)
  }).catch((e) => {
    console.log('e', e)
  })
}
/**
 * 初始化
 */
const init = () => {

  // 插入 button 按钮
  const button = document.createElement('button')
  button.innerText = '获取数据'
  button.id = 'chrome-ext-but'
  document.body.appendChild(button)
  button.onclick = () => {
    sendMessage()
  }
  sendMessage()
}

// 判断 window.top 和 self 是否相等，如果不相等，则不注入
if (window.top == window.self) {
  init()
}