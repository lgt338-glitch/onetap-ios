"""
List iTunes / Finder backups stored on this PC.

Windows: %APPDATA%\\Apple Computer\\MobileSync\\Backup\\ (Microsoft Store iTunes)
         or %APPDATA%\\Apple\\MobileSync\\Backup\\
Mac:     ~/Library/Application Support/MobileSync/Backup/
"""
import json
import os
import sys
from pathlib import Path


def emit(obj):
    sys.stdout.write(json.dumps(obj, default=str, ensure_ascii=False))
    sys.stdout.flush()


def backup_roots():
    if sys.platform == "win32":
        appdata = os.environ.get("APPDATA", "")
        return [
            Path(appdata) / "Apple Computer" / "MobileSync" / "Backup",
            Path(appdata) / "Apple" / "MobileSync" / "Backup",
            Path.home() / "Apple" / "MobileSync" / "Backup",
        ]
    elif sys.platform == "darwin":
        return [Path.home() / "Library" / "Application Support" / "MobileSync" / "Backup"]
    return []


def parse_info_plist(plist_path):
    try:
        import plistlib
        with open(plist_path, "rb") as f:
            return plistlib.load(f)
    except Exception:
        return {}


def folder_size_mb(path):
    total = 0
    try:
        for dirpath, _, filenames in os.walk(path):
            for f in filenames:
                fp = os.path.join(dirpath, f)
                try:
                    total += os.path.getsize(fp)
                except OSError:
                    pass
    except Exception:
        pass
    return round(total / 1024 / 1024, 1)


def main():
    found = []
    for root in backup_roots():
        if not root.exists():
            continue
        for entry in root.iterdir():
            if not entry.is_dir():
                continue
            info_plist = entry / "Info.plist"
            if not info_plist.exists():
                continue
            info = parse_info_plist(info_plist)
            found.append({
                "path": str(entry),
                "udid": entry.name,
                "device_name": info.get("Device Name", "Unknown"),
                "product_type": info.get("Product Type", ""),
                "ios_version": info.get("Product Version", ""),
                "build_version": info.get("Build Version", ""),
                "serial_number": info.get("Serial Number", ""),
                "last_backup_date": str(info.get("Last Backup Date", "")),
                "size_mb": folder_size_mb(entry),
            })

    emit({"backups": found, "searched_paths": [str(p) for p in backup_roots()]})


if __name__ == "__main__":
    main()
