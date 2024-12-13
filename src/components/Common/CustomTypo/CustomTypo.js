import React from 'react'
import {Typography} from '@mui/material'
import { bgColor } from '../../../Utils/index'

export default function CustomTypo({
    component,
    to,
    variant,
    sx,
    children,
    href,
    fontSize,
    fontWeight,
    target,
    underline,
    className,
    gutterBottom = false,
    ...rest
}) {
    return (
        <Typography
            sx={sx}
            component={component}
            to={to}
            className={className}
            fontSize={fontSize}
            fontWeight={fontWeight}
            variant={variant}
            href = {href}
            taregt = {target}
            underline = {underline}
            gutterBottom = {gutterBottom}
            {...rest}
        >
            {children}
        </Typography>
    )
}
