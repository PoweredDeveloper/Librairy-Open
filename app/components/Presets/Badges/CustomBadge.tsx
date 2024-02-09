/**
 * ========== L I B R A I R Y ==========
 * Script written by Istomin Mikhail
 * PoweredDeveloper <https://github.com/PoweredDeveloper>
 */

import { HTMLAttributes } from "react";

type Props = {
    children?: React.ReactNode,
    className?: string,
    props?: React.Attributes
}

export default function StandartBadge({children, className, ...props}: Props){
    return <span {...props} className={`inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20 ${className ? className : ''}`}>{children}</span>
}