CreatorWorkspace = React.createClass({
    getInitialState: function() {
        return {
            verses: [],
            commentary: {},
            textBoxLocation: 1,  // verse # from above commentary portion
            textBoxText: ''
        }
    },
    componentDidMount: function() {

        let state = this.state;

        Meteor.call('getPassage', (err, res) => {
            if(err) {
                console.error(err);
            }
            console.log(res);
            state.verses = res;
            this.setState(state);
        });

    },
    keydown: function(e) {

        let shiftDown = e.shiftKey;

        if(shiftDown && e.key === 'Enter') {
            e.preventDefault();

            let state = this.state;

            if(state.textBoxText) {
                state.commentary[state.textBoxLocation] = {
                    chapter: state.verses[0].chapter,
                    verse: state.textBoxLocation,
                    text: state.textBoxText
                };
                state.textBoxText = '';
            }

            state.textBoxLocation++;
            this.setState(state);

            console.log(state.commentary);

        }

    },
    textChanged: function(e) {
        e.preventDefault();

        let text = e.target.value;

        let state = this.state;
        state.textBoxText = text;
        this.setState(state);

    },
    render: function() {

        let state = this.state;

        let styles = {
            container: {
                fontFamily: 'Georgia, serif',
                paddingTop: 50,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 20,
                backgroundColor: '#F5F5F5',
                fontSize: '17px',
                lineHeight: '28px',
                // height: window.innerHeight
            },
            commentaryParagraph: {
                paddingLeft: 20,
                paddingRight: 20,
                fontSize: '15px',
                fontFamily: '"Open Sans", sans-serif'
            },
            textarea: {
                fontFamily: '"Open Sans", sans-serif',
                marginTop: 20,
                marginBottom: 20,
                height: 200,
                resize: 'vertical',
                padding: 10
            }
        }
        if(state.verses.length > 0) {

            let verseList = [];
            let verse = '';
            let currentParagraph = 1;

            for(let i = 0; i < state.verses.length; i++) {

                let verseObj = state.verses[i];

                if(state.textBoxLocation === i) {

                    if(verse) {
                        verseList.push(<p key={verseObj.chapter + '.' + (verseObj.verse - 1)} dangerouslySetInnerHTML={{__html: verse}}></p>);
                        verse = '';
                    }
                    verseList.push(<textarea key={'commentaryTextArea'} className="form-control" style={styles.textarea} onKeyDown={this.keydown} onChange={this.textChanged} value={state.textBoxText}></textarea>);

                } else if (state.commentary[i]) {

                    if(verse) {
                        verseList.push(<p key={verseObj.chapter + '.' + (verseObj.verse - 1)} dangerouslySetInnerHTML={{__html: verse}}></p>);
                        verse = '';
                    }
                    verseList.push(<p key={'commentary' + state.commentary[i].chapter + '.' + state.commentary[i].verse} style={styles.commentaryParagraph}>{state.commentary[i].text}</p>);

                }

                if(currentParagraph === verseObj.paragraph) {
                    verse += '<sup><strong>' + verseObj.verse + '</strong></sup>' + verseObj.text + ' ';
                } else {
                    if(verse) {
                        verseList.push(<p key={verseObj.chapter + '.' + verseObj.verse - 1} dangerouslySetInnerHTML={{__html: verse}}></p>);
                        verse = '';
                    }
                    currentParagraph = verseObj.paragraph;
                    verse += '<sup><strong>' + verseObj.verse + '</strong></sup>' + verseObj.text + ' ';
                }

                if(i === state.verses.length - 1) {
                    verseList.push(<p key={verseObj.chapter + '.' + verseObj.verse - 1} dangerouslySetInnerHTML={{__html: verse}}></p>);
                }

            }

            // _.each(state.verses, (verseObj) => {
            //
            //     if(state.textBoxLocation === verseObj.verse - 1) {
            //         if(verse) {
            //             verses.push(verse);
            //             verse = '';
            //         }
            //         verses.push('');
            //     }
            //
            //     if(currentParagraph === verseObj.paragraph) {
            //         verse += '<sup><strong>' + verseObj.verse + '</strong></sup>' + verseObj.text + ' ';
            //     } else {
            //         if(verse) {
            //             verses.push(verse);
            //             verse = '';
            //         }
            //         currentParagraph = verseObj.paragraph;
            //         verse += '<sup><strong>' + verseObj.verse + '</strong></sup>' + verseObj.text + ' ';
            //     }
            //
            // });
            //
            // let verseHTML = [];
            //
            // for(let i = 0; i < verses.length; i++) {
            //     if(!verses[i]) {
            //         verseHTML.push(<textarea className="form-control" style={styles.textarea} onKeyDown={this.keydown} onChange={this.textChanged} value={state.textBoxText}></textarea>)
            //     } else {
            //         verseHTML.push(<p dangerouslySetInnerHTML={{__html: verses[i]}}></p>);
            //
            //         // if(state.commentary[])
            //
            //     }
            //
            // }

            // let verseHTML = verses.map((text) => {
            //     if(!text) {
            //         return <textarea className="form-control" style={styles.textarea} onKeyDown={this.keydown} onChange={this.textChanged} value={state.textBoxText}></textarea>
            //     }
            //     return <p dangerouslySetInnerHTML={{__html: text}}></p>
            // });

            return (
                <div style={styles.container}>
                    {verseList}
                </div>
            );
        } else {
            return (
                <div style={styles.container}>

                </div>
            );
        }
    }
});
