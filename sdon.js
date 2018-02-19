import locals from './sdon.local.js';

var lang = locals[(navigator.language || navigator.userLanguage)] ? (navigator.language || navigator.userLanguage) : 'en';

export default {
    createSDON(json) {
        var sdon;

        sdon = json
        .replace(/"/g, '')
        .replace(/:/g, '')
        .replace(/_/g, '')
        .replace('heartsNeeded undefined,', '')
        .replace(/\bnick\b/g, locals[lang].nick)
        .replace(/\benemies\b/, locals[lang].enemyCount)
        .replace(/\btitle\b/g, locals[lang].title)
        .replace(/\bartist\b/g, locals[lang].artist)
        .replace(/\bdifficulty\b/g, locals[lang].difficulty)
        .replace(/\bdesigner\b/g, locals[lang].designer)
        .replace(/\bMP3Name\b/g, locals[lang].MP3name)
        .replace(/\bbgBlack true\b/g, locals[lang].bgBlack_true)
        .replace(/\bbgBlack false\b/g, locals[lang].bgBlack_false)
        .replace(/\baudioPreview\b/g, locals[lang].audioPreview)
        .replace(/\bsubtitle\b/g, locals[lang].subtitle)

        .replace(/\btime\b/g, locals[lang].time)
        .replace(/\benemies\b/g, locals[lang].enemies)
        .replace(/\bwarpType\b/g, locals[lang].warpType)
            .replace(/\btimeWarp\b/g, locals[lang].timeWarp)
            .replace(/\bspinRate\b/g, locals[lang].spinRate)
        .replace(/\bval\b/g, locals[lang].val)
        .replace(/\bshotType\b/g, locals[lang].shotType)
            .replace(/\bbulletType\b/g, locals[lang].bulletType)
        .replace(/\baim\b/g, locals[lang].aim)
            .replace(/\bmid\b/g, locals[lang].mid)
            .replace(/\bpl\b/g, locals[lang].pl)
        .replace(/\boffset0\b/g, locals[lang].offset0)
        .replace(/\boffset1\b/g, locals[lang].offset1)
        .replace(/\bamount0\b/g, locals[lang].amount0)
        .replace(/\bamount1\b/g, locals[lang].amount1)
        .replace(/\bangle0\b/g, locals[lang].angle0)
        .replace(/\bangle1\b/g, locals[lang].angle1)
        .replace(/\bspeed0\b/g, locals[lang].speed0)
        .replace(/\bspeed1\b/g, locals[lang].speed1)
        .replace(/\brows\b/g, locals[lang].rows)
        .replace(/\blifespan\b/g, locals[lang].lifespan)
        .replace(/\bduration\b/g, locals[lang].duration);

        var colorTexts = sdon.match(/\bcolor[0-9] [0-9]+\b/g).map((val)=>{
            var newVal = val.split(' ');
            newVal[0] = newVal[0]
            .replace('color1', locals[lang].color1)
            .replace('color2', locals[lang].color2)
            .replace('color3', locals[lang].color3)
            .replace('color4', locals[lang].color4)
            .replace('color5', locals[lang].color5)
            .replace('color6', locals[lang].color6)
            .replace('color7', locals[lang].color7)
            .replace('color8', locals[lang].color8)
            .replace('color9', locals[lang].color9)

            newVal[1] = parseInt(newVal[1]).toString(16);
            return newVal.join('');
        });

        sdon = sdon
        .replace(/color1 [0-9]+/, colorTexts[0])
        .replace(/color2 [0-9]+/, colorTexts[1])
        .replace(/color3 [0-9]+/, colorTexts[2])
        .replace(/color4 [0-9]+/, colorTexts[3])
        .replace(/color5 [0-9]+/, colorTexts[4])
        .replace(/color6 [0-9]+/, colorTexts[5])
        .replace(/color7 [0-9]+/, colorTexts[6])
        .replace(/color8 [0-9]+/, colorTexts[7])
        .replace(/color9 [0-9]+/, colorTexts[8]);

        return sdon;
    },
    translateSDON(sdon) {
        var json;

        json = sdon
        .replace(/\bSong\b/, 'Song:')
        .replace(/\bInfo\b/, 'Info:')
        .replace(/\bScript\b/, 'Script:')
        .replace('heartsNeeded undefined,', "")
        .replace(new RegExp(locals[lang].nick, 'g'), '_nick:')
        .replace(new RegExp(locals[lang].enemyCount, 'g'), '_enemies:')
        .replace(new RegExp(locals[lang].title, 'g'), '_title:')
        .replace(new RegExp(locals[lang].artist, 'g'), '_artist:')
        .replace(new RegExp(locals[lang].difficulty, 'g'), '_difficulty:')
        .replace(new RegExp(locals[lang].designer, 'g'), '_designer:')
        .replace(new RegExp(locals[lang].MP3name, 'g'), '_MP3name:')
        .replace(new RegExp(locals[lang].bgBlack_true, 'g'), '_bgBlack: true')
        .replace(new RegExp(locals[lang].bgBlack_false, 'g'), '_bgBlack: false')
        .replace(new RegExp(locals[lang].audioPreview, 'g'), '_audioPreview:')
        .replace(new RegExp(locals[lang].subtitle, 'g'), '_subtitle:')

        .replace(new RegExp(locals[lang].time, 'g'), '_time:')
        .replace(new RegExp(locals[lang].enemies, 'g'), '_enemies:')
        .replace(new RegExp(locals[lang].warpType, 'g'), '_warpType:')
            .replace(new RegExp(locals[lang].timeWarp, 'g'), 'timeWarp')
            .replace(new RegExp(locals[lang].spinRate, 'g'), 'spinRate')
        .replace(new RegExp(locals[lang].val, 'g'), '_val:')
        .replace(new RegExp(locals[lang].shotType, 'g'), '_shotType:')
            .replace(new RegExp(locals[lang].bulletType, 'g'), '_bulletType:')
        .replace(new RegExp(locals[lang].aim, 'g'), '_aim:')
            .replace(new RegExp(locals[lang].mid, 'g'), 'mid')
            .replace(new RegExp(locals[lang].pl, 'g'), 'pl')
        .replace(new RegExp(locals[lang].offset0, 'g'), '_offset0:')
        .replace(new RegExp(locals[lang].offset1, 'g'), '_offset1:')
        .replace(new RegExp(locals[lang].amount0, 'g'), '_amount0:')
        .replace(new RegExp(locals[lang].amount1, 'g'), '_amount1:')
        .replace(new RegExp(locals[lang].angle0, 'g'), '_angle0:')
        .replace(new RegExp(locals[lang].angle1, 'g'), '_angle1:')
        .replace(new RegExp(locals[lang].speed0, 'g'), '_speed0:')
        .replace(new RegExp(locals[lang].speed1, 'g'), '_speed1:')
        .replace(new RegExp(locals[lang].rows, 'g'), '_rows:')
        .replace(new RegExp(locals[lang].lifespan, 'g'), '_lifespan:')
        .replace(new RegExp(locals[lang].duration, 'g'), '_duration:')
        .replace(new RegExp(locals[lang].color1, 'g'), '_color1:')
        .replace(new RegExp(locals[lang].color2, 'g'), '_color2:')
        .replace(new RegExp(locals[lang].color3, 'g'), '_color3:')
        .replace(new RegExp(locals[lang].color4, 'g'), '_color4:')
        .replace(new RegExp(locals[lang].color5, 'g'), '_color5:')
        .replace(new RegExp(locals[lang].color6, 'g'), '_color6:')
        .replace(new RegExp(locals[lang].color7, 'g'), '_color7:')
        .replace(new RegExp(locals[lang].color8, 'g'), '_color8:')
        .replace(new RegExp(locals[lang].color9, 'g'), '_color9:');

        json = json.match(/.+/g).map((val)=>{
            val = val.replace(/^ +/gm, '').replace(/\n/g, '');

            if(val.indexOf(':') >= 0) {
                var line = val.split(/: ?/);
                line[0] = '"'+line[0]+'"';

                if(line[0].match(/color[0-9]/)) {
                    if(line[1].match(/,/))
                        line[1] = '"'+parseInt(line[1], 16).toString()+'",';
                    else
                        line[1] = '"'+parseInt(line[1], 16).toString()+'"';
                }
                else if(
                    line[0].indexOf("Song") == -1 &&
                    line[0].indexOf("Info") == -1 &&
                    line[0].indexOf("Script") == -1
                ) {
                    if(line[1].match(/,/))
                        line[1] = '"'+line[1].match(/([^,]+)/)[0]+'",';
                    else
                        line[1] = '"'+line[1]+'"';
                }

                val = line.join(':');
            }

            return val;
        }).join('');

        return JSON.parse(json);
    }
}
