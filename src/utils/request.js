export default function request (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      data: {
        apikey: '0df993c66c0c636e29ecbb5344252a4a'
      },
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode === 200) {
          resolve(res)
        }
      }
    })
  })
}
