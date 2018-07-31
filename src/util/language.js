import LocaleProvider from 'react-material/LocaleProvider'

const getNavigatorLanguage =() => {
  let wg = null;
  if (typeof (window) !== undefined) {
    wg = window
  } else {
    wg = global
  }
  let lang = wg && wg.navigator && wg.navigator.language
  return lang
}
class Language {
  constructor(lang){
    this.lang = 'en'
    this.init(lang)
  }

  init(lang){
    if(lang){
      this.lang = lang
      return
    }
    if (typeof (localStorage) !== "undefined") {
      let storageLang = localStorage.getItem('lang')
      if(storageLang){
        this.lang = storageLang
        return
      }
    }
    let navLang = getNavigatorLanguage()
    if (navLang){
      this.lang = navLang
    }
  }

  getLang(){
    return this.lang
  }
  
  getFormatLang(){
    let lang = this.toEn(this.lang)
    if(lang){
      return lang
    }else{
      return this.toZh(this.lang)
    }
  }

  toZh(lang){
    if (lang.match('zh')){
      return 'zh'
    }else{
      return ''
    }
  }

  toEn(lang){
    if (lang.match('en')) {
      return 'en'
    } else {
      return ''
    }
  }

  setLang(lang){
    this.lang = lang
    if(typeof(localStorage) !== "undefined"){
      localStorage.setItem('lang', lang)
    }
    console.log('set language', lang)
  }
}

const language = new Language()
export default language