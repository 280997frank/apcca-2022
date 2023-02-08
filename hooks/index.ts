import { useState, useEffect, RefObject } from "react";
import { ApolloError } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { removeAccessToken } from "@/utils";
import { useFormikContext } from "formik";

export function useWindowSize() {
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    function onResize() {
      const inputs = Array.from(document.querySelectorAll("input"));
      if (inputs.find((input) => input === document.activeElement)) {
        // Skip state update here to avoid inputs lose focus
      } else {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      }
    }

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { height: innerHeight, width: innerWidth };
}

/**
 *
 * @param targetDate default "2022-09-19T00:00:00.000+08:00"
 * @returns
 */
export function useCountdown(
  targetDate: string = "2022-09-19T00:00:00.000+08:00"
) {
  const [countdown, setCountdown] = useState([0, 0, 0, 1]);

  useEffect(() => {
    const countDownDate = new Date(targetDate).getTime();

    // Update the count down every 1 second
    const intervalId = setInterval(function () {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown([days, hours, minutes, seconds]);

      if (distance <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

  return countdown;
}

export const useErrorMessage = (error: ApolloError | Error | undefined) => {
  const toast = useToast();

  useEffect(() => {
    const errorToken = ["Failed to verify Token", "Token Expired"];
    if (error) {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });

      // handle token error
      if (errorToken.includes(error.message)) {
        removeAccessToken();
        window.location.href = "/";
      }
    }
    // eslint-disable-next-line
  }, [error, toast]);
};

export const useErrorFocus = (
  fieldRef: RefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  name: string
) => {
  const { isSubmitting, isValid, errors } = useFormikContext();

  const firstErrorKey = Object.keys(errors)[0];

  useEffect(() => {
    if (!isSubmitting || isValid) return;
    if (!isValid && firstErrorKey === name) {
      fieldRef.current?.focus;
    }
  }, [isSubmitting, isValid, fieldRef, firstErrorKey, name]);
};
