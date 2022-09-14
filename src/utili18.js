import i18next from 'i18next'

i18next.init({
  debug: true,
  lng: 'web',
  resources: {
    web: {
      style: {
        shapeColor: 'rgba(147,127,196,0.67)',
        arrowColor : 'white',
        literalFont : 'bold 12px sans-serif',
        lineColor : 'rgba(218,209,209,0.34)',
        literalColor :'rgba(255,255,255,0.93)'
      },
      constant: {
        errorX : ' You should write x between -3 and 3 ',
        noError : 'no-warning',
        warning : 'warning',
        normal : 'normal',
        error : 'error',
        active : 'active',
        noActive : 'no-active',
        x : 'x',
        y : 'y',
        R : 'R',
        r : 'r',
        send : 'send',
        logX : 'log_x',
        logY : 'log_y',
        change : 'change',
        errorY : ' You should choose one y ',
        simpleString : '',
        connectionError : 'Please check your connection to the internet',
        div : 'div',
        classNew : 'new',
        row : 'row',
        headTable : 'head_table',
        click : 'click',
        reach : 'reach',
        miss : 'miss'
      }
    }
  }
})
export default function getKey(key, type){
  return i18next.t(key, {ns:type});
}
