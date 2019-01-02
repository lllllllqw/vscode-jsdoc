// 获得格式化时间
export function getFormatDate (rule = 'YYYY-MM-DD hh:mm:ss', date: number | string | Date) {
  let _str = rule
  if (date === '' || date === undefined || date === null) {
    return ''
  }
  const _type = typeof date
  if ((_type === 'string' || _type === 'number')) {
    date = new Date(+date)
  }
  const _regList = [{
    reg: /YYYY/,
    func: 'getFullYear',
  }, {
    reg: /MM/,
    func: 'getMonth',
    add: 1,
  }, {
    reg: /DD/,
    func: 'getDate',
  }, {
    reg: /hh/,
    func: 'getHours',
  }, {
    reg: /mm/,
    func: 'getMinutes',
  }, {
    reg: /ss/,
    func: 'getSeconds',
  }]
  
  const dateAsAny = date as any
  _regList.forEach(o => {
    const { reg, func } = o
    if (reg.test(rule)) {
      _str = _str.replace(reg, `${dateAsAny[func]() + (o.add ? o.add : 0)}`.padStart(2, '0'))
    }
  })

  return _str
}