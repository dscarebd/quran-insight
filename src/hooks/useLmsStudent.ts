// LMS student is fully anonymous — no registration required.
// A stable device ID is auto-generated and stored in localStorage.

const DEVICE_ID_KEY = "lms-device-id";

export function getOrCreateDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

export function useLmsStudent() {
  const deviceId = getOrCreateDeviceId();

  return {
    studentId: deviceId,
    isRegistered: true,
    isRegistering: false,
    showRegistration: false,
    setShowRegistration: () => {},
    register: async () => deviceId,
    requireRegistration: () => true,
    deviceId,
  };
}
