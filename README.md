# sdon
sdon <-> json library for Soundodger


### Presentation

sdon is the name given to this customizable soundodger level file format made with the idea of making manual level editing easier and less prone to error.

### Made for you, by you

sdon files were made with customization in mind, allowing people to download sdon files writen in the way they want it to be written.

The template creation process was made as easy as possible, simply modify the sdon.formats.js file by adding a new array entry to the object with the format name of your choice, and you can now create the templates that you want to use!

### Customization Limitations

- markers will always be surrounded by { }
- the mp3 path, song name, artist name, designer and subtitle will always be surrounded by ""
- color codes will always be translated into their respective hex codes
- the characters '{' and '}' cannot be used
- input points must be separated by at least one character
- commas cannot be used to separate input points

everything else in sodn files are entirely customizable by anyone.


### Exemple

Here is an example of a json file turned into 2 sdon file, both with templates


#### JSON
```JSON
{
  "Song": {
    "Info": {
      "_nick": "Starcadian - Trapped In America small",
      "_enemies": "30",
      "_color1": "16480890",
      "_color2": "15072255",
      "_color3": "132724",
      "_color4": "0",
      "_color5": "65793",
      "_color6": "0",
      "_color7": "0",
      "_color8": "0",
      "_color9": "14207739",
      "_title": "Trapped In America",
      "_artist": "Starcadian",
      "_difficulty": "4",
      "_designer": "Blü & Furret",
      "_MP3Name": "Starcadian - Trapped In America.mp3",
      "_bgBlack": "true",
      "_audioPreview": "50",
      "_subtitle": "Midnight Signals // 2017"
    },
    "Script": [
      {
        "_time": "0",
        "_enemies": "0",
        "_warpType": "timeWarp",
        "_val": "1"
      },
      {
        "_time": "111.753",
        "_enemies": "0",
        "_warpType": "timeWarp",
        "_val": "1"
      },
      {
        "_time": "112.303",
        "_enemies": "0",
        "_warpType": "timeWarp",
        "_val": "0.8"
      },
      {
        "_time": "112.427",
        "_enemies": "0",
        "_warpType": "timeWarp",
        "_val": "2"
      },
      {
        "_time": "112.553",
        "_enemies": "0",
        "_warpType": "timeWarp",
        "_val": "4"
      },
      {
        "_time": "112.594",
        "_enemies": "0",
        "_warpType": "timeWarp",
        "_val": "1"
      },
      {
        "_time": "210.599",
        "_enemies": "0",
        "_warpType": "timeWarp",
        "_val": "1"
      },
      {
        "_time": "0",
        "_enemies": "0",
        "_warpType": "spinRate",
        "_val": "0"
      },
      {
        "_time": "210.599",
        "_enemies": "0",
        "_warpType": "spinRate",
        "_val": "0"
      },
      {
        "_time": "108.305",
        "_enemies": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
        "_shotType": "stream",
        "_bulletType": "bubble",
        "_aim": "mid",
        "_amount": "0",
        "_offset0": "0",
        "_speed0": "4",
        "_angle0": "1",
        "_offset1": "0",
        "_speed1": "4",
        "_angle1": "1",
        "_duration": "104.73"
      },
      {
        "_time": "109.583",
        "_enemies": "3",
        "_shotType": "wave",
        "_bulletType": "nrm2",
        "_rows": "6",
        "_aim": "mid",
        "_offset0": "-25",
        "_amount0": "2",
        "_speed0": "4",
        "_angle0": "0",
        "_offset1": "-25",
        "_amount1": "2",
        "_speed1": "6",
        "_angle1": "5"
      },
      {
        "_time": "109.738",
        "_enemies": "29",
        "_shotType": "wave",
        "_bulletType": "nrm2",
        "_rows": "6",
        "_aim": "mid",
        "_offset0": "25",
        "_amount0": "2",
        "_speed0": "4",
        "_angle0": "0",
        "_offset1": "25",
        "_amount1": "2",
        "_speed1": "6",
        "_angle1": "5"
      },
      {
        "_time": "110.003",
        "_enemies": "1",
        "_shotType": "wave",
        "_bulletType": "nrm2",
        "_rows": "6",
        "_aim": "mid",
        "_offset0": "0",
        "_amount0": "2",
        "_speed0": "4",
        "_angle0": "0",
        "_offset1": "0",
        "_amount1": "2",
        "_speed1": "6",
        "_angle1": "5"
      },
      {
        "_time": "112.313",
        "_enemies": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
        "_shotType": "stream",
        "_bulletType": "bubble",
        "_aim": "mid",
        "_amount": "0",
        "_offset0": "0",
        "_speed0": "4",
        "_angle0": "1",
        "_offset1": "0",
        "_speed1": "4",
        "_angle1": "1",
        "_duration": "0.02"
      },
      {
        "_time": "116.738",
        "_enemies": "26",
        "_shotType": "wave",
        "_bulletType": "nrm",
        "_rows": "10",
        "_aim": "mid",
        "_offset0": "95",
        "_amount0": "1",
        "_speed0": "3.5",
        "_angle0": "1",
        "_offset1": "95",
        "_amount1": "1",
        "_speed1": "6",
        "_angle1": "1"
      },
      {
        "_time": "116.797",
        "_enemies": "3",
        "_shotType": "wave",
        "_bulletType": "nrm2",
        "_rows": "6",
        "_aim": "mid",
        "_offset0": "-25",
        "_amount0": "2",
        "_speed0": "4",
        "_angle0": "0",
        "_offset1": "-25",
        "_amount1": "2",
        "_speed1": "6",
        "_angle1": "5"
      }
    ]
  }
}
```


#### sdon (default template)
```
info [
    mp3 name: "Starcadian - Trapped In America.mp3"
    audio preview: 50%
    song: "Trapped In America"
    by: "Starcadian"
    level creator: "Blü & Furret"
    subtitle: "Midnight Signals // 2017"
    enemy count: 30
    difficulty: 4
    black background: true
]

color [
    linear A: #fb7a7a
    linear B: #e5fbff
    homing: #20674
    bubble: #0
    hug: #d8cafb
    outline: #10101
    outer rings: #0
    slow motion: #0
    score circle: #0
]


spinrate: [
{ @0, 0 }
{ @210.599, 0 }

]

timewarp: [
{ @0, 1 }
{ @111.753, 1 }
{ @112.303, 0.8 }
{ @112.427, 2 }
{ @112.553, 4 }
{ @112.594, 1 }
{ @210.599, 1 }

]

bullet: [
{
    @108.305, o>1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30;
    bubble stream with an amount of 0 aimed at mid,
    speed from 4 to 4,
    offset from 0 to 0,
    angle from 1 to 1,
    lasts for 104.73 seconds
}
{
    @109.583, o>3;
    nrm2 wave with 6 rows aimed at mid,
    speed from 4 to 6,
    offset from -25 to -25,
    amount from 2 to 2,
    angle from 0 to 5
}
{
    @109.738, o>29;
    nrm2 wave with 6 rows aimed at mid,
    speed from 4 to 6,
    offset from 25 to 25,
    amount from 2 to 2,
    angle from 0 to 5
}
{
    @110.003, o>1;
    nrm2 wave with 6 rows aimed at mid,
    speed from 4 to 6,
    offset from 0 to 0,
    amount from 2 to 2,
    angle from 0 to 5
}
{
    @112.313, o>1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30;
    bubble stream with an amount of 0 aimed at mid,
    speed from 4 to 4,
    offset from 0 to 0,
    angle from 1 to 1,
    lasts for 0.02 seconds
}
{
    @116.738, o>26;
    nrm wave with 10 rows aimed at mid,
    speed from 3.5 to 6,
    offset from 95 to 95,
    amount from 1 to 1,
    angle from 1 to 1
}
{
    @116.797, o>3;
    nrm2 wave with 6 rows aimed at mid,
    speed from 4 to 6,
    offset from -25 to -25,
    amount from 2 to 2,
    angle from 0 to 5
}
]
```


#### sdon (toodles template)
```
it me -> "Blü & Furret" <- !!!

let's use the song "Trapped In America" by "Starcadian", love that one!
my mp3 is called "Starcadian - Trapped In America.mp3"
make the preview my favorite part AKA 50% into it, just so gud OUO
subtext will be my favorite lyric: "Midnight Signals // 2017"
let's use 30 enemies
I'm feeling a 4 circle difficulty on this one
am I advanced? true
-~_ ^^ about me ^^ _~-

-~_ vv colors vv _~-
linear:
    A -> #fb7a7a
    B -> #e5fbff

homing -> #20674
bubble -> #0
hug -> #d8cafb

outline -> #10101
outer -> #0
slowmo -> #0
score -> #0

LEVEL TIME

vv spinrate vv
{ time -> 0 spin -> 0 }
{ time -> 210.599 spin -> 0 }

-------------------------
{ time -> 0 wub wub -> 1 }
{ time -> 111.753 wub wub -> 1 }
{ time -> 112.303 wub wub -> 0.8 }
{ time -> 112.427 wub wub -> 2 }
{ time -> 112.553 wub wub -> 4 }
{ time -> 112.594 wub wub -> 1 }
{ time -> 210.599 wub wub -> 1 }

^^ timewarp ^^

bulletz!!!
{
    @108.305, o>1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30;
    bubble stream with an amount of 0 aimed at mid,
    speed from 4 to 4,
    offset from 0 to 0,
    angle from 1 to 1,
    lasts for 104.73 seconds
}
{
    @109.583, o>3;
    nrm2 wave (OAO) with 6 rows (oh noes!!) aimed at mid,
    speed from 4 to 6,
    offset from -25 to -25,
    amount from 2 to 2,
    angle from 0 to 5
}
{
    @109.738, o>29;
    nrm2 wave (OAO) with 6 rows (oh noes!!) aimed at mid,
    speed from 4 to 6,
    offset from 25 to 25,
    amount from 2 to 2,
    angle from 0 to 5
}
{
    @110.003, o>1;
    nrm2 wave (OAO) with 6 rows (oh noes!!) aimed at mid,
    speed from 4 to 6,
    offset from 0 to 0,
    amount from 2 to 2,
    angle from 0 to 5
}
{
    @112.313, o>1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30;
    bubble stream with an amount of 0 aimed at mid,
    speed from 4 to 4,
    offset from 0 to 0,
    angle from 1 to 1,
    lasts for 0.02 seconds
}
{
    @116.738, o>26;
    nrm wave (OAO) with 10 rows (oh noes!!) aimed at mid,
    speed from 3.5 to 6,
    offset from 95 to 95,
    amount from 1 to 1,
    angle from 1 to 1
}
{
    @116.797, o>3;
    nrm2 wave (OAO) with 6 rows (oh noes!!) aimed at mid,
    speed from 4 to 6,
    offset from -25 to -25,
    amount from 2 to 2,
    angle from 0 to 5
}
```
