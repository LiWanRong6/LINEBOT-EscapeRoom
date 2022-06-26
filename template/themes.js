export default
{
  type: 'bubble',
  hero: {
    type: 'image',
    url: '圖片網址',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover'
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '標題',
        weight: 'bold',
        size: 'xl'
      },
      {
        type: 'text',
        text: '建議人數',
        size: 'sm',
        color: '#999999',
        margin: 'md',
        flex: 0
      },
      {
        type: 'text',
        text: '內容簡介',
        wrap: true,
        color: '#666666',
        size: 'sm',
        flex: 5
      }
    ]
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'uri',
          label: '預定',
          uri: ''
        }
      }
    ],
    flex: 0
  }
}
