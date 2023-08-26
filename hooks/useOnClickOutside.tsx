import { RefObject, useEffect } from 'react';

// Define the type for the ref parameter (RefObject) and the handler parameter (function)
type UseOnClickOutsideProps = {
  ref: RefObject<HTMLElement>; // RefObject of type HTMLElement
  handler: (event: MouseEvent | TouchEvent) => void; // Function that takes MouseEvent or TouchEvent
};

function useOnClickOutside({ ref, handler }: UseOnClickOutsideProps) {
  useEffect(
    () => {
      // This listener function is created every time the component re-renders
      const listener = (event: MouseEvent | TouchEvent) => {
        // Check if the click happened outside the provided ref's element
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return; // Do nothing if the click is inside the element
        }
        handler(event); // Execute the provided handler function for outside clicks
      };

      // Add event listeners to handle clicks outside the element
      document.addEventListener('mousedown', listener); // Mouse click
      document.addEventListener('touchstart', listener); // Touchscreen tap

      // Cleanup function to remove event listeners when the component unmounts
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Dependency array: this effect depends on the provided ref and handler
    // It's recommended to add ref and handler as dependencies to avoid stale closures
    [ref, handler]
  );
}

export { useOnClickOutside };
