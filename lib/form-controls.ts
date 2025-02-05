type FormCategory = {
  id: number
  label: string
  value: string
}

type FormNetabare = {
  id: number
  label: string
  value: 'spoil' | 'notSpoil' | 'unknown'
}

export const FORM_CATEGORIES: FormCategory[] = [
  {
    id: 1,
    label: 'ONE PIECE',
    value: 'ONEPIECE',
  },
  {
    id: 2,
    label: '呪術廻戦',
    value: '呪術廻戦',
  },
  {
    id: 3,
    label: '東京リベンジャーズ',
    value: '東京リベンジャーズ',
  },
  {
    id: 4,
    label: 'キングダム',
    value: 'キングダム',
  },
]

export const FORM_NETABARE: FormNetabare[] = [
  {
    id: 1,
    label: 'ネタバレ有',
    value: 'spoil',
  },
  {
    id: 2,
    label: 'ネタバレ無',
    value: 'notSpoil',
  },
  {
    id: 3,
    label: '不明',
    value: 'unknown',
  },
]
