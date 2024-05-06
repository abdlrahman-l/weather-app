'use client';
import React, { useEffect } from 'react'

const Geolocation = () => {

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                console.log({
                    longitude,
                    latitude
                })
            }, console.log);
        }
    }, [])

    return (
        <div>Geolocation</div>
    )
}

export default Geolocation