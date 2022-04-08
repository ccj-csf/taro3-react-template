import Button from "@taroify/core/button/button"
import { ITouchEvent, View } from "@tarojs/components"
import React, { useEffect, useState } from "react"

type Iprops = {
    /** 测试的注释*/
    num: number
}

const Counter: React.FC<Iprops> = props => {
    console.log('props :>> ', props)
    const [name, setName] = useState('ccj')
    // const pname = 'ccj2'
    const list = [6, 2]
    useEffect(() => {
        console.log('子组件渲染')
    }, [])
    const handleClick = (pname: string, e: ITouchEvent): void => {
        setName(pname)
        console.log('e :>> ', e)
    }
    return (
        <>
            <View className='p-2 text-center text-white bg-blue-500'>
                {props.num}
            </View>
            <View className='m-2 text-center text-white bg-green-500'>
                {name}
            </View>
            {list.map(item => {
                return (<Button block onClick={e => handleClick(item + '', e)} key={item}>修改name为{item}</Button>)
            })}
        </>
    )

}

export default Counter

