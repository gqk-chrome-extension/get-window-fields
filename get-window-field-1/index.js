/**
 * 发送消息
 * @param {string} type 类型
 * @param {string} field 字段名称
 */
const postMessage = (type, field) => {
  window.postMessage({
    type,
    field,
    file: 'index'
  })
}
/**
 * 初始化
 */
const init = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('lucky.js')
  document.head.appendChild(script)

  // 监听从页面上下文发回的消息
  window.addEventListener('message', (event) => {
    console.log('event', event)
    if (event.source !== window) return
    if (event.data.type === 'get-window-data') {
      console.log('window data:', event.data.data)
    }
  })

  setTimeout(() => postMessage('get-window-field', 'MyBlog'), 100)

  // 插入 button 按钮
  const button = document.createElement('button')
  button.innerText = '获取数据'
  button.id = 'chrome-ext-but'
  document.body.appendChild(button)
  button.onclick = () => {
    postMessage('get-window-field', 'MyBlog')
  }
}

// 判断 window.top 和 self 是否相等，如果不相等，则不注入
if (window.top == window.self) {
  init()
}