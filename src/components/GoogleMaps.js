import React from 'react'

import MapsWithMarkers from './MapsWithMarkers'

export default class extends React.Component {
    componentDidMount() {
        const { props } = this
        const { markers } = props

        props.setSelectedMarker(this.props.markers[0])

        const selectedMarker = markers[markers.length - 1]

        setTimeout(() => props.setSelectedMarker(selectedMarker), 1000)
    }

    handleClick = (selectedMarker, event) => this.props.setSelectedMarker(selectedMarker)

    render() {
        return (
            <div
                className = 'maps-container'
            >
                <MapsWithMarkers
                    markers = {this.props.markers}
                    onClick = {this.handleClick}
                    onDismissClick = {() => this.props.setSelectedMarker(false)}
                    selectedMarker = {this.props.selectedMarker}
                    updateCenterCoord = {this.props.updateCenterCoord}
                />
            </div>
        )
    }
}