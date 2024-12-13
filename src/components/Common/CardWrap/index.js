import React from 'react'
import styles from './styles.module.css'
export default function CardWrap({children}) {
  return (
    <div className={styles.main}>
      {children}
    </div>
  )
}
