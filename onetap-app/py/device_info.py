"""
Query connected iOS device info using pymobiledevice3 (MIT licensed).
pymobiledevice3 v9+ async API.

Output: JSON to stdout.
- No device:  {"error": "no_device"}
- Error:      {"error": "exception", "message": "..."}
- Success:    lockdown info dict
"""
import asyncio
import json
import sys


def emit(obj):
    sys.stdout.write(json.dumps(obj, default=str, ensure_ascii=False))
    sys.stdout.flush()


async def list_devices_compat():
    try:
        from pymobiledevice3.usbmux import list_devices
        result = list_devices()
        if asyncio.iscoroutine(result):
            result = await result
        return result
    except Exception:
        raise


async def create_lockdown_compat():
    from pymobiledevice3.lockdown import create_using_usbmux
    result = create_using_usbmux()
    if asyncio.iscoroutine(result):
        result = await result
    return result


async def run():
    if "--list" in sys.argv:
        try:
            devs = await list_devices_compat()
            emit({
                "devices": [
                    {"serial": getattr(d, "serial", None), "connection_type": getattr(d, "connection_type", None)}
                    for d in devs
                ]
            })
        except Exception as e:
            emit({"error": "exception", "message": f"{type(e).__name__}: {e}"})
        return

    try:
        devs = await list_devices_compat()
        if not devs:
            emit({"error": "no_device"})
            return
        lockdown = await create_lockdown_compat()
        info = getattr(lockdown, "all_values", None) or getattr(lockdown, "short_info", None) or {}
        if not isinstance(info, dict):
            try:
                info = dict(info)
            except Exception:
                info = {"_raw": str(info)}
        emit(info)
    except Exception as e:
        emit({"error": "exception", "message": f"{type(e).__name__}: {e}"})


def main():
    try:
        from pymobiledevice3.lockdown import create_using_usbmux  # noqa: F401
    except ImportError as e:
        emit({"error": "exception", "message": f"pymobiledevice3 미설치: {e}"})
        return
    asyncio.run(run())


if __name__ == "__main__":
    main()
