import React from 'react'

import InstagramEmbed from 'react-instagram-embed'

export default class extends React.Component {
    // async componentDidMount() {
    //     await window.instgrm.Embeds.process()
    // }

    render() {
        return (
            <div>
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