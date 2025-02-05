'use client'

import { getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useAuthContext } from '../../context/AuthContext'
import { useGetMyPosts, useGetMyUser } from '../../hooks'
import { postsRef } from '../../../utils/post'
import { COLORS } from '../ui'
import { GetPost } from 'types/post'
import { GetUser } from 'types/user'

// eslint-disable-next-line react/display-name
export const DisplayChart = React.memo(() => {
  const router = useRouter()
  const { user }: any = useAuthContext()
  const [users, setUsers] = useState<GetUser>()
  const [postsData, setPostData] = useState<Array<GetPost>>([])
  const [onePiece, setOnePiece] = useState<any>([])
  const [kingdom, setKingdom] = useState<any>([])
  const [tokyo, setTokyo] = useState<any>([])
  const [kaisen, setKaisen] = useState<any>([])

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

  const getOnePosts = async () => {
    await getDocs(myOnePosts).then((querySnapshot) => {
      setOnePiece(
        querySnapshot.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }),
      )
      console.log(onePiece)
    })
  }

  const getKaisenPosts = async () => {
    await getDocs(myKaisenPosts).then((querySnapshot) => {
      setKaisen(
        querySnapshot.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }),
      )
    })
  }

  const getTokyoPosts = async () => {
    await getDocs(myTokyoPosts).then((querySnapshot) => {
      setTokyo(
        querySnapshot.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }),
      )
    })
  }

  const getKingPosts = async () => {
    await getDocs(MyKingPosts).then((querySnapshot) => {
      setKingdom(
        querySnapshot.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }),
      )
    })
  }

  useEffect(() => {
    if (!user) {
      router.push('/register')
    } else {
      useGetMyPosts(setPostData, user.email)
      useGetMyUser(setUsers, user.uid)
      getOnePosts()
      getKaisenPosts()
      getTokyoPosts()
      getKingPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  type MangaData = {
    name: 'ONEPIECE' | '呪術廻戦' | '東京リベンジャーズ' | 'キングダム'
    value: number
  }

  const MANGA_DATA: MangaData[] = [
    { name: 'ONEPIECE', value: onePiece.length },
    { name: '呪術廻戦', value: kaisen.length },
    { name: 'キングダム', value: kingdom.length },
    { name: '東京リベンジャーズ', value: tokyo.length },
  ]

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
          data={MANGA_DATA}
          cx='50%'
          cy='50%'
          outerRadius={80}
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={true}
        >
          {MANGA_DATA.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} key={index} />
          ))}
        </Pie>
        <Legend verticalAlign='bottom' wrapperStyle={{ bottom: 18 }} />
      </PieChart>
    </ResponsiveContainer>
  )
})
