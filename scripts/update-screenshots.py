from pathlib import Path
from html import escape
import re
import json
root=Path(__file__).resolve().parent.parent
items=json.loads((root/'data/screenshots.json').read_text())
p=root/'index.html';s=p.read_text()
carousel='<section class="feature-carousel" aria-label="BrAIan feature screenshots" aria-roledescription="carousel"><div class="carousel-viewport" tabindex="0" aria-label="Feature images. Swipe or use the left and right arrow keys.">'
for i,r in enumerate(items):
 name,title,desc,image=[escape(r[k],quote=True) for k in ['name','title','description','image']]
 load='fetchpriority="high"' if i==0 else 'loading="lazy"'
 carousel+=f'<figure class="carousel-slide" role="group" aria-roledescription="slide" aria-label="{i+1} of {len(items)}: {name}" data-name="{name}"><img src="assets/{image}" width="1470" height="761" alt="{name}: {desc}" {load}><figcaption><span class="eyebrow">{name}</span><h2>{title}</h2><p>{desc}</p></figcaption></figure>'
carousel+='</div><div class="carousel-controls" hidden><button class="carousel-arrow" type="button" data-direction="-1" aria-label="Previous feature">←</button><div class="carousel-dots" aria-label="Choose a feature">'
for i,r in enumerate(items):carousel+=f'<button type="button" data-slide="{i}" aria-label="Show {escape(r["name"])}" aria-current="{str(i==0).lower()}"><span>{escape(r["name"])}</span></button>'
carousel+='</div><button class="carousel-arrow" type="button" data-direction="1" aria-label="Next feature">→</button><button class="carousel-play" type="button">Pause slideshow</button></div><p class="carousel-note">Real screenshots from the project’s own BrAIan vault. Swipe to explore.</p><span class="sr-only" data-carousel-status aria-live="polite"></span></section>'
match=re.search(r'<section\b[^>]*class="feature-carousel"[^>]*>',s);assert match, 'Feature carousel missing';a=match.start();b=s.index('</section>',a)+len('</section>');s=s[:a]+carousel+s[b:]
a=s.index('<div class="screen-gallery">');b=s.index('<p class="gallery-note">',a)
gallery='<div class="screen-gallery">'
for r in items:
 image,name,desc=[escape(r[k],quote=True) for k in ['image','name','description']]
 gallery+=f'<figure class="screen-card reveal"><a href="assets/{image}" aria-label="Open full {name} screenshot"><img src="assets/{image}" width="1470" height="761" loading="lazy" alt="{name}: {desc}"></a><figcaption><strong>{name}</strong><span>{desc}</span></figcaption></figure>'
gallery+='</div>';s=s[:a]+gallery+s[b:];p.write_text(s)
print(f'Generated {len(items)} carousel slides and gallery screenshots.')
