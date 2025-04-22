// 定数の定義
const MILLISECONDS_PER_MINUTE = 1000 * 60
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24

/**
 * 指定された日付から現在までの経過時間を文字列で返します
 * @param createdAt - 日付文字列
 * @returns 経過時間を表す文字列（例: "2日前", "3時間前", "5分前"）
 */
export const formatTimeAgo = (createdAt: string): string => {
  const inputDate = new Date(createdAt)
  const currentDate = new Date()
  const diffTime = currentDate.getTime() - inputDate.getTime()

  const diffDays = Math.floor(diffTime / MILLISECONDS_PER_DAY)
  const diffHours = Math.floor(diffTime / MILLISECONDS_PER_HOUR)
  const diffMinutes = Math.floor(diffTime / MILLISECONDS_PER_MINUTE)

  if (diffDays > 0) {
    return `${diffDays}日前`
  }
  if (diffHours > 0) {
    return `${diffHours}時間前`
  }
  return `${diffMinutes}分前`
}
