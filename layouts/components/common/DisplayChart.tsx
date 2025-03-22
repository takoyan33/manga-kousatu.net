import { getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { postsRef } from '../../../utils/post'
import { useAuthContext } from '../../context/auth-context'
import { useGetMyPosts, useGetMyUser } from '../../hooks'
import { COLORS } from '../ui'
import { GetPost } from 'types/post'
import { GetUser } from 'types/user'

// eslint-disable-next-line react/display-name
export const DisplayChart = React.memo(() => {
  const router = useRouter()
  const { user }: any = useAuthContext()
  const [users, setUsers] = useState<GetUser>()
  const [postsData, setPostData] = useState<Array<GetPost>>([])
  const [mangaData, setMangaData] = useState<any[]>([
    { name: 'ONEPIECE', value: 0 },
    { name: '呪術廻戦', value: 0 },
    { name: 'キングダム', value: 0 },
    { name: '東京リベンジャーズ', value: 0 },
  ])

  const myOnePosts = query(
    postsRef,
    where('email', '==', user.email),
    where('category', '==', 'ONEPIECE'),
  )
  const myKaisenPosts = query(
    postsRef,
    where('email', '==', user.email),
    where('category', '==', '呪術廻戦'),
  )
  const myTokyoPosts = query(
    postsRef,
    where('email', '==', user.email),
    where('category', '==', '東京リベンジャーズ'),
  )
  const MyKingPosts = query(
    postsRef,
    where('email', '==', user.email),
    where('category', '==', 'キングダム'),
  )

  const mangaCategories = [
    { name: 'ONEPIECE', query: myOnePosts },
    { name: '呪術廻戦', query: myKaisenPosts },
    { name: 'キングダム', query: MyKingPosts },
    { name: '東京リベンジャーズ', query: myTokyoPosts },
  ]

  const fetchPosts = async (categoryQuery: any, categoryName: string) => {
    const querySnapshot = await getDocs(categoryQuery)
    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data() as any // Explicitly cast the data to the correct type
      return { ...data, id: doc.id }
    })
    setMangaData((prevData) =>
      prevData.map((item) =>
        item.name === categoryName ? { ...item, value: posts.length } : item,
      ),
    )
  }

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      useGetMyPosts(setPostData, user.email)
      useGetMyUser(setUsers, user.uid)
      mangaCategories.forEach(({ query, name }) => fetchPosts(query, name))
    }
  }, [user, router])

  type LabelProps = {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
  }

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer height={256}>
      <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <Pie
          dataKey='value'
          data={mangaData}
          cx='50%'
          cy='50%'
          outerRadius={80}
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={true}
        >
          {mangaData.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} key={index} />
          ))}
        </Pie>
        <Legend verticalAlign='bottom' wrapperStyle={{ bottom: 18 }} />
      </PieChart>
    </ResponsiveContainer>
  )
})
