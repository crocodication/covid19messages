import React from 'react'

import { compose, withProps } from 'recompose'

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

import { GOOGLE_API_KEY } from '../refs/keys'
 
class InstagramInfoWindow extends React.Component {
    state = {
        content: ''
    }

    async componentDidMount() {
        await this.setState({content: this.props.content})

        await window.instgrm.Embeds.process()
    }

    render() {
        return (
            <div
                dangerouslySetInnerHTML = {{__html: this.state.content}}
            />
        )
    }
}

const fullScreenHeightDiv = (
    <div
        style = {{
            height: `100vh`
        }}
    />
)

const MapWithAMarker = compose(
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
    <GoogleMap
        defaultZoom = {4}
        defaultCenter = {{
            lat: -0.6003441,
            lng: 119.9029807
        }}
        onClick = {props.onDismissClick}
    >
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)

        const {lat, lng, content} = marker
        
        return (
          <Marker
                key = {JSON.stringify(marker)}
                onClick = {onClick}
                position = {{
                    lat,
                    lng
                }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                  <InstagramInfoWindow
                    content = {content}
                  />
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class extends React.Component {
    state = {
        selectedMarker: this.props.markers[0]
    }

    componentDidMount() {
        const instance = this

        setTimeout(() => {
            instance.setState({selectedMarker: this.props.markers[this.props.markers.length - 1]})
        }, 1000)
    }

    handleClick = (marker, event) => {
        this.setState({ selectedMarker: marker })
    }

    render() {
        return (
            <div
                style = {{
                    height: 'calc(100vh-60px)',
                    overflow: 'hidden'
                }}
            >
                <MapWithAMarker
                    selectedMarker = {this.state.selectedMarker}
                    markers={this.props.markers}
                    onClick={this.handleClick}
                    onDismissClick = {() => this.setState({selectedMarker: false})}
                />
            </div>
        )
    }
}