import React from 'react'

import GoogleMaps from './components/GoogleMaps'

import { markers } from './refs/sampleDatas'

import TopLeftBar from './components/TopLeftBar'

export default class extends React.Component {
    state = {
        inputValue: '',
        isShowSubmitModal: false,
        isSubmitting: false,
        selectedMarker: false
    }

    lat = 0
    lng = 0

    handleInputChange = (event) => this.setState({inputValue: event.target.value})

    render() {
        return (
            <div
                style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh'
                }}
            >
                <GoogleMaps
                    isMarkerShown
                    markers = {markers}
                    selectedMarker = {this.state.selectedMarker}
                    setSelectedMarker = {selectedMarker => this.setState({selectedMarker})}
                    updateCenterCoord = {this.updateCenterCoord}
                />
                
                {
                    !this.state.isShowSubmitModal ?
                        <TopLeftBar
                            onPressSubmit = {() => {
                                this.setState({
                                    isShowSubmitModal: true,
                                    selectedMarker: false
                                })
                            }}
                        />
                        :
                        null
                }

                {
                    false ? //this.state.isShowSubmitModal ?
                        <div
                            style = {{
                                alignItems: 'center',
                                bottom: 0,
                                left: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'fixed',
                                right: 0,
                                top: 0
                            }}
                        >
                            <div
                                onClick = {() => this.setState({isShowSubmitModal: false})}
                                style = {{
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    bottom: 0,
                                    left: 0,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0
                                }}
                            />

                            
                        </div>
                        :
                        null
                }

                {
                    this.state.isShowSubmitModal ?
                        <div
                            style = {{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'fixed',
                                top: 'calc(50% - 255px)',
                                left: 'calc(50% - 170px)'
                            }}
                        >
                            <div
                                style = {{
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    padding: 20,
                                    width: 300,
                                    zIndex: 1
                                }}
                            >
                                <div
                                    style = {{
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <h3>
                                        Submit Suara
                                    </h3>

                                    <a
                                        href = '/covid19messages/#'
                                        onClick = {() => this.setState({isShowSubmitModal: false})}
                                        style = {{
                                            color: 'red',
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            textDecorationLine: 'none'
                                        }}
                                    >
                                        X
                                    </a>
                                </div>

                                <p
                                    style = {{
                                        fontSize: 12,
                                        marginTop: 10
                                    }}
                                >
                                    Geser peta sesuai lokasi anda dan salin tautan pos instagram
                                </p>

                                <input
                                    onChange = {this.handleInputChange}
                                    placeholder = 'Tautan Post Instagram...'
                                    style = {{
                                        border: '2px solid gainsboro',
                                        borderRadius: 7,
                                        marginTop: 20,
                                        padding: 10,
                                        width: 'calc(100% - 20px)'
                                    }}
                                />

                                {
                                    !this.state.inputValue.trim().startsWith('https://www.instagram.com/p/') ?
                                        <div
                                            href = '/covid19messages/#'
                                            style = {{
                                                backgroundColor: 'dimgray',
                                                borderRadius: 5,
                                                color: 'white',
                                                float: 'right',
                                                fontWeight: 'bold',
                                                marginTop: 10,
                                                padding: 10,
                                            }}
                                        >
                                            Submit
                                        </div>
                                        :
                                        <a
                                            href = '/covid19messages/#'
                                            onClick = {async() => {
                                                alert('Terima kasih telah submit suara anda untuk kita bersama!')

                                                await this.setState({inputValue: ''})
                                                
                                                this.setState({isShowSubmitModal: false})
                                            }}
                                            style = {{
                                                backgroundColor: 'steelblue',
                                                borderRadius: 5,
                                                color: 'white',
                                                float: 'right',
                                                fontWeight: 'bold',
                                                marginTop: 10,
                                                padding: 10,
                                                textDecorationLine: 'none'
                                            }}
                                        >
                                            Submit
                                        </a>
                                }
                            </div>

                            <img
                                alt = 'my-marker'
                                height = {32}
                                width = {32}
                                src = {require('./icons/mark.png')}
                                onClick = {() => alert('a')}
                                style = {{
                                    marginTop: 20,
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                        :
                        null
                }
            </div>
        )
    }

    updateCenterCoord = (lat, lng) => {
        this.lat = lat
        this.lng = lng

        console.log(`lat: ${this.lat}, lng: ${this.lng}`)
    }
}