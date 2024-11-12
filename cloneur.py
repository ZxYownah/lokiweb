# cloneur.py
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

BASE_URL = "https://www.palmero-industrie.fr"
TARGET_DIR = os.path.expanduser("~/sesameit2/lokiweb/www/www.palmero-industrie.fr")
visited_urls = set()


def fetch_and_save(url, path):
    try:
        response = requests.get(url)
        response.raise_for_status()
        # S'assurer que le chemin est un fichier et non un dossier
        if os.path.isdir(path):
            path = os.path.join(path, "index.html")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'wb') as file:
            file.write(response.content)
    except requests.RequestException as e:
        print(f"Échec de téléchargement pour {url} : {e}")


def save_asset(url, asset_type):
    parsed_url = urlparse(url)
    local_path = os.path.join(TARGET_DIR, parsed_url.path.lstrip('/'))
    # Ajouter un nom de fichier par défaut si le chemin se termine par "/"
    if not os.path.splitext(local_path)[1]:  # Vérifie s'il n'y a pas d'extension de fichier
        local_path = os.path.join(local_path, "index.html")
    fetch_and_save(url, local_path)
    return local_path


def process_page(url):
    if url in visited_urls or not url.startswith(BASE_URL):
        return
    visited_urls.add(url)

    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    # Sauvegarder le fichier HTML
    parsed_url = urlparse(url)
    page_path = os.path.join(TARGET_DIR, parsed_url.path.lstrip('/'))
    if parsed_url.path.endswith('/'):
        page_path = os.path.join(page_path, "index.html")
    else:
        page_path += ".html" if not parsed_url.path.endswith(".html") else ""
    fetch_and_save(url, page_path)

    # Mise à jour et téléchargement des ressources
    for tag, attr, asset_type in [('img', 'src', 'image'), ('link', 'href', 'css'), ('script', 'src', 'js')]:
        for asset in soup.find_all(tag):
            asset_url = asset.get(attr)
            if asset_url:
                asset_url = urljoin(url, asset_url)
                local_path = save_asset(asset_url, asset_type)
                asset[attr] = os.path.relpath(local_path, os.path.dirname(page_path))

    # Sauvegarder le HTML mis à jour
    with open(page_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

    # Traitement récursif des pages liées
    for link in soup.find_all('a', href=True):
        linked_url = urljoin(url, link['href'])
        if linked_url.startswith(BASE_URL):
            process_page(linked_url)


def clone_site():
    process_page(BASE_URL)


if __name__ == "__main__":
    os.makedirs(TARGET_DIR, exist_ok=True)
    clone_site()
