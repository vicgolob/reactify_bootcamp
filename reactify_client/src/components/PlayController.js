import React, { Component } from 'react';

import PlayIcon from 'react-icons/lib/md/play-circle-filled';
import PauseIcon from 'react-icons/lib/md/pause-circle-filled';

class PlayController extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying : false,
            playId : null,
        };
        this.playObj = null;
    }

    togglePlay(id, preview, e) {
        if (!this.state.isPlaying) {
            this.playObj = new Audio(preview);
            this.playObj.play();
            this.setState({
                isPlaying : true,
                playId : id
            });
        } else {
            this.playObj.pause();
            this.setState({
                isPlaying : false,
                playId : null
            });
        }
    }

    render() {
        return (
            <span onClick={this.togglePlay.bind(this, this.props.options.id, this.props.options.preview)}>
                {
                    (this.state.isPlaying && this.state.playId === this.props.options.id)
                    ? <PauseIcon size={this.props.options.size || 30} />
                    : <PlayIcon size={this.props.options.size || 30} />
                }
            </span>
        )
    }
}
export default PlayController;
