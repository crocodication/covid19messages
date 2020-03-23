import React from 'react'

export default class extends React.Component {
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