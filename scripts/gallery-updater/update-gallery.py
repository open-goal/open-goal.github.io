import glob
import os
from pathlib import Path
import json

galleryLinks = {
  'jak1': {
    'name': "Jak and Daxter",
    'galleries': {
      'promo': {
        'name': "Promo Gallery",
        'description': "Composed shots meant to show off the port, captured at 16K (15360x8640) and downscaled to 2K (2560x1440).",
        'folder': 'jak1promo',
        'media': []
      },
      'dev': {
        'name': "Development Gallery",
        'description': "Various pictures and videos we took while working on the Jak and Daxter port.",
        'folder': 'jak1',
        'media': []
      }
    }
  },
  'jak2': {
    'name': "Jak II",
    'galleries': {
      'dev': {
        'name': "Development Gallery",
        'description': "Various pictures and videos we took while working on Jak II.",
        'folder': 'jak2',
        'media': []
      }
    }
  },
  'jak3': {
    'name': "Jak 3",
    'galleries': {
      'dev': {
        'name': "Development Gallery",
        'description': "Various pictures and videos we took while working on Jak II.",
        'folder': 'jak2',
        'media': []
      }
    }
  },
  'jakx': {
    'name': "Jak X",
    'galleries': {
      'dev': {
        'name': "Development Gallery",
        'description': "Various pictures and videos we took while working on Jak II.",
        'folder': 'jak2',
        'media': []
      }
    }
  },
  'misc': {
    'name': "Miscellaneous",
    'galleries': {
      'dev': {
        'name': "Development Gallery",
        'description': "Various pictures and videos we took while working on Jak II.",
        'folder': 'jak2',
        'media': []
      }
    }
  }
}

def get_links(key, gallery_name, specific_order = False, no_captions = False):
  gallery = galleryLinks[key]["galleries"][gallery_name]
  folder_to_search = "./static/gallery/{}".format(gallery["folder"])
  order_file = []
  if os.path.exists("{}/order.json".format(folder_to_search)):
    with open("{}/order.json".format(folder_to_search), 'r') as f:
      order_file = json.load(f)
  if os.path.isdir(folder_to_search):
    files = glob.glob(folder_to_search + "/*.png", recursive=True)
    files.extend(glob.glob(folder_to_search + "/*.jpg", recursive=True))
    files.extend(glob.glob(folder_to_search + "/*.jpeg", recursive=True))
    file_captions = {};
    # change image captions if wanted
    if os.path.exists("{}/captions.json".format(folder_to_search)):
      with open("{}/captions.json".format(folder_to_search), 'r') as f:
        file_captions = json.load(f)
    for f in files:
      name = Path(f).stem.split("_")[0]
      timestamp = ""
      if specific_order:
        # kinda hacky, using the timestamp field this way...
        timestamp = len(order_file) - order_file.index(name)
      else:
        timestamp = Path(f).stem.split("_")[1]
      caption = (file_captions.get(name), "")[no_captions]
      gallery["media"].append({
        'fileName': os.path.basename(f),
        'name': name,
        'timestamp': timestamp,
        'caption': (caption, name.replace("-", " ").title())[caption is None],
        'video': False
      })
    # get videos potentially
    if os.path.exists("{}/videos.json".format(folder_to_search)):
      with open("{}/videos.json".format(folder_to_search), 'r') as f:
        data = json.load(f)
        for video in data:
          gallery["media"].append({
            'link': video["link"].replace("watch?v=", "embed/"),
            'timestamp': video["timestamp"],
            'caption': video["caption"],
            'video': True
          })
    # sort by timestamp
    gallery["media"].sort(key=lambda x: x["timestamp"], reverse=True)

# generate the gallery data
get_links('jak1', 'dev')
get_links('jak1', 'promo', specific_order=True)
get_links('jak2', 'dev')

def generate_gallery(title, description, game_name, gallery_names, out_path):
  # Read in the gallery templates
  master_template_file = ""
  with open('./scripts/gallery-updater/gallery-master.template', 'r', encoding='utf-8') as f:
    master_template_file = f.read()
  gallery_template_file = ""
  with open('./scripts/gallery-updater/gallery.template', 'r', encoding='utf-8') as f:
    gallery_template_file = f.read()

  # Replace title and description
  master_template_file = master_template_file.replace("___TITLE___", title)
  master_template_file = master_template_file.replace("___DESCRIPTION___", description)

  # Generate image imports
  # this checks all images in all galleries supplied
  image_imports = []
  image_idx = 0
  for gallery_name in gallery_names:
    gallery = galleryLinks[game_name]["galleries"][gallery_name]
    for entry in gallery["media"]:
      if not entry["video"]:
        image_imports.append("import image{} from '/gallery/{}/{}';".format(image_idx, gallery["folder"], entry["fileName"]))
        image_idx = image_idx + 1
  master_template_file = master_template_file.replace("___IMAGE_IMPORTS___", "\n".join(image_imports))

  # Generate each (sub-)gallery
  galleries_text = ""
  image_idx = 0
  for gallery_name in gallery_names:
    gallery = galleryLinks[game_name]["galleries"][gallery_name]
    # Generate the actual images, 3 per row
    row_count = 0
    gallery_items = ""
    current_gallery_content = gallery_template_file
    # Replace gallery title and description
    current_gallery_content = current_gallery_content.replace("___TITLE___", "{} {}".format(galleryLinks[game_name]["name"], gallery["name"]))
    current_gallery_content = current_gallery_content.replace("___DESCRIPTION___", gallery["description"])
    for entry in gallery["media"]:
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
    current_gallery_content = current_gallery_content.replace("___ENTRIES___", gallery_items)
    galleries_text = galleries_text + current_gallery_content

  # write all the galleries now
  master_template_file = master_template_file.replace("___GALLERIES___", galleries_text)

  with open(out_path, 'w', encoding='utf-8') as f:
    f.write(master_template_file)

# write the actual gallery pages
generate_gallery("Jak and Daxter Galleries", "Jak and Daxter promo & development galleries", "jak1", ["promo", "dev"], "./src/pages/gallery/jak1.js")
generate_gallery("Jak II Galleries", "Jak II promo & development galleries", "jak2", ["dev"], "./src/pages/gallery/jak2.js")
