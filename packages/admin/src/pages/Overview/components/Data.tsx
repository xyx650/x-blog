import { useState, useMemo, useEffect } from 'react'
import dayjs from 'dayjs'

import { Spin } from 'antd'
import { Area } from '@ant-design/plots'
import { ProCard, StatisticCard } from '@ant-design/pro-components'
import { NumSelect } from '@/components'

import { TipTitle } from '@/components'
import { useNumber } from '@/hooks/useNumber'

import styles from '../index.less'


const { Statistic } = StatisticCard

const DataTab = () => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [responsive, setResponsive] = useState(false)

  const [num, setNum] = useNumber(5)


  const eachData = useMemo(() => {

    return Array.from({ length: num }).map((_, i) => {
      return {
        date: dayjs().subtract(i, 'day').format('MM-DD'),
        访客数: ~~(Math.random() * 1000),
        访问量: ~~(Math.random() * 1000)
      }
    })
  }, [num]);
  const eachConfig = {
    data: eachData,
    xField: 'date',
    height: 200,
  }

  return (
    <Spin spinning={ loading }>
      <ProCard
        bordered
        style={ { marginBottom: responsive ? 8 : 0 } }
        className={ styles['pro-card-wrapper'] }
      >
        <StatisticCard
          colSpan={ responsive ? 24 : 6 }
          statistic={ {
            title: '文章数',
            value: 666,
            layout: responsive ? 'horizontal' : 'vertical'
          } }
        />
        <StatisticCard
          colSpan={ responsive ? 24 : 6 }
          statistic={ {
            title: '总字数',
            layout: responsive ? 'horizontal' : 'vertical',
            value: 777
          } }
        />
        <StatisticCard
          colSpan={ responsive ? 24 : 6 }
          statistic={ {
            title: <TipTitle
              title="总访客数"
              tip="以浏览器内缓存的唯一标识符为衡量标准计算全站独立访客的数量"
            />,
            value: 888,
            layout: responsive ? 'horizontal' : 'vertical',
            description: <Statistic title="今日新增" value={ 123 } trend="down"/>
          } }
        />
        <StatisticCard
          colSpan={ responsive ? 24 : 6 }
          statistic={ {
            title: <TipTitle
              title="总访问数"
              tip="以每一次页面的访问及跳转为衡量标准计算全站的访问数量"
            />,
            layout: responsive ? 'horizontal' : 'vertical',
            value: 999,
            description: <Statistic title="今日新增" value={ 9898989 } trend="up"/>
          } }
        />
      </ProCard>

      <ProCard
        bordered={ !responsive }
        split={ responsive ? 'horizontal' : 'vertical' }
        ghost={ responsive }
        className={ styles['pro-card-wrapper'] }
      >
        <StatisticCard
          style={ { marginBottom: responsive ? 8 : 0 } }
          colSpan={ !responsive ? 12 : 24 }
          className={ styles['card-full-title'] }
          title={
            <div style={ { display: 'flex', justifyContent: 'space-between' } }>
              <div>访客数趋势图</div>
              <NumSelect unit="天" value={ num } setValue={ setNum }/>
            </div>
          }
          chart={ <Area yField="访客数" { ...eachConfig } /> }
        />

        <StatisticCard
          style={ { marginBottom: responsive ? 8 : 0 } }
          colSpan={ !responsive ? 12 : 24 }
          className={ styles['card-full-title'] }
          title={
            <div style={ { display: 'flex', justifyContent: 'space-between' } }>
              <div>访问量趋势图</div>
              <NumSelect unit="天" value={ num } setValue={ setNum }/>
            </div>
          }
          chart={ <Area yField="访客数" { ...eachConfig } /> }
        />
      </ProCard>

      <ProCard
        bordered={ !responsive }
        split={ responsive ? 'horizontal' : 'vertical' }
        ghost={ responsive }
        className={ styles['pro-card-wrapper'] }
      >
        <StatisticCard
          style={ { marginBottom: responsive ? 8 : 0 } }
          colSpan={ !responsive ? 12 : 24 }
          className={ styles['card-full-title'] }
          title={
            <div style={ { display: 'flex', justifyContent: 'space-between' } }>
              <div>总访客数趋势图</div>
              <NumSelect unit="天" value={ num } setValue={ setNum }/>
            </div>
          }
          chart={ <Area yField="访客数" { ...eachConfig } /> }
        />

        <StatisticCard
          style={ { marginBottom: responsive ? 8 : 0 } }
          colSpan={ !responsive ? 12 : 24 }
          className={ styles['card-full-title'] }
          title={
            <div style={ { display: 'flex', justifyContent: 'space-between' } }>
              <div>总访问量趋势图</div>
              <NumSelect unit="天" value={ num } setValue={ setNum }/>
            </div>
          }
          chart={ <Area yField="访客数" { ...eachConfig } /> }
        />
      </ProCard>


    </Spin>
  )
}

export default DataTab
