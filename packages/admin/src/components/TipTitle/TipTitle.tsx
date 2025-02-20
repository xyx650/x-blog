import type { FC } from 'react'

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

export interface ITipProps {
  tip: string
  title: string
  isButton?: boolean
}

const TipTitle: FC<ITipProps> = (props) => {
  return (
    <span>
      <span style={ { marginRight: 4 } }>{ props.title }</span>
      <Tooltip title={ props.tip } placement="bottom">
        <QuestionCircleOutlined style={ { fontSize: 16, fontWeight: 400 } }/>
      </Tooltip>
    </span>
  )
}

export default TipTitle
