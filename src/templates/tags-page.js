import React from 'react'
import Layout from '../components/Layout'
import { getSlug } from '../func/getSlug' 
import { Link } from 'gatsby'
import * as styles from '../styles/tags-page.module.css'

// all tags

export default function tagsPage({ pageContext}) {
    const { tags, tagPostCounts } = pageContext
    const tagLists = tags.sort()
    
    
    return (
        <Layout>
          <div className={styles.tagsPage}>
             <ul>
                {tagLists.map(tag => (
                  <li key={tag}>
                    <Link to={`/tag/${getSlug(tag)}`} className={styles.badge}>
                      {tag} - {tagPostCounts[tag]}
                    </Link>
                  </li>
                ))}
              </ul>
      </div>
        </Layout>
    )
}