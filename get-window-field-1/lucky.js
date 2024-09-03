// window.postMessage({
//   type: 'get-window-data',
//   data: window.MyBlog,
//   file: 'lucky'
// })

/**
 * 监听 message 消息
 */
window.addEventListener('message', (event) => {
  console.log('event---> lucky', event)
  if (event.data?.type === 'get-window-field') {
    window.postMessage({
      type: 'get-window-data',
      data: window[event.data.field],
      file: 'lucky'
    })
  }
})