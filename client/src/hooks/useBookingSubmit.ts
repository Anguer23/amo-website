import { useState } from 'react';

export function useBookingSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBooking = async (data: {
    fleetOperatorName: string;
    email: string;
    fleetCapacity: string;
    selectedDate: number;
    selectedTime: string;
    tier: string;
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fleetOperatorName: data.fleetOperatorName,
          email: data.email,
          fleetCapacity: data.fleetCapacity,
          selectedDate: `March ${data.selectedDate}, 2026`,
          selectedTime: data.selectedTime,
          tier: data.tier,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitBooking, isSubmitting, error };
}
