"""
Query currently-signed IPSW firmware for the connected device.
Uses ipsw.me (api.ipsw.me) which mirrors Apple's TSS signing status.
"""
import asyncio
import json
import sys
import urllib.request
import urllib.error


def emit(obj):
    sys.stdout.write(json.dumps(obj, default=str, ensure_ascii=False))
    sys.stdout.flush()


def fetch_firmwares(product_type):
    url = f"https://api.ipsw.me/v4/device/{product_type}?type=ipsw"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "OneTap/0.2"})
        with urllib.request.urlopen(req, timeout=15) as r:
            return json.loads(r.read().decode("utf-8"))
    except Exception as e:
        return {"_error": str(e)}


async def run():
    try:
        from pymobiledevice3.lockdown import create_using_usbmux
        from pymobiledevice3.exceptions import NoDeviceConnectedError
    except ImportError as e:
        emit({"error": True, "message": f"pymobiledevice3 미설치: {e}"})
        return

    try:
        lockdown = create_using_usbmux()
        if asyncio.iscoroutine(lockdown):
            lockdown = await lockdown
        info = getattr(lockdown, "all_values", None) or getattr(lockdown, "short_info", None) or {}
        product_type = info.get("ProductType")
        if not product_type:
            emit({"error": True, "message": "디바이스 모델을 식별할 수 없습니다."})
            return
    except NoDeviceConnectedError:
        emit({"error": True, "message": "연결된 디바이스가 없습니다."})
        return
    except Exception as e:
        emit({"error": True, "message": f"{type(e).__name__}: {e}"})
        return

    data = fetch_firmwares(product_type)
    if isinstance(data, dict) and "_error" in data:
        emit({"error": True, "message": f"API 호출 실패: {data['_error']}"})
        return

    firmwares = data.get("firmwares", []) if isinstance(data, dict) else []
    signed = [
        {
            "version": f.get("version"),
            "buildid": f.get("buildid"),
            "signed": f.get("signed", False),
            "filesize_mb": round(f.get("filesize", 0) / 1024 / 1024, 0) if f.get("filesize") else None,
        }
        for f in firmwares
    ]

    emit({
        "product_type": product_type,
        "device_name": data.get("name", product_type) if isinstance(data, dict) else product_type,
        "firmwares": signed[:5],
    })


def main():
    asyncio.run(run())


if __name__ == "__main__":
    main()
