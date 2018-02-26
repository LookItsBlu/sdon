import escstr from 'escape-string-regexp';
import strcast from './strcast.min.js';
import formats from './sdon.formats.js';

export default class sdon {
    constructor(filename, format, isSDON, data) {
        this.returnFilename = filename;
        this.format = format || 'default';
        this.templates = formats[this.format];
        this.regexp = this._mapRegexp();
        if(isSDON) {
            this.output = data;
            this.data = this.translateSDON();
        }
        else {
            this.data = data;
            this.output = this.createSDON();
        }
    }

    _templateToRegexp(template) {
        return template
        .replace(/\\\.\\\..*?\\\.\\\./g, '(.*?)')
        .replace(/\(\.\*\?\)$/g, '(.*)');
    }

    // gathers all the data points in a string
    //this._extractDataPoints( string, regexp )
    // to use when proof-reading the template
    //this._extractDataPoints( this._smartCleanSpaces(this.templates[0]), this.regexp[0] )
    // also used to extract data from file based on the template
    //this._extractDataPoints( this._smartCleanSpaces(this.input), this.regexp.join('') )
    _extractDataPoints(template, regexp) {
        return new RegExp(regexp, 'g').exec(template);
    }

    // abc def "ghu jkl" mno pqr => abcdef"ghijkl"mnopqr
    _cleanSpaces(text) {
        return text.replace(/[\t\n ]+/g,'');
    }

    // abc def "ghu jkl" mno pqr => abcdef"ghi jkl"mnopqr
    _smartCleanSpaces(text) {
        return text.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g,'');
    }

    _getMarkerOrder() {
        let inputs = this._extractDataPoints( this._smartCleanSpaces(this.templates[0]), this.regexp[0] );

        let spinrates = inputs.indexOf('..spinrates..');
        let timewarps = inputs.indexOf('..timewarps..');
        let bullets = inputs.indexOf('..bullets..');

        // spinrates: 1, timewarps: 2, bullets: 3
        if(spinrates > timewarps) {
            if(spinrates > bullets) {
                return bullets > timewarps ? [2, 3, 1] : [3, 2, 1];
            } else {
                return [2, 1, 3]
            }
        } else {
            if(timewarps > bullets) {
                return bullets > spinrates ? [1, 3, 2] : [3, 1, 2];
            } else {
                return [1, 2, 3]
            }
        }
    }

    _insertDataAndSplice(valuePos, dataMap, dataOrder) {
        let data = dataMap[valuePos];
        dataMap.splice(valuePos, 1);
        dataOrder.splice(valuePos, 1);

        return data;
    }

    _mapRegexp() {
        return this.templates.map((el)=>{
            return this._templateToRegexp( escstr( this._cleanSpaces(el) ) );
        });
    }

    updateFormat(new_format) {
        this.format = new_format;
        this.templates = formats[this.format];
        this.regexp = this._mapRegexp();
        this.output = this.createSDON();
        this.data = this.translateSDON();
    }

    updateContent(new_json){
        this.data = new_json;
        this.output = this.createSDON();
    }

    createSDON() {
        // store the level data in this sdon instance
        this.data = JSON.parse(JSON.stringify(this.data));

        let spinrateList = [];
        let timewarpList = [];
        let bulletList = [];
        var obj = this;
        this.data.Song.Script.forEach(marker=>{
            if(marker._warpType) {
                // spinrate
                if(marker._warpType == 'spinRate') {
                    spinrateList.push(
                        '{ '+
                        obj.templates[1].strcast({ 'time' : marker._time, 'val' : marker._val })
                        +' }\n'
                    );
                }
                // timewarp
                else {
                    timewarpList.push(
                        '{ '+
                        obj.templates[2].strcast({ 'time' : marker._time, 'val' : marker._val })
                        +' }\n'
                    );
                }
            }
            else {
                // use normal bullet template by default
                let bulletTemplate = obj.templates[3];
                switch(marker._shotType) {
                    case 'wave':
                        bulletTemplate = obj.templates[4];
                        break;
                    case 'stream':
                        bulletTemplate = obj.templates[5];
                        break;
                    case 'burst':
                        bulletTemplate = obj.templates[6];
                        break;
                }
                bulletList.push(
                    '{\n'+
                    bulletTemplate.strcast({
                        'time'      :   marker._time,
                        'enemies'   :   marker._enemies,
                        'bulletType'  :   marker._bulletType,
                        'aim'       :   marker._aim,
                        'rows'      :   marker._rows,
                        'duration'  :   marker._duration,

                        'speed0'    :   marker._speed0,
                        'speed1'    :   marker._speed1,
                        'offset0'   :   marker._offset0,
                        'offset1'   :   marker._offset1,
                        'amount'   :   marker._amount,
                        'amount0'   :   marker._amount0,
                        'amount1'   :   marker._amount1,
                        'angle0'    :   marker._angle0,
                        'angle1'    :   marker._angle1
                    })
                    +'\n}\n'
                );
            }
        });
        spinrateList = spinrateList.join('');
        timewarpList = timewarpList.join('');
        bulletList = bulletList.join('');

        this.output = this.templates[0].strcast({
            'MP3Name'       : '"'+this.data.Song.Info._MP3Name+'"',
            'audioPreview'  : this.data.Song.Info._audioPreview,
            'title'         : '"'+this.data.Song.Info._title+'"',
            'artist'        : '"'+this.data.Song.Info._artist+'"',
            'designer'      : '"'+this.data.Song.Info._designer+'"',
            'subtitle'      : '"'+this.data.Song.Info._subtitle+'"',
            'enemiesTotal'  : this.data.Song.Info._enemies,
            'difficulty'    : this.data.Song.Info._difficulty,
            'bgBlack'       : this.data.Song.Info._bgBlack,

            'color1': '#'+parseInt(this.data.Song.Info._color1).toString(16),
            'color2': '#'+parseInt(this.data.Song.Info._color2).toString(16),
            'color3': '#'+parseInt(this.data.Song.Info._color3).toString(16),
            'color4': '#'+parseInt(this.data.Song.Info._color4).toString(16),
            'color5': '#'+parseInt(this.data.Song.Info._color5).toString(16),
            'color6': '#'+parseInt(this.data.Song.Info._color6).toString(16),
            'color7': '#'+parseInt(this.data.Song.Info._color7).toString(16),
            'color8': '#'+parseInt(this.data.Song.Info._color8).toString(16),
            'color9': '#'+parseInt(this.data.Song.Info._color9).toString(16),

            'spinrates' : spinrateList,
            'timewarps' : timewarpList,
            'bullets'   : bulletList
        });

        return this.output;
    }

    translateSDON() {
        // the empty json file
        // { Song: { Info: {} Script: [{},{},...] } }
        let output = {};
        output.Song = { Info: {}, Script: [] };

        // 1/ Get the order of the parameters in each templates
        let dataOrderGeneral = this._extractDataPoints( this._smartCleanSpaces(this.templates[0]), this.regexp[0] )
        .map(elem=>{ return elem.substr(2, elem.length-4); });
        dataOrderGeneral.shift();

        let dataOrderSpinrate = this._extractDataPoints( this._smartCleanSpaces(this.templates[1]), this.regexp[1] )
        .map(elem=>{ return elem.substr(2, elem.length-4); });
        dataOrderSpinrate.shift();
        let dataOrderTimewarp = this._extractDataPoints( this._smartCleanSpaces(this.templates[2]), this.regexp[2] )
        .map(elem=>{ return elem.substr(2, elem.length-4); });
        dataOrderTimewarp.shift();

        let dataOrderNormal = this._extractDataPoints( this._smartCleanSpaces(this.templates[3]), this.regexp[3] )
        .map(elem=>{ return elem.substr(2, elem.length-4); });
        dataOrderNormal.shift();
        let dataOrderWave = this._extractDataPoints( this._smartCleanSpaces(this.templates[4]), this.regexp[4] )
        .map(elem=>{ return elem.substr(2, elem.length-4); });
        dataOrderWave.shift();
        let dataOrderStream = this._extractDataPoints( this._smartCleanSpaces(this.templates[5]), this.regexp[5] )
        .map(elem=>{ return elem.substr(2, elem.length-4); });
        dataOrderStream.shift();
        let dataOrderBurst = this._extractDataPoints( this._smartCleanSpaces(this.templates[6]), this.regexp[6] )
        .map(elem=>{ return elem.substr(2, elem.length-4); });
        dataOrderBurst.shift();

        // 2/ get the template order (spinrate, timewarp, bullet)
        let markerOrder = this._getMarkerOrder();
        // 3: normal, 4: wave, 5: stream, 6: burst
        // this variable isn't filled until step 4, but it's
        // kept here to keep things in order
        let bulletTypeOrder = [];

        // 3/ get each marker
        let markers = this._cleanSpaces(this.output).match(/\{(.*?)\}/g).map(elem=>{
            return elem.substr(1, elem.length-2);
        });

        // 4/ count the amount of marker from each type
        let markerCount = [0, 0, 0];

        let currentMarkerType = 0;
        markers.forEach((elem, i) => {
            markerCount[currentMarkerType]++;

            // save the current regexp being used on the markers
            let curRegexp = this.regexp[markerOrder[currentMarkerType]];

            // if we're dealing with a bullet marker
            if(markerOrder[currentMarkerType] == 3) {
                // test all 4 bullet template until we find the bullet type
                let bulletMatch; let bulletType = 3-1;
                do {
                    bulletType++;
                    bulletMatch = elem.match(this.regexp[bulletType]);
                } while((bulletMatch == null) && bulletType<this.regexp.length);

                // if the marker did not match any of the bullet marker regexp,
                // it's not a bullet marker, so move on to the next marker type
                if(bulletType>=this.regexp.length) {
                    // remove the falsely counted marker
                    markerCount[currentMarkerType]--;
                    // moves to the next marker type in the order list
                    currentMarkerType++;
                    // counts the marker as part of this group
                    markerCount[currentMarkerType]++;
                }
                else {
                    // push that bullet type to the bullet order list
                    bulletTypeOrder.push(bulletType);
                }
            }
            else {
                if(markerCount[currentMarkerType]>0) {
                    // if the template currently in use stops working,
                    // this means that we're changing type
                    if(!markers[i+1] || markers[i+1].match(curRegexp) == null) {
                        currentMarkerType++;
                    }
                    // if the time of the marker is smaller than the previous marker,
                    // this also means that we've changed type
                    else if(elem.match(curRegexp)[1] > markers[i+1].match(curRegexp)[1]) {
                        currentMarkerType++;
                    }
                }
            }
        });

        // 5/ build the master regexp out of all the info we now have
        let masterRegexp_string = "";
        let masterRegexp_spinrates = "";
        let masterRegexp_timewarps = "";
        let masterRegexp_bullets = "";

        for(var markerTypes = 0; markerTypes < 3; markerTypes++) {
            let stringBuild = "";

            if(markerOrder[markerTypes]==3){
                bulletTypeOrder.forEach(elem=>{
                    stringBuild += '{'+this.templates[elem]+'}';
                })
            }
            else {
                for(var i=0; i<markerCount[markerTypes]; i++) {
                    stringBuild += '{'+this.templates[markerOrder[markerTypes]]+'}';
                }
            }

            switch(markerOrder[markerTypes]) {
                case 1:
                    masterRegexp_spinrates = stringBuild;
                    break;
                case 2:
                    masterRegexp_timewarps = stringBuild;
                    break;
                case 3:
                    masterRegexp_bullets = stringBuild;
                    break;
            }
        }

        // mimic part of the sdon file creation process to create a
        // sdon template that looks exactly like the uploaded file

        masterRegexp_string = this.templates[0].strcast({
            'spinrates' : masterRegexp_spinrates,
            'timewarps' : masterRegexp_timewarps,
            'bullets'   : masterRegexp_bullets
        });

        // general template
        masterRegexp_string = this._templateToRegexp(
            escstr(
                this._cleanSpaces(
                    masterRegexp_string
                )
            )
        );

        let masterRegexp = new RegExp(masterRegexp_string, 'g');

        // 6/ match the master regexp with the entire file without whitespaces get
        // the data from this in the same order as the one in the data order variables

        let masterData = this._extractDataPoints( this._smartCleanSpaces(this.output), masterRegexp );
        // rmeove the first data, as it's the full minified string of the entire sdon file
        masterData.shift();

        // 7/ now let's build the data order array in
        // the same way just built the master regexp

        let masterDataOrder = [];

        dataOrderGeneral.forEach(elem=>{
            switch(elem) {
                case 'spinrates':
                    let spinrateStack=[];
                    for(let spin=0; spin<markerCount[markerOrder.indexOf(1)]; spin++) {
                        spinrateStack.push(...dataOrderSpinrate);
                    }
                    masterDataOrder.push(...spinrateStack);
                    break;
                case 'timewarps':
                    let timewarpStack=[];
                    for(let time=0; time<markerCount[markerOrder.indexOf(2)]; time++) {
                        timewarpStack.push(...dataOrderTimewarp);
                    }
                    masterDataOrder.push(...timewarpStack);
                    break;
                case 'bullets':
                    let bulletStack=[];
                    for(let bullet=0; bullet<markerCount[markerOrder.indexOf(3)]; bullet++) {
                        switch(bulletTypeOrder[bullet]){
                            case 3:     // add normal shot template
                                bulletStack.push(...dataOrderNormal);
                                break;
                            case 4:     // add wave shot template
                                bulletStack.push(...dataOrderWave);
                                break;
                            case 5:     // add stream shot template
                                bulletStack.push(...dataOrderStream);
                                break;
                            case 6:     // add burst shot template
                                bulletStack.push(...dataOrderBurst);
                                break;
                        }
                    }
                    masterDataOrder.push(...bulletStack);
                    break;
                default:
                    masterDataOrder.push(elem);
            }
        });

        // END/ create the json output
        output.Song.Info._nick = this.returnFilename;
        output.Song.Info._MP3Name = masterData[masterDataOrder.indexOf('MP3Name')].slice(1, -1);
        output.Song.Info._audioPreview = masterData[masterDataOrder.indexOf('audioPreview')];
        output.Song.Info._title = masterData[masterDataOrder.indexOf('title')].slice(1, -1);
        output.Song.Info._artist = masterData[masterDataOrder.indexOf('artist')].slice(1, -1);
        output.Song.Info._designer = masterData[masterDataOrder.indexOf('designer')].slice(1, -1);
        output.Song.Info._subtitle = masterData[masterDataOrder.indexOf('subtitle')].slice(1, -1);
        output.Song.Info._enemies = masterData[masterDataOrder.indexOf('enemiesTotal')];
        output.Song.Info._difficulty = masterData[masterDataOrder.indexOf('difficulty')];
        output.Song.Info._bgBlack = masterData[masterDataOrder.indexOf('bgBlack')];

        output.Song.Info._color1 = parseInt(masterData[masterDataOrder.indexOf('color1')].substr(1), 16).toString();
        output.Song.Info._color2 = parseInt(masterData[masterDataOrder.indexOf('color2')].substr(1), 16).toString();
        output.Song.Info._color3 = parseInt(masterData[masterDataOrder.indexOf('color3')].substr(1), 16).toString();
        output.Song.Info._color4 = parseInt(masterData[masterDataOrder.indexOf('color4')].substr(1), 16).toString();
        output.Song.Info._color5 = parseInt(masterData[masterDataOrder.indexOf('color5')].substr(1), 16).toString();
        output.Song.Info._color6 = parseInt(masterData[masterDataOrder.indexOf('color6')].substr(1), 16).toString();
        output.Song.Info._color7 = parseInt(masterData[masterDataOrder.indexOf('color7')].substr(1), 16).toString();
        output.Song.Info._color8 = parseInt(masterData[masterDataOrder.indexOf('color8')].substr(1), 16).toString();
        output.Song.Info._color9 = parseInt(masterData[masterDataOrder.indexOf('color9')].substr(1), 16).toString();



        // add markers
        for(let order = 0; order < markerOrder.length; order++) {
            switch(markerOrder[order]) {
                case 1:
                    // add spinrates
                    for(let spin=0; spin<markerCount[order]; spin++) {
                        let spinrateJSON = {};
                        let valuePos = -1;

                        valuePos = masterDataOrder.indexOf('time');
                        spinrateJSON._time = this._insertDataAndSplice(valuePos, masterData, masterDataOrder);

                        spinrateJSON._enemies = "0";
                        spinrateJSON._warpType = "spinRate";

                        valuePos = masterDataOrder.indexOf('val');
                        spinrateJSON._val = this._insertDataAndSplice(valuePos, masterData, masterDataOrder);

                        output.Song.Script.push(spinrateJSON);
                    }
                    break;
                case 2:
                    // add timewarps
                    for(let time=0; time<markerCount[order]; time++) {
                        let timewarpJSON = {};
                        let valuePos = -1;

                        valuePos = masterDataOrder.indexOf('time');
                        timewarpJSON._time = this._insertDataAndSplice(valuePos, masterData, masterDataOrder);

                        timewarpJSON._enemies = "0";
                        timewarpJSON._warpType = "timeWarp";

                        valuePos = masterDataOrder.indexOf('val');
                        timewarpJSON._val = this._insertDataAndSplice(valuePos, masterData, masterDataOrder);

                        output.Song.Script.push(timewarpJSON);
                    }
                    break;
                case 3:
                    // add bullets

                    for(let bullet=0; bullet<markerCount[order]; bullet++) {
                        let bulletJSON = {};

                        bulletJSON._time = this._insertDataAndSplice(masterDataOrder.indexOf('time'), masterData, masterDataOrder);
                        bulletJSON._enemies = this._insertDataAndSplice(masterDataOrder.indexOf('enemies'), masterData, masterDataOrder);
                        bulletJSON._bulletType = this._insertDataAndSplice(masterDataOrder.indexOf('bulletType'), masterData, masterDataOrder);
                        bulletJSON._aim = this._insertDataAndSplice(masterDataOrder.indexOf('aim'), masterData, masterDataOrder);

                        switch(bulletTypeOrder[bullet]){
                            case 3:     // add normal shot template
                                bulletJSON._shotType = "normal";
                                bulletJSON._speed0 = this._insertDataAndSplice(masterDataOrder.indexOf('speed0'), masterData, masterDataOrder);
                                bulletJSON._offset0 = this._insertDataAndSplice(masterDataOrder.indexOf('offset0'), masterData, masterDataOrder);
                                bulletJSON._amount0 = this._insertDataAndSplice(masterDataOrder.indexOf('amount0'), masterData, masterDataOrder);
                                bulletJSON._angle0 = this._insertDataAndSplice(masterDataOrder.indexOf('angle0'), masterData, masterDataOrder);
                                break;
                            case 4:     // add wave shot template
                                bulletJSON._shotType = "wave";
                                bulletJSON._rows = this._insertDataAndSplice(masterDataOrder.indexOf('rows'), masterData, masterDataOrder);
                                bulletJSON._speed0 = this._insertDataAndSplice(masterDataOrder.indexOf('speed0'), masterData, masterDataOrder);
                                bulletJSON._speed1 = this._insertDataAndSplice(masterDataOrder.indexOf('speed1'), masterData, masterDataOrder);
                                bulletJSON._offset0 = this._insertDataAndSplice(masterDataOrder.indexOf('offset0'), masterData, masterDataOrder);
                                bulletJSON._offset1 = this._insertDataAndSplice(masterDataOrder.indexOf('offset1'), masterData, masterDataOrder);
                                bulletJSON._amount0 = this._insertDataAndSplice(masterDataOrder.indexOf('amount0'), masterData, masterDataOrder);
                                bulletJSON._amount1 = this._insertDataAndSplice(masterDataOrder.indexOf('amount1'), masterData, masterDataOrder);
                                bulletJSON._angle0 = this._insertDataAndSplice(masterDataOrder.indexOf('angle0'), masterData, masterDataOrder);
                                bulletJSON._angle1 = this._insertDataAndSplice(masterDataOrder.indexOf('angle1'), masterData, masterDataOrder);
                                break;
                            case 5:     // add stream shot template
                                bulletJSON._shotType = "stream";
                                bulletJSON._amount = this._insertDataAndSplice(masterDataOrder.indexOf('amount'), masterData, masterDataOrder);
                                bulletJSON._speed0 = this._insertDataAndSplice(masterDataOrder.indexOf('speed0'), masterData, masterDataOrder);
                                bulletJSON._speed1 = this._insertDataAndSplice(masterDataOrder.indexOf('speed1'), masterData, masterDataOrder);
                                bulletJSON._offset0 = this._insertDataAndSplice(masterDataOrder.indexOf('offset0'), masterData, masterDataOrder);
                                bulletJSON._offset1 = this._insertDataAndSplice(masterDataOrder.indexOf('offset1'), masterData, masterDataOrder);
                                bulletJSON._angle0 = this._insertDataAndSplice(masterDataOrder.indexOf('angle0'), masterData, masterDataOrder);
                                bulletJSON._angle1 = this._insertDataAndSplice(masterDataOrder.indexOf('angle1'), masterData, masterDataOrder);
                                bulletJSON._duration = this._insertDataAndSplice(masterDataOrder.indexOf('duration'), masterData, masterDataOrder);
                                break;
                            case 6:     // add burst shot template
                                bulletJSON._shotType = "burst";
                                bulletJSON._speed0 = this._insertDataAndSplice(masterDataOrder.indexOf('speed0'), masterData, masterDataOrder);
                                bulletJSON._speed1 = this._insertDataAndSplice(masterDataOrder.indexOf('speed1'), masterData, masterDataOrder);
                                bulletJSON._offset0 = this._insertDataAndSplice(masterDataOrder.indexOf('offset0'), masterData, masterDataOrder);
                                bulletJSON._offset1 = this._insertDataAndSplice(masterDataOrder.indexOf('offset1'), masterData, masterDataOrder);
                                bulletJSON._amount0 = this._insertDataAndSplice(masterDataOrder.indexOf('amount0'), masterData, masterDataOrder);
                                bulletJSON._amount1 = this._insertDataAndSplice(masterDataOrder.indexOf('amount1'), masterData, masterDataOrder);
                                bulletJSON._angle0 = this._insertDataAndSplice(masterDataOrder.indexOf('angle0'), masterData, masterDataOrder);
                                bulletJSON._angle1 = this._insertDataAndSplice(masterDataOrder.indexOf('angle1'), masterData, masterDataOrder);
                                break;
                        }
                        output.Song.Script.push(bulletJSON);
                    }
                    break;
            }
        }

        // this sdon object's data attribute now has a jsonified level!
        return output;
    }
}
