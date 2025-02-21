import { useState, useMemo, useEffect } from 'react'

import { Link } from '@umijs/max'
import { Spin } from 'antd'
import { ProCard, StatisticCard } from '@ant-design/pro-components'
import { NumSelect, TipTitle, ArticleList } from '@/components'
import { useNumber } from '@/hooks/useNumber'
import { getRecentTimeDescription, getRandom } from '@/utils'

import styles from '../index.less'


const CountTab = () => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [responsive, setResponsive] = useState(false)

  const [num, setNum] = useNumber(5)

  const recentHref: string | undefined = useMemo(() => {
    // propName: siteLastVisitedPathname
    if (!data || !data[0]) {
      return undefined
    }
    return ''
  }, [data])

  const mockArticles = Array.from({ length: 30 }, (_, i) => {
    return {
      id: i,
      title: `mock-title ${getRandom(34234, 243242)}`,
      viewer: getRandom(34234, 243242),
      lastVisitedTime: getRecentTimeDescription(Date.now() - getRandom(3423, 4354354))
    }
  })

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
            title: <a
              href="https://tongji.baidu.com/main/homepage/"
              className="ua blue"
              target="_blank"
              rel="noreferrer"
            >
              百度统计
            </a>,
            layout: layoutProp,
            status: 'success',
            formatter: () => <span>已开启</span>
          } }
        />
        <StatisticCard
          colSpan={ colSpan }
          statistic={ {
            title: <a
              href="https://analytics.google.com/analytics/web/"
              className="ua blue"
              target="_blank"
              rel="noreferrer"
            >
              谷歌分析
            </a>,
            layout: layoutProp,
            status: 'error',
            formatter: () => <Link to={ `/admin/site/setting?siteInfoTab=more` }>未配置</Link>
          } }
        />
        <StatisticCard
          colSpan={ colSpan }
          statistic={ {
            layout: layoutProp,
            title: '最近访问',
            value: getRecentTimeDescription(Date.now() - getRandom(3423, 4354354))
          } }
        />
        <StatisticCard
          colSpan={ colSpan }
          statistic={ {
            layout: layoutProp,
            title: '最近访问路径',
            formatter: () => <a className="ua blue" target="_blank" rel="noreferrer" href={ recentHref }>
              { data?.siteLastVisitedPathname || '-' }
            </a>
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
          colSpan={colSpan}
          statistic={{
            layout: layoutProp,
            title: <TipTitle title="总访客数" tip="以浏览器内缓存的唯一标识符为衡量标准计算全站独立访客的数量"/>,
            value: getRandom(444, 65466)
          }}
        />

        <StatisticCard
          colSpan={colSpan}
          statistic={{
            layout: layoutProp,
            title: <TipTitle title="总访问数" tip="以每一次页面的访问及跳转为衡量标准计算全站的访问数量"/>,
            value: getRandom(4524, 24234)
          }}
        />

        <StatisticCard
          colSpan={colSpan}
          statistic={{
            layout: layoutProp,
            title: <TipTitle title="单篇最高访客数" tip="以浏览器内缓存的唯一标识符为衡量标准计算出单篇文章最高的独立访客数"/>,
            value: getRandom(4524, 24234)
          }}
        />
        <StatisticCard
          colSpan={colSpan}
          statistic={{
            layout: layoutProp,
            title: <TipTitle title="单篇最高访问量" tip="以每一次页面的访问及跳转为衡量标准计算出单篇文章最高的访问量"/>,
            value: getRandom(4524, 24234)
          }}
        />
      </ProCard>

      <ProCard
        bordered={ !responsive }
        split={ layoutProp }
        ghost={ responsive }
        className={ styles['pro-card-wrapper'] }
      >


        <StatisticCard
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>文章访问量TOP</div>
              <NumSelect unit="条" value={num} setValue={setNum} />
            </div>
          }
          className={styles['card-full-title']}
          chart={
            <div style={{ marginTop: -14 }}>
              <ArticleList showViewerNum articles={mockArticles} />
            </div>
          }
        />

        <StatisticCard
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>文章访问量TOP</div>
              <NumSelect unit="条" value={num} setValue={setNum} />
            </div>
          }
          className={styles['card-full-title']}
          chart={
            <div style={{ marginTop: -14 }}>
              <ArticleList showViewerNum articles={ mockArticles } />
            </div>
          }
        />
      </ProCard>


    </Spin>
  )
}

export default CountTab
