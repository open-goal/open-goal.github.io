import glob
import os
from pathlib import Path
import json

galleryLinks = {
  'jak1': {
    'name': "Jak 1",
    'media': [],
  },
  'jak2': {
    'name': "Jak 2",
    'media': [],
  },
  'jak3': {
    'name': "Jak 3",
    'media': [],
  },
  'jakx': {
    'name': "Jak X",
    'media': [],
  },
  'misc': {
    'name': "Miscellaneous",
    'media': [],
  }
}

def get_links(key, folder_to_search):
  if os.path.isdir(folder_to_search):
    files = glob.glob(folder_to_search + "/*.png", recursive=True)
    files.extend(glob.glob(folder_to_search + "/*.jpg", recursive=True))
    files.extend(glob.glob(folder_to_search + "/*.jpeg", recursive=True))
    for f in files:
      galleryLinks[key]["media"].append({
        'fileName': os.path.basename(f),
        'timestamp': Path(f).stem.split("_")[1],
        'caption': Path(f).stem.split("_")[0].replace("-", " ").title(),
        'video': False
      })
    # get videos potentially
    if os.path.exists("{}/videos.json".format(folder_to_search)):
      with open("{}/videos.json".format(folder_to_search), 'r') as f:
        data = json.load(f)
        for video in data:
          galleryLinks[key]["media"].append({
            'link': video["link"].replace("watch?v=", "embed/"),
            'timestamp': video["timestamp"],
            'caption': video["caption"],
            'video': True
          })
    # sort by timestamp
    galleryLinks[key]["media"].sort(key=lambda x: x["timestamp"], reverse=True)

get_links('jak1', './static/gallery/jak1')
get_links('jak2', './static/gallery/jak2')

def generate_gallery(title, description, gallery_entries, gallery_folder, out_path):
  # Read in the gallery template
  template_file = ""
  with open('./scripts/gallery-updater/gallery.template', 'r', encoding='utf-8') as f:
    template_file = f.read()

  # Replace title and description
  template_file = template_file.replace("___TITLE___", title)
  template_file = template_file.replace("___DESCRIPTION___", description)

  # Generate image imports
  image_imports = []
  image_idx = 0
  for entry in gallery_entries:
    if not entry["video"]:
      image_imports.append("import image{} from '/gallery/{}/{}';".format(image_idx, gallery_folder, entry["fileName"]))
      image_idx = image_idx + 1
  template_file = template_file.replace("___IMAGE_IMPORTS___", "\n".join(image_imports))

  # Generate the actual images, 3 per row
  gallery_items = ""
  image_idx = 0
  row_count = 0
  for entry in gallery_entries:
    if row_count % 3 == 0:
      gallery_items = gallery_items + '            <div className="row center">\n'
    gallery_items = gallery_items + '              <div className="col col--4">\n'
    if entry["video"]:
      gallery_items = gallery_items + '                <iframe width="100%" height="300px" src="{}"></iframe>\n'.format(entry["link"])
    else:
      gallery_items = gallery_items + '                <img loading="lazy" src={{image{}}} alt="{} - {}" />\n'.format(image_idx, entry["caption"], entry["timestamp"])
    gallery_items = gallery_items + '                <blockquote>{}</blockquote>\n'.format(entry["caption"])
    gallery_items = gallery_items + '              </div>\n'
    row_count = row_count + 1
    if row_count % 3 == 0:
      gallery_items = gallery_items + '            </div>\n'
    if not entry["video"]:
      image_idx = image_idx + 1
  template_file = template_file.replace("___ENTRIES___", gallery_items)

  with open(out_path, 'w', encoding='utf-8') as f:
    f.write(template_file)

generate_gallery("Jak 1 Development Gallery", "Various pictures and videos we took while working on Jak 1", galleryLinks["jak1"]["media"], "jak1", "./src/pages/gallery/jak1.js")
generate_gallery("Jak 2 Development Gallery", "Various pictures and videos we took while working on Jak 2", galleryLinks["jak2"]["media"], "jak2", "./src/pages/gallery/jak2.js")
