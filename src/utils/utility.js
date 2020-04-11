export default 'http://localhost:3000/api/v1'

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Summary',
    dataIndex: 'summary',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    filters: [
      { text: 'Bug-fix', value: 'bugfix' },
      { text: 'Enhancement', value: 'enhancement' },
      { text: 'QA', value: 'qa' },
      { text: 'Development', value: 'development' },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  },
  {
    title: 'Complexity',
    dataIndex: 'complexity',
    sorter: (a, b) => a.complexity.localeCompare(b.complexity),
  },
  {
    title: 'Estimated Time For Completion',
    dataIndex: 'estimatedHrs',
    width: 60,
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
  },
]

export const setExpiration = () => {
  const now = new Date()
  const time = now.getTime()
  const expireTime = time + 120000
  // 2 minute to expiry time
  localStorage.setItem('expiresAt', expireTime)
}

export const isExpired = () => {
  const now = new Date()
  const time = now.getTime()
  if (!localStorage.getItem('user') || !localStorage.getItem('expiresAt')) {
    return true
  }
  return time > parseFloat(localStorage.getItem('expiresAt'))
}
