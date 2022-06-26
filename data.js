import axios from 'axios'
import cheerio from 'cheerio'
import themetp from './template/themes.js'

const stores = []
const Allstores = []
const themes = []

const fetchStupidparticleData = async () => {
  try {
    const { data } = await axios.get('https://stupidparticle.com/taipei/?gclid=CjwKCAjw7IeUBhBbEiwADhiEMYJJpTmpST4ejtbxKPy-uENUGOskc7FyKbyyxZ8Hea9on8J-aUkDkBoCQnEQAvD_BwE')
    // 將拿到的html轉成cheerio物件
    const $ = cheerio.load(data)

    // 取得笨蛋密室-名稱
    stores.push($('.fusion-logo-link img').attr('alt').slice(0, 9))

    // 取得笨蛋密室門市-名稱
    $('.fusion-text a input').each(function (i, el) {
      const store = $('.fusion-text a input').eq(i).val()
      // 門市名稱不重複，過濾掉重複的
      if (stores.indexOf(store) === -1) {
        stores.push(store)
      }
    })
    Allstores.push(stores)

    // 取得笨蛋密室主題-名稱、建議人數、門市、內容簡介，存入themes
    let theme = []
    for (let i = 18; i < 37; i += 2) {
      theme = ($(`.fusion-text-${i} p input`).eq(0).val()) + '\n' + ($(`.fusion-text-${i} p input`).eq(1).val()) + '\n' + ($(`.fusion-text-${i} p input`).eq(2).val()) + '\n' + ($(`.fusion-text-${i + 1} p`).text())
      themes.push(theme.split('\n'))
    }

    // 取得笨蛋密室主題-圖片包含主題標題，存入themes
    for (const j in $('.fusion-imageframe img')) {
      for (const i in themes) {
        const imageurl = $('.fusion-imageframe img').eq(j).attr('src')
        if (imageurl !== undefined && imageurl.includes(themes[i][0])) {
          themes[i].push(imageurl)
          themes[i].length = 5
        }
        if (imageurl !== undefined && imageurl.includes('spy1941')) {
          themes[3].push(imageurl)
          themes[3].length = 5
        }
      }
    }

    // 取得笨蛋密室預定-連結，存入themes
    const scheduled = []
    for (let i = 24; i < 34; i++) {
      scheduled.push($(`.button-${i}`).attr('href'))
    }
    for (const i in themes) {
      themes[i].push(scheduled[i])
      themes[i].push($('.fusion-logo-link img').attr('alt').slice(0, 9))
    }
  } catch (error) {
    console.log(error)
  }
}
const replyThemes = (event) => {
  const tbubble = themes.map(themesitem => {
    const bubble = JSON.parse(JSON.stringify(themetp))
    bubble.hero.url = themesitem[4]
    bubble.body.contents[0].text = themesitem[0]
    bubble.body.contents[1].text = themesitem[1]
    bubble.body.contents[2].text = themesitem[3]
    bubble.footer.contents[0].action.uri = themesitem[5]

    console.log(JSON.stringify(bubble, null, 2))
    return bubble
  })
  // console.log(tbubble)
  event.reply([
    {
      type: 'flex',
      altText: '密室主題列表',
      contents: {
        type: 'carousel',
        contents: tbubble.slice(0, 10)
      }
    }
  ])
}

export default {
  themes,
  fetchStupidparticleData,
  replyThemes
}
