import React from 'react'

import InstagramEmbed from 'react-instagram-embed'

export default class extends React.Component {
    render() {
        return (
            <div>
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