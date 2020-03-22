import React from 'react'

import GoogleMaps from './components/GoogleMaps'

const markers = [
    {
        lat: -6.235502,
        lng: 106.843645
    },
    {
        lat: -6.599622,
        lng: 106.825192
    },
    {
        lat: -6.993897,
        lng: 110.389839
    },
    {
        lat: 1.491601,
        lng: 124.901432
    }
]

export default class extends React.Component {
    render() {
        return (
            <GoogleMaps
                isMarkerShown
                markers = {markers}
            />
        )
    }
}