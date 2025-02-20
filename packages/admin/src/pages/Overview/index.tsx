import { PageContainer } from '@ant-design/pro-components'

import ArticleTab from './components/Article'
import CountTab from './components/Count'
import DataTab from './components/Data'

import { useTab } from '@/hooks'

import styles from './index.less'


const tabs = {
  data: DataTab,
  count: CountTab,
  article: ArticleTab
}

type TabType = keyof typeof tabs


const OverviewPage = () => {

  const [tab, setTab] = useTab<TabType>('data')

  const Ele = tabs[tab as TabType]

  const tabList = [
    { tab: '数据概览', key: 'data' },
    { tab: '访客统计', key: 'count' },
    { tab: '文章分析', key: 'article' }
  ]

  const onTabChange = (tab: string) => setTab(tab as TabType)

  return (
    <PageContainer
      tabProps={ { size: 'large' } }
      tabList={ tabList }
      tabActiveKey={ tab }
      onTabChange={ onTabChange }
      className={styles.container}
    >
      <Ele/>
    </PageContainer>
  )
}

export default OverviewPage
