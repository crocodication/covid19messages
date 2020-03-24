import React from 'react'

import InstagramEmbed from 'react-instagram-embed'

export default class extends React.Component {
    render() {
        return (
            <div
                style = {{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <h2
                    style = {{
                        alignSelf: 'center',
                        marginBottom: 10,
                        marginTop: 10
                    }}
                >
                    #{this.props.id - 14}
                </h2>

                <InstagramEmbed
                    url={this.props.content}
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                />
            </div>
        )
    }
}