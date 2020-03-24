import React from 'react'

import ReactLoading from 'react-loading'

import moment from 'moment'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

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

                <div
                    className = 'chart-container'
                    style = {{
                        backgroundColor: 'rgba(255,255,255,0.75)',
                        left: 'calc(50% - 200px)',
                        bottom: 30,
                        width: 400,
                        height: 200,
                        position: 'fixed',
                        paddingTop: 20,
                        paddingBottom: 20
                    }}
                >
                    <LineChart
                        width={400}
                        height={200}
                        data = {this.getData()}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total messages over time" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>

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
                                    !this.state.inputValue.trim().startsWith('https://www.instagram.com/p/') || this.state.isSubmitting ?
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
                                            {
                                                this.state.isSubmitting ?
                                                    <ReactLoading type= 'spinningBubbles' color='white' height={20} width={20} />
                                                    :
                                                    'Submit'
                                            }
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
                                                    this.setState({isSubmitting: true})

                                                    api.create({
                                                        latitude: this.lat.toString(),
                                                        longitude: this.lng.toString(),
                                                        instagram_post_url: this.state.inputValue.trim()
                                                    })
                                                    .then(async(res) => {
                                                        this.setState({isSubmitting: false})

                                                        if(res.ok) {
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
                                                        this.setState({isSubmitting: false})

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

                await this.setState({markers: json.data})

                for(const data of json.data) {
                    if(data.instagram_post_url === this.lastPostedPost) {
                        await this.setState({selectedMarker: data})

                        break
                    }
                }
            } else {
                const text = await res.text()

                alert(text)
            }

            if(this.lastPostedPost !== '') {
                setTimeout(() => {
                    alert('Terima kasih telah submit suara anda untuk kita bersama!')
                }, 500)

                this.lastPostedPost = ''
            } else {
                if(this.state.markers.length > 0) {
                    this.setState({selectedMarker: this.state.markers[this.state.markers.length - 1]})
                }
            }
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

    getData() {
        let dates = []

        let date = new Date()

        for(let i = 0; i < 14; i++) {
            date = new Date()
            date.setDate(date.getDate() - i)
            date.setHours(0, 0, 0)

            let totalMessagesOverTime = 0

            let tommorrowDate = new Date(date.toDateString())
            tommorrowDate.setDate(tommorrowDate.getDate() + 1)
            tommorrowDate.setHours(0, 0, 0)

            for(const marker of this.state.markers) {
                if(moment(marker.created_at).toDate() < tommorrowDate) {
                    totalMessagesOverTime++
                }
            }

            dates.push({
                date,
                "total messages over time": totalMessagesOverTime,
                name: moment(date).format('DD/MM')
            })
        }

        dates.reverse()

        return dates.slice(Math.max(dates.length - 14, 0))
    }
}