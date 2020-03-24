import React from 'react'

import GoogleMaps from './components/GoogleMaps'

import TopLeftBar from './components/TopLeftBar'
import api from './refs/api'

export default class extends React.Component {
    state = {
        inputValue: '',
        isShowSubmitModal: false,
        isSubmitting: false,
        markers: [],
        selectedMarker: false
    }

    lastPostedPost = ''

    lat = -0.6003441
    lng = 119.9029807

    handleInputChange = (event) => this.setState({inputValue: event.target.value})

    componentDidMount() {
        this.loadData()
    }

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
                    markers = {this.state.markers}
                    selectedMarker = {this.state.selectedMarker}
                    setSelectedMarker = {selectedMarker => this.setState({selectedMarker})}
                    updateCenterCoord = {this.updateCenterCoord}
                />
                
                {
                    !this.state.isShowSubmitModal ?
                        <TopLeftBar
                            totalPerson = {this.state.markers.length}
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
                                    Geser peta sesuai lokasi anda, pastikan zoom ke titik yang benar lalu salin tautan pos instagram
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
                                            onClick = {() => {
                                                let isDuplicate = false

                                                for(const marker of this.state.markers) {
                                                    if(marker.instagram_post_url.toLowerCase() === this.state.inputValue.trim().toLowerCase()) {
                                                        isDuplicate = true
                                                    }
                                                }

                                                if(isDuplicate) {
                                                    alert('Maaf link yang anda berikan sudah terdaftar')
                                                    
                                                    return
                                                } else {
                                                    api.create({
                                                        latitude: this.lat.toString(),
                                                        longitude: this.lng.toString(),
                                                        instagram_post_url: this.state.inputValue.trim()
                                                    })
                                                    .then(async(res) => {
                                                        if(res.ok) {
                                                            alert('Terima kasih telah submit suara anda untuk kita bersama!')
    
                                                            this.lastPostedPost = this.state.inputValue
    
                                                            await this.setState({inputValue: ''})
                                                    
                                                            await this.setState({isShowSubmitModal: false})
    
                                                            this.loadData()
                                                        } else {
                                                            const text = await res.text()
    
                                                            alert(text)
                                                        }
                                                    })
                                                    .catch(err => {
                                                        alert(err.toString())
                                                    })
                                                }
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

    loadData() {
        api.list()
        .then(async(res) => {
            if(res.ok) {
                const json = await res.json()

                for(const data of json.data) {
                    if(data.instagram_post_url === this.lastPostedPost) {
                        this.setState({selectedMarker: data})

                        break
                    }
                }

                this.setState({markers: json.data})
            } else {
                const text = await res.text()

                alert(text)
            }

            this.lastPostedPost = ''
        })
        .catch(err => {
            alert(err.toString())

            this.lastPostedPost = ''
        })
    }

    updateCenterCoord = (lat, lng) => {
        this.lat = lat
        this.lng = lng
    }
}