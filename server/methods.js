Meteor.methods({
    getPassage: function() {

        // try {
        //     let res = HTTP.get('http://labs.bible.org/api/?passage=john+1&formatting=para&type=json');
        // } catch(err) {
        //     throw new Meteor.Error(err.message);
        // }

        let response = Async.runSync((done) => {
            HTTP.get('http://labs.bible.org/api/?passage=john+1&formatting=para&type=json', (err, res) => {
                if(err) {
                    done(err.message);
                } else {
                    // console.log(res);
                    done(null, res);
                }
            });
        });

        if(response.error) {
            throw new Meteor.Error(response.error.message);
        } else {

            let data = response.result.data;
            let preparedData = [];

            let paragraphNum = 1;

            // let beginPPatt = /<p.*?>/;
            let endPPatt = /<\/p.*?>/;
            let allPPatt = /<\/?p.*?>/g;

            for(let i = 0; i < data.length; i++) {
                if(endPPatt.test(data[i].text)) {
                    preparedData.push({
                        chapter: parseInt(data[i].chapter),
                        verse: parseInt(data[i].verse),
                        paragraph: paragraphNum,
                        text: data[i].text.replace(allPPatt, '')
                    });
                    paragraphNum++;
                } else {
                    preparedData.push({
                        chapter: parseInt(data[i].chapter),
                        verse: parseInt(data[i].verse),
                        paragraph: paragraphNum,
                        text: data[i].text.replace(allPPatt, '')
                    });
                }
            }

            return preparedData;

        }

    }
});
