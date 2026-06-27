import urllib.request
import zipfile
import os
import shutil

docs = {
    'dmml': 'https://docs.google.com/document/d/1-b0F4PJBxd6Vb9-Ig4GEvxao75JOsikEWI0q3E-NPTw/export?format=zip',
    'dcst': 'https://docs.google.com/document/d/1Is1GKbXxDXks8ptjzypMWGchyJQgm5KlO35nSfZsTaU/export?format=zip',
    'fcc': 'https://docs.google.com/document/d/1QUYxj1561sWmWDm-KZ0qyesf6c_VUQjs/export?format=zip'
}

base_dir = r'c:\Users\chara\nirvaha\backend'
image_dir_base = r'c:\Users\chara\nirvaha\frontend\public\images\courses'

for name, url in docs.items():
    zip_path = os.path.join(base_dir, f'{name}.zip')
    extract_dir = os.path.join(base_dir, f'{name}_extract')
    
    print(f"Downloading {name}...")
    urllib.request.urlretrieve(url, zip_path)
    
    print(f"Extracting {name}...")
    if os.path.exists(extract_dir):
        shutil.rmtree(extract_dir)
    os.makedirs(extract_dir, exist_ok=True)
    
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)
    
    # Copy images to frontend
    images_src = os.path.join(extract_dir, 'images')
    if os.path.exists(images_src):
        images_dest = os.path.join(image_dir_base, name)
        if os.path.exists(images_dest):
            shutil.rmtree(images_dest)
        shutil.copytree(images_src, images_dest)
        print(f"Copied images to {images_dest}")
    else:
        print(f"No images found for {name}")

print("Done!")
