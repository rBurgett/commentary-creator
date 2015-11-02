Creator = React.createClass({
    getInitialState: function() {
        return {
            showControls: false
        }
    },
    showControlsTimeout: null,
    hideControls: function() {
        let state = this.state;
        state.showControls = false;
        this.setState(state);
        this.showControlsTimeout = null;
    },
    mouseMoved: function() {
        let state = this.state;

        if(!this.showControlsTimeout) {
            state.showControls = true;
            this.setState(state);
            this.showControlsTimeout = setTimeout(_.bind(this.hideControls, this), 1000);
        } else {
            clearTimeout(this.showControlsTimeout);
            this.showControlsTimeout = setTimeout(_.bind(this.hideControls, this), 1000);
        }

    },
    render: function() {

        let state = this.state;

        let styles = {
            container: {
                height: window.innerHeight
            }
        };

        mouseMoved = this.mouseMoved;

        return (
            <div style={styles.container} onMouseMove={mouseMoved}>
                <CreatorControls show={state.showControls} />
            </div>
        )
    }
});
