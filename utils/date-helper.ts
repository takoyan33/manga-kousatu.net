// 日付に変換
export const FixDaysAgo = (createdAt: string): string => {
  const inputDate: any = new Date(createdAt)
  const currentDate: any = new Date()

  // 時間の差をミリ秒単位で計算
  const diffTime = currentDate - inputDate

  // ミリ秒から時間、分に変換
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `${diffDays}日前`
  } else if (diffHours > 0) {
    return `${diffHours}時間前`
  } else {
    return `${diffMinutes}分前`
  }
}
