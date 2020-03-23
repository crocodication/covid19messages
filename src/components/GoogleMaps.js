import React from 'react'

import MapsWithMarkers from './MapsWithMarkers'

export default class extends React.Component {
    state = {
        selectedMarker: this.props.markers[0]
    }

    componentDidMount() {
        const { props } = this
        const { markers } = props

        const selectedMarker = markers[markers.length - 1]

        setTimeout(() => this.setState({selectedMarker}), 1000)
    }

    handleClick = (selectedMarker, event) => this.setState({selectedMarker})

    render() {
        return (
            <div
                className = 'maps-container'
            >
                <MapsWithMarkers
                    markers = {this.props.markers}
                    onClick = {this.handleClick}
                    onDismissClick = {() => this.setState({selectedMarker: false})}
                    selectedMarker = {this.state.selectedMarker}
                />
            </div>
        )
    }
}