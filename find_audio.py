import urllib.request
import re
import json

def check(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        "Referer": "https://y.qq.com/"
    })
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode("utf-8")
        print(f"URL: {url}, length: {len(html)}")
        audios = re.findall(r'https?://[^\s"\'<>]+\.(?:m4a|mp3|ogg)', html)
        print("Found audios:", audios)
        
        # search for media_mid or stream urls
        media = re.findall(r'"(http[^"]*ws\.stream\.qqmusic[^"]*)"', html)
        print("Stream matches:", media)
        
        # search for song url pattern
        purl = re.findall(r'"purl":"([^"]+)"', html)
        print("purls:", purl)
    except Exception as e:
        print("Error:", e)

check("https://i.y.qq.com/v8/playsong.html?songmid=004bkFHI18mkzK")
check("https://i.y.qq.com/v8/playsong.html?songmid=003Po8yW21nPmA")
