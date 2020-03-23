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
                style = {{
                    height: 'auto',
                    maxHeight: '100vh',
                    width: 350,
                    maxWidth: '100vw'
                }}
            >
                <div
                    dangerouslySetInnerHTML = {{__html: this.state.content}}
                />
            </div>
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

// export default compose(
//     withProps({
//         /**
//          * Note: create and replace your own key in the Google console.
//          * https://console.developers.google.com/apis/dashboard
//          * The key 'AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q' can be ONLY used in this sandbox (no forked).
//          */
//         googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
//         loadingElement: fullScreenHeightDiv,
//         containerElement: fullScreenHeightDiv,
//         mapElement: fullScreenHeightDiv
//     }),
//     withScriptjs,
//     withGoogleMap
// )(props => (
//     <GoogleMap
//         defaultZoom = {5.125}
//         defaultCenter = {{
//             lat: -0.6003441,
//             lng: 119.9029807
//         }}
//     >
//         {props.isMarkerShown && (
//             <>
//                 {
//                     (props.markers || []).map(item => {
//                         const { lat, lng } = item

//                         return (
//                             <Marker
//                                 position = {{lat, lng}}
//                             />
//                         )
//                     })
//                 }
//             </>
//         )}
//     </GoogleMap>
// ))

const MapWithAMarker = compose(
    withProps({
        /**
         * Note: create and replace your own key in the Google console.
         * https://console.developers.google.com/apis/dashboard
         * The key 'AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q' can be ONLY used in this sandbox (no forked).
         */
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
        defaultZoom = {5.125}
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
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
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