import React from 'react'

import { compose, withProps } from 'recompose'

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

import { GOOGLE_API_KEY } from '../refs/keys'

import InstagramInfoWindow from './InstagramInfoWindow'

const fullScreenHeightDiv = (
    <div
        className = 'full-screen-height-div'
    />
)

class GoogleMapWrapper extends React.Component {
    lat = 0
    lng = 0

    render() {
        const  {props } = this
        return (
            <GoogleMap
                defaultZoom = {4}
                defaultCenter = {{
                    lat: -0.6003441,
                    lng: 119.9029807
                }}
                ref = {ref => this.maps = ref}
                onCenterChanged = {() => {
                    let coord = this.maps.getCenter()

                    this.lat = coord.lat()
                    this.lng = coord.lng()
                }}
                onClick = {props.onDismissClick}
            >
                {
                    props.markers.map(marker => {
                        const onClick = props.onClick.bind(this, marker)

                        const {lat, lng, content} = marker
                
                        return (
                            <Marker
                                key = {JSON.stringify(marker)}
                                onClick = {onClick}
                                position = {{lat, lng}}
                            >
                                {
                                    props.selectedMarker === marker &&
                                        <InfoWindow>
                                            <InstagramInfoWindow
                                                content = {content}
                                            />
                                        </InfoWindow>
                                }
                            </Marker>
                        )
                    })
                }
            </GoogleMap>
        )
    }
}

export default compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: fullScreenHeightDiv,
        containerElement: fullScreenHeightDiv,
        mapElement: fullScreenHeightDiv
    }),
    withScriptjs,
    withGoogleMap
)(props => {
    return (
        <GoogleMapWrapper
            {...props}
        />
    )
})