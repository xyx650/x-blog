import { useState } from 'react'

import { Spin } from 'antd'
import { Pie, Column } from '@ant-design/plots'
import { ProCard, StatisticCard } from '@ant-design/pro-components'
import { NumSelect } from '@/components'
import { useNumber } from '@/hooks/useNumber'
import { getRandom } from '@/utils'

import styles from '../index.less'


const ArticleTab = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [responsive, setResponsive] = useState(false)

  const [num, setNum] = useNumber(5)
  const pieConfig = {
    // categoryPieData
    data: Array.from({ length: 4 }, (_, i) => {
      return {
        type: ['blog', '测试', 'markdown', '技巧', '实用'][i],
        value: getRandom(23, 1234)
      }
    }),
    theme: 'classicDark',
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      position: 'spider',
      text: ({ type, value }: { type: string, value: number }) => `${ type }\n ${ value }`
    },
    // tooltip: {
    //   title: 'type',
    //   name: 'type'
    // },
    tooltip: (cur: { value: number, type: string }, _index: number, data: { value: number, type: string }[]) => {
      console.log(data)
      const total = data.reduce((pre, cur) => pre + cur.value, 0)
      return {
        name: cur.type,
        value: `${cur.value}(${(cur.value / total * 100).toFixed(2)}%)`,
      }
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' }
    ]
  }
  const columnConfig = {
    // columnData
    data: Array.from({ length: 5 }, (_, i) => {
      return {
        type: ['blog', '测试', 'markdown', '技巧', '实用'][i],
        value: getRandom(34, 123)
      }
    }),
    theme: 'classicDark',
    xField: 'type',
    yField: 'value',
    label: {
      position: 'inside'
      // 配置样式
    },
    color: () => '#1772B4',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: {
        alias: '标签名'
      },
      value: {
        alias: '文章数量'
      }
    }
  }

  const colSpan = responsive ? 24 : 6
  const layoutProp = responsive ? 'horizontal' : 'vertical'

  return (
    <Spin spinning={ loading }>
      <ProCard
        bordered
        style={ { marginBottom: responsive ? 8 : 0 } }
        className={ styles['pro-card-wrapper'] }
      >
        <StatisticCard
          colSpan={ colSpan }
          statistic={ {
            title: '文章数',
            value: getRandom(23, 4312),
            layout: layoutProp
          } }
        />
        <StatisticCard
          colSpan={ colSpan }
          statistic={ {
            title: '总字数',
            value: getRandom(23, 4312),
            layout: layoutProp
          } }
        />
        <StatisticCard
          colSpan={ colSpan }
          statistic={ {
            title: '分类数',
            value: getRandom(23, 4312),
            layout: layoutProp
          } }
        />
        <StatisticCard
          colSpan={ colSpan }
          statistic={ {
            title: '标签数',
            value: getRandom(23, 4312),
            layout: layoutProp
          } }
        />
      </ProCard>

      <ProCard
        bordered={ !responsive }
        split={ layoutProp }
        ghost={ responsive }
        className={ styles['pro-card-wrapper'] }
      >
        <StatisticCard
          colSpan={ 24 }
          className={ styles['card-full-title'] }
          title={
            <div style={ { display: 'flex', justifyContent: 'space-between' } }>
              <div>分类饼图</div>
            </div>
          }
          chart={
            <div style={ { marginTop: -30 } }>
              <Pie { ...pieConfig } />
            </div>
          }
        />
      </ProCard>

      <ProCard
        bordered={ !responsive }
        split={ layoutProp }
        ghost={ responsive }
        className={ styles['pro-card-wrapper'] }
      >

        <StatisticCard
          colSpan={ 24 }
          className={ styles['card-full-title'] }
          title={
            <div style={ { display: 'flex', justifyContent: 'space-between' } }>
              <div>标签文章数 TOP 柱状图</div>
              <NumSelect unit="条" value={ num } setValue={ setNum }/>
            </div>
          }
          chart={
            <div style={ { marginTop: -10 } }>
              <Column { ...columnConfig } />
            </div>
          }
        />
      </ProCard>
    </Spin>
  )
}

export default ArticleTab
