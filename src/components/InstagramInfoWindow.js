import React from 'react'

import InstagramEmbed from 'react-instagram-embed'

export default class extends React.Component {
    // state = {
    //     content: ''
    // }

    async componentDidMount() {
        // await this.setState({content: this.props.content})

        await window.instgrm.Embeds.process()
    }

    render() {
        return (
            <div
                // dangerouslySetInnerHTML = {{__html: this.state.content}}
            >
                <InstagramEmbed
                    url='https://instagr.am/p/B9-Ir_XJKc5/'
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