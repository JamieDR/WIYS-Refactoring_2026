import requests
from requests.auth import HTTPBasicAuth

wp_username = "Jamie Delos Reyes"
wp_password = "dYskG4C7NjenzBchL8FXAuMj"
wp_auth = HTTPBasicAuth(wp_username, wp_password)

post_id = 164881

# Test different API endpoints
print("Testing API endpoints for post 164881...\n")

# Test 1: Standard post endpoint
print("Test 1: Standard endpoint")
url = f"https://wheninyourstate.com/wp-json/wp/v2/posts/{post_id}"
response = requests.get(url, auth=wp_auth)
print(f"Status: {response.status_code}")
if response.status_code == 200:
    data = response.json()
    print(f"Meta keys available: {list(data.get('meta', {}).keys())}\n")

# Test 2: With context=edit
print("Test 2: With context=edit")
url = f"https://wheninyourstate.com/wp-json/wp/v2/posts/{post_id}?context=edit"
response = requests.get(url, auth=wp_auth)
print(f"Status: {response.status_code}")
if response.status_code == 200:
    data = response.json()
    meta = data.get('meta', {})
    print(f"Meta keys: {list(meta.keys())}")
    
    # Check for short title variations
    for key in meta.keys():
        if 'short' in key.lower() or 'title' in key.lower():
            print(f"  Found: {key} = {meta[key]}")

print("\nDone!")
input("\nPress Enter to exit...")  # ADD THIS LINE