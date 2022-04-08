import React, { useEffect } from 'react'
import { Button, Cell, ConfigProvider } from '@taroify/core'
import styles from './index.module.scss'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import cs from 'classnames'
import { Router } from 'tarojs-router-next'
import Counter from './components/Counter'
import { addUser, deleteUser } from '@/store/actions/user'
import IconFont from '@/assets/icons'
import BaseButton from '@/components/BaseButton'
import demoApi from '@/api/demo'
import { REDUX } from '@/store/REDUX'
const Index: React.FC = () => {
  const { num } = useSelector((state: REDUX.RootState) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    demoApi.getUserInfo().then(res => {
      console.log('res :>> ', res)
    }).catch(err => {
      console.log('err :>> ', err)
    })
  }, [])
  const jumpToDemo = (demoType: 'router') => {
    switch (demoType) {
      case 'router':
        Router.packageA.toIndex({
          params: { id: 111, name: 'ccj' }, data: {
            users: [{
              id: 22,
              name: '11'
            }]
          }
        })
    }
  }
  const testClass = cs('flex justify-center items-center', `${styles.test}`)
  return (
    <>
      <ConfigProvider theme={{
        buttonBackgroundColorPrimary: '#07c160',
      }}
      >
        <View className='mt-4'>
          <Button onClick={() => jumpToDemo('router')} color='danger' block>路由跳转</Button>
          <Button color='primary' disabled className='mt-6' block>
						主要按钮
          </Button>
          <View className={testClass}>css module</View>
          <View className='flex justify-between mt-6'>
            <Button color='primary' onClick={() => dispatch(addUser(4))}>增加</Button>
            <Button onClick={() => dispatch(deleteUser(1))}>删除</Button>
          </View>
          <Counter num={num} />
          <IconFont name='a-16-notice' size={100} />
          <Cell title='单元格'>内容</Cell>
          <Cell title='单元格' brief='描述信息'>内容</Cell>
          <BaseButton content='button' />
          <View className='taroify-ellipsis'>asgdhjkasghjasgdhjasghjdasghjdgasjhdgshjagdhjasgdhjasgdhjasgdhjasghjdassdgfjhasgdhjas</View>
				  <View className='test-1'>44444</View>
				  <View />
        </View>
      </ConfigProvider>
    </>
  )
}

export default Index
