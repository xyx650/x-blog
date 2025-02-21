import type { FC } from 'react'

import { getRecentTimeDescription } from '@/utils'
import styles from './index.less'

export interface IArticle {
  id: string | number
  title: string
  viewer?: number
  lastVisitedTime?: number | string | Date
  // TODO
  [k: string]: any
}

export interface IArticleListProps {
  articles: IArticle[],
  showViewerNum?: boolean
  showRecentViewTime?: boolean
}

const ArticleList: FC<IArticleListProps> = ({ articles, showViewerNum, showRecentViewTime }) => {
  return (
    <div>
      { articles.map(({ id, title, viewer = 0, lastVisitedTime }) => (
        <a
          className={ `${styles['article-list-item']} ${styles.list}` }
          key={ id }
          href={ `/post/${ id }` }
          target="_blank"
          rel="noreferrer"
        >
          <div className="">{ title }</div>
          { showViewerNum && <div>{ `${ viewer || 0 }人次` }</div> }
          { showRecentViewTime && <div>{ getRecentTimeDescription(lastVisitedTime) }</div> }
        </a>
      )) }
    </div>
  )
}

export default ArticleList
