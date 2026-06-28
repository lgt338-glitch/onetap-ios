"""
Enter / exit iOS recovery mode using pymobiledevice3.
Usage: python recovery_action.py enter|exit
"""
import asyncio
import json
import sys


def emit(obj):
    sys.stdout.write(json.dumps(obj, default=str, ensure_ascii=False))
    sys.stdout.flush()


async def run():
    if len(sys.argv) < 2:
        emit({"success": False, "message": "action argument required (enter|exit)"})
        return

    action = sys.argv[1]

    try:
        from pymobiledevice3.lockdown import create_using_usbmux
        from pymobiledevice3.exceptions import NoDeviceConnectedError
    except ImportError as e:
        emit({"success": False, "message": f"pymobiledevice3 미설치: {e}"})
        return

    try:
        if action == "enter":
            lockdown = create_using_usbmux()
            if asyncio.iscoroutine(lockdown):
                lockdown = await lockdown
            result = lockdown.enter_recovery() if hasattr(lockdown, "enter_recovery") else None
            if asyncio.iscoroutine(result):
                await result
            emit({"success": True, "message": "복구 모드 진입 명령 전송. 디바이스가 재부팅됩니다."})

        elif action == "exit":
            from pymobiledevice3.irecv import IRecv
            irecv = IRecv(timeout=5)
            if asyncio.iscoroutine(irecv):
                irecv = await irecv
            method = getattr(irecv, "set_autoboot", None) or getattr(irecv, "reboot", None)
            if method:
                r = method(True) if method.__name__ == "set_autoboot" else method()
                if asyncio.iscoroutine(r):
                    await r
            emit({"success": True, "message": "복구 모드 해제. 디바이스가 정상 부팅됩니다."})

        else:
            emit({"success": False, "message": f"알 수 없는 action: {action}"})

    except NoDeviceConnectedError:
        emit({"success": False, "message": "연결된 디바이스가 없습니다. 케이블을 확인하세요."})
    except Exception as e:
        emit({"success": False, "message": f"{type(e).__name__}: {e}"})


def main():
    asyncio.run(run())


if __name__ == "__main__":
    main()
