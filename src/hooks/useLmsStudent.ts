import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const STUDENT_ID_KEY = "lms-student-id";
const DEVICE_ID_KEY = "lms-device-id";

function getOrCreateDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

export function useLmsStudent() {
  const [studentId, setStudentId] = useState<string | null>(() =>
    localStorage.getItem(STUDENT_ID_KEY)
  );
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const isRegistered = !!studentId;
  const deviceId = getOrCreateDeviceId();

  const register = useCallback(
    async (fullName: string, email: string, phone: string) => {
      setIsRegistering(true);
      try {
        const { data, error } = await supabase.functions.invoke("lms-register", {
          body: { full_name: fullName, email, phone, device_id: deviceId },
        });
        if (error) throw error;
        if (data?.student_id) {
          localStorage.setItem(STUDENT_ID_KEY, data.student_id);
          setStudentId(data.student_id);
          setShowRegistration(false);
          return data.student_id;
        }
        throw new Error("Registration failed");
      } finally {
        setIsRegistering(false);
      }
    },
    [deviceId]
  );

  const requireRegistration = useCallback(() => {
    if (!studentId) {
      setShowRegistration(true);
      return false;
    }
    return true;
  }, [studentId]);

  return {
    studentId,
    isRegistered,
    isRegistering,
    showRegistration,
    setShowRegistration,
    register,
    requireRegistration,
    deviceId,
  };
}
