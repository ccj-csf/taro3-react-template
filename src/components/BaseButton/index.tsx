import { Button } from "@taroify/core"
import React from "react"

type Iprops = {
    content: string
}

const BaseButton: React.FC<Iprops> = props => {
    const { content } = props
    return (
        <>
            <Button color='danger'>{content || 'base button'}</Button>
        </>
    )
}

export default BaseButton