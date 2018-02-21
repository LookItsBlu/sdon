export default {
'default' : [
//general template
`info [
    mp3 name: ..MP3Name..
    audio preview: ..audioPreview..%
    song: ..title..
    by: ..artist..
    level creator: ..designer..
    subtitle: ..subtitle..
    enemy count: ..enemiesTotal..
    difficulty: ..difficulty..
    black background: ..bgBlack..
]

color [
    linear A: ..color1..
    linear B: ..color2..
    homing: ..color3..
    bubble: ..color4..
    hug: ..color9..
    outline: ..color5..
    outer rings: ..color6..
    slow motion: ..color7..
    score circle: ..color8..
]

spinrate: [
..spinrates..
]

timewarp: [
..timewarps..
]

bullet: [
..bullets..
]`,
//spinrate template
`@..time.., ..val..`,
//timewarp template
`@..time.., ..val..`,
//normal bullet template
`    @..time.., o>..enemies..;
    ..bulletType.. shot aimed at ..aim..,
    speed: ..speed0.., offset: ..offset0..,
    amount: ..amount0.., angle: ..angle0..`,
//wave bullet template
`    @..time.., o>..enemies..;
    ..bulletType.. wave with ..rows.. rows aimed at ..aim..,
    speed from ..speed0.. to ..speed1..,
    offset from ..offset0.. to ..offset1..,
    amount from ..amount0.. to ..amount1..,
    angle from ..angle0.. to ..angle1..`,
//stream bullet template
`    @..time.., o>..enemies..;
    ..bulletType.. stream with an amount of ..amount.. aimed at ..aim..,
    speed from ..speed0.. to ..speed1..,
    offset from ..offset0.. to ..offset1..,
    angle from ..angle0.. to ..angle1..,
    lasts for ..duration.. seconds`,
//burst bullet template
`    @..time.., o>..enemies..;
    ..bulletType.. burst aimed at ..aim..,
    speed from ..speed0.. to ..speed1..,
    offset from ..offset0.. to ..offset1..,
    amount from ..amount0.. to ..amount1..,
    angle from ..angle0.. to ..angle1..`
],
'toodles' : [
//general template
`it me -> ..designer.. <- !!!

let's use the song ..title.. by ..artist.., love that one!
my mp3 is called ..MP3Name..
make the preview my favorite part AKA ..audioPreview..% into it, just so gud OUO
subtext will be my favorite lyric: ..subtitle..
let's use ..enemiesTotal.. enemies
I'm feeling a ..difficulty.. circle difficulty on this one
am I advanced? ..bgBlack..
-~_ ^^ about me ^^ _~-

-~_ vv colors vv _~-
linear:
    A -> ..color1..
    B -> ..color2..

homing -> ..color3..
bubble -> ..color4..
hug -> ..color9..

outline -> ..color5..
outer -> ..color6..
slowmo -> ..color7..
score -> ..color8..

LEVEL TIME

vv spinrate vv
..spinrates..
-------------------------
..timewarps..
^^ timewarp ^^

bulletz!!!
..bullets..`,
//spinrate template
`time -> ..time.. spin -> ..val..`,
//timewarp template
`time -> ..time.. wub wub -> ..val..`,
//normal bullet template
`    @..time.., o>..enemies..;
    shoot a normal ..bulletType.. shot aimed at ..aim..,
    speed: ..speed0.., offset: ..offset0..,
    amount: ..amount0.., angle: ..angle0..`,
//wave bullet template
`    @..time.., o>..enemies..;
    ..bulletType.. wave (OAO) with ..rows.. rows (oh noes!!) aimed at ..aim..,
    speed from ..speed0.. to ..speed1..,
    offset from ..offset0.. to ..offset1..,
    amount from ..amount0.. to ..amount1..,
    angle from ..angle0.. to ..angle1..`,
//stream bullet template
`    @..time.., o>..enemies..;
    ..bulletType.. stream with an amount of ..amount.. aimed at ..aim..,
    speed from ..speed0.. to ..speed1..,
    offset from ..offset0.. to ..offset1..,
    angle from ..angle0.. to ..angle1..,
    lasts for ..duration.. seconds`,
//burst bullet template
`    @..time.., o>..enemies..;
    mean ..bulletType.. burst aimed at ..aim..,
    speed from ..speed0.. to ..speed1..,
    offset from ..offset0.. to ..offset1..,
    amount from ..amount0.. to ..amount1..,
    angle from ..angle0.. to ..angle1..`
]
}
