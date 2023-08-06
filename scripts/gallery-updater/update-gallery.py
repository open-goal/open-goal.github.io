import glob
import os
from pathlib import Path
import json
from PIL import Image
import pillow_avif

galleryMap = {
  'jak1': {
    'name': "Jak and Daxter: The Precursor Legacy",
    'metaTitle': "Jak and Daxter: The Precursor Legacy Galleries",
    'metaDescription': "A collection of images taken with OpenGOAL as well as during its development running Jak and Daxter: The Precursor Legacy",
    'galleries': {
      'promo': {
        'name': "Promo Gallery",
        'description': "Composed shots meant to show off the port. Click the images to open them in 8K (7680x4320) resolution! Originally captured at 16K (15360x8640).",
        'folder': 'jak1/promo',
        'media': []
      },
      'dev': {
        'name': "Development Gallery",
        'description': "Various pictures and videos we took while working on the Jak and Daxter: The Precursor Legacy port.",
        'folder': 'jak1/dev',
        'media': []
      }
    }
  },
  'jak2': {
    'name': "Jak II",
    'metaTitle': "Jak II Galleries",
    'metaDescription': "A collection of images taken with OpenGOAL as well as during its development running Jak II",
    'galleries': {
      'dev': {
        'name': "Development Gallery",
        'description': "Various pictures and videos we took while working on Jak II.",
        'folder': 'jak2/dev',
        'media': []
      }
    }
  }
}

def gen_thumbnail(file, out_folder):
  file_name_no_ext = Path(file).stem
  thumb_path = out_folder + file_name_no_ext + ".jpg"
  with Image.open(file) as im:
    if im.mode in  ("RGBA", "P"):
      im = im.convert("RGB")
    im.thumbnail([768,512])
    im.save(thumb_path, "JPEG")
  return thumb_path.replace("./static", "")

def is_file_in_dir(file_listing, file_name):
  for f in file_listing:
    name = os.path.basename(f)
    if name == file_name:
      return True
  return False


def init_media_links(folder, meta):
  files = glob.glob(folder + "/*.png", recursive=False)
  files.extend(glob.glob(folder + "/*.avif", recursive=False))
  files.extend(glob.glob(folder + "/*.jpg", recursive=False))
  files.extend(glob.glob(folder + "/*.jpeg", recursive=False))

  media_links = []
  file_names = set()
  # If we've provided ordering via the `meta.json` file, use that to enumerate through
  # add any extra images to the end that we havn't encountered
  if meta is not None:
    for file_info in meta:
      if "name" not in file_info:
        continue
      file_name = file_info["name"]
      file_name_no_ext = Path(file_name).stem
      file_path = "{}/{}".format(folder, file_name)
      if is_file_in_dir(files, file_name):
        thumb_path = gen_thumbnail(file_path, folder + "/thumbs/")
        media_links.append({
          'link': file_path.replace("./static", ""),
          'thumbLink': thumb_path,
          'timestamp': None if "timestamp" not in file_info else file_info["timestamp"],
          'caption': file_name_no_ext.replace("-"," ").title() if "caption" not in file_info else file_info["caption"],
          'video': False if "video" not in file_info else file_info["video"]
        })
      elif "video" in file_info and file_info["video"]:
        media_links.append({
          'link': file_info["link"],
          'timestamp': None if "timestamp" not in file_info else file_info["timestamp"],
          'caption': file_name_no_ext.replace("-"," ").title() if "caption" not in file_info else file_info["caption"],
          'video': True
        })
      file_names.add(file_name)
  # Now add whatever is left over
  for file in files:
    file_name = os.path.basename(file)
    file_name_no_ext = Path(file).stem
    if file_name in file_names:
      continue # skip files we've already done
    gen_thumbnail(file, folder + "/thumbs/")
    media_links.append({
      'link': ("{}/{}".format(folder, file_name)).replace("./static", ""),
      'thumbLink': thumb_path,
      'timestamp': None,
      'caption': file_name_no_ext.replace("-"," ").title(),
      'video': False # TODO - support finding video files
    })
  return media_links


def init_gallery(gallery):
  for _, sub_gallery in gallery["galleries"].items():
    folder_to_search = "./static/gallery/{}".format(sub_gallery["folder"])
    # Check if there is a `meta.json` file which provides ordering and captions
    meta_file = None
    if os.path.exists("{}/_meta.json".format(folder_to_search)):
      with open("{}/_meta.json".format(folder_to_search), 'r') as f:
        meta_file = json.load(f)
    # Initialize the media links
    if os.path.isdir(folder_to_search):
      sub_gallery["media"] = init_media_links(folder_to_search, meta_file)


def generate_gallery(gallery, out_path):
  # Read in the gallery templates
  master_template_file = ""
  with open('./scripts/gallery-updater/gallery-master.template', 'r', encoding='utf-8') as f:
    master_template_file = f.read()
  gallery_template_file = ""
  with open('./scripts/gallery-updater/gallery.template', 'r', encoding='utf-8') as f:
    gallery_template_file = f.read()

  # Replace title and description
  master_template_file = master_template_file.replace("___TITLE___", gallery["metaTitle"])
  master_template_file = master_template_file.replace("___DESCRIPTION___", gallery["metaDescription"])
  master_template_file = master_template_file.replace("___GALLERY-TITLE___", gallery["name"])

  # Generate each (sub-)gallery
  galleries_text = ""
  for _, sub_gallery in gallery["galleries"].items():
    # Generate the actual images, 3 per row
    row_count = 0
    gallery_items = ""
    current_gallery_content = gallery_template_file
    # Replace gallery title and description
    current_gallery_content = current_gallery_content.replace("___TITLE___", "{}".format(sub_gallery["name"]))
    current_gallery_content = current_gallery_content.replace("___DESCRIPTION___", sub_gallery["description"])
    for idx, media_entry in enumerate(sub_gallery["media"]):
      timestamp_prefix = '[{}] '.format(media_entry["timestamp"]) if media_entry["timestamp"] else ""
      if row_count % 3 == 0:
        gallery_items = gallery_items + '            <div className="row center">\n'
      gallery_items = gallery_items + '              <div className="col col--4" style={{textAlign: \'center\'}}>\n'
      if media_entry["video"]:
        gallery_items = gallery_items + '                <ReactPlayer controls width=\'100%\' url="{}" title="{}{}"></ReactPlayer>\n'.format(media_entry["link"], timestamp_prefix, media_entry["caption"].replace('\"', ''))
      else:
        imgThumbSrc = "useBaseUrl('{}')".format(media_entry["thumbLink"])
        imgSrc = "useBaseUrl('{}')".format(media_entry["link"])
        gallery_items = gallery_items + '                <a href={{{}}} ><img loading="lazy" src={{{}}} title="{}{}" /></a>\n'.format(imgSrc, imgThumbSrc, timestamp_prefix, media_entry["caption"].replace('\"', ''))
      gallery_items = gallery_items + '                <blockquote style={{margin: "auto", display: "table"}}>' + '{}{}</blockquote>\n'.format(timestamp_prefix, media_entry["caption"])
      gallery_items = gallery_items + '              </div>\n'
      row_count = row_count + 1
      if row_count % 3 == 0 or idx == len(sub_gallery["media"]) - 1:
        gallery_items = gallery_items + '            </div>\n'
    current_gallery_content = current_gallery_content.replace("___ENTRIES___", gallery_items)
    galleries_text = galleries_text + current_gallery_content

  # write all the galleries now
  master_template_file = master_template_file.replace("___GALLERIES___", galleries_text)

  with open(out_path, 'w', encoding='utf-8') as f:
    f.write(master_template_file)

# generate the gallery data
init_gallery(galleryMap['jak1'])
init_gallery(galleryMap['jak2'])

# write the actual gallery pages
generate_gallery(galleryMap['jak1'], "./src/pages/gallery/jak1.js")
generate_gallery(galleryMap['jak2'], "./src/pages/gallery/jak2.js")
