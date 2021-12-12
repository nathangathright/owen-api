# Owen API

Fetch oEmbed and Twitter Player details for any given URL

## Twitter and oEmbed
```
GET  https://owen-api.vercel.app/fetch?url=https://player.captivate.fm/episode/9459430f-62ae-40f4-acf2-13bb86b8daad/
{
  "twitter": {
    "url": "https://player.captivate.fm/episode/9459430f-62ae-40f4-acf2-13bb86b8daad?source=twitter%2F",
    "stream": "https://chtbl.com/track/89513E/dts.podtrac.com/redirect.mp3/pdcn.co/e/podcasts.captivate.fm/media/0f837006-bb3a-464a-b7da-a3b22374d5e9/0f837006-bb3a-464a-b7da-a3b22374d5e9.mp3?played_on=player",
    "width": 540,
    "height": 190
  },
  "oEmbed": {
    "url": "https://player.captivate.fm/episode/9459430f-62ae-40f4-acf2-13bb86b8daad",
    "width": 600,
    "height": 200
  }
}

```

## Other
Currently support Apple Podcasts, Simplecast, and RSS.com
```
GET  https://owen-api.vercel.app/fetch?url=https://podcasts.apple.com/us/podcast/id430333725?i=1000542836175
{
  "twitter": null,
  "oEmbed": null,
  "other": {
    "url": "https://embed.podcasts.apple.com/us/podcast/id430333725?i=1000542836175",
    "width": 480,
    "height": 175
  }
}
```

## Known Providers
A list of known providers is available on [Airtable](https://t.co/LnwMYP74X3).
