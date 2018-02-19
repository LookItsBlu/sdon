# sdon
json &lt;-> sdon library for Soundodger


### Presentation

sdon files are verbosed json files made with the idea of making manual level editing easier and less prone to error.

here's a comparison of an empty xml level file, and a sdon version of this level file:

xml:
```XML
<Song>
  <Info nick="untitled" enemies="4" color1="12339256" color2="9874517" color3="2578797" color4="9664644" color5="3479615" color6="5348006" color7="932412" color8="5091253" color9="3479615" title="Song Name" artist="Arist Name" difficulty="1" designer="Your Name Here, Buddy" MP3Name="song.mp3" audioPreview="50" subtitle=""/>
  <Script time="0" enemies="0" warpType="timeWarp" val="1"/>
  <Script time="382.459" enemies="0" warpType="timeWarp" val="1"/>
  <Script time="0" enemies="0" warpType="spinRate" val="0"/>
  <Script time="382.459" enemies="0" warpType="spinRate" val="0"/>
</Song>
```

sdon:
```
{
  Song {
    Info {
      the nickname is untitled,
      the ennemy count is 4,
      the linear A color is #bc4838,
      the linear B color is #96ac55,
      the homing color is #27596d,
      the bubble color is #937884,
      the outline color is #35183f,
      the outer rings color is #519aa6,
      the slow-motion color is #e3a3c,
      the score circle color is #4dafb5,
      the hug color is #35183f,
      the title of the level is Song Name,
      the song is made by Artist Name,
      the difficulty is 1,
      the creator is Your Name Here, Buddy,
      
      the mp3 file used is song.mp3,
      the audio preview starts at 50,
      the subtitle for this level is 
    },
    Script [
      {
        this marker is placed at 0,
        it is shot by 0,
        this is a timeWarp marker,
        his value is 1
      },
      {
        this marker is placed at 382.459,
        it is shot by 0,
        this is a timeWarp marker,
        his value is 1
      },
      {
        this marker is placed at 0,
        it is shot by 0,
        this is a spinRate marker,
        his value is 0
      },
      {
        this marker is placed at 382.459,
        it is shot by 0,
        this is a spinRate marker,
        his value is 0
      }
    ]
  }
}
```

### Localization

sdon files were also made with localization in mind, allowing people to download sdon files written in their own language.

The localization process was made as easy as possible, simply modify the sdon.local.js file by adding a new entry to the object with a name equal to the ISO 639-1 code of your language (en for english, fr for french, etc...) and from there copy the object structure of the english localization!
A list of codes is available here: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

