Creator = React.createClass({
    getInitialState: function() {
        return {
            showControls: false,
            editorWidth: 600
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
    editorWidthChanged: function(val) {
        let state = this.state;
        state.editorWidth = val;
        this.setState(state);
    },
    render: function() {

        let state = this.state;

        let styles = {
            container: {
                minHeight: window.innerHeight
            },
            creatorWorkspaceContainer: {
                margin: 'auto',
                width: state.editorWidth
            }
        };

        mouseMoved = this.mouseMoved;

        return (
            <div style={styles.container} onMouseMove={mouseMoved}>
                <CreatorControls show={state.showControls} editorWidth={state.editorWidth} editorWidthChanged={this.editorWidthChanged} />
                <div style={styles.creatorWorkspaceContainer}>
                    <CreatorWorkspace />
                </div>
            </div>
        )
    }
});
