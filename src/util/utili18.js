
import i18next from 'i18next'

i18next.init({
  debug: true,
  lng: 'web',
  resources: {
    web: {
      style: {
        shapeColor: 'rgba(176,144,239,0.73)',
        arrowColor: 'white',
        literalFont: 'bold 12px sans-serif',
        lineColor: 'rgba(218,209,209,0.34)',
        literalColor: 'rgba(255,255,255,0.93)'
      },
      constant: {
        running:"running",
        thoughts:"body__sheepAndThoughts_thoughts",
        run: "run",
        stop: "stop",
        sheep: 'body__sheepAndThoughts_sheep',
        errorX: ' You should write x between -3 and 3 ',
        noError: 'content__labels_no-warning',
        warning: 'content__labels_x_warning',
        normal: 'content__labels_x_normal',
        error: 'content__labels_error',
        active: 'content__labels_active',
        noActive: 'content__labels_no-active',
        x: 'x',
        y: 'y',
        R: 'R',
        r: 'r',
        send: 'send',
        logX: 'log_x',
        logY: 'log_y',
        change: 'change',
        errorY: ' You should choose one y ',
        simpleString: '',
        connectionError: 'Please check your connection to the internet',
        div: 'div',
        classNew: 'content__scroll_table_new',
        row: 'content__scroll_table_row',
        headTable: 'head_table',
        click: 'click',
        reach: 'reach',
        miss: 'miss',
        cell: 'content__scroll_table_row_cell'
      }
    }
  }
})
export default function getKey (key, type) {
  return i18next.t(key, { ns: type })
}
