import React from 'react'

import { splitWithDotEachThreeCharacters } from '../helpers/Number'

export default class extends React.Component {
    render() {
        return(
            <div
                style = {{
                    display: 'flex',
                    left: 0,
                    position: 'fixed',
                    top: 0
                }}
            >
                <div
                    style = {{
                        backgroundColor: 'steelblue',
                        border: '5px solid white',
                        borderBottomRightRadius: 20,
                        marginRight: 60,
                        maxWidth: 600,
                        padding: 20
                    }}
                >
                    <div
                        style = {{
                            alignItems: 'flex-end',
                            display: 'flex'
                        }}
                    >
                        <h1
                            style = {{
                                color: 'white'
                            }}
                        >
                            {splitWithDotEachThreeCharacters(this.props.totalPerson)}&nbsp;
                        </h1>

                        <h5
                            style = {{
                                color: 'white'
                            }}
                        >
                            orang telah menyampaikan pesannya terhadap epidemi wabah COVID-19
                        </h5>
                    </div>

                    <h5
                        style = {{
                            color: 'white',
                            marginTop: 10
                        }}
                    >
                        Bersatu dengan kami menyuarakan doa dan harapan yang baik bersama kita lewati kondisi saat ini
                    </h5>

                    <div
                        style = {{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 20
                        }}
                    >
                        <h4
                            style = {{
                                color: 'gold',
                                marginRight: 10
                            }}
                        >
                            Dari Kita Bersama Untuk Kita Bersama
                        </h4>
                        
                        <a
                            href = '/covid19messages/#'
                            onClick = {this.props.onPressSubmit}
                            style = {{
                                color: 'white',
                                textDecorationLine: 'none'
                            }}
                        >
                            <div
                                style = {{
                                    border: '3px solid white',
                                    borderRadius: 7,
                                    padding: 10
                                }}
                            >
                                <p
                                    style = {{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}
                                >
                                    Submit Suara
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}