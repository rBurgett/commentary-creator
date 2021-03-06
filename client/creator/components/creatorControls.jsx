CreatorControls = React.createClass({
    editorWidthChanged: function(e) {
        var value = e.target.value;
        valueInt = parseInt(value);
        this.props.editorWidthChanged(valueInt);
    },
    render: function() {

        let styles = {
            outerContainer: {
                position: 'fixed',
                top: 0,
                left: 0,
                height: (this.props.show) ? 40 : 0,
                overflow: 'hidden',
                width: '100%',
                backgroundColor: '#EEE',
                color: '#666',
                fontFamily: 'Open Sans',
                fontWeight: '300',
                letterSpacing: '2px',
                opacity: .95,
                transition: 'height 200ms',
                zIndex: 1000,
                borderBottomStyle: 'solid',
                borderBottomColor: '#FFF',
                borderBottomWidth: 1
            },
            innerContainer: {
                // display: 'table-cell',
                // lineHeight: '40px',
                // verticalAlign: 'middle',
                // height: 40
                paddingLeft: 15,
                paddingRight: 15,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center'
            },
            label: {
                paddingRight: 5,
                lineHeight: '36px'
            },
            sliderContainer: {
                width: 150,
                marginRight: 20
            },
            slider: {
                // verticalAlign: 'middle'
                // display: 'inline-block',
                // width: 100
                height: 40
                // eight: 40
            }
        }

        return (
            <div style={styles.outerContainer}>
                <div style={styles.innerContainer} className="form-inline">
                    <div style={styles.label}>
                        Controls Opacity:
                    </div>
                    <div style={styles.sliderContainer}>
                        <input style={styles.slider} type="range" min="0" max="100"></input>
                    </div>
                    <div style={styles.label}>
                        Editor Width:
                    </div>
                    <div style={styles.sliderContainer}>
                        <input style={styles.slider} defaultValue={this.props.editorWidth} onChange={this.editorWidthChanged} type="range" min="400" max={window.innerWidth - 90}></input>
                    </div>
                    <div style={styles.label}>
                        Brightness:
                    </div>
                    <div style={styles.sliderContainer}>
                        <input style={styles.slider} type="range" min="0" max="100"></input>
                    </div>
                </div>
            </div>
        )
    }
});
