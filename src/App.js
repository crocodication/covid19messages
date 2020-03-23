import React from 'react'

import GoogleMaps from './components/GoogleMaps'

import { markers } from './refs/sampleDatas'

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