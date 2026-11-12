"""
Instagram 最新投稿ID 自動取得スクリプト (update_instagram.py)
--------------------------------------------------------------------
APIキーやログイン不要で、公式埋め込みページから最新の投稿ID（最大6件）を取得し、
data.js の instagramPosts を自動更新します。
GitHub Actions で毎日自動実行されるため、手動メンテナンスは不要です。
"""

import json
import pathlib
import re
import urllib.request


def fetch_latest_shortcodes(username: str) -> list[str]:
    url = f"https://www.instagram.com/{username}/embed"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=15).read().decode("utf-8", errors="ignore")
    m = re.search(r'"contextJSON":"(\{.*?\})"', html)
    if not m:
        return []
    ctx = json.loads(json.loads('"' + m.group(1) + '"'))
    edges = ctx.get("context", {}).get("graphql_media", [])
    return [
        e["shortcode_media"]["shortcode"]
        for e in edges
        if "shortcode_media" in e and "shortcode" in e["shortcode_media"]
    ]


def main() -> None:
    data_path = pathlib.Path(__file__).parent / "data.js"
    content = data_path.read_text(encoding="utf-8")

    hikone_codes = fetch_latest_shortcodes("shiga_athletics")
    otsu_codes = fetch_latest_shortcodes("shiga.edu_rikujo")

    if hikone_codes:
        hikone_block = "hikone: [\n" + ",\n".join(f'      "{c}"' for c in hikone_codes) + "\n    ]"
        content = re.sub(r"hikone:\s*\[[^\]]*\]", hikone_block, content)

    if otsu_codes:
        otsu_block = "otsu: [\n" + ",\n".join(f'      "{c}"' for c in otsu_codes) + "\n    ]"
        content = re.sub(r"otsu:\s*\[[^\]]*\]", otsu_block, content)

    data_path.write_text(content, encoding="utf-8")
    print("Updated data.js with latest Instagram posts:", {"hikone": hikone_codes, "otsu": otsu_codes})


if __name__ == "__main__":
    main()
