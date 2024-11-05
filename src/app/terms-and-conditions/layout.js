import React from 'react'
import HeaderSection from '../components/headerSection'

const layout = ({ children }) => {
    return (
        <div>
            <HeaderSection />
            {children}
        </div>
    )
}

export default layout