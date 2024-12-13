import React from 'react'
import { Skeleton } from '@mui/material'
import styles from "./styles.module.css"
export default function Shimmer({ instance, height = 25 }) {

    let arr = [];
    for (var i = 0; i < instance; i++) {
        arr.push(i);
    }

    return (
        <>
            {arr.map((item, index) => {
                return (
                    <Skeleton key={index} width={"100%"} height={height} animation="wave" className={styles.main}/>
                )
            })}
        </>
    )
}
